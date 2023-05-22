import Cookies from 'js-cookie';
import React, { Component } from 'react'
import Network from '../Network';
import App from '../App';
export default class AddBook extends Component {
    constructor(props) {
        super(props);
        
        this.AddBook = this.AddBook.bind(this);
    }
    AddBook() {
        console.log("login method");
        var book_name = document.getElementById("book_name").value;
        var acc_no = document.getElementById("acc_no").value;
        var edition = document.getElementById("edition").value;
        var author = document.getElementById("author").value;
        if (acc_no == "" || book_name == "" || edition=="" || author=="") {
            App.StaticState.alert.state = "block";
            App.StaticState.alert.text = "Field can't be empty";
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
            "AddBookToLibrary",
            {
                
                name:book_name,
                author:author,
                edition:edition,
                account:acc_no
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
                    App.StaticState.AddBook = true;
                    this.props.StateModifier();
                }
            }

        );
    }
    render() {
        return (
            <div className="page loginpage" >
                <div className='row'>
                    <div className='container p-4 form-desktop'>

                        <div className='mb-3'>
                            <h1 className="form-label">Add Book</h1>
                        </div>
                        <div className='mb-3'>
                            <label className="form-label">Book Id</label>
                            <input type="number" min="0" max="9999" id="acc_no" className="form-control" />
                        </div>
                        <div className='mb-3'>
                            <label className="form-label">Book Name</label>
                            <input type="text" id="book_name" className="form-control" />
                        </div>
                        <div className='mb-3'>
                            <label className="form-label">Author Name</label>
                            <input type="text" id="author" className="form-control" />
                        </div>
                        <div className='mb-3'>
                            <label className="form-label">Edition</label>
                            <input type="text" id="edition" className="form-control" />
                        </div>
                        <div className='mb-3'>
                            <input type="button" onClick={this.AddBook} value="Add Book" className="form-control libbtn" />
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







