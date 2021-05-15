import React, { Component } from 'react'
import PropTypes from 'prop-types'

export default class TableData extends Component {
  static propTypes = {
    className: PropTypes.string,
    children: PropTypes.any,
    rowSpan: PropTypes.number
  }

  get className () {
    return `border border-green-200 break-all ${this.props.className}`
  }

  render () {
    return (
      <td
        className={this.className}
        rowSpan={this.props.rowSpan}>
        {this.props.children}
      </td>
    )
  }
}
