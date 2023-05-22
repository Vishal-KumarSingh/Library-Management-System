import React, { Component } from 'react'

export default class ManageAccounts extends Component {
    render() {
        return (
            <div className="page" >
                <table className="table">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Book Name</th>
                            <th scope="col">Author Name</th>
                            <th scope="col">Issue Date</th>
                            <th scope="col">Return Date</th>
                            <th scope="col">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <th scope="row">1</th>
                            <td>Mark</td>
                            <td>Otto</td>
                            <td>@mdo</td>
                            <td>@mdo</td>
                            <td><button className='btn btn-primary m-2'>Edit</button><button className='btn btn-danger m-2'>Delete</button></td>

                        </tr>
                        <tr>
                            <th scope="row">2</th>
                            <td>Jacob</td>
                            <td>Thornton</td>
                            <td>@fat</td>
                            <td>@fat</td>
                            <td><button className='btn btn-primary m-2'>Edit</button><button className='btn btn-danger m-2'>Delete</button></td>

                        </tr>
                        <tr>
                            <th scope="row">3</th>
                            <td>Larry</td>
                            <td>the Bird</td>
                            <td>@twitter</td>
                            <td>@twitter</td>
                            <td><button className='btn btn-primary m-2'>Edit</button><button className='btn btn-danger m-2'>Delete</button></td>

                        </tr>
                    </tbody>
                </table>
            </div>
        )
    }
}
