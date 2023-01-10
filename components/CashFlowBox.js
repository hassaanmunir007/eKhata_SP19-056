import { Text, StyleSheet, View } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

function CashFlowBox(props) {
    return(
        <View style={(props.isGive ? greenStyles: redStyles).outerMost}>
            <Icon style={(props.isGive ? greenStyles: redStyles).icon} name="user" size={24} />
            <View style={{alignSelf:'center'}}>
                <Text style={[(props.isGive ? greenStyles: redStyles).text, {fontSize:20}]}>Rs {props.money}</Text>
                <Text style={[(props.isGive ? greenStyles: redStyles).text, {fontWeight:'normal'}]}>
                    {props.overrideText ?
                        props.overrideText
                        :
                        props.isGive ? "I have to give" : "I have to get"
                    }
                </Text>
            </View>
        </View>
    );
}

const redStyles = StyleSheet.create({
    outerMost: {
        backgroundColor:'#FFE0D9', flexDirection:'row', padding:10, paddingHorizontal:15, borderRadius:4, marginHorizontal:15
    },
    icon: {
        color:'red', alignSelf:'center', paddingRight:10
    },
    text: {
        color:'red', fontWeight:'700'
    }
});
const greenStyles = StyleSheet.create({
    outerMost: {
        backgroundColor:'#DBFFD9', flexDirection:'row', padding:10, paddingHorizontal:15, borderRadius:4, marginHorizontal:15
    },
    icon: {
        color:'green', alignSelf:'center', paddingRight:10
    },
    text: {
        color:'green', fontWeight:'700'
    }
});

export default CashFlowBox;