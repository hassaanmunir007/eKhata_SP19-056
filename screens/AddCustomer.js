

import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  useColorScheme,
  View,
} from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome';

const AddCustomer = () => {
  return (
    <View style={styles.container}>
      
      {/* Header */}
      <View style={{width:'90%', flexDirection:'row', alignItems:'center', flex:1}}>
        <Icon name="arrow-left" size={35} />
        <Text style={{fontSize:20, fontWeight:'bold', paddingLeft:25}}>Add Customer</Text>
      </View>

      {/* Inputs */}

      <View style={{width:'90%', marginTop:10, flex:5}}>

      {/* Customer Name */}
      <View>
        <View style={{flexDirection:'row', alignItems:'center'}}>
          <Icon name="user" size={35} />
          <Text style={{fontSize:20, marginLeft:10}}>Customer Name:</Text>
        </View>
        <TextInput style={{fontSize:15}} placeholder='Enter customer name...'/>
        <View style={{borderBottomColor:'white', borderBottomWidth:1}}></View>
      </View>

      {/* Customer Phone */}
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
        <TouchableOpacity style={[styles.addCustomerButton, {marginBottom:10}]}>
          <Text style={{ color: 'black' }}>Save Customer</Text>
        </TouchableOpacity>

        {/* Cancel Button */}
        <TouchableOpacity style={styles.addCustomerButton}>
          <Text style={{ color: 'red' }}>Cancel</Text>
        </TouchableOpacity>
      </View>

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  },
  addCustomerButton: {
    alignItems:'center',
    borderRadius: 20,
    backgroundColor:'white',
    paddingVertical:10,
    paddingHorizontal: 20,
  },
  footer: {
    flex:0.3,
    flexDirection:'row',
    justifyContent:'space-evenly',
    width: '100%',
    // paddingVertical:10,
    // marginTop:5,
    // backgroundColor:'#f3f4f6',
    alignItems:'center'
  },
  footerButton: {
    alignItems:'center',
    borderColor:'black',
  }
});


export default AddCustomer;
