import AsyncStorage from '@react-native-async-storage/async-storage';
import { useTheme } from '@react-navigation/native';
import { useState } from 'react';
import { Modal, Text, TextInput, TouchableOpacity, View } from 'react-native';
export default function SettingsModal(props) {
    const { colors } = useTheme();

    const changeTheme = (themeIndex) => {
        props.setTheme(themeIndex);
        saveThemeToStorage(themeIndex);
        props.closeSettingsModal();
    }

    saveThemeToStorage = async (value) => {
        try {
          await AsyncStorage.setItem('@theme', `${value}`)
        } catch(e) {
            console.log("Error: " + e)
        }
        console.log('Theme Saved.')
    }

    return (
        <Modal transparent={props.transparent} visible={props.visible}>
            <View style={{ backgroundColor: '#000000aa', flex: 1 }}>
                <View style={{ backgroundColor: colors.primary, marginVertical: 300, marginHorizontal: 50, padding: 40, borderRadius: 10, flex: 1}}>
                    <Text style={{ color: colors.background, fontSize: 18 }}>Select Theme</Text>
                    <View style={{flexDirection:'row'}}>
                        <TouchableOpacity style={{ padding: 4, marginVertical: 10, alignItems: 'center', width: '50%', borderRadius: 25, backgroundColor: 'white' }} onPress={() => changeTheme(0)}>
                            <Text style={{ fontWeight: '500', color: 'black' }}>Light</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={{ padding: 4, marginVertical: 10, alignItems: 'center', width: '50%', borderRadius: 25, backgroundColor: 'black' }} onPress={() => changeTheme(1)}>
                            <Text style={{ fontWeight: '500', color: 'white' }}>Dark</Text>
                        </TouchableOpacity>
                    </View>
                    <TouchableOpacity style={{width:'100%', padding: 4, marginVertical: 10, alignItems: 'center', borderRadius: 25, backgroundColor: '#0a5688' }} onPress={() => changeTheme(2)}>
                        <Text style={{ fontWeight: '500', color: '#f9d162' }}>Bluish Yellow</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    );
}