import React, { Component } from 'react';
import './Auth.css';
import { signUp, signIn } from '../utils.js';



export default class Auth extends Component {
  state = {
    isSignUp: true,
    email: '',
    name: '',
    password: '',
    error: ''
  }

  handleSwitch = () => {
    this.setState({ isSignUp: !this.state.isSignUp });
  }

  handleEmailChange = ({ target }) => {
    this.setState({ email: target.value });
  }

  handleNameChange = ({ target }) => {
    this.setState({ name: target.value });
  }

  handlePasswordChange = ({ target }) => {
    this.setState({ password: target.value });
  }

  handleSubmit = async e => {
    const { isSignUp } = this.state;
    const { onUser, history } = this.props;
    e.preventDefault();

    this.setState({ error: '' });

    try {
      const action = isSignUp ? signIn : signUp;
      const user = await action(this.state);
      onUser(user);
      history.push('/');
    }
    catch (err) {
      this.setState({ error: err.error });
    }
  }


  render() {
    const { isSignUp, email, name, password, error } = this.state;
    return (
      <form className="login" onSubmit={this.handleSubmit}>
        <h3>Log in/Sign up!</h3>

        <input name='email' placeholder='email' value={email} onChange={this.handleEmailChange}
          required={true}></input>

        <input name="name" placeholder="name" value={name} onChange={this.handleNameChange} required={true}></input>

        <input name="password" placeholder="password" value={password} onChange={this.handlePasswordChange} required={true}></input>

        <button onClick={this.handleSwitch} className="login button">Sign {isSignUp ? 'Up' : 'In'}</button>

        { error && <p>{error}</p>}
      </form>
    );
  }
}

