//Importamos o useState para poder usar o estado
import React, { useState } from "react";
import { SocialIcon } from '@rneui/themed'
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import auth from '@react-native-firebase/auth';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  Button,
  KeyboardAvoidingView,
  Platform
} from "react-native";
//Importamos o AsyncStorage para armazenar os dados do usuário
import AsyncStorage from "@react-native-async-storage/async-storage";
import Bottom from './Bottom';
import HeaderSignedIn from '../header/HeaderSignedIn';
import HeaderSignedOut from '../header/HeaderSignedOut';
import { Provider } from 'react-native-paper';
import logoPig from "../../../assets/images/logo-black.png";

GoogleSignin.configure({
  webClientId: '804973163973-o2fkl9cojfilghpjumfqb0k4bi99tgfp.apps.googleusercontent.com',
  prompt: 'select_account',
});

export default function Login() {
  const [initializing, setInitializing] = React.useState(true);
  const [user, setUser] = React.useState();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [keyboardOpen, setKeyboardOpen] = useState(false);

  //Função para logar o usuário (dummy)  
  const saveAndNavigate = async () => {
    //verificamos se o email e senha estão preenchidos
    const emailLength = email.length;
    const passwordLength = password.length;
    if (emailLength > 0 && passwordLength > 0) {
      //Armazenamos os dados do usuário no AsyncStorage
      const user = {
        email: email,
        password: password
      }
      await asyncStorageSave(user);
      //Redirecionamos para a tela Home
      return navigation.navigate("Home");
    } else {
      //Caso não, exibimos uma mensagem de erro
      console.log('Preencha todos os campos');
    }
  }

  //Função para armazenar os dados do usuário no AsyncStorage
  const asyncStorageSave = async (user) => {
    try {
      //Armazenamos os dados do usuário no AsyncStorage
      await AsyncStorage.setItem('user', JSON.stringify(user));
      console.log('salvou no asyncstorage');
    } catch (error) {
      //Caso não, exibimos uma mensagem de erro
      console.log('erro ao salvar no asyncstorage');
    }
  }

  // Trata as mudanças de estado do usuário
  function onAuthStateChanged(user) {
    setUser(user);
    if (initializing) setInitializing(false);
  }

  React.useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  if (initializing) return null;

  //Se não houver um usuário logado, carrega a tela de login
  if (!user) {
    return (
      <Provider>
        <HeaderSignedOut />
        <View style={styles.container}>
          <View>
            <Image source={logoPig} style={styles.logo}></Image>
          </View>
          <View style={{marginTop:40}}>
            <SocialIcon
              title={'Entrar com Google'}
              onPress={() => onGoogleButtonPress().then(() => console.log('Signed in with Google!'))}
              type='google'
              button={true}
              style={{ width: 200 }}
            />
          </View>
          <Text style={{padding:10, color:'white', fontWeight:'bold'}}>Ou</Text>
          <Text style={styles.title}>Entrar com email e senha</Text>
          {/* Inputs para receber os dados do usuário */}
          <TextInput placeholderTextColor={'lightgrey'} value={email} onChangeText={(e) => setEmail(e)} placeholder=" seu email" style={styles.input}></TextInput>
          <TextInput placeholderTextColor={'lightgrey'} value={password} onChangeText={(e) => setPassword(e)} secureTextEntry={true} placeholder="Sua senha" style={styles.input}></TextInput>
          <View style={styles.buttonContainer}>
            <Button style={styles.loginButton} title="Entrar" onPress={saveAndNavigate}>Teste</Button>
          </View>
        </View>
      </Provider>
    );
  }

  // Efetua o login com a conta do Google
  async function onGoogleButtonPress() {
    try {
      // Verifica se o dispositivo possui o google play services
      await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });

      // Pega o token do usuário
      const { idToken } = await GoogleSignin.signIn();

      // Cria uma credencial do Google com o token
      const googleCredential = auth.GoogleAuthProvider.credential(idToken);

      console.log("Credential: " + googleCredential)

      // Loga o usuártio com a credencial criada
      return auth().signInWithCredential(googleCredential);

    } catch (error) {
      throw (error);
    }

  }

  //Tendo um usuário logado, carrega o componente "Bottom" que é responsável pela navegação entre as páginas
  return (
    <Provider>
      <HeaderSignedIn />
      <Bottom />
    </Provider>
  );
}

// Definição dos estilos
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'darkorange',
    // backgroundColor: '#ef780e',
    paddingBottom: 50
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff'
  },
  logo: {
    width: 100,
    height: 100
  },
  input: {
    width: 300,
    height: 50,
    borderColor: '#fff',
    borderWidth: 1,
    marginTop: 20,
    padding: 10,
    borderRadius: 10
  },
  buttonContainer: {
    width: '75%',
    height: 60,
    paddingTop: 20
  },
  loginButton: {
    width: '60%',
    height: 300
  }
});