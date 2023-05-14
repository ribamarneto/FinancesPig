import { View, Text, SafeAreaView, ScrollView } from "react-native";
import * as React from 'react';
import { Button, FAB, ListItem } from '@rneui/themed';
import database from "@react-native-firebase/database";
import PageTitle from "../Title";

export default function History(props) {
  const [listaHistorico, setListaHistorico] = React.useState([]);

  const fetchData = () => {
    database()
      .ref('/historico')
      .once('value')
      .then(snapshot => {
        const historico = Object.values(snapshot.val())
        console.log('User data: ', snapshot.val());
        setListaHistorico(historico)
      });
  };

  React.useEffect(() => {
    fetchData();
  }, []);

  const handleFabClick = () => {
    fetchData();
  };
  

  return (
    <SafeAreaView onLayout={fetchData} style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={{ paddingBottom: 80 }}>
        <PageTitle value={'Histórico'} />
        <View style={{ marginTop: 16, borderColor: '#cdcdcd', paddingLeft: '10%' }}>
          {
            listaHistorico
              .sort((a, b) => b.data_cadastro.localeCompare(a.data_cadastro))
              .map(data =>
                <ListItem key={data.id}  >
                  <ListItem.Content>
                    <ListItem.Title style={{ color: data.tipo === 'despesa' ? 'crimson' : 'green', fontWeight: 'bold', fontSize: 22}}>
                      <Text style={{fontSize: 20, fontWeight:'bold'}}>{data.tipo === 'despesa' ? '- R$ ' : '+ R$ '}</Text>
                      { (data.valor ? data.valor.toString().replace('.', ',') : '')}
                    </ListItem.Title>
                    <ListItem.Subtitle style={{ fontWeight: 'bold', color: 'grey' }}>{data.tipo.charAt(0).toUpperCase() + data.tipo.slice(1)}</ListItem.Subtitle>
                    <ListItem.Subtitle style={{ color: 'grey' }}>{data.data_cadastro}</ListItem.Subtitle>
                  </ListItem.Content>
                </ListItem>
              )
          }
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
