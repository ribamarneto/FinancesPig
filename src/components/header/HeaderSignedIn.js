import * as React from 'react';
import { Menu, Provider, IconButton, Text } from 'react-native-paper';
import { Header, Icon } from "@rneui/base";
import { LogBox, View, Alert, Image } from 'react-native';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { firebase } from '@react-native-firebase/auth';
import auth from '@react-native-firebase/auth';

LogBox.ignoreLogs(['Possible Unhandled Promise Rejection']);

const CustomIcon = () => (
    <View>
        <Image source={require('../../../assets/images/logo-black.png')} style={{ width: 60, height: 60, marginLeft: "10%" }} />
    </View>
);

export default function HeaderSignedIn() {
    const [menuVisible, setMenuVisible] = React.useState(false);
    const [innerMenuVisible, setInnerMenuVisible] = React.useState(false);

    const user = firebase.auth().currentUser;
    const username = user.displayName;
    const firstName = username.split(" ")[0];

    
    //Funções que setam a visibilidade do menu | são chamadas dentro do componente
    const openMenu = () => {
        setMenuVisible(true);
    };

    const openInnerMenu = () => {
        setInnerMenuVisible(true);
    };

    const closeMenu = () => {
        setMenuVisible(false);
        setInnerMenuVisible(false);
    };

    // Deslogar o usuário
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

    
    // Pop-up de confirmação de saída
    const createTwoButtonAlert = () => {
        Alert.alert('Sair', 'Deseja realmente sair?', [
            {
                text: 'Cancelar',
                onPress: () => { },
                style: 'cancel',
            },
            { text: 'OK', onPress: LogOut },
        ]);
    };

    return (
        <View>
            <Header //Componente de Header da biblioteca @rneui/base
                leftComponent={<CustomIcon />} //Item do lado esquerdo do Header
                backgroundColor="darkorange"
                containerStyle={{ paddingBottom: 1 }}
                rightComponent={ //Item do lado direito do Header
                    <View>
                        <View>
                            <Menu
                                visible={menuVisible}
                                onDismiss={closeMenu}
                                anchorPosition='bottom'
                                anchor={<IconButton size={50} icon="menu" iconColor='white' onPress={openMenu} style={{paddingBottom: 10}} />}
                            >
                                <Menu
                                    visible={innerMenuVisible}
                                    onDismiss={closeMenu}
                                    anchorPosition='bottom'
                                    anchor={
                                        <View style={{ display: 'flex', flex: 1, flexDirection: 'row', flexWrap: 'wrap', columnGap: -8 }}>
                                            <IconButton size={30} icon="account-circle" iconColor='black' onPress={openInnerMenu} />
                                            <Text style={{ paddingVertical: 20, paddingRight: 20 }} onPress={openInnerMenu}>{username}</Text>
                                        </View>}>
                                    <Menu.Item leadingIcon={'logout'} onPress={createTwoButtonAlert} title="Sair" />
                                </Menu>
                            </Menu>
                        </View>

                    </View>
                }
            />
        </View>

    );
}
