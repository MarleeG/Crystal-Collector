import React, { Component } from 'react';
import { Jumbotron } from 'react-bootstrap';
import './styles.css';

class Header extends Component {
    render() {
        return (
            <div>
                <Jumbotron className='jumbotron'>
                    <h1 className='header text-center'>Crystal Collector</h1>
                </Jumbotron>
            </div>
        )
    }
}

export default Header;