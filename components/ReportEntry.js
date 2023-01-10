import { StyleSheet, Text, View } from "react-native";
import { useTheme } from '@react-navigation/native';

function ReportEntry(props) {
    const { colors } = useTheme();
    return (
        <View style={{flexDirection:'row', width:'100%', height:75}}>
            <View style={{flex:5, alignSelf:'center'}}>
                <Text style={{alignSelf:'flex-start', fontSize:16, fontWeight:'bold', color:colors.text}}>{props.customerName}</Text>
                <Text style={{alignSelf:'flex-start', fontSize:12, fontWeight:'bold', color:colors.text}}>{props.date}</Text>
            </View>

            {/* <Text style={[entryStyles.item, { color:'red',flex:2.5, fontSize:18, fontWeight:'bold' }]}>{props.igave}</Text>
            <Text style={[entryStyles.item, { color:'green',flex:2.5, fontSize:18, fontWeight:'bold' }]}>{props.itook}</Text> */}

            <Text style={[entryStyles.item, { color:'red',flex:2.5, fontSize:18, fontWeight:'bold' }]}>{props.isIPaid ? props.amount : null}</Text>
            <Text style={[entryStyles.item, { color:'green',flex:2.5, fontSize:18, fontWeight:'bold' }]}>{!props.isIPaid ? props.amount : null}</Text>

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