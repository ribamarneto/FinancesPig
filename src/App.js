
import * as React from 'react';
import Login from "./components/Login";
import { Provider, MD3LightTheme, MD3DarkTheme } from 'react-native-paper';
import { Header } from "@rneui/base";
import { LogBox } from 'react-native';

LogBox.ignoreLogs(['Possible Unhandled Promise Rejection']);

export default function App() {
    // Set an initializing state whilst Firebase connects

    const onMenuPress = () => {
        console.log('Menu pressed');
    }

    return (
        <Provider >
            <Header
                centerComponent={{ text: 'Finances Pig', style: { color: '#fff', fontSize: 23, fontWeight: "bold"} }}
                containerStyle={{ marginBottom: 50 }}
                backgroundColor="#ff6347"
            />
            <Login/>
        </Provider>
    );
}
