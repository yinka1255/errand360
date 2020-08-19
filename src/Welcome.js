import React, { Component  } from 'react';
import { AppState, View, Text, Alert, Image, Button, TextInput, StyleSheet,TouchableHighlight, ScrollView,BackHandler, ActivityIndicator, ImageBackground, StatusBar, TouchableOpacity, AsyncStorage } from 'react-native';
import {NavigationActions} from 'react-navigation';
import LinearGradient from 'react-native-linear-gradient';
import Modal from 'react-native-modal';
import { SERVER_URL } from './config/server';
import ImageSlider from 'react-native-image-slider';

export class Welcome extends Component {
  constructor(props) {
    super();
    this.handleBackPress = this.handleBackPress.bind(this);
    this.state = {
      radioButtons: ['Option1', 'Option2', 'Option3'],
      checked: 0,
      toggleUpdate: false,
      visible: false,
      forgotVisible: false,
      email: '',
      password: '',
      email1: '',
    }
    this.getLoggedInUser();
  }

  async componentDidMount() {
    
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackPress);
  }

  handleBackPress = () => {
    Alert.alert(
      "Confirm exit",
      "Are you sure you want to exit this app?",
      [
        {
          text: "Stay here",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel"
        },
        //{ text: "Go to home", onPress: () => this.props.navigation.navigate('Home') },
        { text: "Leave", onPress: () => BackHandler.exitApp() }
      ],
      //{ cancelable: false }
    );
    return true
  }

  componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', this.handleBackPress);
  }

  toggleUpdate(){
    if(this.state.toggleUpdate == true){
      this.setState({
        toggleUpdate: false
      })
    }else{
      this.setState({
        toggleUpdate: true
      })
    }
  }
  showAlert(type, message){
    Alert.alert(
      type,
      message,
    );
  }

  async getLoggedInUser(){
    await AsyncStorage.getItem('customer').then((value) => {
      if(value){
        this.props.navigation.navigate('Home')
        // this.setState({
        //   customer: JSON.parse(value)
        // }, () => {
        //   this.setState({
        //     customer_id: this.state.customer.id
        //   })
        // });
          
      }else{
        AsyncStorage.getItem('loginvalue').then((value) => {
          if(value){
            this.setState({
              email: value
            })
          }   
        });
      }
    });
  }
  showLoader(){
    this.setState({
      visible: true
    });
  }
  hideLoader(){
    this.setState({
      visible: false
    });
  }
  
  navigateToScreen = (route) => () => {
    const navigateAction = NavigationActions.navigate({
      routeName: route
    });
    this.props.navigation.dispatch(navigateAction);
  }
  static navigationOptions = {
      header: null
  }

  login(){
      this.showLoader();
      fetch(`${SERVER_URL}/mobile/login`, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            email: this.state.email,
            password: this.state.password,
        })
      }).then((response) => response.json())
          .then((res) => {
            this.hideLoader();
            if(res.success){
              AsyncStorage.setItem('customer', JSON.stringify(res.customer)).then(() => {
                AsyncStorage.setItem('loginvalue', this.state.email).then(() => {
                  this.props.navigation.navigate('Home')
                });
                //this.showAlert("error", res.error)
              });
            }else{
              this.showAlert("Error", res.error)
            }
    }).done();
  }

  forgot(){
      this.showLoader();
      fetch(`${SERVER_URL}/mobile/forgot_password_post`, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            email: this.state.email,
        })
      }).then((response) => response.json())
          .then((res) => {
            this.hideLoader();
            if(res.success){
              this.showAlert("success", res.success)
            }else{
              this.showAlert("Error", res.error)
            }
    }).done();
  }
  
  /*
  displayText(index){
    //if(index == 2){
      
      return(
        <TouchableHighlight
                    key={index}
                    underlayColor="#ccc"
                    onPress={() => move(index)}
                    style={styles.button}
                  >
          <Text style={styles.buttonSelected}>
            {index + 1}
          </Text>
        </TouchableHighlight>
      )
    //}
  } 
  */
 displayText(position, index){
   if(position == 0){
    return(
      <View  >
      <Text style={styles.buttonSelected}>
        ONLINE ORDER TRACKING
      </Text>
      <Text style={styles.buttonSelected1}>
        SWIPE LEFT TO LEARN MORE
      </Text>
      <Text style={styles.dot11}>
       .
       <Text style={styles.dot12}>.</Text>
       <Text style={styles.dot13}>.</Text>
      </Text>
      <View  style={styles.row}>
        <TouchableOpacity  onPress={() => this.props.navigation.navigate('Register')} style={styles.submitButton}>
          <Text style={styles.submitButtonText}>Register</Text>
        </TouchableOpacity>
        <TouchableOpacity  onPress={() => this.props.navigation.navigate('Login')} style={styles.submitButton1}>
          <Text style={styles.submitButtonText1}>Sign in</Text>
        </TouchableOpacity>
      </View>
      </View>
    )
   }
   
   else if(position == 1){
    return(
      <View  >
      <Text style={styles.buttonSelected}>
        NATIONWIDE DELIVERY SERVICE
      </Text>
      <Text style={styles.buttonSelected1}>
        SWIPE LEFT TO LEARN MORE
      </Text>
      <Text style={styles.dot21}>
       .
       <Text style={styles.dot22}>.</Text>
       <Text style={styles.dot23}>.</Text>
      </Text>
      <View  style={styles.row}>
        <TouchableOpacity  onPress={() => this.props.navigation.navigate('Register')} style={styles.submitButton}>
          <Text style={styles.submitButtonText}>Register</Text>
        </TouchableOpacity>
        <TouchableOpacity  onPress={() => this.props.navigation.navigate('Login')} style={styles.submitButton1}>
          <Text style={styles.submitButtonText1}>Sign in</Text>
        </TouchableOpacity>
      </View>
      </View>
    )
   }
   else if(position == 2){
    return(
      <View  >
      <Text style={styles.buttonSelected}>
        ONLINE DISPATCH SERVICE
      </Text>
      <Text style={styles.buttonSelected1}>
        SWIPE LEFT TO LEARN MORE
      </Text>
      <Text style={styles.dot31}>
       .
       <Text style={styles.dot32}>.</Text>
       <Text style={styles.dot33}>.</Text>
      </Text>
      <View  style={styles.row}>
        <TouchableOpacity  onPress={() => this.props.navigation.navigate('Register')} style={styles.submitButton}>
          <Text style={styles.submitButtonText}>Register</Text>
        </TouchableOpacity>
        <TouchableOpacity  onPress={() => this.props.navigation.navigate('Login')} style={styles.submitButton1}>
          <Text style={styles.submitButtonText1}>Sign in</Text>
        </TouchableOpacity>
      </View>
      </View>
    )
   }
   else{
     return (
       <View></View>
     )
   }
 }


  render() {
    const { visible } = this.state;
    const images = [
      require('./imgs/w1.png'),
      require('./imgs/w2.png'),
      require('./imgs/w3.png'),
    ];
    return (
      <View style = {styles.body}>
        <StatusBar translucent={true}  backgroundColor={'#8356C3'}  />
        <ImageSlider
          //loopBothSides
          //autoPlayWithInterval={3000}
          images={images}
          customSlide={({ index, item, style, width }) => (
            // It's important to put style here because it's got offset inside
            <View key={index} style={[style, styles.customSlide]}>
              <Image source = {item} style={styles.customImage} />
            </View>
          )}
          customButtons={(position, move) => (
            <View style={styles.buttons}>
              {images.map((image, index) => {
                return (
                  <TouchableOpacity
                    key={index}
                    //underlayColor="#ccc"
                    onPress={() => move(index)}
                    style={styles.button}
                  >
                    {this.displayText(position, index)}
                  </TouchableOpacity>
                );
              })}
            </View>
          )}
        />

        
        
      </View>
    )
  }
}

export default Welcome

const styles = StyleSheet.create ({
  container: {
    width: '100%',
  },
  body: {
    minHeight: '100%',
    backgroundColor: "#fff",
  },
  customImage: {
    width: '100%',
    height: '100%',
    backgroundColor: "#fff",
    zIndex: 0,
  },
  button: {
    position: 'absolute',
    bottom: 60,
    zIndex: 99999999,
    width: '90%',
    alignSelf: 'center',
    //backgroundColor: '#000',
  },
  buttonSelected: {
    zIndex: 99999999,
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    //marginBottom: 10,
  },
  buttonSelected1: {
    zIndex: 99999999,
    color: '#aaa',
    fontSize: 14,
    textAlign: 'center',
    //marginBottom: 10,
  },
  submitButton: {
    marginTop: 20,
    backgroundColor: '#ED6315',
    borderRadius: 10,
    width: '48%',
    alignSelf: 'center',
    paddingTop: 12,
    paddingBottom: 13,
    marginRight: 5,
  },
  submitButtonText: {
    color: '#fff',
    textAlign: 'center'
  },
  submitButton1: {
    marginTop: 20,
    //backgroundColor: '#ED6315',
    borderColor: '#fff',
    borderWidth: 1,
    borderRadius: 10,
    width: '48%',
    alignSelf: 'center',
    paddingTop: 12,
    paddingBottom: 13,
    marginLeft: 5,
  },
  submitButtonText1: {
    color: '#fff',
    textAlign: 'center'
  },
  row: {
    flexDirection: 'row',
    width: '100%',
  },
  dot11: {
    fontSize: 49,
    textAlign: 'center',
    color: '#fff',
    paddingLeft: 5,
  },
  dot12: {
    fontSize: 49,
    color: '#555',
    paddingLeft: 5,
  },
  dot13: {
    fontSize: 49,
    color: '#555',
  },
  dot21: {
    fontSize: 49,
    textAlign: 'center',
    color: '#555',
    paddingLeft: 5,
  },
  dot22: {
    fontSize: 49,
    color: '#fff',
    paddingLeft: 5,
  },
  dot23: {
    fontSize: 49,
    color: '#555',
  },
  dot31: {
    fontSize: 49,
    textAlign: 'center',
    color: '#555',
    paddingLeft: 5,
  },
  dot32: {
    fontSize: 49,
    color: '#555',
    paddingLeft: 5,
  },
  dot33: {
    fontSize: 49,
    color: '#fff',
  },
  
})