import React, { Component } from 'react'
import PropTypes from 'prop-types'

export default class TableHeading extends Component {
  static propTypes = {
    text: PropTypes.string.isRequired
  }

  render () {
    return (
      <th className="border border-green-200 sm:whitespace-nowrap sm:px-4">
        {this.props.text}
      </th>
    )
  }
}
