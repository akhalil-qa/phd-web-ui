import React, { Component } from 'react'
import PropTypes from 'prop-types'

export default class Input extends Component {
  static propTypes = {
    name: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    placeholder: PropTypes.string,
    onChange: PropTypes.func.isRequired
  }

  render () {
    return (
      <input
        className="border-green-200 px-2 py-1 focus:outline-none border-2 focus:border-green-300 rounded w-full"
        name={this.props.name}
        value={this.props.value}
        placeholder={this.props.placeholder}
        onChange={this.props.onChange} />
    )
  }
}
