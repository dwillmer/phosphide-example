/*-----------------------------------------------------------------------------
| Copyright (c) 2014-2015, PhosphorJS Contributors
|
| Distributed under the terms of the BSD 3-Clause License.
|
| The full license is in the file LICENSE, distributed with this software.
|----------------------------------------------------------------------------*/
'use strict';

import {
  IAppShell, ICommandRegistry, ICommandPalette, IShortcutManager
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
  return container.resolve(GreenHandler).then(handler => {
    handler.run();
  });
}


class GreenHandler {

  static requires = [IAppShell, ICommandRegistry, ICommandPalette, IShortcutManager];

  static create(shell: IAppShell, commands: ICommandRegistry, palette: ICommandPalette, shortcuts: IShortcutManager): GreenHandler {
    return new GreenHandler(shell, commands, palette, shortcuts);
  }

  constructor(shell: IAppShell, commands: ICommandRegistry, palette: ICommandPalette, shortcuts: IShortcutManager) {
    this._shell = shell;
    this._commandRegistry = commands;
    this._palette = palette;
    this._shortcuts = shortcuts;
  }

  run(): void {
    let widget = new Widget();
    widget.addClass('green-content');
    widget.title.text = 'Green';
    this._shell.addToRightArea(widget, { rank: 40 });

    let id = 'demo:green';
    let command = new SimpleCommand({
      handler: (message: string) => { console.log(`COMMAND: ${message}`); }
    });
    this._commandRegistry.add([{ id, command }]);

    this._shortcuts.add([
      {
        sequence: ['Ctrl G'],
        selector: '*',
        command: id,
        args: 'Green invoked!'
      }
    ]);

    this._palette.add([
      {
        text: 'All colors',
        items: [
          {
            id: 'demo:green',
            title: 'Green',
            caption: 'Green is best!',
            args: 'Green invoked!'
          }
        ]
      }
    ]);
  }

  private _shell: IAppShell;
  private _commandRegistry: ICommandRegistry;
  private _palette: ICommandPalette;
  private _shortcuts: IShortcutManager;
}
