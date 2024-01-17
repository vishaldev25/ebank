import {Component} from 'react'
import Cookies from 'js-cookie'

import './index.css'

class Home extends Component {
  onClickLogout = () => {
    const {history} = this.props
    Cookies.remove('jwt_token')
    history.replace('/ebank/login')
  }

  renderNavBar = () => (
    <div className="navbar">
      <img
        src="https://assets.ccbp.in/frontend/react-js/ebank-logo-img.png"
        alt="website logo"
        className="website-logo"
      />
      <div className="logout-cont">
        <button
          type="button"
          className="logout-button"
          onClick={this.onClickLogout}
        >
          Logout
        </button>
      </div>
    </div>
  )

  render() {
    return (
      <div className="home-container">
        <div className="home">{this.renderNavBar()}</div>
        <div className="digital-card-container">
          <h1 className="digital-heading">Your Flexibility, Our Excellence</h1>
          <img
            src="https://assets.ccbp.in/frontend/react-js/ebank-digital-card-img.png"
            alt="digital card"
            className="digital-card"
          />
        </div>
      </div>
    )
  }
}

export default Home
