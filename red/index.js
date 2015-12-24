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
    return container.resolve(RedHandler).then(function (handler) { handler.run(); });
}
exports.resolve = resolve;
var RedHandler = (function () {
    function RedHandler(shell) {
        this._shell = shell;
    }
    RedHandler.create = function (shell) {
        return new RedHandler(shell);
    };
    RedHandler.prototype.run = function () {
        var widget = new phosphor_widget_1.Widget();
        widget.addClass('red-content');
        widget.title.text = 'Red';
        this._shell.addToRightArea(widget, { rank: 30 });
    };
    RedHandler.requires = [phosphide_1.IAppShell];
    return RedHandler;
})();
