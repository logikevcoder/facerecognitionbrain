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
      input: ''
    }
  }

  onInputChange = (event) => {
    console.log(event);
  }

  onButtonSubmit = () => {
    app.models.predict(
      "a403429f2ddf4b49b307e318f00e528b", 
      "https://samples.clarifai.com/face-det.jpg")
      .then(
      function (response) {
        console.log(response);
      },
      function (err) {
        // there was an error
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
        onInputChange = {this.onInputChange} 
        onButtonSubmit = {this.onButtonSubmit}/>
        <FaceRecognition />
      </div>
    );
  }
}

export default App;
