

import React from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome';
import CustomerListItem from '../components/CustomerListItem';
import { CashFlowBoxGreen, CashFlowBoxRed } from '../components/CashFlowBox';

const Main = () => {
  return (
    <View style={styles.container}>
      {/* Shop Name Area */}
      <View style={{ width: '100%', flex:0.3, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
        <Text style={{ fontSize: 20 }}>HASSAAN'S SHOP</Text>
      </View>

      {/* Money In Out Area */}
      <View style={{ width: '100%', flexDirection: 'row', justifyContent:'center', flex:0.3}}>
        <CashFlowBoxRed />
        <CashFlowBoxGreen />
      </View>


      {/* Search Bar */}
      <View style={{flexDirection:'row', alignItems:'center',width: '90%', height:50, flex:0.3}}>
        {/* <Feather name="search" size={24} color="black" /> */}
        <Icon name="search" size={35}/>
        <View style={{flex:1, marginLeft:10}}>
          <TextInput placeholder='Search Customer'/>
          <View style={{borderBottomColor:'white', borderBottomWidth:0.5}}></View>
        </View>
      </View>


      {/* Customer entries */}
      <ScrollView style={{width:'90%', flex:8}}>
        <CustomerListItem customerName="Kashif Sattar" amount="200"/>
        <CustomerListItem customerName="Hammas Tahir" amount="533" />
        <CustomerListItem customerName="Abdul Haseeb" amount="66" />
        <CustomerListItem customerName="Hassan Munir" amount="4030" />
        <CustomerListItem customerName="Muhammad Usama" amount="454" />
      </ScrollView>


      {/* Footer */}

      <View style={styles.footer}>
        
        <TouchableOpacity style={styles.footerButton}>
          <Icon name="clipboard" size={24} />
          <Text style={{fontWeight:'500'}}>Records</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.addCustomerButton}>
          <Text style={{ color: 'white' }}>+ Add Customer</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.footerButton}>
          <Icon name="rocket" size={24} />
          <Text style={{fontWeight:'500'}}>Log Out</Text>
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
    borderRadius: 20,
    backgroundColor:'black',
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
    backgroundColor:'#4D4D4D',
    alignItems:'center'
  },
  footerButton: {
    alignItems:'center',
    borderColor:'black',
  }
});


export default Main;
