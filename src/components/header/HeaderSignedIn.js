import * as React from 'react';
import { Menu, IconButton, Text } from 'react-native-paper';
import { Header, Overlay } from "@rneui/base";
import { LogBox, View, Alert, Image, StyleSheet, Button } from 'react-native';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { firebase } from '@react-native-firebase/auth';
import auth from '@react-native-firebase/auth';

LogBox.ignoreLogs(['Possible Unhandled Promise Rejection']);

const CustomIcon = () => (
  <View style={{paddingLeft: '15%'}}>
    <Image source={require('../../../assets/images/logo-black.png')} style={{ width: 60, height: 60 }} />
  </View>
);

export default function HeaderSignedIn() {
  const [menuVisible, setMenuVisible] = React.useState(false);
  const [innerMenuVisible, setInnerMenuVisible] = React.useState(false);
  const [overlayVisible, setOverlayVisible] = React.useState(false);

  const user = firebase.auth().currentUser;
  const username = user.displayName ? user.displayName : user.email;
  const firstName = username.split(" ")[0];

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

  const mostrarOverlay = () => {
    setOverlayVisible(true);
    closeMenu();
  };

  const esconderOverlay = () => {
    setOverlayVisible(false);
  };

  const LogOut = async () => {
    try {
      auth().signOut().then(() => console.log('User signed out!'));
      await GoogleSignin.revokeAccess();
      await GoogleSignin.signOut();
    } catch (error) {
      console.error(error);
    }
  };

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

  const AjudaOverlay = () => (
    <View>
      <Overlay isVisible={overlayVisible} onBackdropPress={esconderOverlay} overlayStyle={styles.overlay}>
        <View>
            <CustomIcon></CustomIcon>
        </View>
        <Text style={styles.title}>Finances Pig</Text>
        <Text style={styles.subTitle}>v0.8 beta</Text>
        <Text style={styles.text}>
            O Finances Pig é um aplicativo de controle financeiro completo.{'\n\n'}
            Registre seus ganhos e gastos, defina metas financeiras e acompanhe seu progresso.
            Economize e tenha o controle total das suas finanças.</Text>
        <Button  style={styles.overlayButton} title="Ok" onPress={esconderOverlay} />
      </Overlay>
    </View>
  );

  return (
    <View>
      <Header
        leftComponent={<CustomIcon />}
        backgroundColor="darkorange"
        containerStyle={{ paddingBottom: 1 }}
        rightComponent={
          <View>
            <View>
              <Menu /* Inínio do Menu principal */
                visible={menuVisible}
                onDismiss={closeMenu}
                anchorPosition='bottom'
                anchor={<IconButton size={50} icon="menu" iconColor='white' onPress={openMenu} style={{ paddingBottom: 10 }} />}
              >
                <Menu /* Inínio do menu interno */
                  visible={innerMenuVisible}
                  onDismiss={closeMenu}
                  anchorPosition='bottom'
                  anchor={
                    <View style={{ display: 'flex', flex: 1, flexDirection: 'row', flexWrap: 'wrap', columnGap: -8 }}>
                      <IconButton size={30} icon="account-circle" iconColor='black' onPress={openInnerMenu} />
                      <Text style={{ paddingVertical: 20, paddingRight: 20 }} onPress={openInnerMenu}>{username}</Text>
                    </View>
                  }>
                  <Menu.Item leadingIcon={'logout'} onPress={createTwoButtonAlert} title="Sair" />
                </Menu>{/* Fim do menu interno */}
                <Menu.Item leadingIcon={'help-circle'} onPress={() => mostrarOverlay()} title="Sobre" />
              </Menu>{/* Fim do Menu principal */}
            </View>
          </View>
        }
      />
      {/* Carrega o componente AjudaOverlay em modo invisível. 
      Ele só será exibido quando clicarmos na opção "Sobre" dentro do menu */}
      <AjudaOverlay /> 
    </View>
  );
}

const styles = StyleSheet.create({
    overlay: {
        alignItems:'center',
        backgroundColor: 'white',
        marginBottom: 100,
        paddingVertical: 50,
        width: '70%'
    },
    title: {
        fontWeight: 'bold',
        fontSize: 20,
        marginTop: 10
    },
    subTitle: {
        fontSize: 14,
        textAlignVertical:'center',
        textAlign:'center'
    },
    text: {
        fontSize: 16,
        textAlignVertical:'center',
        textAlign:'center',
        marginTop: 20,
        paddingBottom: 40
    }
});
