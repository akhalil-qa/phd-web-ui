import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Icon from './Icon'

export default class SpaceToggle extends Component {
  static propTypes = {
    active: PropTypes.bool.isRequired,
    onToggle: PropTypes.func.isRequired
  }

  get name () {
    return this.props.active
      ? 'arrow-down-circle'
      : 'arrow-right-circle'
  }

  render () {
    return <Icon
      name={this.name}
      onClick={this.props.onToggle} />
  }
}
