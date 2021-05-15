import React, { Component } from 'react'
import PropTypes from 'prop-types'

export default class Button extends Component {
  static propTypes = {
    className: PropTypes.string,
    size: PropTypes.string,
    text: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired
  }

  get className () {
    const sizeClass = (this.props.size === 'large')
      ? 'py-6'
      : 'py-2'
    return `${this.props.className} bg-green-100 border-green-200 px-5 focus:outline-none border-2 focus:border-green-300 rounded ${sizeClass}`
  }

  get style () {
    return { height: 'fit-content' }
  }

  render () {
    return (
      <button
        className={this.className}
        style={this.style}
        onClick={this.props.onClick}>
        {this.props.text}
      </button>
    )
  }
}
