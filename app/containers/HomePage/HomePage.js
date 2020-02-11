/*
 * HomePage
 *
 * Telzio Login Page 
 */


import React from 'react';
import { connect } from 'react-redux';
import { Button, Form, Segment, Message, Loader } from 'semantic-ui-react'

// actions
import { signInUser } from './actions';

// styles
import './style.scss';


class TelzioSignIn extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      validationUserNameError: false,
      validationPasswordError: false,
      username: '',
      password: ''
    }
  }

  componentDidMount() {
    const token = sessionStorage.getItem('claimstoken');
    if (token) {
      this.props.history.push('/voicemaildetails')
    } 
  }

  // Handle input changes for username and password
  handleInputChange = (type, username) => {
    this.setState({
      [type]: username,
      validationUserNameError: false,
      validationPasswordError: false
    })
  }

  // Submit validates empty values 
  handleSubmit = () => {
    const { username, password } = this.state;
    if (username && password) {
      return this.props.signInAction(username, password);
    }
    if (!username) {
      this.setState({
        validationUserNameError: true
      })
    }
    if (!password) {
      this.setState({
        validationPasswordError: true
      })
    }
  }

  renderErrMessage = () => {
    if(this.props.errMsg) {
      return (
        <Message
        error
        content={this.props.errMsg}
      />
      )
    }
  }

  render() {
    const { validationPasswordError, validationUserNameError } = this.state;
    return (
      <div className='content-position'>
       {this.renderErrMessage()}
        <Segment>
          <Form>
            <Form.Group widths='equal'>
              <Form.Input fluid label='Username' placeholder='enter username' onChange={(e) => this.handleInputChange('username', e.target.value)} error={validationUserNameError ? {
                content: 'Please enter a valid email address',
                pointing: 'below',
              } : null} />
            </Form.Group>
            <Form.Group widths='equal'>
              <Form.Input fluid label='Password' type='password' placeholder='enter password' onChange={(e) => this.handleInputChange('password', e.target.value)} error={validationPasswordError ? {
                content: 'Please enter a password',
                pointing: 'below',
              } : null} />
            </Form.Group>
            <Button type='submit'  primary  onClick={this.handleSubmit}>{this.props.loading ? <Loader active inverted inline='centered'/> : 'Log In'}</Button>
          </Form>
        </Segment>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    errMsg: state.home.error,
    loading: state.home.loading
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    signInAction: (username, password) => dispatch(signInUser(username, password)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(TelzioSignIn);
