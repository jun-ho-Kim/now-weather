import React from 'react';
import Loading from './Loading';
import * as Location from 'expo-location';
import axios from './node_modules/axios';

API_KEY = "2d99eca102828273dc94e13bb94a2cf4";

export default class extends React.Component {
  state = {
    isLoading: true
  };
  getWeather = async (lat, lon) => {
    const data = await axios.get(
    `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}`
    );
    console.log("data:", data);
  };
  getLocation = async () => {
    try{
      const response = await Location.requestPermissionsAsync();
      console.log(response);
      const {coords: {latitude, longitude}} = await Location.getCurrentPositionAsync();
      console.log(latitude, longitude);
      this.getWeather(latitude, longitude);
      this.setState({isLoading : false});
    } catch (error) {
      alert("Can`t find you.", " So sad");
  } 
  }
  componentDidMount() {
    this.getLocation();
  }
  render() {
    const {isLoading} = this.state;
    return isLoading ? <Loading /> : null;
  }
}
