// import { StyleSheet, Text, TouchableOpacity } from "react-native-web";
// import { MaterialCommunityIcons } from '@expo/vector-icons'; 

import { StyleSheet, Text, TouchableOpacity } from "react-native";
import Icon from 'react-native-vector-icons/FontAwesome';
import { useTheme } from '@react-navigation/native';

function CustomerListItem(props) {
    const { colors } = useTheme();
    const openCustomerRecord = () => {
        props.navigation.navigate('CustomerRecord', { customerName: props.customerName, custPhoneNumber: props.custPhoneNumber, userPhone: props.userPhone, reloadData: props.reloadData });
    }
    const deleteCustomer = () => {
        var requestOptions = {
          method: 'DELETE',
        }
    
        fetch(`https://ekhata-980a5-default-rtdb.firebaseio.com/users/${props.userPhone}/customers/${props.custPhoneNumber}.json`, requestOptions)
          .then(resp => resp.json())
          .then(res => {
            alert('Customer deleted successfully');
            props.reloadData();
          })
          .catch(err => alert("Something went wrong. Please try again."));
    }
    return (
        <TouchableOpacity style={[entryStyles.main, {borderColor:colors.border}]} onPress={openCustomerRecord}>
            <Icon style={[entryStyles.item, { color:colors.text, flex: 1, marginLeft:15 }]} name="user" size={24}/>
            <Text style={[entryStyles.item, { color:colors.text, flex: 2 }]}>{props.customerName}</Text>
            <Text style={[entryStyles.item, { color:colors.text, flex: 2 }]}>{props.custPhoneNumber}</Text>
            {/* <Text style={[entryStyles.item, { color:colors.text, flex: 1 }]}>Rs {props.amount}</Text> */}
            <TouchableOpacity style={[entryStyles.item, {flex: 1, height:'100%', alignItems:'center', justifyContent:'center'}]} onPress={deleteCustomer}>
                <Icon style={{ color:colors.text }} name="remove" size={24}/>
            </TouchableOpacity>
        </TouchableOpacity>
    );
}

// function CustomerListItem(){ 
//     <Text>Testers</Text>
// }

const entryStyles = StyleSheet.create({
    main: {
        flexDirection: 'row',
        width: '100%',
        height: 50,
        borderWidth:1,
        borderRadius:15,
        marginTop:10,
    },
    item: {
        alignSelf: 'center',
    }
});

export default CustomerListItem;