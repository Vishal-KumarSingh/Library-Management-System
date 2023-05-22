import Cookies from 'js-cookie';
import React, { Component } from 'react'
import Network from '../Network';
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
        if (username == "" && pass == "") {
            App.StaticState.alert.state = "block";
            App.StaticState.alert.text = "Email and password can't be empty";
            App.StaticState.alert.mode = "red";
            

            this.props.StateModifier();
            setTimeout(() => {
                App.StaticState.alert.state = "none";
                App.StaticState.alert.text = "";
                this.props.StateModifier();
            }, 1500);
            return;
        }
        new Network().hit(
            "AdminLogin",
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
                    App.StaticState.alert.mode = "";
                    this.props.StateModifier();
                }, 1500);
                if (r["status"] == 1) {
                    console.log(r);
                    Cookies.set("token", r["data"][0]["token"]);
                    App.StaticState.login = true;
                    this.props.StateModifier();
                    this.componentDidMount();
                }
            }

        );
    }
    render() {
        return (
            <div className="page loginpage" >
                <div className='row' style={{ display: App.StaticState.login ? "none" : "block" }}>
                    <div className='container p-4 form-desktop'>

                        <div className='mb-3'>
                            <h1 className="form-label">Login to Continue</h1>
                        </div>
                        <div className='mb-3'>
                            <label className="form-label">Email</label>
                            <input type="email" id="email" className="form-control" />
                        </div>
                        <div className='mb-3'>
                            <label className="form-label">Password</label>
                            <input type="password" id="password" className="form-control" />
                        </div>
                        <div className='mb-3'>
                            <input type="button" onClick={this.Login} value="Login" className="form-control loginbtn libbtn btn" />
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
            "AdminProfile",
            null,
            (r) => {
                if (r["status"] == 1) {
                    document.getElementById("name").value = r["data"]["name"];
                    document.getElementById("username").value = r["data"]["email"]; 
                }
            }
        );
    }
}







