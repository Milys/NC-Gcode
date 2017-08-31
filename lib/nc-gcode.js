'use babel';

import NcGcodeView from './nc-gcode-view';
import { CompositeDisposable } from 'atom';

export default {

  ncGcodeView: null,
  modalPanel: null,
  subscriptions: null,

  activate(state) {
    this.ncGcodeView = new NcGcodeView(state.ncGcodeViewState);
    this.modalPanel = atom.workspace.addModalPanel({
      item: this.ncGcodeView.getElement(),
      visible: false
    });

    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'nc-gcode:toggle': () => this.toggle()
    }));
  },

  deactivate() {
    this.modalPanel.destroy();
    this.subscriptions.dispose();
    this.ncGcodeView.destroy();
  },

  serialize() {
    return {
      ncGcodeViewState: this.ncGcodeView.serialize()
    };
  },

  toggle() {
    console.log('NcGcode was toggled!');
    return (
      this.modalPanel.isVisible() ?
      this.modalPanel.hide() :
      this.modalPanel.show()
    );
  }

};
