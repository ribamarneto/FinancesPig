import React from 'react';
import { SafeAreaView, StyleSheet, TextInput, Text, View, TouchableOpacity } from 'react-native';
import * as FireBase from '../../firebase/firebaseUtils';
import database from '@react-native-firebase/database';
import { Button } from '@rneui/base';
import CurrencyInput from 'react-native-currency-input';

export default function Home(props) {

    const [receita, setReceita] = React.useState('');
    const [despesa, setDespesa] = React.useState('');
    const [saldoExibir, setSaldoExibir] = React.useState(0);

    const [data_cadastro, setDataCadastro] = React.useState('');
    const [tipo, setTipo] = React.useState('');

    FireBase.createSaldoIfNotExist();

    React.useEffect(() => {
        database()
            .ref('/saldo')
            .once('value')
            .then(snapshot => {
                console.log('saldo: ', snapshot.val());
                const valor = Object.values(snapshot.val());
                setSaldoExibir(parseFloat(valor));
            });

    }, []);

    const atualizarReceita = (valor) => {
        let dataCadastro = new Date().toLocaleString('pt-BR');
        database()
            .ref('/historico')
            .push({
                data_cadastro: dataCadastro,
                tipo: "receita",
                valor: valor
        })
        .then(() => props.click());
    }

    const atualizarDespesa = (valor) => {
        let dataCadastro = new Date().toLocaleString('pt-BR');
        database()
            .ref('/historico')
            .push({
                data_cadastro: dataCadastro,
                tipo: "despesa",
                valor: valor
        })
        .then(() => props.click());
    }


    const atualizar = () => {

        console.log("Receita: " + receita)
        console.log("Despesa: " + despesa)
        console.log("Saldo: " + saldoExibir)

        const saldo = saldoExibir + receita - despesa;

        if (parseFloat(receita) > 0)
            atualizarReceita(parseFloat(receita));

        if (parseFloat(despesa) > 0)
            atualizarDespesa(parseFloat(despesa));

        setReceita(0);
        setDespesa(0);

        database()
            .ref('/saldo')
            .update({
                saldo
            })
            .then(() => props.click());

        database()
            .ref('/saldo')
            .once('value')
            .then(snapshot => {
                console.log('saldo: ', snapshot.val());
                const valor = Object.values(snapshot.val());
                setSaldoExibir(parseFloat(valor));
            });
    };

    return (
        <SafeAreaView style={{ alignItems: 'center', paddingVertical: '25%' }}>
            <Text style={{ textAlign: 'left', fontWeight: 'bold', fontSize: 22 }}>Receita</Text>
            <SafeAreaView style={{ display: 'flex', flex: 1, flexDirection: 'row', flexWrap: 'wrap' }}>
                <CurrencyInput
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
            <View style={{ marginTop: 120, paddingHorizontal: 60, width: 300}}>
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