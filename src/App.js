import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';


const CITIES = [
  {name: "Palo Alto", zip : "94303"},
  {name: "San Jose", zip : "94088"},
  {name: "Santa Cruz", zip : "95062"},
  {name: "Honolulu", zip : "96803"},
];


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
        </header>
        {CITIES.map((city, index) => (
          <button key={index} onClick={() => {this.setState({activeCity: index});
        }}>
            {city.name}
          </button>
        ))}
        <WeatherDisplay
          key={activeCity}
          zip={CITIES[activeCity].zip}
        />
      </div>
    );
  }
}

class WeatherDisplay extends Component {
  constructor(){
    super();
    this.state = {
      weatherdata: null
    };
  }

  componentDidMount(){
    const zip = this.props.zip;
    const URL = "http://api.openweathermap.org/data/2.5/weather?q=" +
      zip +
      "&appid=b1b35bba8b434a28a0be2a3e1071ae5b&units=imperial";
      fetch(URL).then(res => res.json()).then(json=>
        {this.setState({weatherData: json});
      });
  }

  render () {
    return (
        const weatherData = this.state.weatherData;
        if(!weatherData) return <div>Loading...</div>;
        return <div>{JSON.stringify(weatherData)}</div>;
      )
  }
}

export default App;
