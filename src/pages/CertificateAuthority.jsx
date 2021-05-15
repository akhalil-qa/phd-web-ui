import React, { Component, createRef, Fragment } from 'react'
import PropTypes from 'prop-types'
import ApiService from '../services/api'
import AuthorityService from '../services/authority'
import Article from '../components/Article'
import Card from '../components/Card'
import Label from '../components/Label'
import Input from '../components/Input'
import Textarea from '../components/Textarea'
import Button from '../components/Button'
import TableHeading from '../components/TableHeading'
import TableData from '../components/TableData'

export default class CertificateAuthority extends Component {
  static propTypes = {
    onBackClick: PropTypes.func.isRequired
  }

  constructor (props) {
    super(props)
    this.state = {
      records: [],
      authorityId: '',
      publicKey: '',
      privateKey: ''
    }
    this.api = new ApiService()
    this.authority = new AuthorityService()
    this.downloadRef = createRef()
    this.handleInputChange = this.handleInputChange.bind(this)
    this.handleGenerateKeypairClick = this.handleGenerateKeypairClick.bind(this)
    this.handleRegisterClick = this.handleRegisterClick.bind(this)
  }

  handleInputChange (event) {
    const { name, value } = event.target
    this.setState({ [name]: value })
  }

  handleGenerateKeypairClick () {
    const { publicKey, privateKey } = this.authority.generateKeypair(this.state.authorityId)
    this.setState({ publicKey, privateKey }, () => {
      this.downloadRef.current.click()
    })
  }

  async handleRegisterClick () {
    const { authorityId, publicKey } = this.state
    const response = await this.api.registerKey(authorityId, publicKey)
    if (response && response.response === 'success') {
      this.setState({ authorityId: '', publicKey: '', privateKey: '' })
      this.listRecords()
      window.alert('Successfully registered')
    }
  }

  tableRow (record) {
    return (
      <tr key={record._id}>
        <TableData>{record.authorityId}</TableData>
        <TableData className="text-left text-xs">
          {record.publicKey}
        </TableData>
      </tr>
    )
  }

  get tableBody () {
    return this.state.records.map(record => this.tableRow(record))
  }

  async listRecords () {
    const records = await this.api.certifiacteAuthrityRecord()
    this.setState({ records })
  }

  componentDidMount () {
    this.listRecords()
  }

  render () {
    return (
      <Article
        width="full"
        heading="Certificate Authority">
        <Fragment>
          <Card>
            <h3 className="text-lg font-medium px-4 my-2">Records</h3>
            <table className="table-auto w-full text-center">
              <thead>
                <tr>
                  <TableHeading text="Space Authority" />
                  <TableHeading text="Public Key" />
                </tr>
              </thead>
              <tbody>
                {this.tableBody}
              </tbody>
            </table>
          </Card>
          <div className="grid md:grid-cols-6 lg:grid-cols-8 my-16">
            <div className="md:col-start-2 md:col-span-4 lg:col-start-3 lg:col-span-4">
              <h3 className="text-xl font-medium mb-8 text-center">
                Register entity with Certificate Authority
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-8 gap-4 mb-4">
                <div className="sm:col-span-3">
                  <Label text="Space Authority ID" />
                </div>
                <div className="sm:col-span-5">
                  <Input
                    name="authorityId"
                    value={this.state.authorityId}
                    onChange={this.handleInputChange} />
                </div>
                <div className="sm:col-span-3">
                  <Label text="Public Key" />
                </div>
                <div className="sm:col-span-5">
                  <Textarea
                    name="publicKey"
                    value={this.state.publicKey}
                    onChange={this.handleInputChange} />
                </div>
              </div>
              <div className="flex justify-end">
                <Button
                  className="mr-4"
                  text="Back"
                  onClick={this.props.onBackClick} />
                <a
                  ref={this.downloadRef}
                  href={`data:text/plain;charset=UTF-8,${this.state.privateKey}`}
                  download="privateKey" />
                <Button
                  className="mr-4"
                  text="Generate keypair"
                  onClick={this.handleGenerateKeypairClick} />
                <Button
                  text="Register"
                  onClick={this.handleRegisterClick} />
              </div>
            </div>
          </div>
        </Fragment>
      </Article>
    )
  }
}
