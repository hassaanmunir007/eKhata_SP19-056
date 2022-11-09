

import React from 'react';
import {
  StyleSheet, Text, TextInput,
} from 'react-native';
import Main from './screens/Main';
import AddCustomer from './screens/AddCustomer';
import LoginSignup from './screens/LoginSignup';
import ReportDownload from './screens/ReportDownload';
import CustomerRecord from './screens/CustomerRecord';

const App = () => {
  return (
    // <Text>My App</Text>
    <LoginSignup/>
    // <Main/>
    // <AddCustomer/>
    // <CustomerRecord/>
    // <ReportDownload/>
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


export default App;
