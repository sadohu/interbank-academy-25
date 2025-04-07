
/**
 * Clase responsable de imprimir el reporte final de transacciones en la consola.
 */
export class ReportPrinter {

    /**
     * Imprime el reporte de transacciones en la terminal.
     *
     * @param {Object} resumen - Objeto con los datos del reporte.
     * @param {number} resumen.balance - Balance final calculado.
     * @param {Object} resumen.mayor - Transacción con el mayor monto.
     * @param {number} resumen.mayor.id - ID de la transacción de mayor monto.
     * @param {number} resumen.mayor.monto - Monto de la transacción de mayor valor.
     * @param {Object} resumen.conteo - Conteo de transacciones por tipo.
     * @param {number} resumen.conteo.Crédito - Número de transacciones de tipo Crédito.
     * @param {number} resumen.conteo.Débito - Número de transacciones de tipo Débito.
     *
     * @example
     * const reporte = {
     *   balance: 325.00,
     *   mayor: { id: 3, monto: 200.00 },
     *   conteo: { Crédito: 3, Débito: 2 }
     * };
     *
     * const printer = new ReportPrinter();
     * printer.mostrarReporte(reporte);
     */
    mostrarReporte({ balance, mayor, conteo }) {
        console.log("---------------------------------------------");
        console.log("Reporte de Transacciones");
        console.log("---------------------------------------------");
        console.log(`Balance Final: ${balance.toFixed(2)}`);
        console.log(`Transacción de Mayor Monto: ID ${mayor.id} - ${mayor.monto.toFixed(2)}`);
        console.log(`Conteo de Transacciones: Crédito: ${conteo.Crédito} Débito: ${conteo.Débito}`);
    }
}
