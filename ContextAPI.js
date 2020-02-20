import React, { Component, createContext } from 'react'
import Presentation from './Presentation'

const initialState = {
  wizards: [],
  activeWizardId: null,
  activeItemId: null,
  completed: [],
  item: {},
}

const WizardContext = createContext(initialState)
const WizardConsumer = WizardContext.Consumer

class WizardProvider extends Component {

  items = {}

  state = {
    ...initialState,
    setActiveItemId: (id) => {
      this.setState(prevState => ({ activeItemId: id }))
    },
    setItem: (item) => {
      this.setState(prevState => ({ item }))
    },
    create: (wizard) => {
      return new Promise(resolve => {
        let wizards = [ ...this.state.wizards ]
        let index = wizards.findIndex(x => x.id === wizard.id)
        if (index !== -1) wizards.splice(index, 1)
        wizards.push({
          id: wizard.id,
          items: wizard.items
        })
        this.setState(prevState => ({ wizards }), resolve)
      })
    },
    play: (wizardId) => {
      let wizards = [ ...this.state.wizards ]
      let wizardIndex = wizards.findIndex(x => x.id === wizardId)
      if (wizardIndex === -1) {
        alert(`Wizard "${wizardId}" not found`)
        return
      }
      this.setState(prevState => ({ activeWizardId: wizardId }))
      this.state.setActiveItemId(wizards[wizardIndex].items[0])
    },
    next: () => {
      if (this.state.activeWizardId && this.state.activeItemId) {
        let { activeWizardId, activeItemId } = this.state
        let wizards = [ ...this.state.wizards ]
        let wizardIndex = wizards.findIndex(x => x.id === activeWizardId)
        let itemIndex = wizards[wizardIndex].items.indexOf(activeItemId)
        let itemId = wizards[wizardIndex].items[itemIndex+1]
        if (itemId) {
          this.state.setActiveItemId(wizards[wizardIndex].items[itemIndex+1])
        } else {
          this.state.complete(activeWizardId)
        }
      }
    },
    complete: (wizardId) => {
      let completed = [ ...this.state.completed ]
      completed.push(wizardId)
      this.setState(prevState => ({
        activeWizardId: null,
        activeItemId: null,
        completed: completed
      }))
    }
  }

  render() {
    return (
      <WizardContext.Provider value={this.state}>
        {this.props.children}
        <Presentation
          activeItemId={this.state.activeItemId}
          item={this.state.item} />
      </WizardContext.Provider>
    )
  }

}

export {
  WizardProvider,
  WizardContext
}
