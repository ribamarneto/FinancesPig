import database from '@react-native-firebase/database';

export const createSaldoIfNotExist = async () => {
  const saldoRef = database().ref('saldo');
  const receitaRef = database().ref('/receita');
  const despesaRef = database().ref('/despesa');

  const snapshotSaldo = await saldoRef.once('value');
  const snapshotReceita = await receitaRef.once('value');
  const snapshotDespesa = await despesaRef.once('value');

  if (!snapshotSaldo.exists()) {
    await saldoRef.set(0);
  }

  if (!snapshotReceita.exists()) {
    await receitaRef.set(0);
  }

  if (!snapshotDespesa.exists()) {
    await despesaRef.set(0);
  }
};