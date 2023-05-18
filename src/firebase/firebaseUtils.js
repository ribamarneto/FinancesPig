import database from '@react-native-firebase/database';
import auth from '@react-native-firebase/auth';
import * as React from 'react'

const user = auth().currentUser;
let userUid = "";

if (user) 
  userUid = user.uid;

// const userUid = auth().currentUser.uid;

export const createSaldoIfNotExist = async () => {
  const saldoRef = database().ref('saldo');

  const snapshotSaldo = await saldoRef.once('value');

  if (!snapshotSaldo.exists()) {
    await saldoRef.set(0);
  }
};

export const getHistorico = async () => {
  try {
    const snapshot = await database()
      .ref(`/historico/${userUid}`)
      .once('value');

    return Object.values(snapshot.val()) || [];
  } catch (error) {
    console.error(error);
    return [];
  }
};

export const calcularSomaReceita = (historico) => {
  return historico.reduce((total, item) => {
    if (item.tipo === 'receita' && item.valor) {
      return total + parseFloat(item.valor);
    } else {
      return total;
    }
  }, 0);
};

export const calcularSomaDespesa = (historico) => {
  return historico.reduce((total, item) => {
    if (item.tipo === 'despesa' && item.valor) {
      return total + parseFloat(item.valor);
    } else {
      return total;
    }
  }, 0);
};

export const calcularSaldo = async () => {
  try {
    const historico = await getHistorico();
    const somaReceita = calcularSomaReceita(historico);
    const somaDespesa = calcularSomaDespesa(historico);

    return somaReceita - somaDespesa;
  } catch (error) {
    console.error(error);
    return 0;
  }
};


