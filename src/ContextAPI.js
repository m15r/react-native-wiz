import React, { Component, createContext } from 'react'
import Presentation from './Presentation'

const initialState = {
  activeItemId: null,
  completed: [],
  item: {},
}

const WizContext = createContext(initialState)

class Provider extends Component {

  activeWiz = null
  registered = {}

  state = {
    ...initialState,
    setItemComponent: (item) => {
      this.setState(prevState => ({ item }))
    },
    register: ({ wiz, id, queue, autoPlay }) => {
      if (typeof this.registered[wiz] !== 'object') this.registered[wiz] = []
      let index = this.registered[wiz].findIndex(x => x.id === id)
      if (index === -1) {
        this.registered[wiz].push({ id, queue, autoPlay })
        if (queue !== 0) {
          this.registered[wiz].sort((a, b) => a.queue - b.queue)
        }
        console.warn(this.registered)
      } else {
        console.warn(`Wiz: duplicate item "${id}"`)
      }
    },
    play: (wiz, id = null) => {
      if (this.registered[wiz] && this.activeWiz === null) {
        // Make sure Wiz isn't already in progress
        if (id === null) {
          let item = this.registered[wiz].find(x => x.autoPlay === true)
          this.activeWiz = wiz
          this.setState(prevState => ({ activeItemId: item.id }))
        } else {
          let item = this.registered[wiz].find(x => x.id === id)
          if (item) {
            this.activeWiz = wiz
            this.setState(prevState => ({ activeItemId: item.id }))
          } else {
            console.warn(`Wiz: Item "${id}" not found`)
          }
        }
      } else {
        console.warn(`Wiz: Wiz "${wiz}" not found`)
      }
    },
    next: () => {
      if (wiz = this.activeWiz) {
        let index = this.registered[wiz].findIndex(x => x.id == this.state.activeItemId)
        if (item = this.registered[wiz][index+1]) {
          this.setState(prevState => ({ activeItemId: item.id }))
        } else {
          this.state.complete(wiz)
        }
      } else {
        console.warn('Wiz: No Wiz is currently active')
      }
    },
    complete: (wiz) => {
      this.activeWiz = null
      this.setState(prevState => ({ activeItemId: null }))
    }
  }

  render() {
    return (
      <WizContext.Provider value={this.state}>
        {this.props.children}
        <Presentation
          activeItemId={this.state.activeItemId}
          item={this.state.item} />
      </WizContext.Provider>
    )
  }

}

export {
  Provider,
  WizContext
}
