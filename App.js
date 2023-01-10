import React from 'react';
import {
  StyleSheet, Text, TouchableOpacity
} from 'react-native';
import Main from './screens/Main';
import AddCustomer from './screens/AddCustomer';
import LoginSignup from './screens/LoginSignup';
import ReportDownload from './screens/ReportDownload';
import CustomerRecord from './screens/CustomerRecord';
import { NavigationContainer, DefaultTheme, DarkTheme, useTheme  } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Stack = createNativeStackNavigator();

const App = () => {
  const { colors } = useTheme();
  const [theme, setTheme] = React.useState(0);  // 0->light | 1->dark | 2->orange

  React.useEffect(() => {   // sets theme
    AsyncStorage.getItem('@theme')
      .then((resp) => {
        if (resp != null) {
          setTheme(resp);
        }
        else {
          console.log("-> " + resp);
        }
      })
      .catch((e) => {
        console.log("Error: " + e)
      })
  }, [])

  const bluishYellowTheme = {
    // primary, background, text, border, card, notification
    ...DefaultTheme,
    colors: {
      primary: '#f9d162',
      background: '#0a5688',
      text: '#ffffff',
      border: '#f9d162',
      card: '#00416c',
      notification: 'yellow'
    }
  }

  return (
    <NavigationContainer theme={theme == 0 ? DefaultTheme : (theme == 1 ? DarkTheme : bluishYellowTheme)}>
      <Stack.Navigator initialRouteName="LoginSignup" >
        <Stack.Screen name="Main" component={Main} options={{ headerShown:false }} initialParams={{ setTheme: setTheme }} />
        <Stack.Screen name="AddCustomer" component={AddCustomer} options={{ title:"Add Customer" }}  />
        <Stack.Screen name="LoginSignup" component={LoginSignup} options={{headerShown:false}} />
        <Stack.Screen name="CustomerRecord" component={CustomerRecord} 
          options={({ route }) => ({ 
            title: route.params.customerName,
          })}
        />
        <Stack.Screen name="ReportDownload" component={ReportDownload} options={({ route }) => ({title: `${route.params.customerName}'s Report`})} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
