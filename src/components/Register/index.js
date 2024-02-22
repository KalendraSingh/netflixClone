import {Component} from 'react'
import Cookies from 'js-cookie'
import {Redirect, Link} from 'react-router-dom'
import './index.css'

class Register extends Component {
  state = {
    username: '',
    password: '',
    email: '',
    showErrorMsg: false,
    errorMsg: '',
  }

  onChangeUsername = event => {
    this.setState({username: event.target.value, showErrorMsg: false})
  }

  onChangeEmail = event => {
    this.setState({email: event.target.value, showErrorMsg: false})
  }

  onChangePassword = event => {
    this.setState({password: event.target.value, showErrorMsg: false})
  }

  //   onSubmitSuccess = jwtToken => {
  //     const {history} = this.props
  //     history.replace('/login')
  //   }

  onSubmitFailure = errorMsg => {
    this.setState({showErrorMsg: true, errorMsg})
  }

  submitForm = async event => {
    event.preventDefault()
    const {username, email, password} = this.state
    const userData = {username, email, password}
    const apiUrl = 'https://users-7c43.onrender.com/users'
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json', // Specify content type as JSON
      },
      body: JSON.stringify(userData),
    }
    const response = await fetch(apiUrl, options)
    const data = await response.json()
    if (response.ok) {
      const {history} = this.props
      history.replace('/login')
    } else {
      this.onSubmitFailure(data.error)
    }
  }

  renderUsername = () => {
    const {username} = this.state

    return (
      <>
        <label className="label" htmlFor="username">
          USERNAME
        </label>
        <input
          type="text"
          id="username"
          className="input-field"
          onChange={this.onChangeUsername}
          value={username}
          placeholder="Username"
        />
      </>
    )
  }

  renderEmail = () => {
    const {email} = this.state

    return (
      <>
        <label className="label" htmlFor="email">
          EMAIL
        </label>
        <input
          type="text"
          id="email"
          className="input-field"
          onChange={this.onChangeEmail}
          value={email}
          placeholder="email"
        />
      </>
    )
  }

  renderPassword = () => {
    const {password} = this.state

    return (
      <>
        <label className="label" htmlFor="password">
          PASSWORD
        </label>
        <input
          type="password"
          id="password"
          className="input-field"
          onChange={this.onChangePassword}
          value={password}
          placeholder="Password"
        />
      </>
    )
  }

  render() {
    const {showErrorMsg, errorMsg} = this.state
    const jwtToken = Cookies.get('jwt_token')

    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }

    return (
      <div className="login-form-bg-container">
        <div className="website-logo-image-container">
          <img
            src="https://res.cloudinary.com/dc2b69ycq/image/upload/v1669787785/Movies%20App/Movies_Logo_nu3gsl.png"
            alt="login website logo"
            className="website-logo"
          />
        </div>
        <form className="login-form-container" onSubmit={this.submitForm}>
          <h1 className="login-title">Register</h1>
          {this.renderUsername()}
          {this.renderEmail()}
          {this.renderPassword()}
          {showErrorMsg && <p className="error-msg">{errorMsg}</p>}
          <button type="submit" className="login-btn">
            Register
          </button>
          <button type="submit" className="sign-in-btn">
            Sign up
          </button>

          <p style={{textAlign: 'center'}}>
            <Link to="/login" style={{textDecoration: 'none', color: 'white'}}>
              Already have account?
            </Link>
          </p>
        </form>
      </div>
    )
  }
}

export default Register
