import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Input from './Input'
import Button from './Button'

export default class SpaceListAdd extends Component {
  static propTypes = {
    onAddClick: PropTypes.func.isRequired
  }

  constructor (props) {
    super(props)
    this.state = {
      spaceId: ''
    }
    this.handleInputChange = this.handleInputChange.bind(this)
    this.handleAddClick = this.handleAddClick.bind(this)
  }

  handleInputChange (event) {
    const { name, value } = event.target
    this.setState({ [name]: value })
  }

  handleAddClick () {
    if (!this.state.spaceId) {
      return alert('Please enter a space ID')
    }
    this.props.onAddClick(this.state.spaceId)
  }

  render () {
    return (
      <div className="grid grid-cols-12 gap-4 mt-4">
        <div className="col-span-7 lg:col-span-5">
          <Input
            name="spaceId"
            value={this.state.spaceId}
            placeholder="Enter Space ID"
            onChange={this.handleInputChange} />
        </div>
        <div className="col-span-5 lg:col-span-2">
          <Button
            text="Add space"
            size="small"
            onClick={this.handleAddClick} />
        </div>
      </div>
    )
  }
}
