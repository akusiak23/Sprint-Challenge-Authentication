import React from 'react';
import axios from 'axios';
import { withRouter } from 'react-router-dom';

class SignUp extends React.Component {
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
        const newUser = {
            username: this.state.username,
            password: this.state.password
        }
        axios
            .post('http://localhost:3300/api/register', newUser)
            .then(res => {
                localStorage.setItem('jwt', res.data);
                this.props.history.push('/jokes')
            })
            .catch(err => {
                alert('Something went wrong, please try again.')
            });
    }

    redirect = () => {
        this.props.history.push('/signin');
    }
    
    render(){
        return(
            <div>
                <h2>Create Account</h2>
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
                    <button type="submit" onClick={this.onSubmitHandler} className="waves-effect waves-light btn">Sign Up</button>
                    <button onClick={this.redirect} className="waves-effect waves-light btn">Sign In</button>
                </div>
            </div>
        )
    }
}

export default withRouter(SignUp);