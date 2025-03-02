/*
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

use std::collections::HashMap;

use common::Location;
use common::NamedItem;
use graphql_ir::Argument;
use graphql_ir::ConstantValue;
use graphql_ir::FragmentDefinition;
use graphql_ir::FragmentDefinitionName;
use graphql_ir::Value;
use graphql_ir::VariableName;
use intern::string_key::Intern;
use intern::string_key::StringKey;

#[derive(Default, Debug)]
pub struct Scope {
    bindings: Vec<(Location, HashMap<VariableName, Value>)>,
}

impl Scope {
    pub fn root_scope() -> Self {
        Self {
            bindings: Vec::new(),
        }
    }

    pub fn get(&self, name: VariableName) -> Option<&Value> {
        self.bindings
            .last()
            .and_then(|bindings| bindings.1.get(&name))
    }

    pub fn locations(&self) -> Vec<Location> {
        self.bindings
            .iter()
            .map(|(location, _)| *location)
            .collect()
    }

    pub fn push_bindings(&mut self, location: Location, bindings: HashMap<VariableName, Value>) {
        self.bindings.push((location, bindings));
    }

    pub fn push(
        &mut self,
        location: Location,
        arguments: &[Argument],
        fragment: &FragmentDefinition,
    ) {
        let mut bindings = HashMap::<VariableName, Value>::default();
        for variable_definition in &fragment.variable_definitions {
            let arg_name = variable_definition.name.item;
            let arg_value = match arguments.named(arg_name.0) {
                Some(arg_from_spread) => {
                    if arg_from_spread.value.item == Value::Constant(ConstantValue::Null()) {
                        if let Some(default_value) = &variable_definition.default_value {
                            Value::Constant(default_value.item.clone())
                        } else {
                            arg_from_spread.value.item.clone()
                        }
                    } else {
                        arg_from_spread.value.item.clone()
                    }
                }
                None => {
                    if let Some(default_value) = &variable_definition.default_value {
                        Value::Constant(default_value.item.clone())
                    } else {
                        Value::Constant(ConstantValue::Null())
                    }
                }
            };
            bindings.insert(arg_name, arg_value);
        }
        self.bindings.push((location, bindings));
    }

    pub fn pop(&mut self) {
        assert!(
            !self.bindings.is_empty(),
            "cannot pop from empty scope stack",
        );
        self.bindings.pop();
    }
}

pub fn format_local_variable(
    fragment_name: FragmentDefinitionName,
    arg_name: StringKey,
) -> StringKey {
    format!("{}${}", fragment_name, arg_name).intern()
}

#[cfg(test)]
mod tests {
    use common::Location;
    use common::SourceLocationKey;
    use common::Span;
    use common::WithLocation;
    use graphql_ir::Argument;
    use graphql_ir::ConstantValue;
    use graphql_ir::VariableDefinition;
    use graphql_ir::VariableName;
    use intern::string_key::Intern;
    use relay_test_schema::TEST_SCHEMA;
    use schema::Schema;
    use schema::TypeReference;

    use super::*;

    fn default_location() -> Location {
        Location::new(SourceLocationKey::standalone("test-file"), Span::new(0, 0))
    }

    fn with_test_location<T>(item: T) -> WithLocation<T> {
        WithLocation::new(default_location(), item)
    }

    fn optional_int_type_reference() -> TypeReference {
        TypeReference::Named(TEST_SCHEMA.get_type("Int".intern()).unwrap())
    }

    fn empty_fragment_definition() -> FragmentDefinition {
        FragmentDefinition {
            name: with_test_location(FragmentDefinitionName("TestFragment".intern())),
            type_condition: TEST_SCHEMA.get_type("User".intern()).unwrap(),
            directives: vec![],
            selections: vec![],
            used_global_variables: vec![],
            variable_definitions: vec![],
        }
    }

    // Passing of constant value.
    //
    // @argDefs(size: Int)
    // @args(size: 42)
    // => $size = 42
    #[test]
    fn test_push_sets_literal_argument_values() {
        let mut scope = Scope::root_scope();

        let fragment_definition = FragmentDefinition {
            used_global_variables: vec![],
            variable_definitions: vec![VariableDefinition {
                name: with_test_location(VariableName("size".intern())),
                type_: optional_int_type_reference(),
                default_value: None,
                directives: vec![],
            }],
            ..empty_fragment_definition()
        };

        let spread_arguments = vec![Argument {
            name: with_test_location("size".intern()),
            value: with_test_location(Value::Constant(ConstantValue::Int(42))),
        }];

        // push the fragment call on the scope stack
        scope.push(default_location(), &spread_arguments, &fragment_definition);
        assert_eq!(
            scope.get(VariableName("size".intern())),
            Some(&Value::Constant(ConstantValue::Int(42)))
        );

        // after pop, the value should no longer be set
        scope.pop();
        assert_eq!(scope.get(VariableName("size".intern())), None);
    }

    // Test of default value behavior.
    //
    // @argDefs(
    //   noDefaultAndNothingPassed: Int
    //   defaultAndValuePassed: Int = 42
    //   defaultAndNothingPassed: Int = 42
    //   defaultAndNullPassed: Int = 42
    // )
    // @args(
    //   defaultAndValuePassed: 3
    //   defaultAndNullPassed: null
    // )
    // => $noDefaultAndNothingPassed = null
    // => $defaultAndValuePassed = 3
    // => $defaultAndNothingPassed = 42
    // => $defaultAndNullPassed = 42
    #[test]
    fn test_default_value() {
        let mut scope = Scope::root_scope();

        let fragment_definition = FragmentDefinition {
            used_global_variables: vec![],
            variable_definitions: vec![
                VariableDefinition {
                    name: with_test_location(VariableName("noDefaultAndNothingPassed".intern())),
                    type_: optional_int_type_reference(),
                    default_value: None,
                    directives: vec![],
                },
                VariableDefinition {
                    name: with_test_location(VariableName("defaultAndValuePassed".intern())),
                    type_: optional_int_type_reference(),
                    default_value: Some(with_test_location(ConstantValue::Int(42))),
                    directives: vec![],
                },
                VariableDefinition {
                    name: with_test_location(VariableName("defaultAndNothingPassed".intern())),
                    type_: optional_int_type_reference(),
                    default_value: Some(with_test_location(ConstantValue::Int(42))),
                    directives: vec![],
                },
                VariableDefinition {
                    name: with_test_location(VariableName("defaultAndNullPassed".intern())),
                    type_: optional_int_type_reference(),
                    default_value: Some(with_test_location(ConstantValue::Int(42))),
                    directives: vec![],
                },
            ],
            ..empty_fragment_definition()
        };

        let spread_arguments = vec![
            Argument {
                name: with_test_location("defaultAndValuePassed".intern()),
                value: with_test_location(Value::Constant(ConstantValue::Int(3))),
            },
            Argument {
                name: with_test_location("defaultAndNullPassed".intern()),
                value: with_test_location(Value::Constant(ConstantValue::Null())),
            },
        ];

        scope.push(default_location(), &spread_arguments, &fragment_definition);

        assert_eq!(
            scope.get(VariableName("noDefaultAndNothingPassed".intern())),
            Some(&Value::Constant(ConstantValue::Null()))
        );
        assert_eq!(
            scope.get(VariableName("defaultAndValuePassed".intern())),
            Some(&Value::Constant(ConstantValue::Int(3)))
        );
        assert_eq!(
            scope.get(VariableName("defaultAndNothingPassed".intern())),
            Some(&Value::Constant(ConstantValue::Int(42)))
        );
        assert_eq!(
            scope.get(VariableName("defaultAndNullPassed".intern())),
            // NOTE: This behaves like nothing passed. This is against the
            //       general GraphQL spec for arguments, but unfortunately baked
            //       in legacy behavior.
            Some(&Value::Constant(ConstantValue::Int(42)))
        );
    }
}
