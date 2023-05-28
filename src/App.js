import * as React from 'react';
import Login from './components/pages/Login';
import { Provider } from 'react-native-paper';
import { LogBox, View, Alert } from 'react-native';

LogBox.ignoreLogs(['Possible Unhandled Promise Rejection']);

export default function App() {
    return (
        <Provider >
            <Login />
        </Provider>
    );
}
