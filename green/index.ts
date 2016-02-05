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

function createHandler(): (args: any) => void {
  return (message: string) => { console.log(`COMMAND: ${message}`)};
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

    let registryItems = [
      { id: 'green:show-0', handler: createHandler() },
      { id: 'green:show-1', handler: createHandler() },
      { id: 'green:show-2', handler: createHandler() },
      { id: 'green:show-3', handler: createHandler() },
      { id: 'green:show-4', handler: createHandler() },
      { id: 'green:show-5', handler: createHandler() }
    ];
    let paletteItems = [
      {
        id: 'green:show-0',
        args: 'Green is best!',
        text: 'Green 0',
        caption: 'Green is best!',
        category: 'Green'
      },
      {
        id: 'green:show-1',
        args: 'Green number one',
        text: 'Green 1',
        caption: 'Green number one',
        category: 'Green'
      },
      {
        id: 'green:show-2',
        args: 'Green number two',
        text: 'Green 2',
        caption: 'Green number two',
        category: 'Green'
      },
      {
        id: 'green:show-3',
        args: 'Green number three',
        text: 'Green 3',
        caption: 'Green number three',
        category: 'Green'
      },
      {
        id: 'green:show-4',
        args: 'Green number four',
        text: 'Green 4',
        caption: 'Green number four',
        category: 'Green'
      },
      {
        id: 'green:show-5',
        args: 'Green number five',
        text: 'Green 5',
        caption: 'Green number 5',
        category: 'Green'
      }
    ];
    let shortcutItems = [
      {
        sequence: ['Ctrl G'],
        selector: '*',
        command: 'green:show-0',
        args: 'Green is best!'
      }
    ];

    this._commandRegistry.add(registryItems);
    this._shortcuts.add(shortcutItems);
    this._palette.add(paletteItems);
  }

  private _shell: IAppShell;
  private _commandRegistry: ICommandRegistry;
  private _palette: ICommandPalette;
  private _shortcuts: IShortcutManager;
}
