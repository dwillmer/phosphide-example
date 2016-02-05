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
  return container.resolve(BlueHandler).then(handler => {
    handler.run();
  });
}

function createHandler(): (args: any) => void {
  return (message: string) => { console.log(`COMMAND: ${message}`); };
}

class BlueHandler {

  static requires = [IAppShell, ICommandRegistry, ICommandPalette, IShortcutManager];

  static create(shell: IAppShell, commands: ICommandRegistry, palette: ICommandPalette, shortcuts: IShortcutManager): BlueHandler {
    return new BlueHandler(shell, commands, palette, shortcuts);
  }

  constructor(shell: IAppShell, commands: ICommandRegistry, palette: ICommandPalette, shortcuts: IShortcutManager) {
    this._shell = shell;
    this._commandRegistry = commands;
    this._palette = palette;
    this._shortcuts = shortcuts;
  }

  run(): void {
    let widget = new Widget();
    widget.addClass('blue-content');
    widget.title.text = 'Blue';
    this._shell.addToLeftArea(widget, { rank: 10 });

    let registryItems = [
      { id: 'blue:show-0', handler: createHandler() },
      { id: 'blue:show-1', handler: createHandler() },
      { id: 'blue:show-2', handler: createHandler() },
      { id: 'blue:show-3', handler: createHandler() },
      { id: 'blue:show-4', handler: createHandler() },
      { id: 'blue:show-5', handler: createHandler() },
    ];
    let paletteItems = [
      {
        id: 'blue:show-0',
        args: 'Blue is best!',
        text: 'Blue 0',
        caption: 'Blue is best!',
        category: 'All Colours'
      },
      {
        id: 'blue:show-1',
        args: 'Blue number one',
        text: 'Blue 1',
        caption: 'Blue number one',
        category: 'Blue'
      },
      {
        id: 'blue:show-2',
        args: 'Blue number two',
        text: 'Blue 2',
        caption: 'Blue number two',
        category: 'Blue'
       },
      {
        id: 'blue:show-3',
        args: 'Blue number three',
        text: 'Blue 3',
        caption: 'Blue number three',
        category: 'Blue'
      },
      {
        id: 'blue:show-4',
        args: 'Blue number four',
        text: 'Blue 4',
        caption: 'Blue number four',
        category: 'Blue'
      },
      {
        id: 'blue:show-5',
        args: 'Blue number five',
        text: 'Blue 5',
        caption: 'Blue number 5',
        category: 'Blue'
      }
    ];
    let shortcutItems = [
      {
        sequence: ['Ctrl Shift B'],
        selector: '*',
        command: 'blue:show-0',
        args: 'Blue is best!'
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
