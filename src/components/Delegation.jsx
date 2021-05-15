import React, { Component } from 'react'
import PropTypes from 'prop-types'
import util from '../services/util'
import Card from './Card'
import Icon from './Icon'
import Map from './Map'
import TableData from './TableData'
import TableHeading from './TableHeading'

export default class Delegation extends Component {
  static propTypes = {
    delegation: PropTypes.object.isRequired,
    onDeleteClick: PropTypes.func.isRequired,
    onDeleteCoordinateClick: PropTypes.func.isRequired,
    onChange: PropTypes.func.isRequired
  }

  constructor (props) {
    super(props)
    this.handleChange = this.handleChange.bind(this)
  }

  handleChange (coordinates) {
    this.props.onChange(this.props.delegation._id, coordinates)
  }

  map (index) {
    return (index === 0) &&
      <TableData rowSpan={this.props.delegation.space.boundary.length}>
        <Map
          coordinates={this.props.delegation.space.boundary}
          onChange={this.handleChange} />
      </TableData>
  }

  coordinateKey (coordinate) {
    return coordinate._id || util.randomKey()
  }

  tableRow (coordinate, index) {
    return (
      <tr key={this.coordinateKey(coordinate)}>
        <TableData>{coordinate.latitude}</TableData>
        <TableData>{coordinate.longitude}</TableData>
        {this.map(index)}
        <TableData>
          <Icon
            name="close-circle"
            onClick={() => this.props.onDeleteCoordinateClick(this.props.delegation._id, coordinate)} />
        </TableData>
      </tr>
    )
  }

  get tableBody () {
    return this.props.delegation.space.boundary.map((coordinate, index) => {
      return this.tableRow(coordinate, index)
    })
  }

  render () {
    return (
      <div className="px-4" key={this.props.delegation._id}>
        <Card>
          <div className="flex justify-between items-center px-3 py-1 border-b border-green-200">
            <h3 className="text-lg text-gray-800">{this.props.delegation.space.id}</h3>
            <div className="inline-flex items-center">
              <p className="mr-4">Delegator: {this.props.delegation.delegator}</p>
              <Icon
                name="close-circle"
                onClick={() => this.props.onDeleteClick(this.props.delegation)} />
            </div>
          </div>
          <div className="px-3 py-1">Boundary</div>
          <table className="table-auto w-full text-center">
            <thead>
              <tr>
                <TableHeading text="Latitude" />
                <TableHeading text="Longitude" />
                <TableHeading text="Map" />
                <TableHeading text="Action" />
              </tr>
            </thead>
            <tbody>
              {this.tableBody}
            </tbody>
          </table>
        </Card>
      </div>
    )
  }
}
