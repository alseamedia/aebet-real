'use babel';

import AebetRealView from './aebet-real-view';
import { CompositeDisposable } from 'atom';

export default {

  aebetRealView: null,
  modalPanel: null,
  subscriptions: null,

  activate(state) {
    this.aebetRealView = new AebetRealView(state.aebetRealViewState);
    this.modalPanel = atom.workspace.addModalPanel({
      item: this.aebetRealView.getElement(),
      visible: false
    });

    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'aebet-real:toggle': () => this.toggle()
    }));
  },

  deactivate() {
    this.modalPanel.destroy();
    this.subscriptions.dispose();
    this.aebetRealView.destroy();
  },

  serialize() {
    return {
      aebetRealViewState: this.aebetRealView.serialize()
    };
  },

  toggle() {
    console.log('AebetReal was toggled!');
    return (
      this.modalPanel.isVisible() ?
      this.modalPanel.hide() :
      this.modalPanel.show()
    );
  }

};
