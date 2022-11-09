

 import React from 'react';
 import {
   StyleSheet,TextInput,
   Text,
   View,
   TouchableOpacity,
 } from 'react-native';


import Icon from 'react-native-vector-icons/FontAwesome';

const LoginSignup = () => {
  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={{flexDirection:'row', alignItems:'center', flex:2}}>
        <Icon name="clipboard" size={35} />
        <Text style={{fontSize:50, fontWeight:'bold', paddingLeft:25}}>Login</Text>
      </View>

      {/* Inputs */}

      <View style={{width:'90%', flex:4}}>

        {/* Business Name */}
        <View>
            <View style={{flexDirection:'row', alignItems:'center'}}>
                <Icon name="building" size={35} />
                <Text style={{fontSize:20, marginLeft:10}}>Business Name:</Text>
            </View>
            <TextInput style={{fontSize:15}} placeholder='Enter business name...'/>
            <View style={{borderBottomColor:'white', borderBottomWidth:1}}></View>
        </View>


        {/* Business Phone */}
        <View style={{paddingTop:20}}>
            <View style={{flexDirection:'row', alignItems:'center'}}>
                <Icon name="phone" size={35} />
                <Text style={{fontSize:20, marginLeft:10}}>Phone Number:</Text>
            </View>
            <TextInput style={{fontSize:15}} placeholder='Enter phone number...' />
            <View style={{borderBottomColor:'white', borderBottomWidth:1}}></View>
        </View>

      </View>

      <View style={{flex:4}}>
        {/* Save Button */}
        <TouchableOpacity style={[styles.loginButton, {marginBottom:10}]}>
            <Text style={{ color: 'black', paddingHorizontal:20, paddingVertical:5 }}>Log In</Text>
        </TouchableOpacity>
      </View>

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  loginButton: {
    alignItems:'center',
    borderRadius: 15,
    backgroundColor:'white',
    paddingVertical:10,
    paddingHorizontal: 20,
  }
});


export default LoginSignup;
