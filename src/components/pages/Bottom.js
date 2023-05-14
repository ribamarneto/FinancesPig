import React, { useState } from 'react';
import { BottomNavigation } from 'react-native-paper';
import Home from './Home';
import History from './History';

const HomeRoute = () => <Home />;

const RecentsRoute = () => <History/>;

const Bottom = () => {
  const [index, setIndex] = useState(0);

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
