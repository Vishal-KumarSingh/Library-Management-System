import React, { Component } from 'react'
import App from '../App';
import Cookies from 'js-cookie'
import Sidebar from './Sidebar';

export default class Navbar extends Component {

    constructor(props) {
        super(props);
        this.openDrawer = this.openDrawer.bind(this);
    }
    openDrawer() {
        //console.log(App.StaticState);
        console.log("drawer called");
        if (App.StaticState.navBarWidth === "0px") {
            App.StaticState.navBarWidth = "300px";
        } else {
            App.StaticState.navBarWidth = "0px";
        }
        this.props.StateModifier();
    }
    render() {

        return (
            <nav className="navbar navbar-expand-lg navbar-dark fixed fixed-top" style={{ background: this.props.theme }}>
                <div className="container-fluid">
                    <h4 className='text-white center p-1'>Admin - KEC Library</h4>
                    <button className='logoutbtn' onClick={()=>{Cookies.set("token","");window.location.reload(false)}} style={{ display: App.StaticState.login ? "block" : "none" }}><i className="fa-solid fa-right-from-bracket logoutlogo"></i></button>  
                    </div>
                <div id="menu_btn" className="p-2 navbutton only-small-screen text-white fixed fixed-top" onClick={this.openDrawer} style={{ fontSize: "x-large" }}>&#9776;</div>
            </nav>
        )
    }
}
