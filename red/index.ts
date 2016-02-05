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
  return container.resolve(RedHandler).then(handler => {
    handler.run();
  });
}

function createHandler(): (args: any) => void {
  return (message: string) => { console.log(`COMMAND: ${message}`); };
}


class RedHandler {

  static requires = [IAppShell, ICommandRegistry, ICommandPalette, IShortcutManager];

  static create(shell: IAppShell, commands: ICommandRegistry, palette: ICommandPalette, shortcuts: IShortcutManager): RedHandler {
    return new RedHandler(shell, commands, palette, shortcuts);
  }

  constructor(shell: IAppShell, commands: ICommandRegistry, palette: ICommandPalette, shortcuts: IShortcutManager) {
    this._shell = shell;
    this._commandRegistry = commands;
    this._palette = palette;
    this._shortcuts = shortcuts;
  }

  run(): void {
    let widget = new Widget();
    widget.addClass('red-content');
    widget.title.text = 'Red';
    this._shell.addToRightArea(widget, { rank: 30 });

    let registryItems = [
      { id: 'red:show-0', handler: createHandler() },
      { id: 'red:show-1', handler: createHandler() },
      { id: 'red:show-2', handler: createHandler() },
      { id: 'red:show-3', handler: createHandler() },
      { id: 'red:show-4', handler: createHandler() },
      { id: 'red:show-5', handler: createHandler() }
    ];
    let paletteItems = [
      {
        id: 'red:show-0',
        args: 'Red is best!',
        text: 'Red 0',
        caption: 'Red is best!',
        category: 'All Colours'
      },
      {
        id: 'red:show-1',
        args: 'Red number one',
        text: 'Red 1',
        caption: 'Red number one',
        category: 'Red'
      },
      {
        id: 'red:show-2',
        args: 'Red number two',
        text: 'Red 2',
        caption: 'Red number two',
        category: 'Red'
      },
      {
        id: 'red:show-3',
        args: 'Red number three',
        text: 'Red 3',
        caption: 'Red number three',
        category: 'Red'
      },
      {
        id: 'red:show-4',
        args: 'Red number four',
        text: 'Red 4',
        caption: 'Red number four',
        category: 'Red'
      },
      {
        id: 'red:show-5',
        args: 'Red number five',
        text: 'Red 5',
        caption: 'Red number five',
        category: 'Red'
      }
    ];
    let shortcutItems = [
      {
        sequence: ['Ctrl R'],
        selector: '*',
        command: 'red:show-0',
        args: 'Red is best!'
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
