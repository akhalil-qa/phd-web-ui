import { AES, enc } from 'crypto-js'

export default {
  encrypt (message, passphrase) {
    return AES.encrypt(message, passphrase).toString()
  },

  decrypt (cipher, passphrase) {
    try {
      const bytes = AES.decrypt(cipher, passphrase)
      return bytes.toString(enc.Utf8)
    } catch (error) {
      alert('Cannot decrypt private key.')
    }
  }
}
