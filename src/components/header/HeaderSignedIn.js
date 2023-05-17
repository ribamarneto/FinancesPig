import * as React from 'react';
import { Menu, Provider, IconButton, Text } from 'react-native-paper';
import { Header, Icon } from "@rneui/base";
import { LogBox, View, Alert } from 'react-native';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { firebase } from '@react-native-firebase/auth';
import auth from '@react-native-firebase/auth';

LogBox.ignoreLogs(['Possible Unhandled Promise Rejection']);

export default function HeaderSignedIn() {
    const [menuVisible, setMenuVisible] = React.useState(false);

    const user = firebase.auth().currentUser;
    const username = user.displayName;
    const firstName = username.split(" ")[0];

    const openMenu = () => {
        setMenuVisible(true);
    };

    const closeMenu = () => {
        setMenuVisible(false);
    };

    const LogOut = async () => {
        try {
            auth().signOut().then(() => console.log('User signed out!'));
            await GoogleSignin.revokeAccess();
            await GoogleSignin.signOut();
          // Remova a linha abaixo se você não está usando um estado em um componente de classe
          // this.setState({ user: null });
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
        <View>  
            <Header
                leftComponent={{ text: 'Finances Pig', style: { color: '#fff', fontSize: 23, fontWeight: "bold", paddingTop: 10, width: 200 } }}
                backgroundColor="darkorange"
                containerStyle={{paddingBottom: 20}}
                rightComponent={
                    <View style={{ display: 'flex', flex: 1, flexDirection: 'column', flexWrap: 'wrap', position: 'relative', paddingLeft:30, columnGap: -8, paddingTop: 3 }}>
                        <Text style={{paddingTop: 18, color:'white'}}>{firstName}</Text>
                        <Menu
                            visible={menuVisible}
                            onDismiss={closeMenu}
                            anchorPosition='bottom'
                            anchor={<IconButton  icon="account-circle" iconColor='white' onPress={openMenu} />}
                        >
                            <Menu.Item leadingIcon={'logout'} onPress={createTwoButtonAlert} title="Sair" />
                        </Menu>
                    </View>
                }
            />
        </View>
            
    );
}
