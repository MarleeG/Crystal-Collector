import React, { Component } from 'react';
import { ListGroup, ListGroupItem, Grid, Row } from 'react-bootstrap';

import Header from './components/header';
import Crystals from './components/crystals';
import RedCrystal from './components/assets/red_crystal.png';
import BlueCrystal from './components/assets/blue_crystal.png';
import GreenCrystal from './components/assets/green_crystal.png';
import BlackCrystal from './components/assets/black_crystal.png';

class App extends Component {
  constructor(props) {
    super(props);
    this.generateRandomNumber = this.generateRandomNumber.bind(this);
    this.generateCrystalValues = this.generateCrystalValues.bind(this);
    this.addCrystalValue = this.addCrystalValue.bind(this);
    this.checkingScore = this.checkingScore.bind(this);
    this.newCrystalValues = this.newCrystalValues.bind(this);
    // this.checkCrystalValues = this.checkCrystalValues.bind(this);


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
      losses: 0
    }
  }

  componentDidMount() {
    this.setState({
      randomNumber: this.generateRandomNumber()
    })
    // this.checkCrystalValues();
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
    // this.checkCrystalValues()
  }

  // checkCrystalValues(){
  //   var crystals = this.state.crystals;

  //   crystals.map((element, index) => {
  //     crystals.map((item, i) =>{
  //       if (element.value === item.value && index !== i){
  //         console.log('Previous values: ' ,this.state.crystals);
  //         this.newCrystalValues().then(() =>  console.log('adter Previous values: ' ,this.state.crystals));
  //       }
  //     })
  //   })
  // }

  addCrystalValue(crystal, value) {
    console.log(`crystal: ${crystal} || value: ${value}`)
    this.setState({
      userTotal: this.state.userTotal + value
    }, () => this.checkingScore())
  }

  checkingScore() {
    if (this.state.randomNumber === this.state.userTotal) {
      this.setState({
        wins: this.state.wins + 1,
        userTotal: 0,
        randomNumber: this.generateRandomNumber()
      })
      this.newCrystalValues();
    } else if (this.state.randomNumber < this.state.userTotal) {
      this.setState({
        losses: this.state.losses + 1,
        userTotal: 0,
        randomNumber: this.generateRandomNumber()
      })
      this.newCrystalValues();
    }
  }

  render() {
    return (
      <div>
        <Header />

        <div>
          <div>
            <ListGroup>
              <ListGroupItem><h4 className='text-center'>Random Number: {this.state.randomNumber}</h4></ListGroupItem>
              <ListGroupItem><h4 className='text-center'>Total: {this.state.userTotal}</h4></ListGroupItem>
            </ListGroup>
          </div>


          <Grid>
            <Row className="show-grid">
              <Crystals addCrystalValue={(crystal, value) => this.addCrystalValue(crystal, value)} crystals={this.state.crystals} />

            </Row>
          </Grid>

          <div>
            <ListGroup>
              <ListGroupItem><h4 className='text-center' >Wins: {this.state.wins}</h4></ListGroupItem>
              <ListGroupItem> <h4 className='text-center'>Losses: {this.state.losses}</h4></ListGroupItem>
            </ListGroup>
          </div>

        </div>
      </div>
    );
  }
}

export default App;
