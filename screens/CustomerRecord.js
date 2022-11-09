

import React from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome';
import { CashFlowBoxGreen } from '../components/CashFlowBox';
import TransactionRecord from '../components/TransactionRecord';

const CustomerRecord = () => {
  return (
    <View style={styles.container}>
      
      {/* Header */}
      <View style={{width:'90%', flexDirection: 'row', alignItems: 'center', flex: 0.5 }}>
        <Icon name="arrow-left" size={35} />
        <Text style={{ fontSize: 20, fontWeight: 'bold', paddingLeft: 25 }}>Hamza Khan</Text>
      </View>

      <View style={{flex: 1}}>
        <CashFlowBoxGreen/>
      </View>

      <View style={{width:'90%', flex:3}}>

        <View style={{flexDirection:'row'}}>
          <Text style={{flex:5, fontSize:18, fontWeight:'bold'}}>Date</Text>
          <Text style={{flex:2.5, fontSize:18, fontWeight:'bold'}}>I paid</Text>
          <Text style={{flex:2.5, fontSize:18, fontWeight:'bold'}}>I received</Text>
        </View>

        <ScrollView>
          <View style={{borderBottomColor:'white', borderBottomWidth:2}}></View>
          <TransactionRecord date="6th Nov, 03:10PM" itook="Rs 700"/>
          <View style={{borderBottomColor:'white', borderBottomWidth:0.5}}></View>
          <TransactionRecord date="6th Nov, 03:50PM" igave="Rs 500"/>
          <View style={{borderBottomColor:'white', borderBottomWidth:0.5}}></View>
          <TransactionRecord date="6th Nov, 03:50PM" igave="Rs 600"/>
          <View style={{borderBottomColor:'white', borderBottomWidth:0.5}}></View>
          <TransactionRecord date="6th Nov, 03:50PM" itook="Rs 22"/>
        </ScrollView>
        
      </View>


      <View style={[styles.buttonsContainer, {flex:1}]}>
        {/* Save Button */}
        <View>
          <TouchableOpacity style={styles.addCustomerButton}>
            <Icon name="money" style={{color:'red'}} size={24}/>
            <Text style={{ color: 'red' }}> I Gave</Text>
          </TouchableOpacity>
        </View>
        {/* Cancel Button */}
        <View>
          <TouchableOpacity style={[styles.addCustomerButton, {marginLeft:5}]}>
            <Icon name="money" style={{color:'green'}} size={24}/>
            <Text style={{ color: 'green' }}> I Took</Text>
          </TouchableOpacity>
        </View>
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
  addCustomerButton: {
    alignItems:'center',
    borderRadius: 20,
    backgroundColor:'white',
    paddingVertical:10,
    paddingHorizontal: 20,
    flexDirection:'row'
  },
  buttonsContainer: {
    flexDirection:'row', justifyContent:'space-evenly', marginBottom:20
  }
});


export default CustomerRecord;
