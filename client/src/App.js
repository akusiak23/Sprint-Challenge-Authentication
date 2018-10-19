import React, { Component } from 'react';
import './App.css';
import { Route, withRouter} from 'react-router-dom';
import Jokes from './components/Jokes';
import SignUp from './components/SignUp';
import SignIn from './components/SignIn';


class App extends Component {
componentDidMount() {
  if (this.props.history.location.pathname!=='/signup' && this.props.history.location.pathname!=='/jokes') {
    this.props.history.push('/signin');
  }
}

  render() {
    return (
      <div className="App">
        <Route exact path='/signup' component={SignUp}/>
        <Route exact path='/signin' component={SignIn}/>
        <Route exact path='/jokes' component={Jokes}/>
      </div>
    );
  }
}

export default withRouter(App);
