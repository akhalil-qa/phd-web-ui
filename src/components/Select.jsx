import React, { Component } from 'react'
import PropTypes from 'prop-types'

export default class Select extends Component {
  static propTypes = {
    name: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    options: PropTypes.array.isRequired,
    onChange: PropTypes.func.isRequired
  }

  option (option) {
    return (
      <option
        key={option}
        value={option}>
        {option}
      </option>
    )
  }

  get options () {
    return this.props.options.map(option => this.option(option))
  }

  render () {
    return (
      <select
        className="border-green-200 px-2 py-1 focus:outline-none border-2 focus:border-green-300 rounded w-full"
        style={{ height: 36 }}
        name={this.props.name}
        value={this.props.value}
        onChange={this.props.onChange}>
        <option value="" disabled></option>
        {this.options}
      </select>
    )
  }
}
