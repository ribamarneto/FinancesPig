import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet } from 'react-native';
import PageTitle from "../Title"

const MetaItem = ({ meta, onUpdateMetaNome, onUpdateMetaValorArmazenado }) => {
    const valorFaltando = meta.valorTotal - meta.valorArmazenado;
    const progresso = ((meta.valorArmazenado / meta.valorTotal) * 100).toFixed(2);

    const handleNomeChange = (text) => {
        onUpdateMetaNome(meta.id, text);
    };

    const handleValorArmazenadoChange = (text) => {
        onUpdateMetaValorArmazenado(meta.id, Number(text));
    };

    return (
        <View style={styles.item}>
            <View style={styles.dados}>
                <View style={styles.row}>
                    <Text style={styles.nome}>Nome da meta:</Text>
                    <TextInput
                        style={styles.input}
                        value={meta.nome}
                        onChangeText={handleNomeChange}
                    />
                </View>
                <View style={styles.row}>
                    <Text style={styles.nome}>Valor total da meta:</Text>
                    <Text style={styles.valor}>{`R$ ${meta.valorTotal.toFixed(2)}`}</Text>
                </View>
                <View style={styles.row}>
                    <Text style={styles.nome}>Valor armazenado:</Text>
                    <TextInput
                        style={[styles.input, { width: 80 }]}
                        value={meta.valorArmazenado.toString()}
                        onChangeText={handleValorArmazenadoChange}
                        keyboardType="numeric"
                    />
                    <Text style={styles.valor}>{`R$ ${valorFaltando.toFixed(2)} faltando`}</Text>
                </View>
            </View>
            <View style={styles.progresso}>
                <View style={[styles.barra, { width: `${progresso}%` }]} />
                <Text style={styles.porcentagem}>{`${progresso}%`}</Text>
            </View>
        </View>
    );
};

const Metas = () => {
    const [metas, setMetas] = useState([
        { id: '1', nome: 'Viagem', valorTotal: 1000, valorArmazenado: 500 },
        { id: '2', nome: 'Curso', valorTotal: 5000, valorArmazenado: 3000 },
        { id: '3', nome: 'Carro novo', valorTotal: 2000, valorArmazenado: 1500 },
    ]);

    const [novaMetaNome, setNovaMetaNome] = useState('');
    const [novaMetaValorTotal, setNovaMetaValorTotal] = useState('');
    const [novaMetaValorArmazenado, setNovaMetaValorArmazenado] = useState('');

    const handleAddMeta = () => {
        const novaMeta = {
            id: Math.random().toString(),
            nome: novaMetaNome,
            valorTotal: Number(novaMetaValorTotal),
            valorArmazenado: Number(novaMetaValorArmazenado),
        };
        setMetas([...metas, novaMeta]);
        setNovaMetaNome('');
        setNovaMetaValorTotal('');
        setNovaMetaValorArmazenado('');
    };

    const handleUpdateMetaNome = (id, nome) => {
        const metaAtualizada = metas.map((meta) => {
            if (meta.id === id) {
                return { ...meta, nome: nome };
            }
            return meta;
        });
        setMetas(metaAtualizada);
    };

    const handleUpdateMetaValorArmazenado = (id, valorArmazenado) => {
        const metaAtualizada = metas.map((meta) => {
            if (meta.id === id) {
                const { valorTotal } = meta;
                return { ...meta, valorArmazenado: valorArmazenado > valorTotal ? valorTotal : valorArmazenado };
            }
            return meta;
        });
        setMetas(metaAtualizada);
    };

    return (
            <View style={styles.container}>
            <Text style={styles.titulo}>Minhas metas</Text>
            <FlatList
                data={metas}
                renderItem={({ item }) => (
                    <MetaItem
                        meta={item}
                        onUpdateMetaNome={handleUpdateMetaNome}
                        onUpdateMetaValorArmazenado={handleUpdateMetaValorArmazenado}
                    />
                )}
                keyExtractor={(item) => item.id}
            />
            <View style={styles.novaMetaContainer}>
                <Text style={styles.novaMetaTitulo}>Nova meta:</Text>
                <TextInput
                    style={styles.novaMetaInput}
                    value={novaMetaNome}
                    onChangeText={setNovaMetaNome}
                    placeholder="Nome da meta"
                />
                <TextInput
                    style={styles.novaMetaInput}
                    value={novaMetaValorTotal}
                    onChangeText={setNovaMetaValorTotal}
                    placeholder="Valor total"
                    keyboardType="numeric"
                />
                <TextInput
                    style={styles.novaMetaInput}
                    value={novaMetaValorArmazenado}
                    onChangeText={setNovaMetaValorArmazenado}
                    placeholder="Valor armazenado"
                    keyboardType="numeric"
                />
                <TouchableOpacity style={styles.novaMetaBotao} onPress={handleAddMeta}>
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
        textAlign: 'center'
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
        minWidth: 80,
        flex: 1,
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
        fontSize:12,
        marginTop: 5,
    },
    novaMetaContainer: {
        marginTop: 20,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        padding: 10,
    },
    novaMetaTitulo: {
        fontWeight: 'bold',
        fontSize: 16,
        marginBottom: 5,
    },
    novaMetaInput: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        padding: 5,
        marginBottom: 5,
    },
    novaMetaBotao: {
        backgroundColor: 'green',
        borderRadius: 5,
        padding: 10,
        alignItems: 'center',
    },
    novaMetaBotaoTexto: {
        color: '#fff',
        fontWeight: 'bold',
    },
});

export default Metas;