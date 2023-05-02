import database from '@react-native-firebase/database';

export const createSaldoIfNotExist = async () => {
  const saldoRef = database().ref('saldo');

  const snapshotSaldo = await saldoRef.once('value');

  if (!snapshotSaldo.exists()) {
    await saldoRef.set(0);
  }
};