import React, { Component } from 'react'
import PropTypes from 'prop-types'

export default class Heading extends Component {
  static propTypes = {
    text: PropTypes.string.isRequired
  }

  render () {
    return (
      <h2 className="text-2xl text-center mb-10">
        {this.props.text}
      </h2>
    )
  }
}
