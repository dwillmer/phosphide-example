/*-----------------------------------------------------------------------------
| Copyright (c) 2014-2015, PhosphorJS Contributors
|
| Distributed under the terms of the BSD 3-Clause License.
|
| The full license is in the file LICENSE, distributed with this software.
|----------------------------------------------------------------------------*/
'use strict';

import {
  IAppShell, ICommandRegistry, IShortcutManager, ICommandPalette
} from 'phosphide';

import {
  SimpleCommand
} from 'phosphor-command';

import {
  Container
} from 'phosphor-di';

import {
  Widget
} from 'phosphor-widget';


export
function resolve(container: Container): Promise<void> {
  return container.resolve(BlueHandler).then(handler => {
    handler.run();
  });
}


class BlueHandler {

  static requires = [IAppShell, ICommandRegistry, ICommandPalette, IShortcutManager];

  static create(shell: IAppShell, commands: ICommandRegistry, palette: ICommandPalette, shortcuts: IShortcutManager): BlueHandler {
    return new BlueHandler(shell, commands, palette, shortcuts);
  }

  constructor(shell: IAppShell, commands: ICommandRegistry, palette: ICommandPalette, shortcuts: IShortcutManager) {
    this._shell = shell;
    this._commandRegistry = commands;
    this._shortcuts = shortcuts;
    this._palette = palette;
  }

  run(): void {
    let widget = new Widget();
    widget.addClass('blue-content');
    widget.title.text = 'Blue';
    this._shell.addToLeftArea(widget, { rank: 10 });

    let id = 'demo:blue';
    let command = new SimpleCommand({
      handler: (message: string) => { console.log(`COMMAND: ${message}`); }
    });
    this._commandRegistry.add([{ id, command }]);

    this._shortcuts.add([
      {
        sequence: ['Ctrl B'],
        selector: '*',
        command: id,
        args: 'Blue invoked!'
      }
    ]);

    this._palette.add([
      {
        text: 'All colors',
        items: [
          {
            id: 'demo:blue',
            title: 'Blue',
            caption: 'Blue is best!',
            args: 'Blue invoked!'
          }
        ]
      }
    ]);

  }

  private _shell: IAppShell;
  private _commandRegistry: ICommandRegistry;
  private _shortcuts: IShortcutManager;
  private _palette: ICommandPalette;
}
