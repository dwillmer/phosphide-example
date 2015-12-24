/*-----------------------------------------------------------------------------
| Copyright (c) 2014-2015, PhosphorJS Contributors
|
| Distributed under the terms of the BSD 3-Clause License.
|
| The full license is in the file LICENSE, distributed with this software.
|----------------------------------------------------------------------------*/
'use strict';

import {
  IAppShell
} from 'phosphide';

import * as di
  from 'phosphor-di';

import {
  Widget
} from 'phosphor-widget';


export
function resolve(container: di.Container): Promise<void> {
  return container.resolve(blueFactory);
}


let blueFactory: di.IFactory<void> = {
  requires: [IAppShell],
  create: (shell: IAppShell)  => {
    console.log('in blue factory');
    let view = new Widget();
    view.addClass('blue-content');
    view.title.text = 'Blue';
    shell.addToRightArea(view);
  }
}
