import React, { useState } from 'react';
import { BottomNavigation } from 'react-native-paper';
import Home from './Home';
import History from './History';
import Metas from './Metas';
import Poupanca from './Poupanca';

const HomeRoute = () => <Home />;
const RecentsRoute = () => <History/>;
const MetasRoute = () => <Metas/>
const PoupancaRoute = () => <Poupanca/>


const Bottom = () => {
  const [index, setIndex] = useState(0);

  const [routes] = useState([
    { key: 'home',  focusedIcon: 'currency-usd' },
    { key: 'metas', focusedIcon: 'stairs-up' },
    { key: 'poupanca', focusedIcon: 'piggy-bank' },
    { key: 'historico', focusedIcon: 'history' },
  ]);


  const renderScene = BottomNavigation.SceneMap({
    home: HomeRoute,
    metas: MetasRoute,
    poupanca: PoupancaRoute,
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
