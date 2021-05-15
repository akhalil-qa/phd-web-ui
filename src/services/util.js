import { cloneDeep, every, first, forEach, last, random } from 'lodash'

export default {
  randomKey () {
    return random(0.9)
  },

  isValidCoords (coordinates) {
    const firstCoord = first(coordinates)
    const lastCoord = last(coordinates)
    return every([
      firstCoord.latitude === lastCoord.latitude,
      firstCoord.longitude === lastCoord.longitude
    ])
  },

  payloadCoordinates (coordinates) {
    const firstCoord = cloneDeep(first(coordinates))
    if (!this.isValidCoords(coordinates)) {
      delete firstCoord._id
      coordinates.push(firstCoord)
    }
    return coordinates
  },

  defaultCoords () {
    return [
      {
        latitude: '25.31126',
        longitude: '51.49516'
      },
      {
        latitude: '25.31638',
        longitude: '51.40006'
      },
      {
        latitude: '25.23456',
        longitude: '51.40383'
      },
      {
        latitude: '25.22696',
        longitude: '51.5058'
      },
      {
        latitude: '25.31126',
        longitude: '51.49516'
      }
    ]
  },

  populateBoundary (spaceList) {
    spaceList = cloneDeep(spaceList)
    forEach(spaceList, spaceListItem => {
      const { boundary } = spaceListItem.space
      spaceListItem.space.boundary = this.payloadCoordinates(boundary)
      forEach(spaceListItem.delegations, delegation => {
        const { boundary } = delegation.space
        delegation.space.boundary = this.payloadCoordinates(boundary)
      })
    })
    return spaceList
  }
}
