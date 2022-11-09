import { StyleSheet, Text, View } from "react-native";


function ReportEntry(props) {
    return (
        <View style={{flexDirection:'row', width:'100%', height:75}}>
            <View style={{flex:5, alignSelf:'center'}}>
                <Text style={{alignSelf:'flex-start', fontSize:16, fontWeight:'bold'}}>{props.customerName}</Text>
                <Text style={{alignSelf:'flex-start', fontSize:12, fontWeight:'bold'}}>{props.date}</Text>
            </View>
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
export default ReportEntry;