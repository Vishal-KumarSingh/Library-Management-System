import React, { Component, useState } from 'react'
import Navbar from './component/Navbar'
import Sidebar from './component/Sidebar'
import GetAbook from './component/GetAbook'
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom'
import BookHistory from './component/BookHistory'
import SearchPage from './component/SearchPage'
import ReturnBook from './component/ReturnBook'
import Profile from './component/Profile'
import Page from './component/Page'
import Register from './component/Register'
import Cookies from 'js-cookie'
export default class App extends Component {
  static StaticState;
  StateModifier() {
    var prev = App.StaticState; 
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
      login: present,
      theme: "#008080",
      navBarWidth: wd,
      alert: {
        state: "none",
        text: "",
        mode: ""
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
          <div className="alert" role="alert" style={{ display: this.state.alert.state,background:this.state.alert.mode }}>
            {this.state.alert.text}
          </div>
          <Routes>
            <Route exact path="/" element={<Page theme={this.state.theme} StateModifier={this.StateModifier} />} />
            <Route path="/GetAbook" element={<GetAbook theme={this.state.theme} StateModifier={this.StateModifier} />} />
            <Route path="/BookHistory" element={<BookHistory theme={this.state.theme} StateModifier={this.StateModifier} />} />
            <Route path="/SearchPage" element={<SearchPage theme={this.state.theme} StateModifier={this.StateModifier} />} />
            <Route path="/ReturnBook" element={<ReturnBook theme={this.state.theme} StateModifier={this.StateModifier} />} />
            <Route path="/Profile" element={<Profile theme={this.state.theme} StateModifier={this.StateModifier} />} />
            <Route path="/Register" element={<Register theme={this.state.theme} StateModifier={this.StateModifier} />} />

          </Routes>
        </Router>
      </div>
    )
  }
}
