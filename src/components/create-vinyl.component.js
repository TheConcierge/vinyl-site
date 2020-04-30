import React, { Component } from 'react';
import axios from 'axios';
import Discojs from 'discojs'

const client = new Discojs({
    userToken: process.env.USER_TOKEN,
})

export default class CreateVinyl extends Component {
    constructor(props) {
        super(props);

        this.onChangeVinylImgUrl = this.onChangeVinylImgUrl.bind(this);
        this.onChangeVinylTitle = this.onChangeVinylTitle.bind(this);
        this.onChangeVinylArtist = this.onChangeVinylArtist.bind(this);
        this.onChangeVinylOwner = this.onChangeVinylOwner.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            vinyl_img_url: '',
            vinyl_title: '',
            vinyl_artist: '',
            vinyl_owner: ''
        }
    }
 
    onChangeVinylImgUrl(e) {
        this.setState({
            vinyl_img_url: e.target.value
        });
    }

    onChangeVinylTitle(e) {
        this.setState({
            vinyl_title: e.target.value
        });
    }

    onChangeVinylArtist(e) {
        this.setState({
            vinyl_artist: e.target.value
        });
    }

    onChangeVinylOwner(e) {
        this.setState({
            vinyl_owner: e.target.value
        });
    }

    onSubmit(e) {
        e.preventDefault();

        console.log('Form submitted:');
        console.log(`Vinyl Img Url: ${this.state.vinyl_img_url}`);
        console.log(`Vinyl Title: ${this.state.vinyl_title}`);
        console.log(`Vinyl Artist: ${this.state.vinyl_artist}`);
        console.log(`Vinyl Owner: ${this.state.vinyl_owner}`);
       
        const newVinyl = {
            vinyl_img_url: this.state.vinyl_img_url,
            vinyl_title: this.state.vinyl_title,
            vinyl_artist: this.state.vinyl_artist,
            vinyl_owner: this.state.vinyl_owner
        }

        //axios.post('http://localhost:4000/vinyl/add', newVinyl)
        //    .then(res => console.log(res.data));

        this.setState({
            vinyl_img_url: '',
            vinyl_title: '',
            vinyl_artist: '',
            vinyl_owner: '' 
        })
    }
    
    render() {
        return (
            <div style={{marginTop: 10}}>
                <h3>Create New Vinyl</h3>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group"> 
                        <label>ImgUrl: </label>
                        <input  type="text"
                                className="form-control"
                                value={this.state.vinyl_img_url}
                                onChange={this.onChangeVinylImgUrl}
                                />
                    </div>
                    <div className="form-group">
                        <label>Title: </label>
                        <input 
                                type="text" 
                                className="form-control"
                                value={this.state.vinyl_title}
                                onChange={this.onChangeVinylTitle}
                                />
                    </div>
                    <div className="form-group"> 
                        <label>Artist: </label>
                        <input 
                                type="text" 
                                className="form-control"
                                value={this.state.vinyl_artist}
                                onChange={this.onChangeVinylArtist}
                                />
                    </div>
                    <div className="form-group"> 
                        <label>Owner: </label>
                        <input 
                                type="text" 
                                className="form-control"
                                value={this.state.vinyl_owner}
                                onChange={this.onChangeVinylOwner}
                                />
                    </div>

                    <div className="form-group">
                        <input type="submit" value="Add vinyl" className="btn btn-primary" />
                    </div>
                </form>
            </div>
        )
    }
}
