import React, { Component } from 'react';
import './App.css';
import Login from './login.js';
import Search from './search.js';
class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      password:'',
      userId:'',
      isSearchActive: false
    }
  }

  setUser({userId, password}) {
    this.setState({userId:userId, password: password, isSearchActive:true})
  }

  logoutUser() {
    this.setState({userId:'', password: '', isSearchActive:false})
  }
  render() {
    const {isSearchActive, userId} = this.state
   
    return (
      <div className="App">
        <header className="App-header">
          {userId && <div className="user" >{userId} <a onClick={()=>this.logoutUser()}>Logout</a></div>}
          <div className="row center yellow">
            <div className="jumbotron">
            <h1>SWAPI</h1>
            <p className="lead">The Star Wars API</p>
            </div>
          </div>
          {isSearchActive && (<Search userId={userId}/>)}
        </header>
        {!isSearchActive && (<Login setUser={({userId, password})=>this.setUser({userId, password})}/>)}
      </div>
    );
  }
}

export default App;
