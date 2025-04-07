/**
 * Punto de entrada de la aplicación de procesamiento de transacciones.
 *
 * Este archivo orquesta el flujo completo:
 * 1. Lee las transacciones desde un archivo CSV.
 * 2. Valida y construye objetos Transacción.
 * 3. Procesa las transacciones para obtener estadísticas clave.
 * 4. Imprime un reporte consolidado en consola.
 */

import { CSVReader } from './src/controller/CSVReader.js';
import { TransactionProcessor } from './src/controller/TransactionProcessor.js';
import { ReportPrinter } from './src/report/ReportPrinter.js';

/**
 * Función principal que ejecuta la aplicación.
 */
const main = () => {
    // 1. Instanciar lector de CSV y obtener transacciones válidas
    const reader = new CSVReader('./src/data/data.csv');
    const transacciones = reader.leerTransacciones();

    // 2. Procesar transacciones para obtener reporte
    const processor = new TransactionProcessor(transacciones);
    const reporte = processor.generarReporte();

    // 3. Imprimir reporte en consola
    const printer = new ReportPrinter();
    printer.mostrarReporte(reporte);
};

// Ejecutar la función principal
main();
