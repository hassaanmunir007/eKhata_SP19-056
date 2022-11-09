import { Text, StyleSheet, View } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

function CashFlowBoxRed() {
    return(
        <View style={styles.outerMost}>
            <Icon style={styles.icon} name="user" size={24} />
            <View style={{alignSelf:'center'}}>
                <Text style={[styles.text, {fontSize:20}]}>Rs 500</Text>
                <Text style={[styles.text, {fontWeight:'normal'}]}>I have to get</Text>
            </View>
        </View>
    );
}
function CashFlowBoxGreen() {
    return(
        <View style={[styles.outerMost, {backgroundColor:'#DBFFD9'}]}>
            <Icon style={[styles.icon, {color:'green'}]} name="user" size={24} />
            <View style={{alignSelf:'center'}}>
                <Text  style={[styles.text, {fontSize:20,color:'green'}]}>Rs 654</Text>
                <Text style={[styles.text, {color:'green', fontWeight:'normal'}]}>I have to give</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
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

export {CashFlowBoxRed, CashFlowBoxGreen};