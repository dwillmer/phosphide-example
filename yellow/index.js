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
    return container.resolve(YellowHandler).then(function (handler) { handler.run(); });
}
exports.resolve = resolve;
var YellowHandler = (function () {
    function YellowHandler(shell) {
        this._shell = shell;
    }
    YellowHandler.create = function (shell) {
        return new YellowHandler(shell);
    };
    YellowHandler.prototype.run = function () {
        var widget = new phosphor_widget_1.Widget();
        widget.addClass('yellow-content');
        widget.title.text = 'Yellow';
        this._shell.addToLeftArea(widget, { rank: 20 });
    };
    YellowHandler.requires = [phosphide_1.IAppShell];
    return YellowHandler;
})();
