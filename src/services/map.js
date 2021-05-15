import { Loader } from 'google-maps'

export default {
  async init () {
    const loader = new Loader(process.env.REACT_APP_GOOGLE_API, {})
    const google = await loader.load()
    window.google = google
  }
}
