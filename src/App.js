import * as React from 'react';
import Login from "./components/Login";
import { Menu, Provider, IconButton } from 'react-native-paper';
import { Header, Icon } from "@rneui/base";
import { LogBox, View, Alert } from 'react-native';
import { GoogleSignin } from '@react-native-google-signin/google-signin';

LogBox.ignoreLogs(['Possible Unhandled Promise Rejection']);

export default function App() {
    const [menuVisible, setMenuVisible] = React.useState(false);

    const openMenu = () => {
        setMenuVisible(true);
    };

    const closeMenu = () => {
        setMenuVisible(false);
    };

    const LogOut = async () => {
        try {
          await GoogleSignin.revokeAccess();
          await GoogleSignin.signOut();
          // Remova a linha abaixo se você não está usando um estado em um componente de classe
          // this.setState({ user: null });
          auth().signOut().then(() => console.log('User signed out!'));
        } catch (error) {
          console.error(error);
        }
      };

    const createTwoButtonAlert = () => {
        Alert.alert('Sair', 'Deseja realmente sair?', [
            {
            text: 'Cancelar',
            onPress: () => {},
            style: 'cancel',
            },
            { text: 'OK', onPress: LogOut },
        ]);
    };

    return (
        <Provider >
            <Header
                leftComponent={{ text: 'Olá, ', style: { color: '#fff', fontWeight: 'bold', paddingTop: 60 } }}
                centerComponent={{ text: 'Finances Pig', style: { color: '#fff', fontSize: 23, fontWeight: "bold" } }}
                backgroundColor="#ff6347"
                rightComponent={
                    <View style={{paddingTop: 40}}>
                        <Menu
                            style={{paddingTop: 40}}
                            visible={menuVisible}
                            onDismiss={closeMenu}
                            anchorPosition='bottom'
                            anchor={<IconButton icon="account-circle" iconColor='white' onPress={openMenu} />}
                        >
                            <Menu.Item leadingIcon={'logout'} onPress={createTwoButtonAlert} title="Sair" />
                        </Menu>
                    </View>
                }
            />
            <Login />
        </Provider>
    );
}
