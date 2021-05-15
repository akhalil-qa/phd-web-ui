import axios from 'axios'

export default class RequestService {
  async getClient () {
    return axios.create({ baseURL: process.env.REACT_APP_BASE_URL })
  }

  handleError (error) {
    const serverError = (error.response && error.response.data.message)
    const message = serverError || error.message
    window.alert(message)
  }

  async get (path) {
    try {
      const client = await this.getClient()
      const response = await client.get(path)
      const { data } = response
      if (data.result === 'fail') window.alert(data.message)
      return response.data
    } catch (error) {
      this.handleError(error)
      return null
    }
  }

  async post (path, body, responseType = 'json') {
    try {
      const client = await this.getClient()
      const config = { responseType }
      const response = await client.post(path, body, config)
      return response.data
    } catch (error) {
      this.handleError(error)
      return null
    }
  }

  async put (path, body) {
    try {
      const client = await this.getClient()
      const response = await client.put(path, body)
      return response.data
    } catch (error) {
      this.handleError(error)
      return null
    }
  }

  async patch (path, body) {
    try {
      const client = await this.getClient()
      const response = await client.patch(path, body)
      return response.data
    } catch (error) {
      this.handleError(error)
      return null
    }
  }

  async delete (path, data) {
    try {
      const client = await this.getClient()
      const response = await client.delete(path, { data })
      return response.data
    } catch (error) {
      this.handleError(error)
      return null
    }
  }
}
