import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { map, reject } from 'lodash'
import util from '../services/util'
import Card from './Card'
import Icon from './Icon'
import Map from './Map'
import TableHeading from './TableHeading'
import TableData from './TableData'

export default class Boundary extends Component {
  static propTypes = {
    boundary: PropTypes.array.isRequired,
    onChange: PropTypes.func.isRequired
  }

  constructor (props) {
    super(props)
    this.handleDeleteClick = this.handleDeleteClick.bind(this)
  }

  handleDeleteClick (coordinate) {
    const confirm = window.confirm('Are you sure to delete the data?')
    if (confirm) {
      const boundary = reject(this.props.boundary, coordinate)
      const coordinates = map(boundary, coordinate => {
        return `${coordinate.latitude},${coordinate.longitude}`
      })
      this.props.onChange(coordinates)
    }
  }

  map (index) {
    return (index === 0) &&
      <TableData rowSpan={this.props.boundary.length}>
        <Map
          coordinates={this.props.boundary}
          onChange={this.props.onChange} />
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
            onClick={() => this.handleDeleteClick(coordinate)} />
        </TableData>
      </tr>
    )
  }

  get tableBody () {
    return this.props.boundary.map((coordinate, index) => this.tableRow(coordinate, index))
  }

  render () {
    return (
      <Card>
        <div className="flex justify-between px-3 py-1">
          <h3 className="text-lg text-gray-800">Boundary</h3>
        </div>
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
    )
  }
}
