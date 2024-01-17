import {Component} from 'react'
import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'

import './index.css'

class LoginForm extends Component {
  state = {
    inputText: '',
    inputPassword: '',
    showError: false,
    errorMsg: '',
  }

  onChangeInputText = event => {
    this.setState({inputText: event.target.value})
  }

  onChangePasswordText = event => {
    this.setState({inputPassword: event.target.value})
  }

  onSubmitSuccess = jwtToken => {
    const {history} = this.props
    Cookies.set('jwt_token', jwtToken, {
      expires: 30,
      path: '/',
    })
    history.replace('/')
  }

  onSubmitFailure = errorMsg => {
    this.setState({showError: true, errorMsg})
  }

  getLoginDetails = async event => {
    event.preventDefault()
    const {inputText, inputPassword} = this.state
    const userDetails = {user_id: inputText, pin: inputPassword}
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }

    const response = await fetch('https://apis.ccbp.in/ebank/login', options)
    const data = await response.json()
    if (response.ok === true) {
      this.onSubmitSuccess(data.jwt_token)
    } else {
      this.onSubmitFailure(data.error_msg)
    }
  }

  renderInput = () => {
    const {inputText} = this.state
    return (
      <div className="input-containers">
        <label htmlFor="user_id" className="label">
          User ID
        </label>
        <input
          type="text"
          id="user_id"
          value={inputText}
          placeholder="Enter User ID"
          className="input-value"
          onChange={this.onChangeInputText}
        />
      </div>
    )
  }

  renderPassword = () => {
    const {inputPassword} = this.state
    return (
      <div className="input-containers">
        <label htmlFor="pin" className="label">
          PIN
        </label>
        <input
          type="password"
          id="pin"
          value={inputPassword}
          placeholder="Enter PIN"
          className="input-value"
          onChange={this.onChangePasswordText}
        />
      </div>
    )
  }

  render() {
    const {showError, errorMsg} = this.state
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }
    return (
      <div className="login-container">
        <div className="login-card">
          <div className="login-image-card">
            <img
              src="https://assets.ccbp.in/frontend/react-js/ebank-login-img.png"
              alt="website login"
              className="login-image"
            />
          </div>
          <div className="login-template">
            <h1 className="welcome-heading">Welcome Back!</h1>
            <form className="form" onSubmit={this.getLoginDetails}>
              {this.renderInput()}
              {this.renderPassword()}
              <div className="login-button-container">
                <button type="submit" className="button-login">
                  Login
                </button>
              </div>
              {showError && <p className="para">{errorMsg}</p>}
            </form>
          </div>
        </div>
      </div>
    )
  }
}
export default LoginForm
