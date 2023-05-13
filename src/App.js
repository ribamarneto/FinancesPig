import * as React from 'react';
import Login from './components/pages/Login';
import { Menu, Provider, IconButton } from 'react-native-paper';
import { Header, Icon } from "@rneui/base";
import { LogBox, View, Alert } from 'react-native';

LogBox.ignoreLogs(['Possible Unhandled Promise Rejection']);

export default function App() {
    return (
        <Provider >
            <Login />
        </Provider>
    );
}
