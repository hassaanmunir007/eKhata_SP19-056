

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
import { useTheme } from '@react-navigation/native';

const ReportDownload = ({props, navigation}) => {
  const { colors } = useTheme();

  return (
    <View style={styles.container}>
      
      {/* Header */}
      <View style={{width:'90%', flexDirection: 'row', alignItems: 'center', flex: 0.5 }}>
      </View>

      <View style={{flex: 0.5}}>
        
      </View>

      <View style={{width:'90%', flex:3}}>

        <View style={{flexDirection:'row'}}>
          <Text style={{flex:5, fontSize:18, fontWeight:'bold', color:colors.primary}}>Name</Text>
          <View style={{flex:2.5}}>
            <Text style={{fontSize:18, fontWeight:'bold', color:colors.primary}}>I paid</Text>
            <Text style={{fontSize:11, fontWeight:'bold', color:'red'}}>Total: Rs 9329</Text>
          </View>
          <View style={{flex:2.5}}>
            <Text style={{fontSize:18, fontWeight:'bold', color:colors.primary}}>I received</Text>
            <Text style={{fontSize:11, fontWeight:'bold', color:'green'}}>Total: Rs 3403</Text>
          </View>
        </View>

        <ScrollView>

          <View style={{borderBottomColor:colors.text, borderBottomWidth:2}}></View>

          <ReportEntry customerName="Hassaan Munir" date="6th Nov, 03:10PM" isIPaid={false} amount="Rs 700"/>
          <View style={{borderBottomColor:'white', borderBottomWidth:0.5}}></View>
          <ReportEntry customerName="Hammas Tahir" date="6th Nov, 03:50PM" isIPaid={true} amount="Rs 500"/>
          <View style={{borderBottomColor:'white', borderBottomWidth:0.5}}></View>
          <ReportEntry customerName="Kashif Sattar" date="6th Nov, 03:50PM" isIPaid={true} amount="Rs 600"/>
          <View style={{borderBottomColor:'white', borderBottomWidth:0.5}}></View>
          <ReportEntry customerName="Usama Abbasi" date="6th Nov, 03:50PM" isIPaid={false} amount="Rs 22"/>
          <View style={{borderBottomColor:'white', borderBottomWidth:0.5}}></View>
          <ReportEntry customerName="Usama Abbasi" date="6th Nov, 03:50PM" isIPaid={false} amount="Rs 22"/>
          <View style={{borderBottomColor:'white', borderBottomWidth:0.5}}></View>
          <ReportEntry customerName="Usama Abbasi" date="6th Nov, 03:50PM" isIPaid={false} amount="Rs 22"/>
          <View style={{borderBottomColor:'white', borderBottomWidth:0.5}}></View>
          <ReportEntry customerName="Usama Abbasi" date="6th Nov, 03:50PM" isIPaid={false} amount="Rs 22"/>
          <View style={{borderBottomColor:'white', borderBottomWidth:0.5}}></View>
          <ReportEntry customerName="Usama Abbasi" date="6th Nov, 03:50PM" isIPaid={false} amount="Rs 22"/>
          <View style={{borderBottomColor:'white', borderBottomWidth:0.5}}></View>
          <ReportEntry customerName="Usama Abbasi" date="6th Nov, 03:50PM" isIPaid={false} amount="Rs 22"/>
        </ScrollView>
        
      </View>


      <View style={[styles.buttonsContainer, {flex:1}]}>
        {/* Save Button */}
        <View>
          <TouchableOpacity style={[styles.addCustomerButton, {backgroundColor:colors.primary}]}>
            <Icon name="download" style={{color:colors.text}} size={24}/>
            <Text style={{ color:colors.text }}> Download</Text>
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
