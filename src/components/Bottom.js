import React, { useState, useEffect } from 'react';
import { BottomNavigation, Text, MD3LightTheme } from 'react-native-paper';
import { Alert } from 'react-native';
import Home from './Home';
import auth from '@react-native-firebase/auth';
import History from './History';
import { GoogleSignin } from '@react-native-google-signin/google-signin';

const HomeRoute = () => <Home />;

const RecentsRoute = () => <History/>;

const LogoutRoute = async () => {
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


const Bottom = () => {
  const [index, setIndex] = useState(0);
  const [lastIndex, setLastIndex] = useState(0); // Adicionando o estado do último índice visitado

  const [routes] = useState([
    { key: 'home', title: 'Home', focusedIcon: 'home', unfocusedIcon: 'home' },
    { key: 'empty', title: 'Empty', focusedIcon: 'home' },
    { key: 'historico', title: 'Histórico', focusedIcon: 'history' },
    { key: 'logout', title: 'Sair', focusedIcon: 'logout', unfocusedIcon: 'logout' },
  ]);

  const createTwoButtonAlert = () => {
    Alert.alert('Sair', 'Deseja realmente sair?', [
      {
        text: 'Cancelar',
        onPress: () => { console.log(lastIndex); setIndex(lastIndex); },
        style: 'cancel',
      },
      { text: 'OK', onPress: LogoutRoute },
    ]);
  };

  const logoutIndex = routes.findIndex((route) => route.key === 'logout');

  useEffect(() => {
    if(index !== logoutIndex)
        setLastIndex(index);
  }, [index]); // Atualizando o estado do último índice visitado sempre que o índice mudar

  const renderScene = BottomNavigation.SceneMap({
    home: HomeRoute,
    empty: () => { },
    historico: RecentsRoute,
    logout: () => {
      if (index == logoutIndex) {
        createTwoButtonAlert();
      }
    },
  });

  return (
    <BottomNavigation
      navigationState={{ index, routes }}
      onIndexChange={setIndex}
      renderScene={renderScene}
      barStyle={{ backgroundColor: '#ff6347' }}
      activeColor='black'
      inactiveColor='white'
      theme={{ colors: { background: 'white' } }}
    />
  );
};

export default Bottom;
