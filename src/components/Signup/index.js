import React from 'react'

class Signup extends React.Component {
    constructor(props) {
      super(props);
  
      this.state = {
        username: "",
        password: "",
      }
    }
  
    handleUsernameChange = (e) => {
      const value = e.target.value;
  
      this.setState({ username: value });
    }
  
    handlePasswordChange = (e) => {
      const value = e.target.value;
  
      this.setState({ password: value });
    }
  
    render() {
      return (
        <div>
          <h1>Signup</h1>
          <form onSubmit={() => console.log("sign up :)")}>
            Username: <input onChange={this.handleUsernameChange} type="text" />
            <br />
            <br />
            Password: <input onChange={this.handlePasswordChange} type="password" />
            <br />
            <input type="submit" />
          </form>
          <p>already have an account?</p><a>Sign In</a>
        </div>
      );
    }
  }
  
  export default Signup;
  