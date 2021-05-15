import React, { Component, createRef, Fragment } from 'react'
import PropTypes from 'prop-types'
import ApiService from '../services/api'
import AuthorityService from '../services/authority'
import Article from '../components/Article'
import Label from '../components/Label'
import Input from '../components/Input'
import Textarea from '../components/Textarea'
import Button from '../components/Button'

export default class Register extends Component {
  static propTypes = {
    onRegister: PropTypes.func.isRequired,
    onBackClick: PropTypes.func.isRequired
  }

  constructor (props) {
    super(props)
    this.state = {
      id: '',
      privateKey: ''
    }
    this.api = new ApiService()
    this.authority = new AuthorityService()
    this.fileInputRef = createRef()
    this.handleInputChange = this.handleInputChange.bind(this)
    this.handleFileInputChange = this.handleFileInputChange.bind(this)
    this.handleBrowseClick = this.handleBrowseClick.bind(this)
    this.handleRegisterClick = this.handleRegisterClick.bind(this)
  }

  handleInputChange (event) {
    const { name, value } = event.target
    this.setState({ [name]: value })
  }

  handleFileInputChange (event) {
    const { files } = event.target
    const file = files[0]
    const reader = new FileReader()
    reader.onload = event => {
      const { result } = event.target
      this.setState({ privateKey: result })
      this.fileInputRef.current.value = ''
    }
    if (file) reader.readAsText(file)
  }

  handleBrowseClick () {
    this.fileInputRef.current.click()
  }

  async handleRegisterClick () {
    const { id, privateKey } = this.state
    const signature = await this.authority.sign(id, privateKey)
    if (!signature) return
    const response = await this.api.registerAuthority(id, signature)
    if (response && response.result === 'success') {
      window.alert('Successfully registered')
      this.props.onRegister()
    }
  }

  render () {
    return (
      <Article heading="Register Space Authority">
        <Fragment>
          <div className="grid grid-cols-2 sm:grid-cols-8 gap-4 mb-4">
            <div className="sm:col-span-3">
              <Label text="Space Authority ID" />
            </div>
            <div className="sm:col-span-5">
              <Input
                name="id"
                value={this.state.id}
                onChange={this.handleInputChange} />
            </div>
            <div className="sm:col-span-3">
              <Label text="Private Key" />
            </div>
            <div className="sm:col-span-5">
              <Textarea
                name="privateKey"
                value={this.state.privateKey}
                onChange={this.handleInputChange} />
            </div>
          </div>
          <div className="flex justify-end">
            <Button
              className="mr-4"
              text="Back"
              onClick={this.props.onBackClick} />
            <input
              type="file"
              ref={this.fileInputRef}
              accept=".txt"
              multiple={false}
              onChange={this.handleFileInputChange}
              style={{ width: 0, height: 0 }} />
            <Button
              className="mr-4"
              text="Browse private key"
              onClick={this.handleBrowseClick} />
            <Button
              text="Register"
              onClick={this.handleRegisterClick} />
          </div>
        </Fragment>
      </Article>
    )
  }
}
