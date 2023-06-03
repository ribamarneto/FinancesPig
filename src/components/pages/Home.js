import React from 'react';
import { SafeAreaView, StyleSheet, TextInput, Text, View, TouchableOpacity } from 'react-native';
import * as FireBase from '../../firebase/firebaseUtils';
import database from '@react-native-firebase/database';
import { Button } from '@rneui/base';
import CurrencyInput from 'react-native-currency-input';
import auth from '@react-native-firebase/auth';
import * as utils from '../../utils/utils';

function Home(props) {

    const [receita, setReceita] = React.useState('');
    const [despesa, setDespesa] = React.useState('');
    const [saldoExibir, setSaldoExibir] = React.useState(0);
    const [listaHistorico, setListaHistorico] = React.useState([]);
    const userUid = auth().currentUser.uid;

    // Recupera os doados do histório no firebase, filtrando pelo código usuário
    // e armazena na constante listaHistorico
    const fetchHistory = () => {
        database()
            .ref(`/historico/${userUid}`)
            .once('value')
            .then(snapshot => {
                const historico = Object.values(snapshot.val());
                setListaHistorico(historico);
            });
    };

    //Chama a função fetchData quando o componente é montado 
    React.useEffect(() => {
        fetchHistory();
    }, []);

    //Recebe o valor cadastrado para a Receita e insere um novo registro no banco, vinculado ao usuário logado
    const atualizarReceita = (valor) => {
        const userUid = auth().currentUser.uid;
        let dataCadastro = new Date().toLocaleString('pt-BR');
        database()
            .ref(`/historico/${userUid}`)
            .push({
                data_cadastro: dataCadastro,
                tipo: 'receita',
                valor: valor,
            })
            .then(() => props.click());
    };

    //Recebe o valor cadastrado para a Despesa e insere um novo registro no banco, vinculado ao usuário logado
    const atualizarDespesa = (valor) => {
        const userUid = auth().currentUser.uid;
        let dataCadastro = new Date().toLocaleString('pt-BR');
        database()
            .ref(`/historico/${userUid}`)
            .push({
                data_cadastro: dataCadastro,
                tipo: 'despesa',
                valor: valor,
            })
            .then(() => props.click());
    };

    // Atualiza os valores de Saldo, Receita e Despesa
    const atualizar = () => {

        console.log("Receita: " + receita)
        console.log("Despesa: " + despesa)
        console.log("Saldo: " + saldoExibir)

        const saldo = saldoExibir + receita - despesa;

        // Chamas as funções que salvam os valores de receita e despesa, e em seguida zera os valores na tela
        if (parseFloat(receita) > 0)
            atualizarReceita(parseFloat(receita));

        if (parseFloat(despesa) > 0)
            atualizarDespesa(parseFloat(despesa));

        setReceita(0);
        setDespesa(0);

        // Pega o ID do usuário logado
        const userUid = auth().currentUser.uid;

        // Atualiza o valor do saldo no firebase
        database()
            .ref(`/saldo/${userUid}`)
            .update({
                saldo
            })
            .then(() => props.click());

        // Retorna o valor do saldo atualizado
        database()
            .ref(`/saldo/${userUid}`)
            .once('value')
            .then(snapshot => {
                console.log('saldo: ', snapshot.val());
                const valor = Object.values(snapshot.val());
            });

        fetchHistory();
        exibirSaldo();
    };

    // Calcula o saldo a a ser exibido na tela à partir da soma dos valores do histórico
    const exibirSaldo = async () => {
        const saldo = await utils.sumSaldo(listaHistorico);
        console.log("SALDO HISTORICO: " + saldo);
        setSaldoExibir(saldo);
    };

    // Chama a função que exibe o saldo atualizado quando o componente é renderizado
    exibirSaldo();

    return (
        <SafeAreaView onLayout={exibirSaldo} style={{ alignItems: 'center', paddingVertical: '25%' }}>
            <Text style={{ textAlign: 'left', fontWeight: 'bold', fontSize: 22 }}>Receita</Text>
            <SafeAreaView style={{ display: 'flex', flex: 1, flexDirection: 'row', flexWrap: 'wrap' }}>
                {/* Input da receita */}
                <CurrencyInput //Componente de input de valores monetários (react-native-currency-input)
                    style={styles.input}
                    value={receita}
                    onChangeValue={setReceita}
                    delimiter=","
                    separator="."
                    precision={2}
                    prefix="R$ "
                    keyboardType="numeric"
                    textAlign='center'
                />
            </SafeAreaView>
            <Text style={{ textAlign: 'left', fontWeight: 'bold', fontSize: 22, marginTop: 100 }}>Despesa</Text>
            <SafeAreaView style={{ display: 'flex', flex: 1, flexDirection: 'row', flexWrap: 'wrap' }}>
                {/* Input da despesa */}
                <CurrencyInput
                    style={styles.input}
                    value={despesa}
                    onChangeValue={setDespesa}
                    delimiter=","
                    separator="."
                    precision={2}
                    prefix="R$ "
                    keyboardType="numeric"
                    textAlign='center'
                />
            </SafeAreaView>
            <View style={{ marginTop: 120, paddingHorizontal: 60, width: 300 }}>
                <Button
                    title={'Calcular'}
                    onPress={atualizar}
                    color={'green'}
                    radius={'md'}
                >
                </Button>
            </View>
            <Text style={{ textAlign: 'center', fontWeight: 'bold', fontSize: 22, marginTop: 10 }}>
                Saldo:
                {
                    saldoExibir != null ? ' R$ ' + parseFloat(saldoExibir).toFixed(2).toString().replace(".", ",") : ' R$ ' + '0,00'
                }
            </Text>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    input: {
        height: 45,
        width: 200,
        margin: 12,
        borderWidth: 2,
        borderColor: 'lightgrey',
        borderRadius: 10,
        padding: 10,
        fontSize: 22
    },
});

export default Home;