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
  return container.resolve(greenFactory);
}


let greenFactory: di.IFactory<void> = {
  requires: [IAppShell],
  create: (shell: IAppShell)  => {
    let view = new Widget();
    view.addClass('green-content');
    view.title.text = 'Green';
    shell.addToRightArea(view);
  }
}
