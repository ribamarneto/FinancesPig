import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { useState } from 'react';
import Bottom from './Bottom';
import { handleAddMeta } from './Metas'

export default function NovaMeta(){
    const [novaMetaNome, setNovaMetaNome] = useState('');
    const [novaMetaValorTotal, setNovaMetaValorTotal] = useState('');
    const [novaMetaValorArmazenado, setNovaMetaValorArmazenado] = useState('');

    const addMeta = () => {
        handleAddMeta(novaMetaNome, novaMetaValorTotal, novaMetaValorArmazenado);

        return(
            <Bottom/>
        );
    };

    return(
        <View>
                <View style={styles.novaMetaContainer}>
                    <Text style={styles.novaMetaTitulo}>Nova meta:</Text>
                    <TextInput
                        autoFocus={true}
                        scrollEnabled={false}
                        style={styles.novaMetaInput}
                        value={novaMetaNome}
                        onChangeText={setNovaMetaNome}
                        placeholder="Nome da meta"
                    />
                    <TextInput
                        autoFocus={true}
                        scrollEnabled={false}
                        style={styles.novaMetaInput}
                        value={novaMetaValorTotal}
                        onChangeText={setNovaMetaValorTotal}
                        placeholder="Valor total"
                        keyboardType="numeric"
                    />
                    <TextInput
                        autoFocus={true}
                        scrollEnabled={false}
                        style={styles.novaMetaInput}
                        value={novaMetaValorArmazenado}
                        onChangeText={setNovaMetaValorArmazenado}
                        placeholder="Valor armazenado"
                        keyboardType="numeric"
                    />
                    <TouchableOpacity style={styles.novaMetaBotao} onPress={addMeta}>
                        <Text style={styles.novaMetaBotaoTexto}>Adicionar meta</Text>
                    </TouchableOpacity>
                </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#fff',
    },
    titulo: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    item: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },
    dados: {
        flex: 1,
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 5,
    },
    nome: {
        fontWeight: 'bold',
        marginRight: 5,
    },
    valor: {
        marginLeft: 10,
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        padding: 5,
        flex: 0,
    },
    progresso: {
        marginLeft: 10,
        width: 80,
        alignItems: 'center',
    },
    barra: {
        height: 10,
        borderRadius: 5,
        backgroundColor: 'lightgreen',
    },
    porcentagem: {
        fontSize:

            12,
        marginTop: 5,
    },
    novaMetaContainer: {
        margin: 10,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        padding: 10,
    },
    novaMetaTitulo: {
        fontWeight: 'bold',
        fontSize: 17,
        marginBottom: 5,
    },
    novaMetaInput: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        padding: 5,
        marginBottom: 8,
        marginTop: 8,
        width: 200,
        height: 50
    },
    novaMetaBotao: {
        backgroundColor: 'green',
        borderRadius: 5,
        padding: 10,
        marginTop: 8,
        alignItems: 'center',
    },
    novaMetaBotaoTexto: {
        color: '#fff',
        fontWeight: 'bold',
    }
});