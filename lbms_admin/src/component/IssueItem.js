import React, { Component } from 'react' 
import App from '../App';
import Cookies from 'js-cookie'
import Sidebar from './Sidebar';
import Network from '../Network';
export default class IssueItem extends Component {

    constructor(props) {
        super(props);
        
    }
     render(){
        return (
                <div className='container container-fluid BookItems my-4' id={"item"+this.props.id}>
                    <div className='row'>
                        <div className='col col-sm-6'>
                            <div className='mb-3'>
                                <label className="form-label">Name</label>
                                <input type="text" value={this.props.name} className="form-control" disabled />
                            </div>
                            
                        </div>

                        <div className='col col-sm-6'>
                            <div className='mb-3'>
                                <label className="form-label">Email</label>
                                <input type="email" value={this.props.email} className="form-control" disabled/>
                            </div>
                        </div>
                        <div className="bookissue d-md-flex"> 
                        <div className='tablediv col-md-8 overflow-x-scroll'>
                      <table className="table tablesearch">
                                      <thead>
                                        <tr> 
                                            <th scope="col">Account No</th>
                                            <th scope="col">Book Name</th>
                                            <th scope="col">Author Name</th>
                                            <th scope="col">Issue Date</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr> 
                                            <td>{this.props.account}</td>
                                            <td>{this.props.book}</td>
                                            <td>{this.props.author}</td>
                                            <td>{this.props.issue}</td>
                                        </tr>
                                    </tbody>
                                </table>
                                </div>
                                <div className='issue-btn d-md-flex mt-4'>
                                <input type="button" className="form-control loginbtn libbtn mt-0" onClick={()=>{
                                     document.getElementById("item"+this.props.id).style.display="none";
                                    new Network().hit(
                            "AcceptIssueRequest", 
                            {id: this.props.id},
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
                    this.props.reload();
                }
                else{
                this.setState({
                    bookList: r["data"]
                });
            }
        });
                                }} value="Approve"/>
                                <input type="button" value="Deny" onClick={()=>{
                                     document.getElementById("item"+this.props.id).style.display="none";
                                     new Network().hit(
                            "DenyIssueRequest", 
                            {id: this.props.id},
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
                    
                }
                else{
                this.setState({
                    bookList: r["data"]
                });
            }
        });
                                
            }} className="form-control btn btn-danger m-md-2 my-2" />
                               </div>
                        </div>
                    </div>
                </div>
        
        );
    }
  }