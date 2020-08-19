import React, { Component  } from 'react';
import { AppState, View, Text, Alert, Image, Button, TextInput, StyleSheet, Dimensions, ScrollView,BackHandler, ActivityIndicator, ImageBackground, StatusBar, TouchableOpacity, AsyncStorage } from 'react-native';
import {NavigationActions} from 'react-navigation';
import LinearGradient from 'react-native-linear-gradient';
import Modal from 'react-native-modal';
import { SERVER_URL } from './config/server';

export class EatDetails extends Component {
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
  addToCart(){
    Alert.alert(
      "Success",
      "Item has been added to cart. Go to cart now?",
      [
        {
          text: "Continue shopping",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel"
        },
        //{ text: "Go to home", onPress: () => this.props.navigation.navigate('Home') },
        { text: "Go to cart", onPress: () => this.props.navigation.navigate('Cart') }
      ],
      //{ cancelable: false }
    );
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
        <ImageBackground source = {require('./imgs/food.png')} style = {styles.bImage} >
          <TouchableOpacity  onPress={() => this.props.navigation.navigate('Eat')}>
            <Image source = {require('./imgs/back1.png')} style = {styles.menuImage} />
          </TouchableOpacity>
          <TouchableOpacity  onPress={() => this.props.navigation.navigate('Cart')} style = {styles.cartView}>
            <Image source = {require('./imgs/cart.png')} style = {styles.cartImage} />
          </TouchableOpacity>
        </ImageBackground>
        <View style = {styles.bottomView}>
          <ScrollView style={styles.sView} showsVerticalScrollIndicator={false}>
            <View style={styles.cView}>
              <View style={styles.itemView}>
                <View style={styles.item}>
                  <View style={styles.itemBottom}>
                    <Text style={styles.itemNameText}>Tasty Fried Rice</Text>
                    <Text style={styles.itemRatingText}>4.8*</Text>
                  </View>
                  <Text style={styles.itemPriceText}>N1,500.00</Text>
                  <View style={styles.itemBottom}>
                    <Text style={styles.itemVendorText}>CHICKEN REPUBLIC</Text>
                    
                  </View>
                  <Text style={styles.descText}>Description</Text>
                  <Text style={styles.descContent}>Fried rice is a dish of cooked rice that has been fried in a wok or a frying pan and is usually mixed with other ingredients such as eggs, vegetables, seafood, or meat. It is often eaten by itself or as an accompaniment to another dish.</Text>
                </View>
                
              </View>
              <View style={styles.actionView}>
                <View style={styles.counterView}>
                  <Text style={styles.minusText}>-</Text>
                  <Text style={styles.counterText}>1</Text>
                  <Text style={styles.plusText}>+</Text>
                </View>
                <TouchableOpacity style={styles.addView} onPress={() => this.addToCart()}>
                  <LinearGradient start={{x: 0, y: 0}} end={{x:1, y: 0}}  colors={['rgba(206,126,251,1)', 'rgba(126,83,191,1)']} style={styles.addGradient}>
                    <Text style={styles.addText}>Add to cart</Text>
                  </LinearGradient>
                </TouchableOpacity>
              </View>
            </View>
          </ScrollView>
        </View>
        

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

export default EatDetails

const styles = StyleSheet.create ({
  container: {
    width: '100%',
  },
  body: {
    minHeight: '100%',
    backgroundColor: "#fff",
  },
  cView: {
    minHeight: 900,
    width: '95%',
    alignSelf: 'center',
    paddingBottom: 50,
  },
  actionView: {
    flexDirection: 'row',
    width: '100%',
    marginTop: 40,
  },
  counterView: {
    borderWidth: 1,
    borderRadius: 10,
    marginRight: 10,
    borderColor: '#888888',
    flexDirection: 'row',
    width: '45%',
    height: 40,
    paddingTop: 5,
  },
  minusText: {
    textAlign: 'center',
    width: '33%',
    fontSize: 16,
    
  },
  counterText: {
    textAlign: 'center',
    width: '34%',
    fontSize: 16,
  },
  plusText: {
    textAlign: 'center',
    width: '33%',
    fontSize: 16,
  },
  addText: {
    textAlign: 'center',
    fontSize: 16,
    color: '#fff',
  },
  addView: {
    width: '55%',
    height: 40,
  },
  addGradient: {
    borderRadius: 10,
    width: '100%',
    height: 40,
    paddingTop: 7,
  },
  header: {
    width: '100%',
    height: 170,
    backgroundColor: 'rgb(126,83,191)',
    flexDirection: 'row',
  },
  headerText: {
    fontSize: 17,
    paddingLeft: 20,
    color: '#fff',
    marginTop: 67,
    width: '80%',
  },
  cartView: {
    width: '90%',
  },
  cartImage: {
    width: 30,
    height: 21,
    marginRight: 30,
    alignSelf: 'flex-end',
    marginTop: 51,
    //backgroundColor: '#000',
  },
  
  bImage: {
    width: '100%',
    height: 300,
    //opacity: 0.6,
    overflow: 'hidden',
    flexDirection: 'row',
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
    marginTop: 51,
    // backgroundColor: '#fff',
    // padding: 30,
    // borderWidth: 1,
    // borderRadius: 12,
  },
  bottomView: {
    width: '100%',
    alignSelf: 'center',
    marginTop: -15,
    paddingLeft: 20,
    paddingRight: 20,
  },
  
  itemView: {
    flexDirection: 'row',
    width: '95%',
    marginTop: 25,
    alignContent: 'center',
    alignSelf: 'center',
    marginRight: 20,


  },
  item: {
    width: '100%',
    marginLeft: 0,
    marginRight: 10,

  },
  itemNameText: {
    paddingTop: 10,
    width: '75%',
  },
  itemPriceText: {
    //paddingTop: 4,
    fontSize: 16,
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
    paddingTop: 10,
    color: '#585757',
    textAlign: 'right',
  },

  descText: {
    marginTop: 20,
  },
  descContent: {
    color: '#535871',
    textAlign: 'justify',
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