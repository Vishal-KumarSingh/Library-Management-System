import React, { Component } from 'react' 
import App from '../App';
import Cookies from 'js-cookie'
import Sidebar from './Sidebar';
import IssueItem from './IssueItem';
import Network from '../Network';
export default class BookIssueRequest extends Component {

    constructor(props) {
        super(props);
        this.booklist = [];
        this.state = {
            bookList: this.booklist
        };
    }
    
    componentDidMount() {
        new Network().hit(
            "CheckIssueRequests", null,
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
                      bookList: []
                    })
                }
                else{
                this.setState({
                    bookList: r["data"]
                });
            }
        });
    }
     render(){
        return (

            <div className="page">
               {this.state.bookList.map((book, index) => {
              return (
                <IssueItem name={book.name} id={book.id} email={book.email} account={book.account}  key={index} book={book.book} author={book.author} issue={book.issue} />
              );

            })}
            </div>
        );
    }
  }