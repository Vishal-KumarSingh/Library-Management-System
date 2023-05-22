import Cookies from 'js-cookie';
import React, { Component } from 'react'
import Network from '../Network';
import {useNavigate} from "react-router-dom"
import App from '../App';
export default class Register extends Component {
    constructor(props) {
        super(props);
       
        this.Registration = this.Registration.bind(this);
    }
    goBack(){
        
    }
    Registration() {
        console.log("Registration method");
        var username = document.getElementById("name").value;
        var email = document.getElementById("email").value;
        var registration_no = document.getElementById("Registration").value;
        var pass = document.getElementById("password").value;
        var rpass = document.getElementById("rpassword").value; 
        if (username == "" || pass == "" || rpass=="" || email=="" || registration_no=="" ||(rpass !=pass)) {
            console.log("if method");

            App.StaticState.alert.state = "block";
            if(rpass!=pass){
                App.StaticState.alert.text = "Password and Repeat Password does not match";
            }
            else{
                App.StaticState.alert.text = "Field are empty!";
            }
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
            "Registration",
            {
                email: email,
                password: pass,
                name:username,
                registration:registration_no

            },
            (r) => {
                console.log("hello");
                App.StaticState.alert.state = "block";
                App.StaticState.alert.text = r["message"];
                App.StaticState.alert.mode = r["mode"];
                this.props.StateModifier();

                setTimeout(() => {
                    App.StaticState.alert.state = "none";
                    App.StaticState.alert.text = "";
                    this.props.StateModifier();
                    window.location.url = "/";
                }, 1500);

                
            }

        );

    }
    render() {
        return (
            <div className="loginpage page" >
                <div className='row' style={{ display: App.StaticState.login ? "none" : "block" }}>
                    <div className='container loginform'>

                        <div className='mb-3'>
                            <h1 className="form-label">Register to Continue</h1>
                        </div>
                        <div className='mb-3'>
                            <label className="form-label" htmlFor='email'>Email</label>
                            <input type="email" id="email" className="form-control" />
                        </div>
                        <div className='mb-3'>
                            <label className="form-label" htmlFor='name'>Name</label>
                            <input type="text" id="name" className="form-control" />
                        </div>
                        <div className='mb-3'>
                            <label className="form-label" htmlFor='Registration'>Registration</label>
                            <input type="number" id="Registration" className="form-control" />
                        </div>
                        <div className='mb-3'>
                            <label className="form-label" htmlFor='password'>Password</label>
                            <input type="password" id="password" className="form-control" />
                        </div>
                        <div className='mb-3'>
                            <label className="form-label" htmlFor='rpassword'>Repeat Password</label>
                            <input type="password" id="rpassword" className="form-control" />
                        </div>
                        <div className=''>
                            <input type="button" onClick={this.Registration} value="Register" className="loginbtn libbtn btn" />
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
                    document.getElementById("name").value = r["data"][0]["name"];
                    document.getElementById("username").value = r["data"][0]["email"];
                    document.getElementById("registration").value = r["data"][0]["registration_no"];
                    document.getElementById("phone").value = r["data"][0]["phone"];
                }
            }
        );
    }
}







