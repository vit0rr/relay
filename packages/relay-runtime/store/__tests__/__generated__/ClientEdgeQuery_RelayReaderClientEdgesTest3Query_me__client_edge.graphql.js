/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @generated SignedSource<<92de3c569d53a855946f548fb2f124e8>>
 * @flow
 * @lightSyntaxTransform
 * @nogrep
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest, Query } from 'relay-runtime';
import type { RefetchableClientEdgeQuery_RelayReaderClientEdgesTest3Query_me__client_edge$fragmentType } from "./RefetchableClientEdgeQuery_RelayReaderClientEdgesTest3Query_me__client_edge.graphql";
export type ClientEdgeQuery_RelayReaderClientEdgesTest3Query_me__client_edge$variables = {|
  id: string,
|};
export type ClientEdgeQuery_RelayReaderClientEdgesTest3Query_me__client_edge$data = {|
  +node: ?{|
    +$fragmentSpreads: RefetchableClientEdgeQuery_RelayReaderClientEdgesTest3Query_me__client_edge$fragmentType,
  |},
|};
export type ClientEdgeQuery_RelayReaderClientEdgesTest3Query_me__client_edge = {|
  response: ClientEdgeQuery_RelayReaderClientEdgesTest3Query_me__client_edge$data,
  variables: ClientEdgeQuery_RelayReaderClientEdgesTest3Query_me__client_edge$variables,
|};
*/

var node/*: ConcreteRequest*/ = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "id"
  }
],
v1 = [
  {
    "kind": "Variable",
    "name": "id",
    "variableName": "id"
  }
];
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "ClientEdgeQuery_RelayReaderClientEdgesTest3Query_me__client_edge",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": null,
        "kind": "LinkedField",
        "name": "node",
        "plural": false,
        "selections": [
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "RefetchableClientEdgeQuery_RelayReaderClientEdgesTest3Query_me__client_edge"
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
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "ClientEdgeQuery_RelayReaderClientEdgesTest3Query_me__client_edge",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": null,
        "kind": "LinkedField",
        "name": "node",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "__typename",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "id",
            "storageKey": null
          },
          {
            "kind": "InlineFragment",
            "selections": [
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "name",
                "storageKey": null
              }
            ],
            "type": "User",
            "abstractKey": null
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "a6f3a8fb18137b0b2dc2c49e0bab73a9",
    "id": null,
    "metadata": {},
    "name": "ClientEdgeQuery_RelayReaderClientEdgesTest3Query_me__client_edge",
    "operationKind": "query",
    "text": "query ClientEdgeQuery_RelayReaderClientEdgesTest3Query_me__client_edge(\n  $id: ID!\n) {\n  node(id: $id) {\n    __typename\n    ...RefetchableClientEdgeQuery_RelayReaderClientEdgesTest3Query_me__client_edge\n    id\n  }\n}\n\nfragment RefetchableClientEdgeQuery_RelayReaderClientEdgesTest3Query_me__client_edge on User {\n  ...RelayReaderClientEdgesTestFragmentOnUser\n  id\n}\n\nfragment RelayReaderClientEdgesTestFragmentOnUser on User {\n  name\n}\n"
  }
};
})();

if (__DEV__) {
  (node/*: any*/).hash = "1631a4297aeb4909e68ea6822af044cb";
}

module.exports = ((node/*: any*/)/*: Query<
  ClientEdgeQuery_RelayReaderClientEdgesTest3Query_me__client_edge$variables,
  ClientEdgeQuery_RelayReaderClientEdgesTest3Query_me__client_edge$data,
>*/);
