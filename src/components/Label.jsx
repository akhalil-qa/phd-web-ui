import React, { Component } from 'react'
import PropTypes from 'prop-types'

export default class Label extends Component {
  static propTypes = {
    text: PropTypes.string.isRequired
  }

  render () {
    return (
      <label className="text-base tracking-wide text-gray-700 text-xs font-bold">
        {this.props.text}
      </label>
    )
  }
}
