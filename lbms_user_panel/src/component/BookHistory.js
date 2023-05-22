import React, { Component } from 'react'
import App from '../App';
import Network from '../Network';

export default class BookHistory extends Component {
    constructor(props) {
        super(props);
        this.state = {
            Books: []
        }
    }
    componentDidMount() {
        new Network().hit(
            "BookHistory", null,
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
    render() {
        return (
            <div className="page">
            <div className='tablediv'>
                <table className="table tableBookHistory">
                    <thead>
                        <tr>
                            <th scope="col">S.No</th>
                            <th scope="col">Book Name</th>
                            <th scope="col">Author Name</th>
                            <th scope="col">Issue Date</th> 
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.Books.map((book, index) => {
                            return (<tr key={index}>
                                <th scope="row">{index+1}</th>
                                <td>{book.name}</td>
                                <td>{book.author}</td>
                                <td>{book.issue_date}</td> 
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
