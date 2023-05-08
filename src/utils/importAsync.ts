'use client';

import * as React from 'react';
import * as ReactDOM from 'react-dom';

const sharedObjects = {
  react: {
    '*': {
      eager: true,
      get: () => () => React,
      loaded: 1,
    },
  },
  'react-dom': {
    '*': {
      eager: true,
      get: () => () => ReactDOM,
      loaded: 1,
    },
  },
};
export default async function importAsync(scope: string, module: string) {
  // Initializes the share scope. This fills it with known provided modules from this build and all remotes
  // @ts-ignore
  await __webpack_init_sharing__('default');

  // @ts-ignore
  Object.assign(__webpack_share_scopes__.default, sharedObjects);

  // @ts-ignore
  const container = window[scope]; // or get the container somewhere else
  // Initialize the container, it may provide shared modules
  // @ts-ignore
  await container.init(__webpack_share_scopes__.default);
  // @ts-ignore
  const factory = await container.get(module);
  const exports = factory();
  return exports.default;
}
