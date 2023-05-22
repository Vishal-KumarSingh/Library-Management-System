import React, { Component } from 'react'
import App from '../App';
import Network from '../Network';
export default class SearchPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Books: []
    }
    this.handleSearch = this.handleSearch.bind(this);
  }
  handleSearch() {
    let search = document.getElementById("search").value;
    if (search.length > 1) {
      App.StaticState.alert.state = "block";
      App.StaticState.alert.text = "searching ";
      App.StaticState.alert.mode = "#F5C26B";
    
      this.props.StateModifier();
      setTimeout(() => {
        App.StaticState.alert.state = "none";
        App.StaticState.alert.text = "";
        App.StaticState.alert.mode = "";
        this.props.StateModifier();
      }, 1500);
      new Network().hit(
        "BookSearch", {
        key: search
      },
        (r) => {
          if(r["status"]==0){
            App.StaticState.alert.state = "block";
            App.StaticState.alert.text = r["message"];
            App.StaticState.alert.mode = r["mode"];
            this.props.StateModifier();
              setTimeout(() => {
                App.StaticState.alert.state = "none";
                App.StaticState.alert.text = "";
                this.props.StateModifier();
              }, 1500);
            this.setState({
              Books: []
            })
          }
          else{
          this.setState({
            Books: r["data"]
          })
        }
        }
      )
    }
  }
  render() {
    return (
      <div className="page">
      <div className='search'>
        <input type="text" id="search" className='form-group' placeholder='Search' onChange={this.handleSearch} />
        <i className="fa-solid fa-magnifying-glass"></i>
        </div>
        <div className='tablediv'>
        <table className="table tablesearch">
          <thead>
            <tr>
              <th scope="col">S.No</th>
              <th scope="col">Account Number</th>
              <th scope="col">Book Name</th>
              <th scope="col">Author Name</th>
              <th scope="col">Edition</th> 
             
            </tr>
          </thead>
          <tbody>
            {this.state.Books.map((book, index) => {
              return (<tr key={index}>
                <th scope="row">{index + 1}</th>
                <td>{book.account}</td>
                <td>{book.name}</td>
                <td>{book.author}</td>
                <td>{book.edition}</td> 
               
              </tr>
              );

            })}

          </tbody>
        </table>
        </div>
      </div>
    )
  }
}
