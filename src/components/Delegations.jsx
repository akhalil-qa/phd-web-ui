import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { map, find, reject, random } from 'lodash'
import Card from './Card'
import Button from './Button'
import DelegationAdd from './DelegationAdd'
import Delegation from './Delegation'

export default class Delegations extends Component {
  static propTypes = {
    delegations: PropTypes.array.isRequired,
    onCreate: PropTypes.func.isRequired,
    onDelete: PropTypes.func.isRequired,
    onChange: PropTypes.func.isRequired
  }

  constructor (props) {
    super(props)
    this.state = {
      addDeligation: false
    }
    this.handleAddClick = this.handleAddClick.bind(this)
    this.handleDeleteClick = this.handleDeleteClick.bind(this)
    this.handleDeleteCoordinateClick = this.handleDeleteCoordinateClick.bind(this)
  }

  handleAddClick () {
    this.setState({ addDeligation: true })
  }

  handleDeleteClick (delegation) {
    const confirm = window.confirm('Are you sure to delete the data?')
    if (confirm) {
      this.props.onDelete(delegation)
    }
  }

  handleDeleteCoordinateClick (delegationId, coordinate) {
    const confirm = window.confirm('Are you sure to delete the data?')
    if (confirm) {
      const delegation = find(this.props.delegations, { _id: delegationId })
      const boundary = reject(delegation.space.boundary, coordinate)
      const coordinates = map(boundary, coordinate => {
        return `${coordinate.latitude},${coordinate.longitude}`
      })
      this.props.onChange(delegationId, coordinates)
    }
  }

  get addDeligation () {
    return this.state.addDeligation &&
      <DelegationAdd onAdd={this.props.onCreate} />
  }

  delegationKey (delegation) {
    return delegation._id || random(0, 0.9)
  }

  get delegations () {
    return this.props.delegations.map(delegation => (
      <Delegation
        delegation={delegation}
        onDeleteClick={this.handleDeleteClick}
        onDeleteCoordinateClick={this.handleDeleteCoordinateClick}
        onChange={this.props.onChange}
        key={this.delegationKey(delegation)} />
    ))
  }

  render () {
    return (
      <Card>
        <div className="flex justify-between items-center px-3 py-1 border-b border-green-200">
          <h3 className="text-lg text-gray-800">Delegations</h3>
          <Button
            text="Add delegation"
            onClick={this.handleAddClick} />
        </div>
        {this.addDeligation}
        {this.delegations}
      </Card>
    )
  }
}
