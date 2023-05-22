import React, { Component } from 'react'
import Network from '../Network';

export default class BookSummary extends Component {

    constructor(props) {
        super(props);
        this.state = {
            totalBook: 0,
            issueBook: 0,
            current: 0,
            due: 0
        };

    }
    componentDidMount() {
        new Network().hit(
            "BookSummary",
            null,
            (r) => {
                if (r["status"]) {
                    this.setState({
                        totalBook: r["data"]["totalBook"],
                        issueBook: r["data"]["issuedBook"],
                        current: r["data"]["availableBook"],
                        due: r["data"]["bookType"],
                    });
                }
            }
        )
    }
    render() {
        return (
            <div className='page'>
                <div className='row summary'>
                    <div className='col card summarycard'>
                        <h3 class="card-heading ">Total</h3>
                        <h2 class="card-data" id="totalBook">{this.state.totalBook}</h2>
                    </div>
                    <div className='col card summarycard'>
                        <h3 class="card-heading">Issued</h3>
                        <h2 class="card-data" id="issueBook">{this.state.issueBook}</h2>
                    </div>
                </div>
                <div className='row summary'>
                    <div className='col card summarycard'>
                        <h3 class="card-heading">Available</h3>
                        <h2 class="card-data" id="current">{this.state.current}</h2>
                    </div>
                    <div className='col card summarycard'>
                        <h3 class="card-heading">Users</h3>
                        <h2 class="card-data" id="due">{this.state.due}</h2>
                    </div>
                </div>
            </div>
        )
    }
}
