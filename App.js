import React, { Component } from 'react';
import Titles from './components/Titles';
import Form from './components/Form';
import Weather from './components/Weather';

const API_KEY = '06d5ab1d8e5497a02d59a04f0d3834b1';

class App extends Component {

  state = {
    temperature: undefined,
    city: undefined,
    country: undefined,
    humidity: undefined,
    description: undefined,
    long: undefined,
    lat: undefined,
    error: undefined,
    designed: `<p>Designed by <a href='https://twitter.com/augustus_best09'>AugustineBest</a></p>`
  }

  getWeather = async (e) => {
    e.preventDefault();
    const city = e.target.elements.city.value;
    const country = e.target.elements.country.value;
    const api_call = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${API_KEY}`)
    const data = await api_call.json();

    if(city && country) {

      console.log(data);

      this.setState({
        city: data.class,
        country: data.sys.country,
        temperature: data.main.temp,
        humidity: data.main.humidity,
        description: data.weather[0].description,
        long: data.coord.lon,
        lat: data.coord.lat,
        error: ""
      });
    } else {
      this.setState({
        temperature: undefined,
        city: undefined,
        country: undefined,
        humidity: undefined,
        description: undefined,
        long: undefined,
        lat: undefined,
        error: 'Oops! Please put in the location.'
      });
    }

  }
  render() {
    return (
      <div>
        <div className='wrapper'>
          <div className='main'>
            <div className='container'>
              <div className='row'>
                  <div className='col-xs-5 title-container'>
                    <Titles />
                  </div>
                  <div className='col-xs-7 form-container'>
                  <Form getWeather={this.getWeather}/>
                    <Weather 
                      temperature={this.state.temperature}
                      city={this.state.city}
                      country={this.state.country}
                      humidity={this.state.humidity}
                      description={this.state.description}
                      long={this.state.long}
                      lat={this.state.lat}
                      error={this.state.error}
                    />
                    
                  </div>
              </div>
            </div>
          </div>
        </div>
        </div>
    );
  }
}

// {/* <div className="App">
//       </div> */}
export default App;
