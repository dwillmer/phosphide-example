/*-----------------------------------------------------------------------------
| Copyright (c) 2014-2015, PhosphorJS Contributors
|
| Distributed under the terms of the BSD 3-Clause License.
|
| The full license is in the file LICENSE, distributed with this software.
|----------------------------------------------------------------------------*/
'use strict';


require('phosphide').loadExtensions([
  'phosphide/ext/shellview',
  'blue/index',
  'editor/index',
  'green/index',
  'red/index',
  'yellow/index'
]).then(function() {
  console.log('loading finished');
});
