// Soma todos os valores do tipo "receita" na lista de histórico
export const sumReceitas = (listaHistorico) => {
    let totalReceitas = 0;
    listaHistorico.forEach(data => {
        if (data.tipo === 'receita') {
            totalReceitas += data.valor;
        }
    });
    return totalReceitas;
};

// Soma todos os valores do tipo "despesa" na lista de histórico
export const sumDespesas = (listaHistorico) => {
    let totalReceitas = 0;
    listaHistorico.forEach(data => {
        if (data.tipo === 'despesa') {
            totalReceitas += data.valor;
        }
    });
    return totalReceitas;
};

export const sumSaldo = (listaHistorico) => {
    const totalReceitas = sumReceitas(listaHistorico);
    const totalDespesas = sumDespesas(listaHistorico);

    return totalReceitas - totalDespesas
};