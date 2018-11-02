import React, { Component } from 'react';
import { Grid, Row, Col, Modal, Button } from 'react-bootstrap';

import './App.css'
import Header from './components/header';
import Crystals from './components/crystals';
import RedCrystal from './components/assets/red_crystal.png';
import BlueCrystal from './components/assets/blue_crystal.png';
import GreenCrystal from './components/assets/green_crystal.png';
import BlackCrystal from './components/assets/black_crystal.png';

class App extends Component {
  constructor(props) {
    super(props);
    this.directionsModal = this.directionsModal.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.generateRandomNumber = this.generateRandomNumber.bind(this);
    this.generateCrystalValues = this.generateCrystalValues.bind(this);
    this.addCrystalValue = this.addCrystalValue.bind(this);
    this.checkingScore = this.checkingScore.bind(this);
    this.newCrystalValues = this.newCrystalValues.bind(this);

    this.state = {
      randomNumber: 0,
      crystals: [
        { crystal: 'Red', value: this.generateCrystalValues(), img: RedCrystal },
        { crystal: 'Blue', value: this.generateCrystalValues(), img: BlueCrystal },
        { crystal: 'Black', value: this.generateCrystalValues(), img: BlackCrystal },
        { crystal: 'Green', value: this.generateCrystalValues(), img: GreenCrystal }
      ],
      userTotal: 0,
      wins: 0,
      losses: 0,
      show: true,
      numberStyles:{
        borderColor: 'black'
      }
    }
  }

  componentDidMount() {
    this.setState({
      randomNumber: this.generateRandomNumber()
    })
  }

  generateRandomNumber() {
    return Math.floor(Math.random() * 102) + 19
  }

  generateCrystalValues() {
    return Math.floor(Math.random() * 12) + 1
  }

  newCrystalValues() {
    var crystals = this.state.crystals
    crystals.map(element => {
      return element.value = this.generateCrystalValues()
    })
  }

  addCrystalValue(crystal, value) {
    this.setState({
      userTotal: this.state.userTotal + value,
      numberStyles: {
        borderColor: crystal
      }
    }, () => this.checkingScore())
  }

  checkingScore() {
    if (this.state.randomNumber === this.state.userTotal) {
      this.setState({
        wins: this.state.wins + 1,
        userTotal: 0,
        randomNumber: this.generateRandomNumber(),
        numberStyles: {
          borderColor: 'black'
        }
      })
      this.newCrystalValues();
    } else if (this.state.randomNumber < this.state.userTotal) {
      this.setState({
        losses: this.state.losses + 1,
        userTotal: 0,
        randomNumber: this.generateRandomNumber(),
        numberStyles: {
          borderColor: 'black'
        }
      })
      this.newCrystalValues();
    }
  }

  handleClose() {
    this.setState({ show: false })
  }

  directionsModal() {
    return (
      <div >
        <Modal show={this.state.show} onHide={this.handleClose}>
          <Modal.Header>
            <Modal.Title className='text-center directions-title'>How to play</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p>You will be given a random number at the start of the game.</p>
            <p>There are four crystals to click on. By clicking on a crystal you will add a specific amount of points to your total score.</p>
            <p> You win the game by matching your total score to the random number, you lose the game if your total score goes above the random number.</p>
            <p>The value of each crystal is hidden from until you click on it.</p>
            <p>Each time when the game starts, the game will change the values of each crystal.</p>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={this.handleClose}>Close</Button>
          </Modal.Footer>
        </Modal>
      </div>
    )
  }

  render() {
    return (
      <div className='body'>
        <Header />
        {this.directionsModal()}
        <div>
          <Row className="show-grid">
            <Col md={6} mdPush={6}>
              <div className='numbers' style={this.state.numberStyles}>
                <h4 className='text-center' >Wins: {this.state.wins}</h4>
                <h4 className='text-center'>Losses: {this.state.losses}</h4>
              </div>
            </Col>
            <Col md={6} mdPull={6}>
              <div className='numbers' style={this.state.numberStyles}>
                <h4 className='text-center'>Random Number: {this.state.randomNumber}</h4>
                <h4 className='text-center'>Total: {this.state.userTotal}</h4>
              </div>
            </Col>
          </Row>

          <Grid>
            <Row className="show-grid">
              <Crystals addCrystalValue={(crystal, value) => this.addCrystalValue(crystal, value)} crystals={this.state.crystals} />
            </Row>
          </Grid>
        </div>
      </div>
    );
  }
}

export default App;