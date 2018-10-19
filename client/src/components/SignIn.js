import React from 'react';
import axios from 'axios';
import { withRouter } from 'react-router-dom';

class SignIn extends React.Component {
    constructor() {
        super();
        this.state = {
            username: '',
            password: ''
        }
    }

    onChangeHandler = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    }

    onSubmitHandler = (e) => {
        e.preventDefault();
        const user = { 
            username: this.state.username,
            password: this.state.password
        }
        axios
            .post('http://localhost:3300/api/login', user)
            .then(res => {
                localStorage.setItem('jwt', res.data);
                this.props.history.push('/jokes')
            })
            .catch(err => {
                alert('Invalid username or password')
            })
    }

    redirect = () => {
        this.props.history.push('/signup');
    }

    render() {
        return(
            <div>
                <h2>Sign In</h2>
                <input
                    type="text"
                    name="username"
                    value={this.state.username}
                    onChange={this.onChangeHandler}
                    placeholder="Username"
                />
                <input
                    type="password"
                    name="password"
                    value={this.state.password}
                    onChange={this.onChangeHandler}
                    placeholder="Password"
                />
                <div className="btn-cont">
                    <button type="submit" onClick={this.onSubmitHandler} className="btn">Sign In</button>
                    <button onClick={this.redirect} className="btn">Sign Up</button>
                </div>
            </div>
        )
    }
}

export default withRouter(SignIn);