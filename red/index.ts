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
  DelegateCommand
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
    handler.run(container);
  });
}


class RedHandler {

  static requires = [IAppShell, ICommandRegistry];

  static create(shell: IAppShell): RedHandler {
    return new RedHandler(shell);
  }

  constructor(shell: IAppShell) {
    this._shell = shell;
  }

  run(container: Container): void {
    let widget = new Widget();
    widget.addClass('red-content');
    widget.title.text = 'Red';
    this._shell.addToRightArea(widget, { rank: 30 });

    let commands = [
      {
        id: 'demo:red',
        command: new DelegateCommand(() => {
          console.log('Red Command invoked');
        })
      }
    ];
    container.resolve(ICommandRegistry).then(reg => {
      reg.add(commands);
    });
  }

  private _shell: IAppShell;
}
