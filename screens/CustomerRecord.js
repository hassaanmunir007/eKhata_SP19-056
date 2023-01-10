

import React, { useState } from 'react';
import {
  Button,
  KeyboardAvoidingView,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome';
import CashFlowBox from '../components/CashFlowBox';
import TransactionRecord from '../components/TransactionRecord';
import { useTheme } from '@react-navigation/native';

const CustomerRecord = ({navigation, route}) => {
  
  const { colors } = useTheme();
  const [transactionData, setTransactionData] = useState();
  const [isLoadingTransactions, setIsLoadingTransactions] = useState(true);
  const [cashFlowValue, setCashFlowValue] = useState(0);
  // Modal
  const [open, setOpen] = useState(false);
  const [amount, setAmount] = useState(0);
  const [isPaidSelected, setIsPaidSelected] = useState();
  const onModalOkay = () => {
    setOpen(!open);
    saveTransaction(isPaidSelected);
  }

  const getCurrentDateTime = () => {
    var currentdate = new Date();
    var datetime = currentdate.getDate() + "-"
      + (currentdate.getMonth() + 1) + "-"
      + currentdate.getFullYear() + ", "
      + currentdate.getHours() + ":"
      + currentdate.getMinutes() + ":"
      + currentdate.getSeconds();
    return datetime;
  }

  const saveTransaction = (isIPaid) => {
    const currentDateTime = getCurrentDateTime();
    var transaction = {
      date: currentDateTime,
      amount: amount,
      iPaid: isIPaid,
    }
    var requestOptions = {
      method: 'PUT',
      body:JSON.stringify(transaction)
    }
    fetch(`https://ekhata-980a5-default-rtdb.firebaseio.com/users/${route.params.userPhone}/customers/${route.params.custPhoneNumber}/transactions/${currentDateTime}.json`, requestOptions)
      .then(resp => resp.json())
      .then(res => {
        // console.log(res);
        alert("Transaction added successfully.");
        loadTransactions();
        setAmount(0);
        route.params.reloadData(); // reloads the Main page
      })
      .catch(err => alert("Something went wrong. Please try again."));
  }

  const updateCashBox = (res) => {
    if (res == null) return;
    var totalPaid = 0;
    var totalReceived = 0;
    Object.keys(res).forEach(x => {
      const amt = Number.parseInt(res[x].amount);
      if (res[x].iPaid) totalPaid += amt;
      else totalReceived += amt;
    })
    setCashFlowValue(totalPaid - totalReceived);
  }

  const loadTransactions = () => {
    setIsLoadingTransactions(true);
    var requestOptions = {
      method: 'GET',
    }

    fetch(`https://ekhata-980a5-default-rtdb.firebaseio.com/users/${route.params.userPhone}/customers/${route.params.custPhoneNumber}/transactions.json`, requestOptions)
      .then(resp => resp.json())
      .then(res => {
        setTransactionData(res);
        // console.log("Customer: " + JSON.stringify(res));
        // console.log(Object.keys(res));
        setIsLoadingTransactions(false);

        updateCashBox(res);
      })
      .catch(err => alert("Something went wrong. Please try again."));

  }

  React.useEffect(() => {   // runs only once
    loadTransactions();
  }, [])

  return (
    <View style={styles.container}>
      
      {/* Header */}
      <View style={{width:'90%', flexDirection: 'row', alignItems: 'center', flex: 0.5 }}>
      </View>

      <View style={{flex: 1}}>
        <CashFlowBox money={Math.abs(cashFlowValue)} isGive={Math.sign(cashFlowValue) < 0}/>
      </View>

      <View style={{width:'90%', flex:3}}>

        <View style={{flexDirection:'row'}}>
          <Text style={[styles.tableHeading, {color:colors.primary, flex:5, paddingLeft:5}]}>Date</Text>
          <Text style={[styles.tableHeading, {color:colors.primary, flex:2.5}]}>I paid</Text>
          <Text style={[styles.tableHeading, {color:colors.primary, flex:2.5}]}>I received</Text>
        </View>

        <ScrollView>

          <View style={{borderBottomColor:colors.text, borderBottomWidth:2}}></View>

          {
            isLoadingTransactions ?
              <>
                <Text style={{ color: colors.primary, textAlign: 'center', fontWeight: 'bold', fontSize: 25 }}>Loading...</Text>
              </>
              :
              <>
                {
                  transactionData == null ? <Text style={{ color: colors.primary, textAlign: 'center', fontWeight: 'bold', fontSize: 25 }}>No transactions</Text> :
                    <>
                      {Object.keys(transactionData).map(k => (
                        <View style={{ borderBottomColor: 'white', borderBottomWidth: 0.5 }}></View>,
                        <TransactionRecord key={transactionData[k].date} date={transactionData[k].date} isIPaid={transactionData[k].iPaid} amount={transactionData[k].amount} />
                      ))}
                    </>
                }
              </>
              
              
          }
        </ScrollView>
        
      </View>


      <View style={[styles.buttonsContainer, {flex:1}]}>
        {/* I Paid Button */}
        <View>
          <TouchableOpacity style={[styles.giveTakeButton, {backgroundColor:'red'}]} onPress={() => {setIsPaidSelected(true);setOpen(true)}}>
            <Icon name="money" style={{color:'white'}} size={24}/>
            <Text style={{ color: 'white', fontWeight:'bold' }}>  I Paid  </Text>
          </TouchableOpacity>
        </View>
        {/* I Received Button */}
        <View>
          <TouchableOpacity style={[styles.giveTakeButton, {marginLeft:5,backgroundColor:'green'}]} onPress={() => {setIsPaidSelected(false);setOpen(true)}}>
            <Icon name="money" style={{color:'white'}} size={24}/>
            <Text style={{ color: 'white', fontWeight:'bold' }}> I Received</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Modal */}
      <Modal transparent={true} visible={open}>
        <View style={{ backgroundColor: '#000000aa', flex: 1, justifyContent:'center' }}>
          <View style={{ backgroundColor: colors.primary, alignSelf:'center', width:'90%', maxHeight:200, padding: 40, borderRadius: 10, flex: 1, alignItems:'center' }}>
            <Text style={{ color: colors.background, fontSize: 18 }}>Enter Amount</Text>
            <TextInput placeholder={`${isPaidSelected ? 'paid' : 'received'} amount...`} onChangeText={setAmount} style={{width:'100%', color: colors.background, borderWidth: 1, borderRadius: 5, borderColor: 'white' }} />
            <TouchableOpacity style={{padding:4, marginVertical:10, alignItems: 'center', borderWidth: 1, width: '50%', borderRadius: 25, borderColor: 'white', backgroundColor: colors.text }} onPress={onModalOkay}
              disabled={amount.length == 0 || amount == 0 || !(/^\d+$/.test(amount))}>
              <Text style={{ fontWeight: '500', color: colors.background }}>Okay</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  giveTakeButton: {
    alignItems:'center',
    borderRadius: 20,
    paddingVertical:10,
    paddingHorizontal: 20,
    flexDirection:'row',
  },
  buttonsContainer: {
    flexDirection:'row',
    justifyContent:'space-evenly',
    marginBottom:20,
  },
  tableHeading: {
    fontSize:18,
    fontWeight:'bold',
  },
  downloadReportButton: {
    alignItems:'center',
    borderRadius: 20,
    backgroundColor:'white',
    paddingVertical:10,
    paddingHorizontal: 10,
    flexDirection:'row'
  },
});


export default CustomerRecord;
