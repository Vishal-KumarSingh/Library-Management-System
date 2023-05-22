import React, { Component } from 'react'
import App from '../App';
import Network from '../Network';
export default class GetAbook extends Component {

    constructor(props) {
        super(props);
        this.booklist = [];
        this.state = {
            bookList: this.booklist
        };
        this.initiateRequest = this.initiateRequest.bind(this);
    }
    addBook() {
        let account_no = document.getElementById("acc_no");
        new Network().hit("AddBook", { "account": account_no.value }, (r) => {
            if (r["status"] == 0) {
                App.StaticState.alert.state = "block";
                App.StaticState.alert.text = "Book Not Found";
                App.StaticState.alert.mode=r["mode"];
                this.props.StateModifier();
                setTimeout(() => {
                    App.StaticState.alert.state = "none";
                    App.StaticState.alert.text = "";
                    this.props.StateModifier();
                }, 1500);
            }
            else {
                console.log(r);
                this.booklist.push({"acc_no": account_no.value, "name": r["data"][0]["name"], "author": r["data"][0]["author"], "issue": r["data"][0]["edition"] });
                this.setState({ bookList: this.booklist });
                account_no.value = "";
            }
        });
    }
    initiateRequest() {
        let len=this.booklist.length;
        console.log(this.len);
        for(let i=0;i<len;i++){
        new Network().hit(
            "InitiateBookRequest",
            {
               account:this.booklist[i].acc_no
            },
            (r) => {
                App.StaticState.alert.state = "block";
                App.StaticState.alert.text = "Book Issue Initiated Successfully";
                App.StaticState.alert.mode = "#F5C26B";
                
                this.props.StateModifier();
                setTimeout(() => {
                    App.StaticState.alert.state = "none";
                    App.StaticState.alert.text = "";
                    App.StaticState.alert.mode = "";
                    this.props.StateModifier();
                }, 1500);
                console.log(r);
            }
        );
        }
    }
    componentDidMount() {
        //this.addBook = this.addBook.bind(this);
    }
    render() {
        return (
            <div className="page">
                <table className="table">
                    <thead>
                        <tr>
                            <th scope="col">S.No</th>
                            <th scope="col">Account Number </th>
                            <th scope="col">Book Name</th>
                            <th scope="col">Author Name</th>
                            <th scope="col">Edition</th>
                        </tr>
                    </thead>
                    <tbody id="book_list">



                        {this.state.bookList.map((book, index) => {
                            return (
                                <tr key={index}>
                                    <th scope="row" >{index+1}</th>
                                    <td >{book.acc_no}</td>
                                    <td >{book.name}</td>
                                    <td >{book.author}</td>
                                    <td >{book.issue}</td>
                                </tr>
                            );
                        })}



                    </tbody>
                </table>
                <div className="form-group">
                    <label htmlFor="exampleInputEmail1">Book Id</label>
                    <input type="text" className="form-control" id="acc_no" aria-describedby="emailHelp" placeholder="Enter Book Id" />
                    {/* <small id="emailHelp" className="form-text text-muted">Enter the book account number and click add book</small> */}
                </div>


                <button onClick={() => {
                    this.addBook();
                }} className="btn mt-3 libbtn">Add Book </button>
                <br />
                <button className="btn libbtn" onClick={this.initiateRequest} >Initiate Issue Request</button>
            </div>
        )
    }
}
