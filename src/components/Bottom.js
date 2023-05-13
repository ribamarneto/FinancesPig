import React, { useState, useEffect } from 'react';
import { BottomNavigation, Button, Divider, Menu, Provider, View } from 'react-native-paper';
import { Alert } from 'react-native';
import Home from './Home';
import auth from '@react-native-firebase/auth';
import History from './History';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import UserAccountMenu from './UserAccountMenu';

const HomeRoute = () => <Home />;

const RecentsRoute = () => <History/>;

const Bottom = () => {
  const [index, setIndex] = useState(0);
  const [lastIndex, setLastIndex] = useState(0); // Adicionando o estado do último índice visitado

  const [routes] = useState([
    { key: 'home',  focusedIcon: 'currency-usd' },
    { key: 'poupanca', focusedIcon: 'stairs-up' },
    { key: 'historico', focusedIcon: 'history' },
  ]);

  const logoutIndex = routes.findIndex((route) => route.key === 'account');


  const renderScene = BottomNavigation.SceneMap({
    home: HomeRoute,
    poupanca: () => { },
    historico: RecentsRoute,
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
