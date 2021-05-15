import React, { Component } from 'react'
import PropTypes from 'prop-types'

export default class Card extends Component {
  static propTypes = {
    children: PropTypes.oneOfType([
      PropTypes.array.isRequired,
      PropTypes.element.isRequired
    ])
  }

  render () {
    return (
      <div className="rounded my-4 border border-green-200 shadow-md">
        {this.props.children}
      </div>
    )
  }
}
