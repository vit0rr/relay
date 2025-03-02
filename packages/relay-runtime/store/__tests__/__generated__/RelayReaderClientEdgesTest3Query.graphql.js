/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @generated SignedSource<<42d2a78afd81c9ad05156fc0c43c19b9>>
 * @flow
 * @lightSyntaxTransform
 * @nogrep
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest, Query } from 'relay-runtime';
import type { RelayReaderClientEdgesTestFragmentOnUser$fragmentType } from "./RelayReaderClientEdgesTestFragmentOnUser.graphql";
import type { UserClientEdgeResolver$key } from "./../resolvers/__generated__/UserClientEdgeResolver.graphql";
import userClientEdgeResolver from "../resolvers/UserClientEdgeResolver.js";
// Type assertion validating that `userClientEdgeResolver` resolver is correctly implemented.
// A type error here indicates that the type signature of the resolver module is incorrect.
(userClientEdgeResolver: (
  rootKey: UserClientEdgeResolver$key, 
) => mixed);
export type RelayReaderClientEdgesTest3Query$variables = {||};
export type RelayReaderClientEdgesTest3Query$data = {|
  +me: ?{|
    +client_edge: ?{|
      +$fragmentSpreads: RelayReaderClientEdgesTestFragmentOnUser$fragmentType,
    |},
  |},
|};
export type RelayReaderClientEdgesTest3Query = {|
  response: RelayReaderClientEdgesTest3Query$data,
  variables: RelayReaderClientEdgesTest3Query$variables,
|};
*/

var node/*: ConcreteRequest*/ = {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": {
      "hasClientEdges": true
    },
    "name": "RelayReaderClientEdgesTest3Query",
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "User",
        "kind": "LinkedField",
        "name": "me",
        "plural": false,
        "selections": [
          {
            "kind": "ClientEdgeToServerObject",
            "operation": require('./ClientEdgeQuery_RelayReaderClientEdgesTest3Query_me__client_edge.graphql'),
            "backingField": {
              "alias": null,
              "args": null,
              "fragment": {
                "args": null,
                "kind": "FragmentSpread",
                "name": "UserClientEdgeResolver"
              },
              "kind": "RelayResolver",
              "name": "client_edge",
              "resolverModule": require('./../resolvers/UserClientEdgeResolver'),
              "path": "me.client_edge"
            },
            "linkedField": {
              "alias": null,
              "args": null,
              "concreteType": "User",
              "kind": "LinkedField",
              "name": "client_edge",
              "plural": false,
              "selections": [
                {
                  "args": null,
                  "kind": "FragmentSpread",
                  "name": "RelayReaderClientEdgesTestFragmentOnUser"
                }
              ],
              "storageKey": null
            }
          }
        ],
        "storageKey": null
      }
    ],
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "RelayReaderClientEdgesTest3Query",
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "User",
        "kind": "LinkedField",
        "name": "me",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "name",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "id",
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "bee3ad0602eb2c2d400a233e9bb2c721",
    "id": null,
    "metadata": {},
    "name": "RelayReaderClientEdgesTest3Query",
    "operationKind": "query",
    "text": "query RelayReaderClientEdgesTest3Query {\n  me {\n    ...UserClientEdgeResolver\n    id\n  }\n}\n\nfragment UserClientEdgeResolver on User {\n  name\n}\n"
  }
};

if (__DEV__) {
  (node/*: any*/).hash = "1631a4297aeb4909e68ea6822af044cb";
}

module.exports = ((node/*: any*/)/*: Query<
  RelayReaderClientEdgesTest3Query$variables,
  RelayReaderClientEdgesTest3Query$data,
>*/);
