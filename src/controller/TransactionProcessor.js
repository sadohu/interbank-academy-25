/**
 * Procesador de transacciones financieras.
 * Calcula el balance, la transacción de mayor monto y el conteo por tipo.
 */
export class TransactionProcessor {
    /**
     * Crea una nueva instancia de TransactionProcessor.
     *
     * @param {Transaccion[]} transacciones - Lista de transacciones válidas.
     */
    constructor(transacciones) {
        this.transacciones = transacciones;
    }

    /**
     * Calcula el balance final de todas las transacciones.
     * Suma los créditos y resta los débitos.
     *
     * @returns {number} Balance final.
     */
    calcularBalance() {
        return this.transacciones.reduce((acc, t) => {
            return t.tipo === 'Crédito' ? acc + t.monto : acc - t.monto;
        }, 0);
    }

    /**
     * Encuentra la transacción con el mayor monto.
     *
     * @returns {Transaccion} Transacción con el monto más alto.
     */
    transaccionMayorMonto() {
        return this.transacciones.reduce((max, t) => {
            return t.monto > max.monto ? t : max;
        });
    }

    /**
     * Cuenta cuántas transacciones hay por tipo (Crédito y Débito).
     *
     * @returns {Object} Objeto con la cantidad de transacciones por tipo.
     * @example
     * { Crédito: 5, Débito: 3 }
     */
    conteoPorTipo() {
        const conteo = { Crédito: 0, Débito: 0 };
        this.transacciones.forEach(t => {
            conteo[t.tipo]++;
        });
        return conteo;
    }

    /**
     * Genera el reporte completo con balance, transacción de mayor monto
     * y conteo por tipo.
     *
     * @returns {Object} Objeto con la información del reporte.
     */
    generarReporte() {
        return {
            balance: this.calcularBalance(),
            mayor: this.transaccionMayorMonto(),
            conteo: this.conteoPorTipo()
        };
    }
}
