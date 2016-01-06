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
  return container.resolve(YellowHandler).then(handler => {
    handler.run(container);
  });
}


class YellowHandler {

  static requires = [IAppShell, ICommandRegistry];

  static create(shell: IAppShell): YellowHandler {
    return new YellowHandler(shell);
  }

  constructor(shell: IAppShell) {
    this._shell = shell;
  }

  run(container: Container): void {
    let widget = new Widget();
    widget.addClass('yellow-content');
    widget.title.text = 'Yellow';
    this._shell.addToLeftArea(widget, { rank: 20 });

    let commands = [
      {
        id: 'demo:yellow',
        command: new DelegateCommand(() => {
          console.log('Yellow Command Called');
        })
      }
    ];
    container.resolve(ICommandRegistry).then(reg => {
      reg.add(commands);
    });
  }

  private _shell: IAppShell;
}
