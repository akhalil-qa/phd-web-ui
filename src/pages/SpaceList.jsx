import React, { Component } from 'react'
import { find, map, reject } from 'lodash'
import store from 'store'
import PropTypes from 'prop-types'
import ApiService from '../services/api'
import AuthorityService from '../services/authority'
import Button from '../components/Button'
import Space from '../components/Space'
import util from '../services/util'

export default class SpaceList extends Component {
  static propTypes = {
    onLogOut: PropTypes.func.isRequired
  }

  constructor (props) {
    super(props)
    this.state = {
      _id: '',
      id: '',
      spaceList: [],
      signature: '',
      timestamp: ''
    }
    this.api = new ApiService()
    this.authority = new AuthorityService()
    this.handleBoundaryChange = this.handleBoundaryChange.bind(this)
    this.handleCreateRestriction = this.handleCreateRestriction.bind(this)
    this.handleDeleteRestriction = this.handleDeleteRestriction.bind(this)
    this.handleCreateDelegation = this.handleCreateDelegation.bind(this)
    this.handleDeleteDelegation = this.handleDeleteDelegation.bind(this)
    this.handleDelegationChange = this.handleDelegationChange.bind(this)
    this.handleLogOutClick = this.handleLogOutClick.bind(this)
    this.handleSaveClick = this.handleSaveClick.bind(this)
  }

  get spaceAuthorityId () {
    return `Space Authority ID: ${this.state.id}`
  }

  generateCoordinates (coordinates) {
    return coordinates.map(coordinate => {
      const latAndLong = coordinate.split(',')
      return {
        latitude: Number(latAndLong[0]),
        longitude: Number(latAndLong[1])
      }
    })
  }

  handleBoundaryChange (spaceId, coordinates) {
    const newBoundary = this.generateCoordinates(coordinates)
    this.setState(state => {
      const spaceList = state.spaceList
      const space = find(spaceList, space => {
        if (space.space._id === spaceId) return space
      })
      if (space) {
        space.space.boundary = map(newBoundary, newCoordinate => {
          const newBoundaryCoordinate = `${newCoordinate.latitude} ${newCoordinate.longitude}`
          map(space.space.boundary, coordinate => {
            const boundaryCoordinate = `${coordinate.latitude} ${coordinate.longitude}`
            const hasCoordinateChange = newBoundaryCoordinate !== boundaryCoordinate
            if (!hasCoordinateChange) {
              newCoordinate._id = coordinate._id
            }
          })
          return newCoordinate
        })
      }
      return { spaceList }
    })
  }

  handleCreateRestriction (spaceId, restriction) {
    const spaceList = this.state.spaceList
    const space = find(spaceList, space => {
      if (space.space._id === spaceId) return space
    })
    space.restrictions.unshift(restriction)
    this.setState({ spaceList })
  }

  handleDeleteRestriction (spaceId, restriction) {
    const spaceList = this.state.spaceList
    map(spaceList, space => {
      const isSpace = (space.space._id === spaceId)
      if (isSpace) space.restrictions = reject(space.restrictions, restriction)
    })
    this.setState({ spaceList })
  }

  handleCreateDelegation (spaceId, delegation) {
    const spaceList = this.state.spaceList
    map(spaceList, space => {
      const isSpace = (space.space._id === spaceId)
      if (isSpace) space.delegations.unshift(delegation)
    })
    this.setState({ spaceList })
  }

  handleDeleteDelegation (spaceId, delegation) {
    const spaceList = this.state.spaceList
    map(spaceList, space => {
      const isSpace = (space.space._id === spaceId)
      if (isSpace) space.delegations = reject(space.delegations, delegation)
    })
    this.setState({ spaceList })
  }

  handleDelegationChange (spaceId, delegationId, coordinates) {
    const newBoundary = this.generateCoordinates(coordinates)
    this.setState(state => {
      const spaceList = state.spaceList
      const space = find(spaceList, space => {
        if (space.space._id === spaceId) return space
      })
      if (space) {
        map(space.delegations, oldDelegation => {
          const isDelegation = (oldDelegation._id === delegationId)
          if (isDelegation) {
            oldDelegation.space.boundary = map(newBoundary, newCoordinate => {
              const newDelegationCoordinate = `${newCoordinate.latitude} ${newCoordinate.longitude}`
              map(oldDelegation.space.boundary, coordinate => {
                const delegationCoordinate = `${coordinate.latitude} ${coordinate.longitude}`
                const hasCoordinateChange = newDelegationCoordinate === delegationCoordinate
                if (hasCoordinateChange) {
                  newCoordinate._id = coordinate._id
                }
              })
              return newCoordinate
            })
          }
          return oldDelegation
        })
      }
      return { spaceList }
    })
  }

  space (space) {
    return <Space
      space={space}
      onBoundaryChange={this.handleBoundaryChange}
      onCreateRestriction={this.handleCreateRestriction}
      onDeleteRestriction={this.handleDeleteRestriction}
      onCreateDelegation={this.handleCreateDelegation}
      onDeleteDelegation={this.handleDeleteDelegation}
      onDelegationChange={this.handleDelegationChange}
      key={space._id} />
  }

  get spaceList () {
    return this.state.spaceList.map(space => this.space(space))
  }

  async handleSaveClick () {
    const privateKey = store.get('privateKey')
    const spaceList = util.populateBoundary(this.state.spaceList)
    console.log(spaceList)
    const signature = await this.authority.sign(spaceList, privateKey)
    console.log(signature)
    if (!signature) return
    const response = await this.api.updateAuthority(this.state.id, spaceList, signature)
    if (response && response.result !== 'fail') {
      store.set('authority', response)
      this.setState(response)
      window.alert('Successfully updated')
    }
  }

  async handleLogOutClick () {
    store.remove('privateKey')
    store.remove('authority')
    this.props.onLogOut()
  }

  get timestamp () {
    return `Timestamp: ${this.state.timestamp}`
  }

  listAuthority () {
    const authority = store.get('authority')
    this.setState(authority)
  }

  componentDidMount () {
    this.listAuthority()
  }

  render () {
    return (
      <div className="container mx-auto">
        <div className="flex justify-between mt-10">
          <p className="text-lg font-medium text-gray-700">{this.spaceAuthorityId}</p>
          <div>
            <Button
              className="px-8 mr-4"
              text="Logout"
              onClick={this.handleLogOutClick} />
            <Button
              className="px-8"
              text="Save"
              onClick={this.handleSaveClick} />
          </div>
        </div>
        <div className="flex justify-between items-baseline my-3">
          <h2 className="text-2xl font-medium">Space List</h2>
          <div className="text-sm text-gray-600">{this.timestamp}</div>
        </div>
        {this.spaceList}
      </div>
    )
  }
}
