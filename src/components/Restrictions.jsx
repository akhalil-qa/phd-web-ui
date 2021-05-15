import React, { Component } from 'react'
import PropTypes from 'prop-types'
import util from '../services/util'
import Card from './Card'
import Button from './Button'
import Input from './Input'
import Icon from './Icon'
import TableHeading from './TableHeading'
import TableData from './TableData'
import Select from './Select'

export default class Restrictions extends Component {
  static permissions = [
    '*',
    'ACCESS_COARSE_LOCATION',
    'ACCESS_FINE_LOCATION',
    'CAMERA',
    'RECORD_AUDIO'
  ]

  constructor (props) {
    super(props)
    this.state = {
      permission: '',
      appId: '',
      addRestriction: false
    }
    this.handleAddClick = this.handleAddClick.bind(this)
    this.handleInputChange = this.handleInputChange.bind(this)
    this.handleCreateClick = this.handleCreateClick.bind(this)
    this.handleDeleteClick = this.handleDeleteClick.bind(this)
  }

  static propTypes = {
    restrictions: PropTypes.array.isRequired,
    onCreate: PropTypes.func.isRequired,
    onDelete: PropTypes.func.isRequired
  }

  handleAddClick () {
    this.setState({ addRestriction: true })
  }

  handleInputChange (event) {
    const { name, value } = event.target
    this.setState({ [name]: value })
  }

  handleCreateClick () {
    if (!this.state.permission || !this.state.appId) return
    const restriction = {
      permission: this.state.permission,
      appId: this.state.appId
    }
    this.props.onCreate(restriction)
    this.setState({ permission: '', appId: '' })
  }

  handleDeleteClick (restriction) {
    const confirm = window.confirm('Are you sure to delete the data?')
    if (confirm) this.props.onDelete(restriction)
  }

  restrictionKey (restriction) {
    return restriction._id || util.randomKey()
  }

  get addRestriction () {
    return this.state.addRestriction &&
      <tr>
        <TableData>
          <Select
            name="permission"
            value={this.state.permission}
            options={Restrictions.permissions}
            onChange={this.handleInputChange} />
        </TableData>
        <TableData>
          <Input
            name="appId"
            value={this.state.appId}
            onChange={this.handleInputChange} />
        </TableData>
        <TableData>
          <Icon
            name="add-circle"
            onClick={this.handleCreateClick} />
        </TableData>
      </tr>
  }

  tableRow (restriction) {
    return (
      <tr key={this.restrictionKey(restriction)}>
        <TableData>{restriction.permission}</TableData>
        <TableData>{restriction.appId}</TableData>
        <TableData>
          <Icon
            name="close-circle"
            onClick={() => this.handleDeleteClick(restriction)} />
        </TableData>
      </tr>
    )
  }

  get tableBody () {
    return this.props.restrictions.map(restriction => {
      return this.tableRow(restriction)
    })
  }

  render () {
    return (
      <Card>
        <div className="flex justify-between items-center px-3 py-1">
          <h3 className="text-lg text-gray-800">Restrictions</h3>
          <Button
            text="Add restriction"
            onClick={this.handleAddClick} />
        </div>
        <table className="table-auto w-full text-center">
          <thead>
            <tr>
              <TableHeading text="Permission" />
              <TableHeading text="App ID" />
              <TableHeading text="Action" />
            </tr>
          </thead>
          <tbody>
            {this.addRestriction}
            {this.tableBody}
          </tbody>
        </table>
      </Card>
    )
  }
}
