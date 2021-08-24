import RequestService from './request'
import util from './util'

export default class ApiService {
  constructor () {
    this.request = new RequestService()
  }

  certifiacteAuthrityRecord () {
    const path = `${process.env.REACT_APP_BASE_URL}/debug/getCertificateAuthorityRecords`
    return this.request.get(path)
  }

  generateKeyPair () {
    const path = `${process.env.REACT_APP_BASE_URL}/debug/generateKeyPair`
    return this.request.get(path)
  }

  registerKey (authorityId, publicKey) {
    const path = `${process.env.REACT_APP_BASE_URL}/registerKey`
    const body = { authorityId, publicKey }
    return this.request.post(path, body)
  }

  sign (message, privateKey) {
    const path = `${process.env.REACT_APP_BASE_URL}/debug/sign`
    const needStringify = typeof message !== 'string'
    message = needStringify ? JSON.stringify(message) : message
    const body = { message, privateKey }
    return this.request.post(path, body)
  }

  registerAuthority (authorityId, signature) {
    const path = `${process.env.REACT_APP_BASE_URL}/registerAuthority`
    const body = { authorityId, signature }
    return this.request.post(path, body)
  }

  loginAuthority (authorityId, timestamp, signature) {
    const path = `${process.env.REACT_APP_BASE_URL}/loginAuthority`
    timestamp = JSON.stringify(timestamp)
    const body = { authorityId, timestamp, signature }
    return this.request.post(path, body)
  }

  updateAuthority (authorityId, spaceList, signature) {
    spaceList = util.populateBoundary(spaceList)
    spaceList = JSON.stringify(spaceList)
    const path = `${process.env.REACT_APP_BASE_URL}/updateAuthority`
    const body = { authorityId, spaceList, signature }
    return this.request.post(path, body)
  }
}
