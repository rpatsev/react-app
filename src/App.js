import 'bootstrap/dist/css/bootstrap.css';
import {Navbar, NavItem, Nav, Grid, Row, Col} from "react-bootstrap"; 
import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';


const CITIES = [
  {name: "Kharkiv", zip : "61145"},
  {name: "Moscow", zip : "119002"},
  {name: "Mountain View", zip : "94040"},
  {name: "Mexico City", zip : "56273"},
  {name: "Honolulu", zip : "96803"},
];



class WeatherDisplay extends Component {
  constructor(){
    super();
    this.state = {
      weatherData: null
    };
  }

  componentDidMount(){
    const zip = this.props.zip;
    const URL = "http://api.openweathermap.org/data/2.5/weather?q=" +
      zip +
      "&appid=b1b35bba8b434a28a0be2a3e1071ae5b&units=metric";
      fetch(URL).then(res => res.json()).then(json=>
        {this.setState({weatherData: json});
      });
  }

  render () {
        const weatherData = this.state.weatherData;
        if(!weatherData) return <div>Loading...</div>;
        const weather = weatherData.weather[0];
        const iconUrl = "http://openweathermap.org/img/w/" + weather.icon + ".png";
    return (
        <div>
          <h1>
            {weather.main} in {weatherData.name}
            <img src= {iconUrl} alt={weatherData.description} />
          </h1>
          <p>Current: {weatherData.main.temp} &deg;C</p>
          <p>High: {weatherData.main.temp_max} &deg;C</p>
          <p>Low: {weatherData.main.temp_min} &deg;C</p>
          <p>Wind Speed: {weatherData.wind.speed} m/s</p>
        </div>
      )
  }
}

class App extends Component {
  constructor(){
    super();
    this.state = {
      activeCity: 0,
    };
  }
  render() {
    const activeCity = this.state.activeCity;
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
          <h2>Hey, buddy!</h2>
          <h3>Wanna know what`s the weather like in your city? :)</h3> 
        </header>
        <hr/>
        <div>
          <Navbar>
            <Navbar.Header>
              <Navbar.Brand>
                React Weather App
              </Navbar.Brand>
            </Navbar.Header>
          </Navbar>
          <Grid>
            <Row>
              <Col md={4} sm={4} >
                <h3>Select a city</h3>
                <Nav bsStyle = "pills" 
                     stacked 
                     activeKey = "{activeCity}"
                     onSelect={index => {this.setState({activePlace: index});
                   }}
                >
              {CITIES.map((city, index) => (
                <NavItem key={index} eventKey={index}>{city.name}</NavItem>
              ))}
              </Nav>
             </Col>
             <Col md={8} sm={8}>
              <WeatherDisplay
                key={activeCity}
                zip={CITIES[activeCity].zip}
              />
              </Col>
            </Row>
          </Grid>
        </div>

      </div>
    );
  }
}

export default App;
