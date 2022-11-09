import { StyleSheet, Text, View } from "react-native";


function TransactionRecord(props) {
    return (
        <View style={{flexDirection:'row', width:'100%', height:75}}>
            <Text style={{alignSelf:'center', flex:5, fontSize:18, fontWeight:'bold'}}>{props.date}</Text>
            <Text style={[entryStyles.item, { color:'red',flex:2.5, fontSize:18, fontWeight:'bold' }]}>{props.igave}</Text>
            <Text style={[entryStyles.item, { color:'green',flex:2.5, fontSize:18, fontWeight:'bold' }]}>{props.itook}</Text>
        </View>
    );
}
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
export default TransactionRecord;