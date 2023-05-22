import React, { Component, useState } from 'react'
import Navbar from './component/Navbar'
import Cookies from 'js-cookie';
import Sidebar from './component/Sidebar'
import Page from './component/Page'
import BookTransactions from './component/BookTransactions'
import Profile from './component/Profile'
import BookIssueRequest from './component/BookIssueRequest'
import BookSummary from './component/BookSummary'
import ReturnBookRequests from './component/ReturnBookRequests'
import SearchPage from './component/SearchPage'
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom'
import AddBook from './component/AddBook';
 
export default class App extends Component {
  static StaticState;
  StateModifier() {
    var prev = App.StaticState;
    console.log("hjh");
    console.log(prev);
    this.setState(App.StaticState);
  }
  constructor() {
    super();
    let wd='0px';
    if(window.innerWidth>768){
      wd='300px';
    }
    var token = Cookies.get("token");
        var present;
        if (token) {
            present = true
        } else {
            present = false
        }

    this.state = {
      theme: "#008080",
      navBarWidth: wd,
      login:present,
      alert: {
        state: "none",
        text: "",
        mode:""
      }
    }
    App.StaticState = this.state;
    this.StateModifier = this.StateModifier.bind(this);
  }
  componentDidMount() {
    //this.setState({ theme: "#000000" });
    window.addEventListener('resize', () => {
      if (window.innerWidth > 768) {
        App.StaticState.navBarWidth = "300px";
        this.StateModifier();
      }
      if (window.innerWidth < 768) {
        App.StaticState.navBarWidth = "0px";
        this.StateModifier();
      }
    });
  }


  render() {
    return (
      <div>
        <Router>
          <Navbar theme={this.state.theme} StateModifier={this.StateModifier} />
          <Sidebar theme={this.state.theme} StateModifier={this.StateModifier} stateStyle={this.state.navBarWidth} />
          <div className="alert" role="alert" style={{ display: this.state.alert.state ,background:this.state.alert.mode }}>
            {this.state.alert.text}
          </div>
          <Routes>
            <Route exact path="/" element={<Page theme={this.state.theme} StateModifier={this.StateModifier} />} />
            <Route path="/BookIssueRequest" element={<BookIssueRequest theme={this.state.theme} StateModifier={this.StateModifier} />} />
            <Route path="/BookTransactions" element={<BookTransactions theme={this.state.theme} StateModifier={this.StateModifier} />} />
            <Route path="/SearchPage" element={<SearchPage theme={this.state.theme} StateModifier={this.StateModifier} />} />
            <Route path="/BookSummary" element={<BookSummary theme={this.state.theme} StateModifier={this.StateModifier} />} />
            <Route path="/ReturnBookRequests" element={<ReturnBookRequests theme={this.state.theme} StateModifier={this.StateModifier} />} />
            <Route path="/ManageAccounts" element={<Profile theme={this.state.theme} StateModifier={this.StateModifier} />} />
            <Route path="/AddBook" element={<AddBook theme={this.state.theme} StateModifier={this.StateModifier} />} />
          </Routes>
        </Router>
      </div>
    )
  }
}
