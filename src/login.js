import React, { Component } from 'react';
import './login.css';
export default class Login extends Component {
    
	submitData(e) {
      e.preventDefault();
      const userId = this.refs.userName.value
      const password = this.refs.password.value
      if(password && userId) {
        this.props.setUser({userId: userId, password:password})
      }      
    }

    render(){
        return (
            <div className="container">
                <h3>Login to your account</h3>
				<form onSubmit={(e)=>{this.submitData(e)}} autoComplete="off" >
                    <div>
                        <input className="userName"
                                type="text"
                                ref="userName"
                                id="login-user-name"
                                name="login-user-name"
                                placeholder="Username" required
                        />
                        <input className="password"
                                type="password"
                                ref="password"
                                id="pwd-user-name"
                                name="pwd-user-name"
                                placeholder="Password" required
                        />
						<input type="submit" value="LOG IN"/>
                    </div>
				</form>
            </div>
        )
    }
}
