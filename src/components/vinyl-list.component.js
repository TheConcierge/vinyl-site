import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Vinyl = props => (
    <tr>
        <td>{props.vinyl.vinyl_img_url}</td>
        <td>{props.vinyl.vinyl_title}</td>
        <td>{props.vinyl.vinyl_artist}</td>
        <td>
            <Link to={"/edit/"+props.vinyl._id}>Edit</Link>
        </td>
    </tr>
)

export default class VinylList extends Component {
    
    constructor(props) {
        super(props);
        this.state = {vinyls: []};
    }
    
    componentDidMount() {
        axios.get('http://localhost:4000/vinyl/')
            .then(response => {
                this.setState({ vinyls: response.data });
            })
            .catch(function (error) {
                console.log(error);
            })
    }

    vinylList() {
        return this.state.vinyls.map(function(currentVinyl, i) {
            return <Vinyl vinyl={currentVinyl} key={i} />;
        })
    }

    render() {
        return (
            <div>
                <h3>Vinyl List</h3>
                <table className="table table-striped" style={{ marginTop: 20 }} >
                    <thead>
                        <tr>
                            <th>Cover</th>
                            <th>Title</th>
                            <th>Artist</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        { this.vinylList() }
                    </tbody>
                </table>
            </div>
        )
    }
}
