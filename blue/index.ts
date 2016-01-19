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
  return container.resolve(BlueHandler).then(handler => {
    handler.run();
  });
}


class BlueHandler {

  static requires = [IAppShell, ICommandRegistry];

  static create(shell: IAppShell, commands: ICommandRegistry): BlueHandler {
    return new BlueHandler(shell, commands);
  }

  constructor(shell: IAppShell, commands: ICommandRegistry) {
    this._shell = shell;
    this._commandRegistry = commands;
  }

  run(): void {
    let widget = new Widget();
    widget.addClass('blue-content');
    widget.title.text = 'Blue';
    this._shell.addToLeftArea(widget, { rank: 10 });

    this._commandRegistry.add('demo:blue', () => {
      console.log('Blue invoked.');
    });
  }

  private _shell: IAppShell;
  private _commandRegistry: ICommandRegistry;
}
