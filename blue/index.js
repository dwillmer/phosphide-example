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
    return container.resolve(BlueHandler).then(function (handler) { handler.run(); });
}
exports.resolve = resolve;
var BlueHandler = (function () {
    function BlueHandler(shell) {
        this._shell = shell;
    }
    BlueHandler.create = function (shell) {
        return new BlueHandler(shell);
    };
    BlueHandler.prototype.run = function () {
        var widget = new phosphor_widget_1.Widget();
        widget.addClass('blue-content');
        widget.title.text = 'Blue';
        this._shell.addToLeftArea(widget, { rank: 10 });
    };
    BlueHandler.requires = [phosphide_1.IAppShell];
    return BlueHandler;
})();
