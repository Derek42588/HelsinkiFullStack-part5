import React from 'react'
import PropTypes from 'prop-types'

const LoginForm = ({
  handleSubmit,
  username,
  password
}) => {
  let user = {
    value: username.value,
    type: username.type,
    onChange: username.onChange,
  }
  let pass = {
    value: password.value,
    type: password.type,
    onChange: password.onChange,
  }
  return (
    <div className = "loginForm">
      <h2> Login </h2>
      <form onSubmit={handleSubmit} id = "loginForm">
        <div>
            username
          <input
            {...user}
          />
        </div>
        <div>
            password
          <input
            {...pass}
          />
        </div>
        <button type="submit">login</button>
      </form>
    </div>
  )
}

LoginForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
}
export default LoginForm