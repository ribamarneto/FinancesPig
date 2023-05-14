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
  const [key, setKey] = useState('home'); // Estado para controlar a chave do componente


  const [routes] = useState([
    { key: 'home',  focusedIcon: 'home' },
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

  const handleIndexChange = (newIndex) => {
    setIndex(newIndex);
    const newKey = routes[newIndex].key;
    setKey(newKey); // Atualiza a chave do componente
  };

  return (
    <BottomNavigation
      navigationState={{ index, routes }}
      onIndexChange={handleIndexChange}
      renderScene={renderScene}
      barStyle={{ backgroundColor: '#ff6347' }}
      activeColor="black"
      inactiveColor="white"
      theme={{ colors: { background: 'white' } }}
      key={key} // Define a chave do BottomNavigation para forçar a renderização do componente ao mudar de rota
    />
  );
};

export default Bottom;
