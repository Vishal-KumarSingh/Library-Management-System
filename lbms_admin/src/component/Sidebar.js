import React, { Component } from 'react'
import App from '../App';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom'

export default class Sidebar extends Component {
    constructor(props) {
        super(props);
        this.selected = 1;
        this.w3_close = this.w3_close.bind(this);
    }

    w3_close(id) {
        document.getElementById(this.selected).classList.toggle("active");
        document.getElementById(id).classList.toggle("active");
        this.selected = id;
        if (window.innerWidth < 768) {
            App.StaticState.navBarWidth = "0px";
            this.props.StateModifier();
        }
    }
    render() {
        return (
            <nav id="nav_tray" className="fixed-right text-white sidebar fixed" style={{ width: this.props.stateStyle , display:"block" }}><br />
                <div className="container sidebar-heading">
                    <h3 className="center"><b>DashBoard</b></h3>
                </div>
                <div className="bar-block container" id="sidebar">
                    <Link to="/BookIssueRequest">  <span onClick={() => { this.w3_close(1); }} className="bar-item button hover-white active" id="1">Book Issue Requests</span></Link>
                    <Link to="/BookTransactions">  <span onClick={() => { this.w3_close(2); }} className="bar-item button hover-white" id="2">Book Transactions</span></Link>
                    <Link to="/SearchPage"><span onClick={() => { this.w3_close(3); }} className="bar-item button hover-white" id="3">Search Book</span></Link>
                    <Link to="/BookSummary"><span onClick={() => { this.w3_close(4); }} className="bar-item button hover-white" id="4">Book Summary</span></Link>
                    <Link to="/ReturnBookRequests"> <span onClick={() => { this.w3_close(5); }} className="bar-item button hover-white" id="5">Return Book Request</span></Link>
                    <Link to="/AddBook"> <span onClick={() => { this.w3_close(7); }} className="bar-item button hover-white" id="7">Add Book</span></Link>
                    <Link to="/ManageAccounts"> <span onClick={() => { this.w3_close(6); }} className="bar-item button hover-white" id="6">Manage Account</span></Link>
                </div>
            </nav >
        )
    }
}
