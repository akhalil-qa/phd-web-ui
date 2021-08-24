import ApiService from './api'
import aes from './aes'

export default class AuthorityService {
  constructor () {
    this.api = new ApiService()
  }

  async generateKeypair (passphrase) {
    const { publicKey, privateKey } = await this.api.generateKeyPair()
    const encryptedPrivateKey = aes.encrypt(privateKey, passphrase)
    return {
      publicKey,
      privateKey: encryptedPrivateKey
    }
  }

  async sign (message, passphrase, privateKey) {
    const decryptedPrivateKey = aes.decrypt(privateKey, passphrase)
    const signature = await this.api.sign(message, decryptedPrivateKey)
    if (signature && signature.result === 'fail') return null
    return signature
  }
}
