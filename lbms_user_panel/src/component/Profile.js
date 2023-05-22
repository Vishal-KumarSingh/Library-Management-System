import Cookies from 'js-cookie';
import React, { Component } from 'react'
import Network from '../Network';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom'
import App from '../App';
export default class Profile extends Component {
    constructor(props) {
        super(props);
       
        this.Login = this.Login.bind(this);
    }
    Login() {
        console.log("login method");
        var username = document.getElementById("email").value;
        var pass = document.getElementById("password").value;
        if (username == "" || pass == "") {
            App.StaticState.alert.state = "block";
            App.StaticState.alert.text = "Email or password can't be empty";
            App.StaticState.alert.mode = "#dd4444";
            // App.StaticState.alert.mode = "#198754";
            this.props.StateModifier();
            setTimeout(() => {
                App.StaticState.alert.state = "none";
                App.StaticState.alert.text = "";
                App.StaticState.alert.mode = "";
                this.props.StateModifier();
            }, 1500);
            return;
        }
        new Network().hit(
            "Login",
            {
                email: username,
                password: pass
            },
            (r) => {
                App.StaticState.alert.state = "block";
                App.StaticState.alert.text = r["message"];
                App.StaticState.alert.mode = r["mode"];

                this.props.StateModifier();

                setTimeout(() => {
                    App.StaticState.alert.state = "none";
                    App.StaticState.alert.text = "";
                    this.props.StateModifier();
                }, 1500);
    
                if (r["status"] == 1) {
                    console.log(r);
                    Cookies.set("token", r["data"][0]["token"]);
                    App.StaticState.login=true;
                    this.props.StateModifier();
                    this.componentDidMount();
                }
            }

        );
    }
    render() {
        return (
            <div className="loginpage page" >
                <div className='row' style={{ display: App.StaticState.login ? "none" : "block" }}>
                    <div className='container loginform'>

                        <div className='mb-3'>
                            <h1 className="form-label">Login to Continue</h1>
                        </div>
                        <div className='mb-3'>
                            <label className="form-label" htmlFor='email'>Email</label>
                            <input type="email" id="email" className="form-control" />
                        </div>
                        <div className='mb-3'>
                            <label className="form-label" htmlFor='password'>Password</label>
                            <input type="password" id="password" className="form-control" />
                        </div>
                        <div className=''>
                            <input type="button" onClick={this.Login} value="Login" className="loginbtn libbtn btn" />
                        </div>
                        <div className=''>
                        <Link to="/Register">
                            <input type="button" value="Create Account" className="loginbtn libbtn btn" /></Link>
                        </div>
                    </div> 
                </div>

                <div className='row' style={{ display: App.StaticState.login ? "block" : "none" }}>
                    <div className='col col-md-6'>
                    </div>
                    <div className='col col-md-6'>
                        <div className='mb-3'>
                            <label className="form-label">Name</label>
                            <input type="text" id="name" className="form-control" disabled />
                        </div>
                        <div className='mb-3'>
                            <label className="form-label">
                                Registration Number
                            </label>
                            <input type="number" id="registration" className="form-control" disabled />
                        </div>
                        <div className='mb-3'>
                            <label className="form-label">Email</label>
                            <input type="email" id="username" className="form-control" disabled />
                        </div>

                    </div>
                </div>
            </div>
        )
    }
    componentDidMount() {
        new Network().hit(
            "Profile",
            null,
            (r) => {
                if (r["status"] == 1) {
                    // document.getElementById("name").value = 'Piyush';
                    document.getElementById("name").value = r["data"]["name"];
                    document.getElementById("username").value = r["data"]["email"];
                    document.getElementById("registration").value = r["data"]["registration"]; 
                }
            }
        );
    }
}







