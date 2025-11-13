export const COP =  new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: 'COP',
    
});

//funcion suma 
export  const suma = xs => xs.reduce((a, b) => a + b, 0); // suma todos los elementos de un array

//funcion promedio

export const promedio = xs => xs.length  ?  suma(xs) / xs.length : 0; // calcula el promedio de un array


// funcion totalPorCategoria
export function totalPoCategoria(gastos) {
    return gastos.reduce((acc, gasto) => {  // acc es el acumulador, gasto es el elemento actual del array
        const key = gasto.categoria ?? 'Sin Categoria'; // si no tiene categoria, se asigna 'Sin Categoria'
        const nuevo = { ...acc }; // se crea una copia del acumulador
        nuevo[key] = (nuevo[key] ?? 0) + gasto.monto; // si no existe la categoria, se asigna 0 y se le suma el monto del gasto
        return nuevo;
    }, {});
}


// gasto minimo y maximo

export function minMax(gastos) {
    if (gastos.length === 0) {
        return { min: 0, max: 0 };
    }

    const montos = gastos.map(gasto => gasto.monto); // se crea un array con los montos de los gastos ej [200000, 150000, 300000, 100000, 250000]
    return {
        min: Math.min(...montos), // se obtiene el minimo
        max: Math.max(...montos), // se obtiene el maximo
    };
}

export function totalPoCategoria(gastos) {

    const mapa = totalPoCategoria(gastos); // se obtiene el total por categoria
    const pares = Object.entries(mapa); // se convierte el objeto en un array de pares [ [categoria, total], [categoria, total], ... ]

    if (pares.length === 0) { // si no hay categorias, se retorna un objeto con categoria 'Sin Categoria' y total 0
        return { categoria: 'Sin Categoria', total: 0 }; // ejemplo: { categoria: 'Sin Categoria', total: 0 }
    }

    const [categoria, total] = pares.reduce((maxPar, par) => { // se busca el par con el total maximo
        return par[1] > maxPar[1] ? par : maxPar; // si el total del par actual es mayor que el maximo, se retorna el par actual
    }, pares[0]); // se inicia con el primer par

    return { categoria, total }; // se retorna un objeto con la categoria y el total maximo
}