import React, { Component } from 'react'
import Item from './Item'
import { WizardProvider } from './ContextAPI'
import Controls from './Controls'

export default class Wiz extends Component {

  static Provider = WizardProvider
  static Item = Item
  static Controls = Controls

}
