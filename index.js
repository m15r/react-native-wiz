import React, { Component } from 'react'
import Provider from './src/Provider'
import WizView from './src/WizView'

export default class Wiz extends Component {

  static Provider = Provider
  static View = WizView

}
