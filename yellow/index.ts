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
  return container.resolve(YellowHandler).then(handler => {
    handler.run();
  });
}

function createCommand(n: number): SimpleCommand {
  return new SimpleCommand({
    handler: (message: string) => { console.log(`COMMAND: ${message}`); },
    category: 'Yellow',
    text: 'Yellow ' + n.toString(),
    caption: 'Caption - yellow ' + n.toString()
  });
}


class YellowHandler {

  static requires = [IAppShell, ICommandRegistry, ICommandPalette, IShortcutManager];

  static create(shell: IAppShell, commands: ICommandRegistry, palette: ICommandPalette, shortcuts: IShortcutManager): YellowHandler {
    return new YellowHandler(shell, commands, palette, shortcuts);
  }

  constructor(shell: IAppShell, commands: ICommandRegistry, palette: ICommandPalette, shortcuts: IShortcutManager) {
    this._shell = shell;
    this._commandRegistry = commands;
    this._palette = palette;
    this._shortcuts = shortcuts;
  }

  run(): void {
    let widget = new Widget();
    widget.addClass('yellow-content');
    widget.title.text = 'Yellow';
    this._shell.addToLeftArea(widget, { rank: 20 });

    let registryItems = [
      { id: 'yellow:show-0', command: createCommand(0) },
      { id: 'yellow:show-1', command: createCommand(1) },
      { id: 'yellow:show-2', command: createCommand(2) },
      { id: 'yellow:show-3', command: createCommand(3) },
      { id: 'yellow:show-4', command: createCommand(4) },
      { id: 'yellow:show-5', command: createCommand(5) }
    ];
    let paletteItems = [
      { id: 'yellow:show-0', args: 'Yellow is best!' },
      { id: 'yellow:show-1', args: 'Yellow number one' },
      { id: 'yellow:show-2', args: 'Yellow number two' },
      { id: 'yellow:show-3', args: 'Yellow number three' },
      { id: 'yellow:show-4', args: 'Yellow number four' },
      { id: 'yellow:show-5', args: 'Yellow number five' }
    ];
    let shortcutItems = [
      {
        sequence: ['Ctrl Y'],
        selector: '*',
        command: 'yellow:show-0',
        args: 'Yellow is best!'
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
