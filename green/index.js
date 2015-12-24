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
    return container.resolve(GreenHandler).then(function (handler) { handler.run(); });
}
exports.resolve = resolve;
var GreenHandler = (function () {
    function GreenHandler(shell) {
        this._shell = shell;
    }
    GreenHandler.create = function (shell) {
        return new GreenHandler(shell);
    };
    GreenHandler.prototype.run = function () {
        var widget = new phosphor_widget_1.Widget();
        widget.addClass('green-content');
        widget.title.text = 'Green';
        this._shell.addToRightArea(widget, { rank: 40 });
    };
    GreenHandler.requires = [phosphide_1.IAppShell];
    return GreenHandler;
})();
