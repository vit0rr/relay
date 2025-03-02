/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @generated SignedSource<<5100ca8c6c84616144b97429e7b8ff8e>>
 * @flow
 * @lightSyntaxTransform
 * @nogrep
 */

/* eslint-disable */

'use strict';

/*::
import type { Fragment, ReaderFragment } from 'relay-runtime';
import type { FragmentType } from "relay-runtime";
declare export opaque type DataCheckerTestClientInterface$fragmentType: FragmentType;
export type DataCheckerTestClientInterface$data = {|
  +description: ?string,
  +$fragmentType: DataCheckerTestClientInterface$fragmentType,
|};
export type DataCheckerTestClientInterface$key = {
  +$data?: DataCheckerTestClientInterface$data,
  +$fragmentSpreads: DataCheckerTestClientInterface$fragmentType,
  ...
};
*/

var node/*: ReaderFragment*/ = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "DataCheckerTestClientInterface",
  "selections": [
    {
      "kind": "ClientExtension",
      "selections": [
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "description",
          "storageKey": null
        }
      ]
    }
  ],
  "type": "ClientInterface",
  "abstractKey": "__isClientInterface"
};

if (__DEV__) {
  (node/*: any*/).hash = "4995889c6c2685693be9b60dccb0b095";
}

module.exports = ((node/*: any*/)/*: Fragment<
  DataCheckerTestClientInterface$fragmentType,
  DataCheckerTestClientInterface$data,
>*/);
