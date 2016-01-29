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

function createCommand(n: number): SimpleCommand {
  return new SimpleCommand({
    handler: (message: string) => { console.log(`COMMAND: ${message}`)},
    category: 'Green',
    text: 'Green ' + n.toString(),
    caption: 'Caption - green ' + n.toString()
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

    let registryItems = [
      { id: 'green:show-0', command: createCommand(0) },
      { id: 'green:show-1', command: createCommand(1) },
      { id: 'green:show-2', command: createCommand(2) },
      { id: 'green:show-3', command: createCommand(3) },
      { id: 'green:show-4', command: createCommand(4) },
      { id: 'green:show-5', command: createCommand(5) }
    ];
    let paletteItems = [
      { id: 'green:show-0', args: 'Green is best!' },
      { id: 'green:show-1', args: 'Green number one' },
      { id: 'green:show-2', args: 'Green number two' },
      { id: 'green:show-3', args: 'Green number three' },
      { id: 'green:show-4', args: 'Green number four' },
      { id: 'green:show-5', args: 'Green number five' }
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
