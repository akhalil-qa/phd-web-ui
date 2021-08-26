import React, { Component } from 'react'
import PropTypes from 'prop-types'
import util from '../services/util'
import Card from './Card'
import Input from './Input'
import Icon from './Icon'
import TableData from './TableData'
import TableHeading from './TableHeading'

export default class DelegationAdd extends Component {
  static propTypes = {
    onAdd: PropTypes.func.isRequired
  }

  constructor (props) {
    super(props)
    this.state = {
      spaceId: '',
      delegatorId: ''
    }
    this.handleInputChange = this.handleInputChange.bind(this)
    this.handleAddClick = this.handleAddClick.bind(this)
  }

  handleInputChange (event) {
    const { name, value } = event.target
    this.setState({ [name]: value })
  }

  handleAddClick () {
    const { spaceId, delegatorId } = this.state
    if (!spaceId || !delegatorId) return
    const delegation = {
      delegator: delegatorId,
      space: {
        id: spaceId,
        boundary: util.defaultCoords()
      }
    }
    this.props.onAdd(delegation)
    this.setState({ spaceId: '', delegatorId: '' })
  }

  render () {
    return (
      <div className="px-4">
        <Card>
          <table className="table-auto w-full text-center">
            <thead>
              <tr>
                <TableHeading text="Space ID" />
                <TableHeading text="Delegator ID" />
                <TableHeading text="Action" />
              </tr>
            </thead>
            <tbody>
              <tr>
                <TableData>
                  <Input
                    name="spaceId"
                    value={this.state.spaceId}
                    onChange={this.handleInputChange} />
                </TableData>
                <TableData>
                  <Input
                    name="delegatorId"
                    value={this.state.delegatorId}
                    onChange={this.handleInputChange} />
                </TableData>
                <TableData>
                  <Icon
                    name="add-circle"
                    onClick={this.handleAddClick} />
                </TableData>
              </tr>
            </tbody>
          </table>
        </Card>
      </div>
    )
  }
}
