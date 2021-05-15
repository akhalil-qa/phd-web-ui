import React, { Component } from 'react'
import PropTypes from 'prop-types'

export default class Icon extends Component {
  static propTypes = {
    name: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired
  }

  get className () {
    return `ri-${this.props.name}-line text-2xl cursor-pointer text-gray-700`
  }

  render () {
    return <i
      className={this.className}
      onClick={this.props.onClick} />
  }
}
