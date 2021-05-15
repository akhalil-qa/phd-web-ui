import React, { Component, createRef } from 'react'
import PropTypes from 'prop-types'
import { cloneDeep, debounce, map, range, size } from 'lodash'
import util from '../services/util'

export default class Map extends Component {
  static propTypes = {
    coordinates: PropTypes.array.isRequired,
    onChange: PropTypes.func.isRequired
  }

  constructor (props) {
    super(props)
    this.ref = createRef()
  }

  get google () {
    return window.google
  }

  get map () {
    const zoom = 10
    const center = new this.google.maps.LatLng(25.2842531, 51.371566)
    const mapTypeId = this.google.maps.MapTypeId.RoadMap
    const options = { zoom, center, mapTypeId }
    return new this.google.maps.Map(this.ref.current, options)
  }

  get getCoordinates () {
    const coordinates = cloneDeep(this.props.coordinates)
    if (util.isValidCoords(coordinates)) coordinates.pop()
    return coordinates
  }

  initialize () {
    const paths = this.getCoordinates.map(coordinate => new this.google.maps.LatLng(coordinate.latitude, coordinate.longitude))
    const polygon = new this.google.maps.Polygon({
      paths,
      draggable: true,
      editable: true,
      strokeColor: '#00FF00',
      strokeOpacity: 0.8,
      strokeWeight: 2,
      fillColor: '#00FF00',
      fillOpacity: 0.25
    })
    polygon.setMap(this.map)
    const getPolygonCoords = () => {
      const coordinatesCount = polygon.getPath().getLength()
      const coordinates = map(range(coordinatesCount), (count, index) => {
        return polygon.getPath().getAt(index).toUrlValue(5)
      })
      this.props.onChange(coordinates)
    }
    this.google.maps.event.addListener(polygon.getPath(), 'insert_at', debounce(getPolygonCoords, 300))
    this.google.maps.event.addListener(polygon.getPath(), 'set_at', debounce(getPolygonCoords, 300))
  }

  componentDidMount () {
    this.initialize()
  }

  componentDidUpdate (prevProps) {
    const hasCoordinateDeleted = size(this.props.coordinates) < size(prevProps.coordinates)
    if (hasCoordinateDeleted) this.initialize()
  }

  render () {
    return (
      <div
        className="w-full h-56"
        style={{ minWidth: '180px' }}
        ref={this.ref} />
    )
  }
}
