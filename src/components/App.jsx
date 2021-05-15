import React, { Component } from 'react'
import map from '../services/map'
import Home from '../pages/Home'
import Register from '../pages/Register'
import Login from '../pages/Login'
import SpaceList from '../pages/SpaceList'
import CertificateAuthority from '../pages/CertificateAuthority'

export default class App extends Component {
  constructor (props) {
    super(props)
    this.state = {
      page: 'home'
    }
    this.handleRegisterClick = this.handleRegisterClick.bind(this)
    this.handleLoginClick = this.handleLoginClick.bind(this)
    this.handleCertificateClick = this.handleCertificateClick.bind(this)
    this.handleBackClick = this.handleBackClick.bind(this)
    this.handleLogOutClick = this.handleLogOutClick.bind(this)
    this.handleRegister = this.handleRegister.bind(this)
    this.handleLogin = this.handleLogin.bind(this)
  }

  handleRegisterClick () {
    this.setState({ page: 'register' })
  }

  handleLoginClick () {
    this.setState({ page: 'login' })
  }

  handleCertificateClick () {
    this.setState({ page: 'certificateAuthority' })
  }

  handleRegister () {
    this.setState({ page: 'login' })
  }

  handleLogin () {
    this.setState({ page: 'spaceList' })
  }

  handleBackClick () {
    this.setState({ page: 'home' })
  }

  handleLogOutClick () {
    this.setState({ page: 'home' })
  }

  isPage (page) {
    return (this.state.page === page)
  }

  get home () {
    return this.isPage('home') &&
      <Home
        onRegisterClick={this.handleRegisterClick}
        onLoginClick={this.handleLoginClick}
        onCertificateClick={this.handleCertificateClick} />
  }

  get register () {
    return this.isPage('register') &&
      <Register
        onRegister={this.handleRegister}
        onBackClick={this.handleBackClick} />
  }

  get login () {
    return this.isPage('login') &&
      <Login
        onLogin={this.handleLogin}
        onBackClick={this.handleBackClick} />
  }

  get certificateAuthority () {
    return this.isPage('certificateAuthority') &&
      <CertificateAuthority onBackClick={this.handleBackClick}/>
  }

  get spaceList () {
    return this.isPage('spaceList') &&
      <SpaceList onLogOut={this.handleLogOutClick} />
  }

  async initMaps () {
    map.init()
  }

  componentDidMount () {
    this.initMaps()
  }

  render () {
    return (
      <div>
        {this.home}
        {this.register}
        {this.login}
        {this.certificateAuthority}
        {this.spaceList}
      </div>
    )
  }
}
