import React, { Component } from 'react';

export default class Login extends Component {
    Signin = () => {
        console.log('heloo');
        window.location.href='https://accounts.google.com/o/oauth2/auth?response_type=code&scope=profile%20https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fcloudprint&approval_prompt=force&access_type=offline&client_id=830134837934-ee9q3fh05ht8pog6m0fe4c8n0i6nvjk4.apps.googleusercontent.com&redirect_uri=http://localhost:3001/home'
    }
    render() {
        return (
            <div>
                <button onClick={() => this.Signin()}>Sign in with google</button>
            </div>
        )
    }
}