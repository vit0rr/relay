/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow
 * @format
 */

'use strict';

const {DEFAULT_HANDLE_KEY} = require('./RelayDefaultHandleKey');
const invariant = require('invariant');

/**
 * @internal
 *
 * Helper to create a unique name for a handle field based on the handle name, handle key and
 * source field.
 */
function getRelayHandleKey(
  handleName: string,
  key: ?string,
  fieldName: ?string,
): string {
  if (key && key !== DEFAULT_HANDLE_KEY) {
    return `__${key}_${handleName}`;
  }

  invariant(
    fieldName != null,
    'getRelayHandleKey: Expected either `fieldName` or `key` in `handle` to be provided',
  );
  return `__${fieldName}_${handleName}`;
}

module.exports = getRelayHandleKey;
