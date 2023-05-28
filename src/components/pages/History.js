import { View, Text, SafeAreaView, ScrollView } from "react-native";
import * as React from 'react';
import { Button, FAB, ListItem } from '@rneui/themed';
import database from "@react-native-firebase/database";
import PageTitle from "../Title";
import auth from '@react-native-firebase/auth';

export default function History(props) {
  const [listaHistorico, setListaHistorico] = React.useState([]);
  const userUid = auth().currentUser.uid;

  // Recupera os doados do histório no firebase, filtrando pelo código usuário
  // e armazena na constante listaHistorico
  const fetchData = () => {
    database()
      .ref(`/historico/${userUid}`)
      .once('value')
      .then(snapshot => {
        const historico = Object.values(snapshot.val())
        console.log('User data: ', snapshot.val());
        setListaHistorico(historico)
      });
  };

  //Chama a função fetchData quando o componente é montado 
  React.useEffect(() => {
    fetchData();
  }, []);

  return (
    <SafeAreaView style={{ flex: 1, }}>
      <ScrollView contentContainerStyle={{ paddingBottom: 80, }}>
        <PageTitle value={'Histórico'} />
        <View style={{ marginTop: 16}}>
          { // Abaixo preenchemos o componente LisItem com os valores carregados na constante listaHistorico
            listaHistorico
              // Usamos o sort para ordenar valores da data mais recente para a mais antiga usando 
              .sort((a, b) => b.data_cadastro.localeCompare(a.data_cadastro))
              .map(data =>
                <ListItem key={data.data_cadastro} style={{width:'110%', marginLeft:-16}} >
                  {console.log(data)}
                  <ListItem.Content style={{borderBottomWidth:0.5, paddingLeft:20}}>
                    {/* Na linha abaixo mudamos a cor do texto de acordo com o tipo do valor */}
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
      <FAB
        visible={true}
        onPress={fetchData}
        placement="right"
        icon={{ name: 'refresh', color: 'white' }}
        color="green"
      />
    </SafeAreaView>
  );
}
