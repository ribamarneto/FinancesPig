import { View, Text } from "react-native";
import * as React from 'react';
import { Button, FAB, ListItem } from '@rneui/themed';
import database from "@react-native-firebase/database";
import PageTitle from "../Title";

export default function History(props) {

    const [listaHistorico, setListaHistorico] = React.useState([]);

    const carregarLista = () => {
        database()
            .ref('/historico')
            .once('value')
            .then(snapshot => {
                const historico = Object.values(snapshot.val())
                console.log('User data: ', snapshot.val());
                setListaHistorico(historico)
            });
    };

    return (
        <View style={{ display: 'flex', flex: 1 }} onLayout={carregarLista}>
          <PageTitle value={'Histórico'}/>
          {/* <Text style={{ fontSize: 22, fontWeight: 'bold', padding:'5%' ,backgroundColor: 'lightgrey', textAlign:'center', width:'100%' }}>Histórico</Text> */}
          <View style={{ marginTop: 16, borderColor: '#cdcdcd', paddingLeft: '10%'  }}>
            {
              listaHistorico
                .sort((a, b) => b.data_cadastro.localeCompare(a.data_cadastro))
                .map(data =>
                  <ListItem key={data.id}>
                    <ListItem.Content>
                      <ListItem.Title style={{ color: data.tipo === 'despesa' ? 'red' : 'green', fontWeight:'bold', fontSize:22 }}>{'R$ ' + data.valor}</ListItem.Title>
                      <ListItem.Subtitle style={{fontWeight:'bold', color:'grey'}}>{data.tipo.charAt(0).toUpperCase() + data.tipo.slice(1)}</ListItem.Subtitle>
                      <ListItem.Subtitle style={{color:'grey'}}>{data.data_cadastro}</ListItem.Subtitle>
                    </ListItem.Content>
                  </ListItem>
                )
            }
          </View>
        </View>
      );
      
}