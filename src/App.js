import React, { Component } from 'react';
import Navigation from './components/Navigation/Navigation';
import Rank from './components/Rank/Rank';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import Particles from 'react-particles-js';
import Clarifai from 'clarifai';

import Logo from './components/Logo/Logo';
import './App.css';

const app = new Clarifai.App({
  apiKey: 'c3dc9bc633aa4d5a82762aec4d3ade0f'
});

const particlesOptions = {
  particles: {
    number: {
      value: 30,
      density: {
        enable: true,
        value_area:800
      }
    },
    line_linked: {
      shadow: {
        enable: true,
        color: "black",
        blur: 5
      }
    }
  }
}
              
class App extends Component {

  constructor() {
    super();
    this.state = {
      input: '',
      imageUrl: ''
    }
  }

  onInputChange = (event) => {
    this.setState({input: event.target.value});
  }

  onButtonSubmit = () => {
    console.log("click");
    // this.setState({imageUrl: this.state.input});
    app.models
    .predict(
      Clarifai.COLOR_MODEL, 
      this.state.input)
    .then(
      function (response) {
        console.log(response);
      },
      function (err) {
        console.log("Something went wrong")
      }
    );
  }
  render() {
    return (
      <div className="App">

      <Particles className='particles' 
        params={particlesOptions}
      />

        <Navigation />
        <Logo />
        <Rank />
        <ImageLinkForm 
          onInputChange={this.onInputChange} 
          onButtonSubmit={this.onButtonSubmit}
        />
        <FaceRecognition imageUrl={this.state.imageUrl} />
      </div>
    );
  }
}

export default App;
