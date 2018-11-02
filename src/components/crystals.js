import React, { Component } from 'react';
import { Col } from 'react-bootstrap';


class Crystals extends Component {
    constructor(props) {
        super(props);
        this.showCrystals = this.showCrystals.bind(this);
    }

    showCrystals() {
        return (
            this.props.crystals.map((element, i) => {
                return (
                    <Col sm={6} md={3} key={i} >
                        <img onClick={() => this.props.addCrystalValue(element.crystal, element.value)} src={element.img} alt={element.crystal} width="100" height="auto" />
                    </Col>
                )
            })
        )
    }

    render() {
        return (
            <div>
                {this.showCrystals()}
            </div>
        )
    }
}

export default Crystals;