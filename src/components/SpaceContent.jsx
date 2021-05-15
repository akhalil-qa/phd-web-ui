import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Boundary from './Boundary'
import Restrictions from './Restrictions'
import Delegations from './Delegations'

export default class SpaceContent extends Component {
  static propTypes = {
    active: PropTypes.bool.isRequired,
    space: PropTypes.object.isRequired,
    onBoundaryChange: PropTypes.func.isRequired,
    onCreateRestriction: PropTypes.func.isRequired,
    onDeleteRestriction: PropTypes.func.isRequired,
    onCreateDelegation: PropTypes.func.isRequired,
    onDeleteDelegation: PropTypes.func.isRequired,
    onDelegationChange: PropTypes.func.isRequired
  }

  render () {
    return this.props.active && (
      <div className="border-t border-green-200 px-6 py-5">
        <Boundary
          boundary={this.props.space.space.boundary}
          onChange={this.props.onBoundaryChange} />
        <Restrictions
          restrictions={this.props.space.restrictions}
          onCreate={this.props.onCreateRestriction}
          onDelete={this.props.onDeleteRestriction} />
        <Delegations
          delegations={this.props.space.delegations}
          onCreate={this.props.onCreateDelegation}
          onDelete={this.props.onDeleteDelegation}
          onChange={this.props.onDelegationChange} />
      </div>
    )
  }
}
