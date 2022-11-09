

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
import ReportEntry from '../components/ReportEntry';

const ReportDownload = () => {
    return (
    <View style={styles.container}>
      
      {/* Header */}
      <View style={{width:'90%', flexDirection: 'row', alignItems: 'center', flex: 0.5 }}>
        <Icon name="arrow-left" size={35} />
        <Text style={{ fontSize: 20, fontWeight: 'bold', paddingLeft: 25 }}>Download Report</Text>
      </View>

      <View style={{flex: 0.5}}>
        
      </View>

      <View style={{width:'90%', flex:3}}>

        <View style={{flexDirection:'row'}}>
          <Text style={{flex:5, fontSize:18, fontWeight:'bold'}}>Name</Text>
          <View style={{flex:2.5}}>
            <Text style={{fontSize:18, fontWeight:'bold'}}>I paid</Text>
            <Text style={{fontSize:11, fontWeight:'bold', color:'red'}}>Total: Rs 9329</Text>
          </View>
          <View style={{flex:2.5}}>
            <Text style={{fontSize:18, fontWeight:'bold'}}>I received</Text>
            <Text style={{fontSize:11, fontWeight:'bold', color:'green'}}>Total: Rs 3403</Text>
          </View>
        </View>

        <ScrollView>
          <View style={{borderBottomColor:'white', borderBottomWidth:2}}></View>
          <ReportEntry customerName="Hassaan Munir" date="6th Nov, 03:10PM" itook="Rs 700"/>
          <View style={{borderBottomColor:'white', borderBottomWidth:0.5}}></View>
          <ReportEntry customerName="Hammas Tahir" date="6th Nov, 03:50PM" igave="Rs 500"/>
          <View style={{borderBottomColor:'white', borderBottomWidth:0.5}}></View>
          <ReportEntry customerName="Kashif Sattar" date="6th Nov, 03:50PM" igave="Rs 600"/>
          <View style={{borderBottomColor:'white', borderBottomWidth:0.5}}></View>
          <ReportEntry customerName="Usama Abbasi" date="6th Nov, 03:50PM" itook="Rs 22"/>
          <View style={{borderBottomColor:'white', borderBottomWidth:0.5}}></View>
          <ReportEntry customerName="Usama Abbasi" date="6th Nov, 03:50PM" itook="Rs 22"/>
          <View style={{borderBottomColor:'white', borderBottomWidth:0.5}}></View>
          <ReportEntry customerName="Usama Abbasi" date="6th Nov, 03:50PM" itook="Rs 22"/>
          <View style={{borderBottomColor:'white', borderBottomWidth:0.5}}></View>
          <ReportEntry customerName="Usama Abbasi" date="6th Nov, 03:50PM" itook="Rs 22"/>
          <View style={{borderBottomColor:'white', borderBottomWidth:0.5}}></View>
          <ReportEntry customerName="Usama Abbasi" date="6th Nov, 03:50PM" itook="Rs 22"/>
          <View style={{borderBottomColor:'white', borderBottomWidth:0.5}}></View>
          <ReportEntry customerName="Usama Abbasi" date="6th Nov, 03:50PM" itook="Rs 22"/>
        </ScrollView>
        
      </View>


      <View style={[styles.buttonsContainer, {flex:1}]}>
        {/* Save Button */}
        <View>
          <TouchableOpacity style={styles.addCustomerButton}>
            <Icon name="download" style={{color:'black'}} size={24}/>
            <Text style={{ color: 'black' }}> Download</Text>
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
    flexDirection:'row',
    marginTop:20
  },
  buttonsContainer: {
    flexDirection:'row', justifyContent:'space-evenly', marginBottom:20
  }
});


export default ReportDownload;
