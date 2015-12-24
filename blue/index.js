/*-----------------------------------------------------------------------------
| Copyright (c) 2014-2015, PhosphorJS Contributors
|
| Distributed under the terms of the BSD 3-Clause License.
|
| The full license is in the file LICENSE, distributed with this software.
|----------------------------------------------------------------------------*/
'use strict';
var phosphide_1 = require('phosphide');
var phosphor_widget_1 = require('phosphor-widget');
function resolve(container) {
    return container.resolve(blueFactory);
}
exports.resolve = resolve;
var blueFactory = {
    requires: [phosphide_1.IAppShell],
    create: function (shell) {
        console.log('in blue factory');
        var view = new phosphor_widget_1.Widget();
        view.addClass('blue-content');
        view.title.text = 'Blue';
        shell.addToRightArea(view);
    }
};
