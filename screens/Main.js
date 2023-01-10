

import React, { useEffect, useState } from 'react';
import {
  KeyboardAvoidingView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { LogBox } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import CustomerListItem from '../components/CustomerListItem';
import CashFlowBox from '../components/CashFlowBox';
import { useTheme } from '@react-navigation/native';
import SettingsModal from '../components/SettingsModal';

const Main = ({route, navigation}) => {
  const { colors } = useTheme();
  const [customerData, setCustomerData] = useState();
  const [searchedData, setSearchedData] = useState();
  const [isSearching, setIsSearhcing] = useState(false);
  const [isLoadingCustomers, setIsLoadingCustomers] = useState(true);
  const [searchText, setSearchText] = useState("");
  const [settingsModalOpen, setSettingsModalOpen] = useState(false);

  const [redCashFlowValue, setRedCashFlowValue] = useState(0);
  const [greenCashFlowValue, setGreenCashFlowValue] = useState(0);

  const [reload, setReload] = useState(false);

  LogBox.ignoreLogs([ // ignoring this warning as it DOES NOT affect any functionality of the app
    'Non-serializable values were found in the navigation state',
  ]);

  const logout = () => {
    navigation.reset({
      index: 0,
      routes: [{name: 'LoginSignup'}],
    });
  }

  useEffect(() => {   // runs only once
    loadData();
  }, [])

  useEffect(() => {
    if (reload) {
      alert("Reload");
      setReload(false);
    }
  }, [reload])

  const reloadData = () => {
    setSearchText("");
    loadData();
  }

  const updateCashBoxes = (cust) => {
    if (cust == null) {
      setGreenCashFlowValue(0);
      setRedCashFlowValue(0);
      return;
    }
    var totalPaid = 0;
    var totalReceived = 0;

    const customerKeys = Object.keys(cust);
    for (i = 0; i < customerKeys.length; i++) {
      if (cust[customerKeys[i]].transactions == null) continue; // this customer has not transactions
      var transactionKeys = Object.keys(cust[customerKeys[i]].transactions);
      if (transactionKeys == null) continue; // this customers has transactions object but no transactions
      for (j = 0; j < Object.keys(cust[customerKeys[i]].transactions).length; j++) {
        var thisTransaction = cust[customerKeys[i]].transactions[transactionKeys[j]];
        const amt = Number.parseInt(thisTransaction.amount);
        if (thisTransaction.iPaid) totalPaid += amt;
        else totalReceived += amt;
      }
    }
    setRedCashFlowValue(totalPaid);
    setGreenCashFlowValue(totalReceived);
  }

  const loadData = () => {
    setIsLoadingCustomers(true);
    var requestOptions = {
      method: 'GET',
    }

    fetch(`https://ekhata-980a5-default-rtdb.firebaseio.com/users/${route.params.phoneNumber}/customers.json`, requestOptions)
      .then(resp => resp.json())
      .then(res => {
        setCustomerData(res);
        // console.log("Customer: " + JSON.stringify(res));
        // console.log(Object.keys(res));
        setIsLoadingCustomers(false);
        updateCashBoxes(res);
      })
      .catch(err => alert("Something went wrong. Please try again."));
  }

  useEffect(() => {   // searches customers based on given search text
    if (searchText == "") { setIsSearhcing(false); return; }
    if (customerData == null) return;
    setIsSearhcing(true);
    const searchResult = Object.keys(customerData).filter(c => customerData[c].customerName.toLowerCase().includes(searchText.toLowerCase()));
    setSearchedData(searchResult);
  }, [searchText]);

  const shouldShow = (check) => {
    if (isSearching) {
      if (searchedData.includes(check)) {
        return true;
      }
      else {
        return false;
      }
    }
    return true;
  }

  return (
    <View style={styles.container} behavior="padding">
      {/* Shop Name Area */}
      <View style={{ width: '100%', flex:0.3, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
        <Text style={[styles.baseText, { fontSize: 25, color:colors.text, fontWeight:'bold' }]}>{route.params?.businessName}</Text>
      </View>

      {/* Money In Out Area */}
      <View style={{ width: '100%', flexDirection: 'row', justifyContent:'center', flex:0.3}}>
        <CashFlowBox money={redCashFlowValue} isGive={false} overrideText="Paid" />
        <CashFlowBox money={greenCashFlowValue} isGive={true} overrideText="Received" />
      </View>


      {/* Search Bar */}
      <KeyboardAvoidingView style={{flexDirection:'row', alignItems:'center',width: '90%', height:50, flex:0.3}}>
        <View style={{flex:1, flexDirection:'row',marginLeft:10, backgroundColor:colors.primary, borderRadius:50,}}>
          <Icon name="search" size={35} style={{color:colors.background, alignSelf:'center', marginLeft:5}}/>
          <TextInput placeholder='Search Customer' style={{color:colors.background, marginLeft:5, width:"75%"}} onChangeText={setSearchText}/>
          <TouchableOpacity style={{alignSelf:'center'}} onPress={reloadData}>
            <Icon name="refresh" size={35} style={{color:colors.background, alignSelf:'center', marginLeft:5}}/>
          </TouchableOpacity>
          {/* <View style={{borderBottomColor:colors.text, borderBottomWidth:0.5}}></View> */}
        </View>
      </KeyboardAvoidingView>


      {/* Customer entries */}
      <ScrollView style={{ width: '80%', flex: 8 }}>
        {
          isLoadingCustomers ?
            <>
              <Text style={{ color: colors.primary, textAlign: 'center', fontWeight: 'bold', fontSize: 25 }}>Loading...</Text>
            </>
            :
            <>
              {
                customerData == null ? <Text style={{ color: colors.primary, textAlign: 'center', fontWeight: 'bold', fontSize: 25 }}>No customers</Text> :
                  <>
                    {Object.keys(customerData).map(k => (
                      shouldShow(k) ?
                        <CustomerListItem key={customerData[k].custPhoneNumber} navigation={navigation} userPhone={route.params.phoneNumber} customerName={customerData[k].customerName} custPhoneNumber={customerData[k].custPhoneNumber} reloadData={reloadData} />
                        :
                        null
                    ))}
                  </>
              }
            </>
        }
      </ScrollView>


      {/* Footer */}

      <View style={[styles.footer, {backgroundColor:colors.primary, borderColor:colors.primary}]}>
        
        <TouchableOpacity style={styles.footerButton} onPress={() => setSettingsModalOpen(true)}>
          <Icon name="gear" size={24} style={{color:colors.background}} />
          <Text style={{fontWeight:'500', color:colors.background}}>Settings</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.addCustomerButton, {borderColor:colors.background}]} onPress={() => navigation.navigate('AddCustomer', {phoneNumber: route.params.phoneNumber, onGoBack:loadData})}>
          <Text style={{ color:colors.background }}>+ Add Customer</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.footerButton} onPress={logout}>
          <Icon name="rocket" size={24} style={{color:colors.background}}/>
          <Text style={{fontWeight:'500', color:colors.background}}>Log Out</Text>
        </TouchableOpacity>
      
      </View>

      {/* Settings Modal */}
      <SettingsModal transparent={true} visible={settingsModalOpen} setTheme={route.params?.setTheme} closeSettingsModal={() => setSettingsModalOpen(false)}/>

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
    borderWidth:1,
    borderRadius: 20,
    paddingVertical:10,
    paddingHorizontal: 20,
  },
  footer: {
    flex:0.3,
    flexDirection:'row',
    justifyContent:'space-evenly',
    width: '95%',
    // paddingVertical:10,
    // marginTop:5,
    // backgroundColor:'#4D4D4D',
    alignItems:'center',
    borderWidth:1,
    borderRadius:20,
    marginBottom:5
  },
  footerButton: {
    alignItems:'center',
    // borderColor:'black',
  }
});


export default Main;
