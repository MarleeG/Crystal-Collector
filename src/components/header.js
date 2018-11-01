import React, { Component } from 'react';
import { Jumbotron } from 'react-bootstrap';
import './styles.css';

class Header extends Component {
    render() {
        return (
            <div>
                <Jumbotron>
                    <h1 className='header text-center'>Crystal Colletor</h1>
                </Jumbotron>

            </div>
        )
    }
}

const styles = {
    text: {
        // fontFamily: 'Satisfy', cursive; 
    }
}

export default Header;