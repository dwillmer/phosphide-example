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
  return container.resolve(GreenHandler).then(handler => {
    handler.run(container);
  });
}


class GreenHandler {

  static requires = [IAppShell, ICommandRegistry];

  static create(shell: IAppShell): GreenHandler {
    return new GreenHandler(shell);
  }

  constructor(shell: IAppShell) {
    this._shell = shell;
  }

  run(container: Container): void {
    let widget = new Widget();
    widget.addClass('green-content');
    widget.title.text = 'Green';
    this._shell.addToRightArea(widget, { rank: 40 });

    let commands = [
      {
        id: 'demo:green',
        command: new DelegateCommand(() => {
          console.log('Green Command Called');
        })
      }
    ];
    container.resolve(ICommandRegistry).then(reg => {
      reg.add(commands);
    });
  }

  private _shell: IAppShell;
}
