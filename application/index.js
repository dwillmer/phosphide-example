/*-----------------------------------------------------------------------------
| Copyright (c) 2014-2016, PhosphorJS Contributors
|
| Distributed under the terms of the BSD 3-Clause License.
|
| The full license is in the file LICENSE, distributed with this software.
|----------------------------------------------------------------------------*/
'use strict';
var phosphide_1 = require('phosphide');
function resolve(container) {
    return container.resolve(Application).catch(function (error) {
        console.warn('Application instance failed to load:', error);
    });
}
exports.resolve = resolve;
/**
 * Application injects the UI chrome (palette, menus, etc.) into an `IAppShell`.
 */
var Application = (function () {
    function Application(shell, palette) {
        palette.title.text = 'Commands';
        shell.addToLeftArea(palette, { rank: 40 });
        shell.attach(document.body);
        window.addEventListener('resize', function () { shell.update(); });
    }
    Application.create = function (shell, palette) {
        return new Application(shell, palette);
    };
    Application.requires = [phosphide_1.IAppShell, phosphide_1.ICommandPalette];
    return Application;
})();
