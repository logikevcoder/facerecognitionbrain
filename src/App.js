import React, { Component } from 'react';
import Navigation from './components/Navigation/Navigation';
import Rank from './components/Rank/Rank';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import Signin from './components/Signin/Signin';
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
      imageUrl: '',
      box: {},
      route: 'signin'
    }
  }

  onRouteChange = (route) => {
    this.setState({route: route});
  }

  calculateFaceLocation = (data) => {
    const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById('inputImage');
    const width = Number(image.width);
    const height = Number(image.height);
    return { // return object below
      leftCol: clarifaiFace.left_col * width,
      topRow: clarifaiFace.top_row * height,
      rightCol: width - (clarifaiFace.right_col * width),
      bottomRow: height - (clarifaiFace.bottom_row * height),
    }
  }

  displayFaceBox = (box) => {
    console.log(box);
    this.setState({box: box});
  }

  onInputChange = (event) => {
    this.setState({input: event.target.value});
  }

  onButtonSubmit = () => {
    this.setState({imageUrl: this.state.input}); // setting the button click to use the target value for the image
    app.models
    .predict(
      Clarifai.FACE_DETECT_MODEL, 
      this.state.input) // takes whatever is in input (image src) and displaying it
    .then(response => this.displayFaceBox(this.calculateFaceLocation(response)))
    .catch(err => console.log(err));  
  }
  render() {
    return (
      <div className="App">

      <Particles className='particles' 
        params={particlesOptions}
      />

        <Navigation onRouteChange={this.onRouteChange} />
        { this.state.route === 'signin' 
          ? <Signin onRouteChange={this.onRouteChange} />
          : <div>
              <Logo />
              <Rank />
              <ImageLinkForm 
                onInputChange={this.onInputChange} 
                onButtonSubmit={this.onButtonSubmit}
              />
              <FaceRecognition box={this.state.box} imageUrl={this.state.imageUrl} />
            </div>
        }
      </div>
    );
  }
}

export default App;
