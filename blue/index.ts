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
  return container.resolve(BlueHandler).then(handler => {
    handler.run();
  });
}

function createCommand(n: number): SimpleCommand {
  return new SimpleCommand({
    handler: (message: string) => { console.log(`COMMAND: ${message}`); },
    category: 'Blue',
    text: 'Blue ' + n.toString(),
    caption: 'Caption - blue ' + n.toString()
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
    this._palette = palette;
    this._shortcuts = shortcuts;
  }

  run(): void {
    let widget = new Widget();
    widget.addClass('blue-content');
    widget.title.text = 'Blue';
    this._shell.addToLeftArea(widget, { rank: 10 });

    let registryItems = [
      { id: 'blue:show-0', command: createCommand(0) },
      { id: 'blue:show-1', command: createCommand(1) },
      { id: 'blue:show-2', command: createCommand(2) },
      { id: 'blue:show-3', command: createCommand(3) },
      { id: 'blue:show-4', command: createCommand(4) },
      { id: 'blue:show-5', command: createCommand(5) },
    ];
    let paletteItems = [
      { id: 'blue:show-0', args: 'Blue is best!' },
      { id: 'blue:show-1', args: 'Blue number one' },
      { id: 'blue:show-2', args: 'Blue number two' },
      { id: 'blue:show-3', args: 'Blue number three' },
      { id: 'blue:show-4', args: 'Blue number four' },
      { id: 'blue:show-5', args: 'Blue number five' }
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
