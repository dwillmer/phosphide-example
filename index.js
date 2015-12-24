/*-----------------------------------------------------------------------------
| Copyright (c) 2014-2015, PhosphorJS Contributors
|
| Distributed under the terms of the BSD 3-Clause License.
|
| The full license is in the file LICENSE, distributed with this software.
|----------------------------------------------------------------------------*/
'use strict';

var di = require('phosphor-di');

require('phosphide').loadPlugins(new di.Container(), [
  require('phosphide/lib/appshell/plugin'),
  require('blue/index'),
  require('editor/index'),
  require('green/index'),
  require('red/index'),
  require('yellow/index')
]).then(function() {
  console.log('loading finished');
});
