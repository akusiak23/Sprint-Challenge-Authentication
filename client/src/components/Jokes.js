import React from 'react';
import axios from 'axios';
import { withRouter } from 'react-router-dom';

class Jokes extends React.Component {
    constructor() {
        super();
        this.state = { 
            jokes: [],
            loading: false,
            loaded: false
        }
    }

    componentDidMount() {
        this.setState({ loading: true }, () => {
            const token = localStorage.getItem('jwt');
            const reqOptions = {
                headers: {
                    Authorization: token
                }
            }
            axios
                .get('http://localhost:3300/api/jokes', reqOptions)
                .then(res => {
                    this.setState({ jokes: res.data, loading: false, loaded: true })
                })
                .catch(err => {
                    this.setState({ loading: false, loaded: true})
                })
        })
    }

    signOut = () => {
        localStorage.removeItem('jwt');
        this.props.history.push('/signin');
    }

    signIn = () => {
        this.props.history.push('/signin');
    }

    signUp = () => {
        this.props.history.push('/signout');
    }

    render() {
        if (this.state.loaded === true && this.state.jokes.length === 0) {
            return (
                <div>
                    <h2>Please login to view this content</h2>
                    <div className="btn-cont">
                        <button className="waves-effect waves-light btn" onClick={this.signIn}>Sign In</button>
                        <button className="waves-effect waves-light btn" onClick={this.signUp}>Sign Up</button>
                    </div>
                </div>
            )
        } else if (this.state.loaded === true && this.state.jokes.length > 0) {
            return (
                <div>
                    {this.state.jokes.map((e, i) =>
                        <div key={i} className="card">
                            <p>Type: {e.type}</p>
                            <p>Setup: {e.setup}</p>
                            <p>Punchline: {e.punchline}</p>
                        </div>
                    )}
                    <button className="waves-effect waves-light btn" onClick={this.signOut}>Sign Out</button>
                </div>
            )
        } else {
            return <div></div>
        }  
    }
}

export default withRouter(Jokes);