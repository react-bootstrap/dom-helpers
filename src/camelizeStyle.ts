/**
 * Copyright 2014-2015, Facebook, Inc.
 * All rights reserved.
 * https://github.com/facebook/react/blob/2aeb8a2a6beb00617a4217f7f8284924fa2ad819/src/vendor/core/camelizeStyleName.js
 */
import camelize from './camelize.ts';
import { CamelProperty, Property } from './types.ts';

const msPattern = /^-ms-/;

export default function camelizeStyleName<T extends string = Property>(string: T): CamelProperty {
  return camelize(string.replace(msPattern, 'ms-')) as CamelProperty;
}
