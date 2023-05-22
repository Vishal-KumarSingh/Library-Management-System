import React, { Component } from 'react'
import Network from '../Network';
import App from '../App';
export default class ReturnBook extends Component {
    constructor(props) {
        super(props);
        this.state = {
            Books: []
        }
    }
    returnRequest(transaction_id) {

        new Network().hit(
            "ReturnRequest", {
            transaction: transaction_id
        },
            (r) => {
                if (r["status"]) {
                    App.StaticState.alert.state = "block";
                    App.StaticState.alert.text = "Book Return Initiated Successfully";
                    this.props.StateModifier();
                    setTimeout(() => {
                        App.StaticState.alert.state = "none";
                        App.StaticState.alert.text = "";
                        this.props.StateModifier();
                    }, 1500);

                    this.componentDidMount();
                }
            }
        )
    }
    componentDidMount() {
        new Network().hit(
            "MyBooks", null,
            (r) => {
                if(r["status"]==0){
                    App.StaticState.alert.state = "block";
                    App.StaticState.alert.text = r["message"];
                    // App.StaticState.alert.mode = r["mode"];
                    App.StaticState.alert.mode = "#F5C26B";
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
    render() {
        return (
            <div className="page">
            <div className='tablediv'>
                <table className="table tableBookHistory">
                    <thead>
                        <tr>
                            <th scope="col">S.No</th>
                            <th scope="col">Account No</th>
                            <th scope="col">Book Name</th>
                            <th scope="col">Author Name</th>
                            <th scope="col">Issue Date</th>
                            <th scope="col">Due Date</th>
                            <th scope="col">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.Books.map((book, index) => {
                            return (<tr key={index}>
                                <th scope="row">{index+1}</th>
                                <td>{book.account_no}</td>
                                <td>{book.name}</td>
                                <td>{book.author}</td>
                                <td>{book.issue_date}</td>
                                <td>{book.issue_date}</td>
                                <td><button className='libbtn loginbtn btn mt-0' onClick={
                                    () => {
                                        this.returnRequest(book.id);
                                    }
                                }>Return</button></td>
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
