// import { StyleSheet, Text, TouchableOpacity } from "react-native-web";
// import { MaterialCommunityIcons } from '@expo/vector-icons'; 

import { StyleSheet, Text, TouchableOpacity } from "react-native";
import Icon from 'react-native-vector-icons/FontAwesome';

function CustomerListItem(props) {
    return (
        <TouchableOpacity style={entryStyles.main}>
            {/* <MaterialCommunityIcons style={[entryStyles.item, { flex: 1 }]} name="face-man-profile" size={24} color="black" /> */}
            <Icon style={[entryStyles.item, { flex: 1 }]} name="user" size={24}/>
            <Text style={[entryStyles.item, { flex: 3 }]}>{props.customerName}</Text>
            <Text style={[entryStyles.item, { flex: 1, color:'green' }]}>Rs {props.amount}</Text>
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
    },
    item: {
        alignSelf: 'center',
    }
});

export default CustomerListItem;