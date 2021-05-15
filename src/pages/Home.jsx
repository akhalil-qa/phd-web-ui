import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Article from '../components/Article'
import Button from '../components/Button'

export default class Home extends Component {
  static propTypes = {
    onRegisterClick: PropTypes.func.isRequired,
    onLoginClick: PropTypes.func.isRequired,
    onCertificateClick: PropTypes.func.isRequired
  }

  render () {
    return (
      <Article heading="Space Manage Server">
        <div className="grid grid-cols-2 gap-6">
          <Button
            size="large"
            text="Register Space Authority"
            onClick={this.props.onRegisterClick} />
          <Button
            size="large"
            text="Login as Space Authority"
            onClick={this.props.onLoginClick} />
          <div className="mt-48">
            <Button
              size="large"
              text="Certificate Authority"
              onClick={this.props.onCertificateClick} />
          </div>
        </div>
      </Article>
    )
  }
}
