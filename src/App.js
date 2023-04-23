import { View, StyleSheet } from "react-native";
import * as React from 'react';
import { Text, Header } from '@rneui/themed';
import Home from "./components/Home";

export default function App() {
    return (
        <View>
            <Header
            leftComponent={{ icon: 'home', color: '#fff' }}
            centerComponent={{ text: 'Finances Pig', style: { color: '#fff', fontSize: 23, fontWeight: "bold" } }}
            rightComponent={{ icon: 'menu', color: '#fff' }}
            containerStyle={{marginBottom: 50}}
            backgroundColor="#ff6347"
            />
            <Home/>
        </View>
        
    );
}
