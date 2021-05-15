import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Heading from './Heading'

export default class Article extends Component {
  static propTypes = {
    width: PropTypes.string,
    heading: PropTypes.string.isRequired,
    children: PropTypes.element.isRequired
  }

  get gridClass () {
    return this.props.width === 'full'
      ? 'grid'
      : 'grid md:grid-cols-6 lg:grid-cols-8'
  }

  get colClass () {
    return this.props.width === 'full'
      ? 'col mt-28'
      : 'md:col-start-2 md:col-span-4 lg:col-start-3 lg:col-span-4 mt-28'
  }

  render () {
    return (
      <div className="container mx-auto">
        <div className={this.gridClass}>
          <div className={this.colClass}>
            <Heading text={this.props.heading} />
            {this.props.children}
          </div>
        </div>
      </div>
    )
  }
}
