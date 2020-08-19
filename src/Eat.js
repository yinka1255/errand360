import React, { Component  } from 'react';
import { AppState, View, Text, Alert, Image, Button, TextInput, StyleSheet, Dimensions, ScrollView,BackHandler, ActivityIndicator, ImageBackground, StatusBar, TouchableOpacity, AsyncStorage } from 'react-native';
import {NavigationActions} from 'react-navigation';
import LinearGradient from 'react-native-linear-gradient';
import Modal from 'react-native-modal';
import { SERVER_URL } from './config/server';

export class Eat extends Component {
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
      index1: true,
      index2: false,
      index3: false,
      index4: false,
      index5: false,
      color1: '#8356C3',
      color2: '#333',
      color3: '#333',
      color4: '#333',
      color5: '#333',
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

  changeView(index){
    if(index == 1){
      this.setState({
        index1: true,
        index2: false,
        index3: false,
        index4: false,
        index5: false,
        color1: '#8356C3',
        color2: '#333',
        color3: '#333',
        color4: '#333',
        color5: '#333',
      })
    }
    if(index == 2){
      this.setState({
        index1: false,
        index2: true,
        index3: false,
        index4: false,
        index5: false,
        color1: '#333',
        color2: '#8356C3',
        color3: '#333',
        color4: '#333',
        color5: '#333',
      })
    }
    if(index == 3){
      this.setState({
        index1: false,
        index2: false,
        index3: true,
        index4: false,
        index5: false,
        color1: '#333',
        color2: '#333',
        color3: '#8356C3',
        color4: '#333',
        color5: '#333',
      })
    }
    if(index == 4){
      this.setState({
        index1: false,
        index2: false,
        index3: false,
        index4: true,
        index5: false,
        color1: '#333',
        color2: '#333',
        color3: '#333',
        color4: '#8356C3',
        color5: '#333',
      })
    }
    if(index == 5){
      this.setState({
        index1: false,
        index2: false,
        index3: false,
        index4: false,
        index5: true,
        color1: '#333',
        color2: '#333',
        color3: '#333',
        color4: '#333',
        color5: '#8356C3',
      })
    }
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
  

  render() {
    const { visible } = this.state;
    return (
      <View style = {styles.body}>
        <StatusBar translucent={true}  backgroundColor={'#CE7EFB'}  />
        <LinearGradient start={{x: 0, y: 0}} end={{x:0, y: 1}}  colors={['rgba(206,126,251,1)', 'rgba(126,83,191,1)']} style={styles.header}>
        <TouchableOpacity  onPress={() => this.props.navigation.navigate('Home')}>
          <Image source = {require('./imgs/back2.png')} style = {styles.menuImage} />
        </TouchableOpacity>
          <Text style = {styles.headerText}>Errand Eat</Text>
          <Image source = {require('./imgs/cart.png')} style = {styles.cartImage} />
        </LinearGradient>
        <View style = {styles.bottomView}>
          <View style = {styles.card}>
            
            <Text style = {styles.label}>Location</Text>
            <TextInput
                              style={styles.input}
                              placeholder="Enter your location"
                              onChangeText={(text) => this.setState({clocation: text})}
                              underlineColorAndroid="transparent"
                              placeholderTextColor="#ccc" 
                              value={this.state.location}
                              //keyboardType={'email-address'}
                            />
              
              <Text style = {styles.locationText}> Use current location</Text>
          </View>
          <TextInput
                  style={styles.searchInput}
                  placeholder="Search restaurant or product"
                  onChangeText={(text) => this.setState({search: text})}
                  underlineColorAndroid="transparent"
                  placeholderTextColor="#ccc" 
                  value={this.state.search}
                  //keyboardType={'email-address'}
                />
          <View  style = {styles.row}>
            <TouchableOpacity onPress={() => this.changeView(1)}  style = {styles.col1}>
              <Text style={[styles.segmentText, {color: this.state.color1}]}>All</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => this.changeView(2)}  style = {styles.col2}>
              <Text style={[styles.segmentText, {color: this.state.color2}]}>Salad</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => this.changeView(3)}  style = {styles.col3}>
              <Text style={[styles.segmentText, {color: this.state.color3}]}>Smoothies</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => this.changeView(4)}  style = {styles.col4}>
              <Text style={[styles.segmentText, {color: this.state.color4}]}>Snacks</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => this.changeView(5)}  style = {styles.col5}>
              <Text style={[styles.segmentText, {color: this.state.color5}]}>Foods</Text>
            </TouchableOpacity>
          </View>
        </View>
        <ScrollView style={styles.sView} showsVerticalScrollIndicator={false}>
          <View style={styles.cView}>
            <View style={styles.itemView}>
              <TouchableOpacity style={styles.i}  onPress={() => this.props.navigation.navigate('EatDetails')}>
                <View style={styles.item}>
                  <Image source = {require('./imgs/food.png')} style = {styles.itemImage} />
                  <Text style={styles.itemNameText}>Tasty Fried</Text>
                  <Text style={styles.itemPriceText}>N1,500.00</Text>
                  <View style={styles.itemBottom}>
                    <Text style={styles.itemVendorText}>CHICKEN REPUBLIC</Text>
                    <Text style={styles.itemRatingText}>4.8*</Text>
                  </View>
                </View>
              </TouchableOpacity>
              <TouchableOpacity  style={styles.i} onPress={() => this.props.navigation.navigate('EatDetails')}>
                <View style={styles.item}>
                  <Image source = {require('./imgs/food.png')} style = {styles.itemImage} />
                  <Text style={styles.itemNameText}>Tasty Fried</Text>
                  <Text style={styles.itemPriceText}>N1,500.00</Text>
                  <View style={styles.itemBottom}>
                    <Text style={styles.itemVendorText}>CHICKEN REPUBLIC</Text>
                    <Text style={styles.itemRatingText}>4.8*</Text>
                  </View>
                </View>
              </TouchableOpacity>
            </View>
            
            <View style={styles.itemView}>
              <TouchableOpacity  style={styles.i} onPress={() => this.props.navigation.navigate('EatDetails')}>
                <View style={styles.item}>
                  <Image source = {require('./imgs/food.png')} style = {styles.itemImage} />
                  <Text style={styles.itemNameText}>Tasty Fried</Text>
                  <Text style={styles.itemPriceText}>N1,500.00</Text>
                  <View style={styles.itemBottom}>
                    <Text style={styles.itemVendorText}>CHICKEN REPUBLIC</Text>
                    <Text style={styles.itemRatingText}>4.8*</Text>
                  </View>
                </View>
              </TouchableOpacity>
              <TouchableOpacity  style={styles.i} onPress={() => this.props.navigation.navigate('EatDetails')}>
                <View style={styles.item}>
                  <Image source = {require('./imgs/food.png')} style = {styles.itemImage} />
                  <Text style={styles.itemNameText}>Tasty Fried</Text>
                  <Text style={styles.itemPriceText}>N1,500.00</Text>
                  <View style={styles.itemBottom}>
                    <Text style={styles.itemVendorText}>CHICKEN REPUBLIC</Text>
                    <Text style={styles.itemRatingText}>4.8*</Text>
                  </View>
                </View>
              </TouchableOpacity>
            </View>
            <View style={styles.itemView}>
              <TouchableOpacity  style={styles.i} onPress={() => this.props.navigation.navigate('EatDetails')}>
                <View style={styles.item}>
                  <Image source = {require('./imgs/food.png')} style = {styles.itemImage} />
                  <Text style={styles.itemNameText}>Tasty Fried</Text>
                  <Text style={styles.itemPriceText}>N1,500.00</Text>
                  <View style={styles.itemBottom}>
                    <Text style={styles.itemVendorText}>CHICKEN REPUBLIC</Text>
                    <Text style={styles.itemRatingText}>4.8*</Text>
                  </View>
                </View>
              </TouchableOpacity>
              <TouchableOpacity  style={styles.i} onPress={() => this.props.navigation.navigate('EatDetails')}>
                <View style={styles.item}>
                  <Image source = {require('./imgs/food.png')} style = {styles.itemImage} />
                  <Text style={styles.itemNameText}>Tasty Fried</Text>
                  <Text style={styles.itemPriceText}>N1,500.00</Text>
                  <View style={styles.itemBottom}>
                    <Text style={styles.itemVendorText}>CHICKEN REPUBLIC</Text>
                    <Text style={styles.itemRatingText}>4.8*</Text>
                  </View>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>

        <Modal
          isVisible={this.state.visible}
          onTouchOutside={() => {
            //this.setState({ visible: false });
          }}
          height= {'100%'}
          width= {'100%'}
          style={styles.modal}
        >
          <View style={styles.modalView}>
          <ActivityIndicator size="small" color="#ccc" />
          </View>
        </Modal>

        
      </View>
    )
  }
}

export default Eat

const styles = StyleSheet.create ({
  container: {
    width: '100%',
  },
  body: {
    minHeight: '100%',
    backgroundColor: "#fff",
  },
  cView: {
    minHeight: 1200,
    width: '95%',
    alignSelf: 'center',
    paddingBottom: 50,
  },
  header: {
    width: '100%',
    height: 170,
    backgroundColor: 'rgb(126,83,191)',
    flexDirection: 'row',
  },
  cartImage: {
    width: 21,
    height: 15,
    marginRight: 30,
    marginTop: 71,
  },
  itemView: {
    flexDirection: 'row',
    width: '95%',
    marginTop: 25,
    alignContent: 'center',
    alignSelf: 'center',
    marginRight: 20,


  },
  i: {
    width: '50%',
    marginRight: 10,
  },
  item: {
    width: '98%',
    marginLeft: 5,
    

  },
  itemNameText: {
    paddingTop: 10,
  },
  itemPriceText: {
    //paddingTop: 4,
    fontWeight: 'bold',
    color: '#585757',
  },
  itemBottom: {
    flexDirection: 'row',
    width: '100%',
  },
  itemVendorText: {
    color: '#8356C3',
    fontSize: 12,
    width: '75%',
  },
  itemRatingText: {
    width: '25%',
    fontSize: 12,
    color: '#585757',
    textAlign: 'right',
  },
  row: {
    width: '100%',
    alignSelf: 'center',
    
    flexDirection: 'row',
    marginTop: 20,
  },
  col1: {
    //width: '20%',
    borderRadius: 18,
    textAlign: 'center',
  },
  col2: {
    //width: '20%',
    borderRadius: 18,
    textAlign: 'center',
  
  },
  col3: {
    //width: '20%',
    borderRadius: 18,
    textAlign: 'center',
  },
  col4: {
    //width: '20%',
    borderRadius: 18,
    textAlign: 'center',
  },
  sView:{
    
  },
  bImage1: {
    width: '100%',
    height: 220,
    //opacity: 0.6,
    overflow: 'hidden',
    borderBottomEndRadius: 20, 
    borderBottomStartRadius: 20, 
  },
  logoImage: {
    marginTop: 60,
    alignSelf: 'center',
    width: 75,
    height: 78,
  },
  menuImage: {
    width: 21,
    height: 15,
    marginLeft: 20,
    marginTop: 71,
  },
  bottomView: {
    width: '100%',
    alignSelf: 'center',
    marginTop: -60,
    paddingLeft: 20,
    paddingRight: 20,
  },
  headerText: {
    fontSize: 17,
    paddingLeft: 20,
    color: '#fff',
    marginTop: 67,
    width: '80%',
  },
  headerText1: {
    fontSize: 20,
    paddingLeft: 20,
    color: '#fff',
    fontWeight: "bold",

  },
  card: {
    //flexDirection: 'row',
    width: '100%',
    marginBottom: 4,
    
    borderWidth: 1,
    borderRadius: 9,
    elevation: 1,
    borderColor: '#fefefe',
    backgroundColor: '#fff',
    padding: 15,
    paddingTop: 7,
  },
  locationText: {
    color: '#8356C3',
    textAlign: 'right',
    paddingTop: 2,
    marginRight: 10,
    fontSize: 12,
  },
  colImage: {
    width: '35%'
  },
  colContent: {
    width: '65%',
    flexDirection: 'column',
  },
  cImage: {
    alignSelf: 'center',
    marginTop: 5,
  },
  segmentText: {
    //textAlign: 'center',
    paddingRight: 10,
    marginRight: 10,
  },
  contentText: {
    fontWeight: 'bold',
  },
  contentText1: {
    color: '#5D626A',
  },


  label:{
    color: '#333',
    paddingLeft: 18,
    marginTop: 1,
  },
  searchInput: {
    width: '100%',
    height: 40,
    backgroundColor: '#fff',
    borderColor: '#Fefefe',
    borderWidth: 1,
    borderRadius: 18,
    elevation: 1,
    alignSelf: 'center',
    marginTop: 5,
    paddingLeft: 10,
    color: '#ccc',
  },
  input: {
    width: '94%',
    height: 40,
    backgroundColor: '#F9F9FB',
    borderRadius: 8,
    alignSelf: 'center',
    marginTop: 5,
    paddingLeft: 10,
    color: '#ccc',
  },
  input1: {
    width: '9%',
    height: 40,
    backgroundColor: '#aaa',
    borderRadius: 2,
    alignSelf: 'center',
    marginTop: 10,
    paddingLeft: 25,
    color: '#222'
  },
  forgotText: {
    textAlign: 'right',
    marginRight: 30,
    color: '#fff',
    fontSize: 12,
    marginTop: 10,
  },
  createText1: {
    textAlign: 'center',
    marginTop: 13,
  },
  
  createText: {
    textAlign: 'center',
    color: '#fff',
    fontSize: 13,
    fontWeight: '600',
    marginTop: 10,
  },
  locImageView: {
    marginTop: -14,
  },
  locImage: {
    //marginTop: -7,
    width: 10,
    height: 10,
    width: 10,
    paddingRight: 4,
    },
submitButton: {
  marginTop: 20,
  backgroundColor: '#ED6315',
  borderRadius: 10,
  width: '80%',
  alignSelf: 'center',
  paddingTop: 12,
  paddingBottom: 13,
},
submitButton1: {
  marginTop: 20,
  backgroundColor: '#e2aa2e',
  opacity: 0.7,
  borderRadius: 2,
  width: '90%',
  alignSelf: 'center',
  paddingTop: 12,
  paddingBottom: 13,
},
submitButtonText: {
  color: '#fff',
  textAlign: 'center'
},
loaderImage: {
  width: 80,
  height: 80,
  alignSelf: 'center',
  zIndex: 99999999999999,
  
},
modal: {
  margin: 0,
  padding: 0
},
modalView: {
  // width: '100%',
  // height: '100%',
  // opacity: 0.9,
  alignSelf: 'center',
  height: 50,
  width: 100,
  backgroundColor: '#FFF',
  paddingTop: 18,
},

label1: {
  color: '#333',
  marginTop: 15,
  paddingLeft: 20,
},
forgotModalView: {
  // width: '100%',
  // height: '100%',
  // opacity: 0.9,
  alignSelf: 'center',
  height: 280,
  width: '90%',
  backgroundColor: '#FFF',
  paddingTop: 18,
},
  
})