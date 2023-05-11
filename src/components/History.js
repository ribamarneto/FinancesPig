import { View, Text } from "react-native";
import * as React from 'react';
import { Button, FAB, ListItem } from '@rneui/themed';
import database from "@react-native-firebase/database";

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
          <Text style={{ fontSize: 22, fontWeight: 'bold' }}>Historico</Text>
          <View style={{ marginTop: 16, borderColor: '#cdcdcd', borderWidth: 0.5 }}>
            {
              listaHistorico
                .sort((a, b) => b.data_cadastro.localeCompare(a.data_cadastro))
                .map(data =>
                  <ListItem key={data.id}>
                    <ListItem.Content>
                      <ListItem.Title style={{ color: data.tipo === 'despesa' ? 'red' : 'green' }}>{data.valor}</ListItem.Title>
                      <ListItem.Subtitle>{data.tipo.charAt(0).toUpperCase() + data.tipo.slice(1)}</ListItem.Subtitle>
                      <ListItem.Subtitle>{data.data_cadastro}</ListItem.Subtitle>
                    </ListItem.Content>
                  </ListItem>
                )
            }
          </View>
          <FAB
            visible={true}
            title="+"
            color="#1c9aa6"
            placement="right"
            onPress={() => { props.click() }}
          />
        </View>
      );
      
}