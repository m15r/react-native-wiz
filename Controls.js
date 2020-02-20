import React, { Component } from 'react'
import { WizardContext } from './ContextAPI'

export default class Controls extends Component {

  static contextType = WizardContext
  completed = false

  componentDidMount() {
    if (!this.props.id) {
      console.warn('Wizard.Controls "id" prop is missing')
      return
    }
    this.createFromProps()
  }

  componentDidUpdate(prevProps, prevState) {
    if (!this.completed && this.context.completed.includes(this.props.id)) {
      this.completed = true
      if (typeof this.props.onComplete === 'function') {
        this.props.onComplete()
      }
    }
  }

  createFromProps = async () => {
    const { id, items, autoPlay } = this.props
    if (id && items) {
      // Create new Wizard if items prop is also provided
      await this.context.create({ id, items })
      if (autoPlay && autoPlay === true) this.play(id)
    }
  }

  // Functions accessible through Ref

  play = (wizardId) => {
    this.context.play(wizardId)
  }

  next = this.context.next

  render() { return null }

}
