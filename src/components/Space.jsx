import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Card from './Card'
import SpaceToggle from './SpaceToggle'
import SpaceContent from './SpaceContent'

export default class Space extends Component {
  static propTypes = {
    space: PropTypes.object.isRequired,
    onBoundaryChange: PropTypes.func.isRequired,
    onCreateRestriction: PropTypes.func.isRequired,
    onDeleteRestriction: PropTypes.func.isRequired,
    onCreateDelegation: PropTypes.func.isRequired,
    onDeleteDelegation: PropTypes.func.isRequired,
    onDelegationChange: PropTypes.func.isRequired
  }

  constructor (props) {
    super(props)
    this.state = {
      active: false
    }
    this.handleToggle = this.handleToggle.bind(this)
    this.handleBoundaryChange = this.handleBoundaryChange.bind(this)
    this.handleCreateRestriction = this.handleCreateRestriction.bind(this)
    this.handleDeleteRestriction = this.handleDeleteRestriction.bind(this)
    this.handleCreateDelegation = this.handleCreateDelegation.bind(this)
    this.handleDeleteDelegation = this.handleDeleteDelegation.bind(this)
    this.handleDelegationChange = this.handleDelegationChange.bind(this)
  }

  handleToggle () {
    this.setState(state => {
      return { active: !state.active }
    })
  }

  handleBoundaryChange (coordinates) {
    this.props.onBoundaryChange(this.props.space.space._id, coordinates)
  }

  handleCreateRestriction (restriction) {
    this.props.onCreateRestriction(this.props.space.space._id, restriction)
  }

  handleDeleteRestriction (restriction) {
    this.props.onDeleteRestriction(this.props.space.space._id, restriction)
  }

  handleCreateDelegation (delegation) {
    this.props.onCreateDelegation(this.props.space.space._id, delegation)
  }

  handleDeleteDelegation (delegation) {
    this.props.onDeleteDelegation(this.props.space.space._id, delegation)
  }

  handleDelegationChange (delegationId, coordinates) {
    this.props.onDelegationChange(this.props.space.space._id, delegationId, coordinates)
  }

  render () {
    return (
      <Card>
        <div className="px-6 py-3">
          <div className="flex justify-between">
            <div className="flex justify-between items-center w-full">
              <div className="text-lg">{this.props.space.space.id}</div>
            </div>
            <div className="ml-10">
              <SpaceToggle
                active={this.state.active}
                onToggle={this.handleToggle} />
            </div>
          </div>
        </div>
        <SpaceContent
          active={this.state.active}
          space={this.props.space}
          onBoundaryChange={this.handleBoundaryChange}
          onCreateRestriction={this.handleCreateRestriction}
          onDeleteRestriction={this.handleDeleteRestriction}
          onCreateDelegation={this.handleCreateDelegation}
          onDeleteDelegation={this.handleDeleteDelegation}
          onDelegationChange={this.handleDelegationChange} />
      </Card>
    )
  }
}
