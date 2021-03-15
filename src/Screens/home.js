



/*import React, { useState, useEffect } from 'react';
import { Text, View,ImageBackground,StyleSheet } from 'react-native';
import * as Location from 'expo-location';

/*export default function HomeScreen() {
  
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
    })();
  }, []);

  let text = 'Waiting..';
  if (errorMsg) {
    text = errorMsg;
  } else if (location) {
    text = JSON.stringify(location);
  }

  return (
    
    
      <ImageBackground  source={require("./bg.jpg")} style={styles.image}>
      <View style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center'
        }}>
           <View style={styles.container}>
      <Text style={styles.paragraph}>{text}</Text>
    </View>
        
      </View>
      </ImageBackground>
    );
 
  
}
const styles = StyleSheet.create({

  image: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center"
  },

}
)
/*import React, { Component } from 'react';
import {
  Platform,
  Text,
  View,
  StyleSheet,
  Button,
  Linking,
  AppState
} from 'react-native';
import { Constants, Location, Permissions, IntentLauncherAndroid } from 'expo';
import Modal from 'react-native-modal';
export default class HomeScreen extends Component {
  state = {
    location: null,
    errorMessage: null,
    isLocationModalVisible: false,
    appState: AppState.currentState
  };

  componentWillUnmount() {
    AppState.removeEventListener('change', this.handleAppStateChange);
  }

  handleAppStateChange = nextAppState => {
    if (
      this.state.appState.match(/inactive|background/) &&
      nextAppState === 'active'
    ) {
      console.log('App has come to the foreground!');
      this._getLocationAsync();
    }
    this.setState({ appState: nextAppState });
  };

  componentWillMount() {
    AppState.addEventListener('change', this.handleAppStateChange);
    if (Platform.OS === 'android' && !Constants.isDevice) {
      this.setState({
        errorMessage:
          'Oops, this will not work on Sketch in an Android emulator. Try it on your device!'
      });
    } else {
      this._getLocationAsync();
    }
  }

  _getLocationAsync = async () => {
    try {
      let { status } = await Permissions.askAsync(Permissions.LOCATION);
      if (status !== 'granted') {
        this.setState({
          errorMessage: 'Permission to access location was denied'
        });
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      this.setState({ location });
    } catch (error) {
      let status = Location.getProviderStatusAsync();
      if (!status.locationServicesEnabled) {
        this.setState({ isLocationModalVisible: true });
      }
    }
  };

  openSetting = () => {
    if (Platform.OS == 'ios') {
      Linking.openURL('app-settings:');
    } else {
      IntentLauncherAndroid.startActivityAsync(
        IntentLauncherAndroid.ACTION_LOCATION_SOURCE_SETTINGS
      );
    }
    this.setState({ openSetting: false });
  };

  render() {
    let text = 'Waiting..';
    if (this.state.errorMessage) {
      text = this.state.errorMessage;
    } else if (this.state.location) {
      text = JSON.stringify(this.state.location);
    }

    return (
      <View style={styles.container}>
        <Modal
          onModalHide={this.state.openSetting ? this.openSetting : undefined}
          isVisible={this.state.isLocationModalVisible}
        >
          <View
            style={{
              height: 300,
              width: 300,
              backgroundColor: 'white',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <Button
              onPress={() =>
                this.setState({
                  isLocationModalVisible: false,
                  openSetting: true
                })
              }
              title="Enable Location Services"
            />
          </View>
        </Modal>
        <Text style={styles.paragraph}>{text}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#ecf0f1'
  },
  paragraph: {
    margin: 24,
    fontSize: 18,
    textAlign: 'center'
  }
});*/
import React from 'react';
import { StyleSheet, Text, View, SafeAreaView, Image } from 'react-native';
 // step 1 - import Map view
import Polyline from '@mapbox/polyline' // step 9 - import polyline to drawline on the map
const locations = require('./location.json') // step 7 - import json for markers
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import * as Permissions from 'expo-permissions'
import MapView from 'react-native-maps'
const API_KEY = 'AIzaSyD-cylYXk7D3NvvOEhscctAk0PRJTdAOLk'
const baseURL = 'https://maps.googleapis.com/maps/api/directions/json'

const EDGE_PADDING = {
  top: 100,
  right: 100,
  bottom: 200,
  left: 100
}

export default class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = { //Step 2 - set state for lat and long
      latitude: null,
      longitude: null,
      destLatitude: null,
      destLongitude: null,
      coords: [],
      duration: '',
      distance: '',
      from: '',
      to: '',
      showPlacesList: false, //dismiss listview
      locations: locations // step 8 - add locations
    }
  }

  async componentDidMount() { //step 3 - get permissions 
    const { status } = await Permissions.getAsync(Permissions.LOCATION)
    if (status !== 'granted') {
      const res = await Permissions.askAsync(Permissions.LOCATION)
    }

    navigator.geolocation.getCurrentPosition( // step 4 - get current location  
      ({ coords: { latitude, longitude } }) => this.setState({ latitude, longitude }),
      (error) => console.log('error', error),
      { enableHighAccuracy: true, maximumAge: 2000, timeout: 20000 }
    )
  }


  //setp 11
  geDirections = async (startLoc, desPlaceID) => {
    console.log("--------------------------------------------------------")
    console.log(startLoc,desPlaceID)
    try {
      const res = await fetch(`${baseURL}?origin=${startLoc}&destination=place_id:${desPlaceID}&mode=transit&key=${API_KEY}`)
      const resJson = await res.json()
      console.log("+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++")
      console.log(resJson.routes)
      this.setState({
        isLoading: false
      });
      this.setState({
        destLatitude: resJson.routes[0].legs[0].end_location.lat,
        destLongitude: resJson.routes[0].legs[0].end_location.lng,
        duration: resJson.routes[0].legs[0].duration.text,
        distance: resJson.routes[0].legs[0].distance.text,
        from: resJson.routes[0].legs[0].start_address,
        to: resJson.routes[0].legs[0].end_address
      })  /// set end point marker
      console.log("********************************************************************8")
      console.log(resJson.routes[0].legs[0].duration.text)
      const points = Polyline.decode(resJson.routes[0].overview_polyline.points)
      const coords = points.map(point => {
        return {
          latitude: point[0],
          longitude: point[1]
        }
      })
      this.setState({ coords })
      const options = {
        edgePadding: EDGE_PADDING,
      }
      this.map.fitToCoordinates(coords, options) //fit all points
    } catch (error) {
      console.log('error:', error)
    }
  }

  renderModalContent = () => (
    <View style={styles.modalContent}>
      <Text>Hello!</Text>
    </View>
  );

  render() {
    const { latitude, longitude } = this.state
    if (latitude) { //step 5 - check if latitude and long is available
      return (
        <SafeAreaView style={styles.container}>
          <MapView
            style={{ flex: 1 }}
            ref={map => { this.map = map; }} // create ref to allow us to acess map anywhere
            showsUserLocation //step 6 - view user location marker 
            initialRegion={{
              latitude,
              longitude,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421
            }}
            zoomEnabled
            //   mapType="mutedStandard"
            provider="google"
            style={styles.map}
          >
            <MapView.Polyline
              strokeWidth={3}
              strokeColor="#be2edd"
              lineJoin="bevel"
              coordinates={this.state.coords}
            />
            {this.state.destLatitude &&
              <MapView.Marker
                coordinate={{
                  latitude: this.state.destLatitude,
                  longitude: this.state.destLongitude,
                }}

                // pinColor="#000"
                image={require('./marker.png')}
              />}
          </MapView>
          <GooglePlacesAutocomplete
            placeholder='Enter Destination'
            minLength={2}
            autoFocus={false}
            returnKeyType={'search'} // Can be left out for default return key https://facebook.github.io/react-native/docs/textinput.html#returnkeytype
            listViewDisplayed='false'    // true/false/undefined
            fetchDetails={true}
            renderDescription={row => row.description} // custom description render
            onPress={(data, details = null) => { // 'details' is provided when fetchDetails = true
            console.log("1111111111111111111111111111111111111111111111111111");
              console.log(data, details);
              console.log(latitude,longitude,data.place_id)

              this.geDirections(`${latitude},${longitude}`, data.place_id)
            }}

            getDefaultValue={() => ''}

            query={{
              key: API_KEY,
              language: 'en',
              types: 'address',
              components: 'country:in' //specify the country
            }}

            styles={{
              textInputContainer: {
                backgroundColor: 'rgba(0,0,0,0)',
                borderTopWidth: 0,
                borderBottomWidth: 0
              },
              textInput: {
                marginLeft: 15,
                marginRight: 15,
                borderRadius: 0,
                height: 38,
                color: '#5d5d5d',
                fontSize: 16
              },
              predefinedPlacesDescription: {
                color: '#1faadb'
              },
              listView: {
                backgroundColor: '#fff',
                marginLeft: 15,
                marginRight: 15,
              }
            }}

            /*  currentLocation={true} // Will add a 'Current location' button at the top of the predefined places list
             currentLocationLabel="Current location" */
            nearbyPlacesAPI='GooglePlacesSearch' // Which API to use: GoogleReverseGeocoding or GooglePlacesSearch
            GoogleReverseGeocodingQuery={{
              // available options for GoogleReverseGeocoding API : https://developers.google.com/maps/documentation/geocoding/intro
            }}
            
            GooglePlacesSearchQuery={{
              
              
              

              API:`https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${latitude},${longitude}&radius=1500&type=eye hospitals&keyword=cruise&key=${API_KEY}`,
              rankby: 'distance',
              types: 'eye hospital'
            }}

            filterReverseGeocodingByTypes={['locality', 'administrative_area_level_3']} // filter the reverse geocoding results by types - ['locality', 'administrative_area_level_3'] if you want to display only cities
            //  predefinedPlaces={[homePlace, workPlace]}

            debounce={200} // debounce the requests in ms. Set to 0 to remove debounce. By default 0ms.
          /*  renderLeftButton={() => <Image source={require('path/custom/left-icon')} />}
           renderRightButton={() => <Text>Custom text after the input</Text>} */
          />
          {this.state.destLatitude &&
            <View style={styles.bottomModal}>
              <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-around', }}>
                <View style={{ alignItems: 'center' }}>
                  <Image source={require('./timer.png')} style={styles.icons} resizeMode='contain' />
                  <Text style={styles.modalHeaderText}>Estimated Duration</Text>
                  <Text style={styles.tripDetails}>{this.state.duration}</Text>
                </View>
                <View style={{ alignItems: 'center' }}>
                  <Image source={require('./map-points.png')} style={styles.icons} resizeMode='contain' />
                  <Text style={styles.modalHeaderText}>Distance</Text>
                  <Text style={styles.tripDetails}>{this.state.distance}</Text>
                </View>
              </View>
              <View style={{ flex: 1, flexDirection: 'column', justifyContent: 'space-around' }}>
                <View style={{ marginLeft: 15 }}>
                  <Text style={styles.modalHeaderText}>Form:</Text>
                  <Text style={styles.tripDetails}>{this.state.from}</Text>
                </View>
                <View style={{ marginLeft: 15 }}>
                  <Text style={styles.modalHeaderText}>To:</Text>
                  <Text style={styles.tripDetails}>{this.state.to}</Text>
                </View>
              </View>
            </View>
          }
        </SafeAreaView>

      )
    } else {
      return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Text>Enable LOCATION</Text>
        </View>
      )
    }
  }
}

const styles = StyleSheet.create({
  suggestions: {
    backgroundColor: "white",
    padding: 5,
    fontSize: 18,
    borderWidth: 0.5,
    marginLeft: 5,
    marginRight: 5
  },
  destinationInput: {
    height: 40,
    borderWidth: 0.5,
    marginTop: 50,
    marginLeft: 5,
    marginRight: 5,
    padding: 20,
    backgroundColor: "white"
  },
  container: {
    height:"85%",
    marginTop:30
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  /* Moadal */
  bottomModal: {
    justifyContent: "flex-end",
    margin: 0,
    paddingTop: 10,
    height: 195,
    backgroundColor: '#fff'
  },
  modalContent: {
    backgroundColor: "white",
    padding: 22,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 4,
    borderColor: "rgba(0, 0, 0, 0.1)",
  },
  icons: {
    width: 32,
    margin: 0,
    height: 32
  },
  modalHeaderText: {
    fontWeight: '800',
    fontSize: 12,
    color: '#be2edd'
  },
  tripDetails: {
    color: '#5d5d5d',
    fontSize: 12
  }

});