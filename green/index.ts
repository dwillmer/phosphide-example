/*-----------------------------------------------------------------------------
| Copyright (c) 2014-2015, PhosphorJS Contributors
|
| Distributed under the terms of the BSD 3-Clause License.
|
| The full license is in the file LICENSE, distributed with this software.
|----------------------------------------------------------------------------*/
'use strict';

import {
  IAppShell, ICommandRegistry
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


class GreenHandler {

  static requires = [IAppShell, ICommandRegistry];

  static create(shell: IAppShell, commands: ICommandRegistry): GreenHandler {
    return new GreenHandler(shell, commands);
  }

  constructor(shell: IAppShell, commands: ICommandRegistry) {
    this._shell = shell;
    this._commandRegistry = commands;
  }

  run(): void {
    let widget = new Widget();
    widget.addClass('green-content');
    widget.title.text = 'Green';
    this._shell.addToRightArea(widget, { rank: 40 });

    this._commandRegistry.add('demo:green', () => {
      console.log('Green invoked.');
    });
  }

  private _shell: IAppShell;
  private _commandRegistry: ICommandRegistry;
}
