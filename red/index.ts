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
  return container.resolve(RedHandler).then(handler => {
    handler.run();
  });
}

function createCommand(n: number): SimpleCommand {
  return new SimpleCommand({
    handler: (message: string) => { console.log(`COMMAND: ${message}`); },
    category: 'Red',
    text: 'Red ' + n.toString(),
    caption: 'Caption - red ' + n.toString()
  });
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
      { id: 'red:show-0', command: createCommand(0) },
      { id: 'red:show-1', command: createCommand(1) },
      { id: 'red:show-2', command: createCommand(2) },
      { id: 'red:show-3', command: createCommand(3) },
      { id: 'red:show-4', command: createCommand(4) },
      { id: 'red:show-5', command: createCommand(5) }
    ];
    let paletteItems = [
      { id: 'red:show-0', args: 'Red is best!' },
      { id: 'red:show-1', args: 'Red number one' },
      { id: 'red:show-2', args: 'Red number two' },
      { id: 'red:show-3', args: 'Red number three' },
      { id: 'red:show-4', args: 'Red number four' },
      { id: 'red:show-5', args: 'Red number five' }
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
