import { StyleSheet, Text, View } from "react-native";
import { useTheme } from '@react-navigation/native';

function TransactionRecord(props) {
  const { colors } = useTheme();
  return (
        <View style={[entryStyles.main, {borderColor:colors.text}]}>
            <Text style={[entryStyles.transactionDate, {color:colors.text, marginLeft:10 }]}>{props.date}</Text>

            <Text style={[entryStyles.item, { color:'red'}]}>{props.isIPaid ? props.amount : null}</Text>
            <Text style={[entryStyles.item, { color:'green'}]}>{!props.isIPaid ? props.amount : null}</Text>

        </View>
    );
}
const entryStyles = StyleSheet.create({
    main: {
        flexDirection: 'row',
        width: '100%',
        height: 75,
        borderWidth:1,
        borderRadius:15,
        marginTop:10,
    },
    transactionDate: {
        alignSelf:'center', flex:5, fontSize:16, fontWeight:'bold'
    },
    item: {
        alignSelf: 'center',flex:2.5, fontSize:18, fontWeight:'bold'
    }
});
export default TransactionRecord;