import ApiService from './api'
import testData from '../test.data.json'

export default class AuthorityService {
  constructor () {
    this.api = new ApiService()
  }

  generateKeypair (authorityId) {
    // TODO Generate Keypair
    return {
      publicKey: testData.publicKey,
      privateKey: testData.privateKey
    }
  }

  async sign (message, privateKey) {
    const signature = await this.api.sign(message, privateKey)
    if (signature && signature.result === 'fail') return null
    return signature
  }
}
