

import React, { useState } from 'react';
import {
  KeyboardAvoidingView,
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
import { useTheme } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AddCustomer = ({route, navigation}) => {
    const { colors } = useTheme();
    const [customerName, setCustomerName] = useState("");
    const [custPhoneNumber, setCustPhoneNumber] = useState("");

    const checkCustomer = () => {
      exists = false;
      // check if this number already exists
      fetch(`https://ekhata-980a5-default-rtdb.firebaseio.com/users/${route.params.phoneNumber}/customers.json`, { method: 'GET' })
        .then(resp => resp.json())
        .then(res => {
          if (res == null) {
            exists = false;
          }
          else {
            Object.keys(res).forEach(c => {
              if (res[c].custPhoneNumber == custPhoneNumber) {
                alert("A customer with this number already exist, please try another number.");
                exists = true;
                return;
              }
            })
          }
          if (!exists) {
            saveCustomer();
          }
        })
        .catch(err => alert("Something went wrong. Please try again."));
    }

    const saveCustomer = async () => {
      //insert new customer

      var customerData = {
        customerName: customerName,
        custPhoneNumber: custPhoneNumber,
      }
  
      var requestOptions = {
        method: 'PUT',
        body:JSON.stringify(customerData)
      }
  
      fetch(`https://ekhata-980a5-default-rtdb.firebaseio.com/users/${route.params.phoneNumber}/customers/${custPhoneNumber}.json`, requestOptions)
        .then(resp => resp.json())
        .then(res => {
          // console.log(res);
          alert("Customer added successfully.");
          setCustPhoneNumber("");
          setCustomerName("");
          route.params.onGoBack();
        })
        .catch(err => alert("Something went wrong. Please try again."));
    }

    return (
    <View style={styles.container}>
  
      {/* Inputs */}

      <KeyboardAvoidingView style={{width:'90%', marginTop:10, flex:5}}>

      {/* Customer Name */}
      <View>
        <View style={{flexDirection:'row', alignItems:'center', marginTop:20}}>
          <Icon name="user" size={35} style={{color:colors.text}}/>
          <Text style={{fontSize:20, marginLeft:10, color:colors.text}}>Customer Name:</Text>
        </View>
        <TextInput style={{fontSize:15, color:colors.text}} value={customerName} onChangeText={setCustomerName}/>
        <View style={{borderBottomColor: customerName.length == 0 ? 'red' : colors.text, borderBottomWidth:1}}></View>
      </View>

      {/* Customer Phone */}
      <View style={{paddingTop:20}}>
        <View style={{flexDirection:'row', alignItems:'center'}}>
          <Icon name="phone" size={35} style={{color:colors.text}}/>
          <Text style={{fontSize:20, marginLeft:10, color:colors.text}}>Phone Number:</Text>
        </View>
        <TextInput style={{fontSize:15, color:colors.text}} value={custPhoneNumber} onChangeText={setCustPhoneNumber}/>
        <View style={{borderBottomColor: (custPhoneNumber.length != 11 || !(/^\d+$/.test(custPhoneNumber))) ? 'red' : colors.text, borderBottomWidth:1}}></View>
      </View>
      
      </KeyboardAvoidingView>

      <View style={{flex:4}}>
        {/* Save Button */}
        <TouchableOpacity style={[styles.addCustomerButton, {marginBottom:10, width:'100%', alignSelf:'center', backgroundColor:colors.primary}]}
          disabled={customerName.length == 0 || custPhoneNumber.length != 11 || !(/^\d+$/.test(custPhoneNumber))} onPress={checkCustomer}>
          <Text style={{ color: colors.background, fontSize:15, paddingHorizontal:20, paddingVertical:5 }}>Save Customer</Text>
        </TouchableOpacity>

        {/* Cancel Button */}
        <TouchableOpacity style={[styles.addCustomerButton, {width:'100%', alignSelf:'center', backgroundColor:colors.primary}]} onPress={() => {navigation.goBack()}}>
          <Text style={{ color: colors.background, fontSize:15, paddingHorizontal:15, paddingVertical:3 }}>Back</Text>
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
