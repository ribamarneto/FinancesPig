import { View, Button, StyleSheet } from "react-native";
import * as React from 'react';
import { Text, Header } from '@rneui/themed';
import Home from "./components/Home";
import Login from "./components/Login";
import auth from '@react-native-firebase/auth';

export default function App() {
    // Set an initializing state whilst Firebase connects

    return (
        <View>
            <Header
                leftComponent={{ icon: 'home', color: '#fff' }}
                centerComponent={{ text: 'Finances Pig', style: { color: '#fff', fontSize: 23, fontWeight: "bold"} }}
                rightComponent={{ icon: 'menu', color: '#fff' }}
                containerStyle={{ marginBottom: 50 }}
                backgroundColor="#ff6347"
            />
            <Login/>          
        </View>
    );
}