

 import React, { useState } from 'react';
 import {
   StyleSheet,TextInput,
   Text,
   View,
   TouchableOpacity,
   KeyboardAvoidingView,
   ScrollView,
 } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useTheme } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const LoginSignup = ({navigation}) => {
  const { colors } = useTheme();
  const [businessName, setBusinessName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [accountPassword, setPassword] = useState("");
  const [isSignUpShow, setIsSignUpShown] = useState(false);


  
  React.useEffect(() => {
    setPhoneNumber("");
    setPassword("");
    setBusinessName("");
  }, [isSignUpShow]);

  const login = async () => {

    var requestOptions = {
      method: 'GET',
    }

    fetch(`https://ekhata-980a5-default-rtdb.firebaseio.com/users/${phoneNumber}/accountDetails.json`, requestOptions)
      .then(resp => resp.json())
      .then(res => {
        if (res == null) {
          alert("Incorrect phone or password.");
        }
        else {
          if (res.password == accountPassword) {
            navigation.navigate('Main', { businessName: res.businessName, phoneNumber: res.phoneNumber});
          }
          else {
            alert("Incorrect phone or password.");
          }
        }
      })
      .catch(err => alert("Something went wrong. Please try again."));
  }

  const checkSignUp = () => {
    // check if this number already exists
    fetch(`https://ekhata-980a5-default-rtdb.firebaseio.com/users/${phoneNumber}.json`, { method: 'GET' })
      .then(resp => resp.json())
      .then(res => {
        if (res != null) {
          alert("This number is already registered, please try another number.");
        }
        else {
          signUp();
        }
      })
      .catch(err => alert("Something went wrong. Please try again."));
  }

  const signUp = async () => {

    var obj = {
      businessName: businessName,
      phoneNumber: phoneNumber,
      password: accountPassword
    }

    var requestOptions = {
      method: 'PUT',
      body:JSON.stringify(obj)
    }

    fetch(`https://ekhata-980a5-default-rtdb.firebaseio.com/users/${phoneNumber}/accountDetails.json`, requestOptions)
      .then(resp => resp.json())
      .then(res => {
        alert("Account created successfully.");
        setIsSignUpShown(false);
      })
      .catch(err => alert("Something went wrong. Please try again."));

  }

  return (
    <KeyboardAvoidingView style={styles.container} behavior='height'>
      {/* Header */}
      <View style={{flex:2, justifyContent:'center'}}>
        <View style={{flexDirection:'row', padding:15, alignItems:'center', borderRadius:50, backgroundColor:colors.primary}}>
          <Icon name="clipboard" size={35} style={{color:colors.background}}/>
          <Text style={{fontSize:50, fontWeight:'bold', paddingLeft:25, color:colors.background}}>{isSignUpShow ? 'Sign Up' : 'Login'}</Text>
        </View>
      </View>

      {/* Inputs */}

      <View style={{width:'90%', marginBottom:10, flex:4}}>

        {isSignUpShow ? <>
          {/* Business Name */}
          <View>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Icon name="building" size={35} style={{ color: colors.text }} />
              <Text style={{ fontSize: 20, marginLeft: 10, color: colors.text }}>Business Name:</Text>
            </View>
            <TextInput style={{ fontSize: 15, color: colors.text }} value={businessName} onChangeText={setBusinessName}/>
            <View style={{ borderBottomColor: businessName.length == 0 ? 'red' : colors.text, borderBottomWidth: 1 }}></View>
          </View>
        </> : <></>}


        {/* Business Phone */}
        <View style={{ paddingTop: 20 }}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Icon name="phone" size={35} style={{ color: colors.text }} />
            <Text style={{ fontSize: 20, marginLeft: 10, color: colors.text }}>Phone Number:</Text>
          </View>
          <TextInput style={{ fontSize: 15, color: colors.text }} value={phoneNumber} onChangeText={setPhoneNumber} />
          <View style={{ borderBottomColor: (phoneNumber.length != 11 || !(/^\d+$/.test(phoneNumber))) ? 'red' : colors.text, borderBottomWidth: 1 }}></View>
        </View>

        {/* Password */}
        <View style={{ paddingTop: 20 }}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Icon name="lock" size={35} style={{ color: colors.text }} />
            <Text style={{ fontSize: 20, marginLeft: 10, color: colors.text }}>Password:</Text>
          </View>
          <TextInput style={{ fontSize: 15, color: colors.text }} value={accountPassword} onChangeText={setPassword} />
          <View style={{ borderBottomColor: accountPassword.length == 0 ? 'red' : colors.text, borderBottomWidth: 1 }}></View>
        </View>

      </View>

      <KeyboardAvoidingView style={{flex:4}} behavior='height'>
        {/* Save Button */}
        <TouchableOpacity style={[styles.loginButton, {marginBottom:10, width:'100%', alignSelf:'center', backgroundColor:colors.primary}]}
            onPress={isSignUpShow ? checkSignUp : login} 
            disabled={accountPassword.length == 0 || phoneNumber.length != 11 || !(/^\d+$/.test(phoneNumber)) || (isSignUpShow ? (businessName.length == 0) : false)}>
            <Text style={{ color: colors.background, fontSize:15, paddingHorizontal:20, paddingVertical:5 }}>
              {isSignUpShow ? 'Sign Up' : 'Log In'}
            </Text>
        </TouchableOpacity>
        
        {/* Sign Up and Log In Text/Button */}
        <View style={{ flexDirection: 'row', marginTop: 20, alignItems: 'center' }}>
          {isSignUpShow ?
            <>
              {/* Login */}
              <Text style={{ color: colors.text }}>Already have an account? </Text>
              <Text style={[styles.signUpText, { borderColor: colors.primary, color: colors.text }]} onPress={() => setIsSignUpShown(!isSignUpShow)}> Log In </Text>
            </>
            :
            <>
              {/* SignUp */}
              <Text style={{ color: colors.text }}>Dont' have an account? </Text>
              <Text style={[styles.signUpText, { borderColor: colors.primary, color: colors.text }]} onPress={() => setIsSignUpShown(!isSignUpShow)}> Sign Up </Text>
            </>
          }
        </View>

      </KeyboardAvoidingView>

    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  loginButton: {
    alignItems:'center',
    borderRadius: 15,
    paddingVertical:10,
    paddingHorizontal: 20,
  },
  signUpText: {
    borderWidth:1,
    borderRadius:10,
    padding:2
  }
});


export default LoginSignup;
