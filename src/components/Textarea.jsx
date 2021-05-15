import React, { Component } from 'react'
import PropTypes from 'prop-types'

export default class Textarea extends Component {
  static propTypes = {
    name: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired
  }

  render () {
    return (
      <textarea
        className="border-green-200 px-2 py-1 focus:outline-none border-2 focus:border-green-300 rounded w-full"
        rows="4"
        name={this.props.name}
        value={this.props.value}
        onChange={this.props.onChange} />
    )
  }
}
