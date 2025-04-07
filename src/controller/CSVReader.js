// Módulo para lectura de archivos del sistema
import fs from 'fs';

import { Transaccion } from '../model/Transaccion.js';
import { ValidadorTransaccion } from '../service/ValidadorTransaccion.js';
import { LoggerErrores } from '../utils/LoggerErrores.js';

/**
 * Clase para leer transacciones desde un archivo CSV.
 * @class CSVReader
 * @description
 * Esta clase se encarga de leer un archivo CSV y convertir cada línea en una instancia de la clase Transaccion.
 * Realiza la validación de los datos utilizando la clase ValidadorTransaccion.
 */
export class CSVReader {

    /**
     * @param {string} filepath - Ruta del archivo CSV a leer.
     */
    constructor(filepath) {
        this.filepath = filepath;
    }

    /**
     * Lee el archivo CSV, valida cada fila y genera objetos de transacción válidos.
     * Los errores encontrados se registran en un archivo separado.
     *
     * @returns {Transaccion[]} Arreglo de objetos Transaccion válidos.
     */
    leerTransacciones() {
        // Leemos el contenido completo del archivo
        const data = fs.readFileSync(this.filepath, 'utf-8');

        // Separamos por líneas (ignorando la cabecera)
        const filas = data.trim().split(/\r?\n/).slice(1);

        // Array que contendrá solo transacciones válidas
        const transacciones = [];

        // Instancia del validador reutilizable para todas las filas
        const validador = new ValidadorTransaccion();

        // Procesamos cada línea del archivo
        filas.forEach((linea, index) => {
            // Desestructuramos los campos de la línea
            const [id, tipo, monto] = linea.split(',');

            // Validamos los datos usando el validador
            const resultado = validador.esValido(id, tipo, monto);

            // Si son válidos, los transformamos en objeto Transaccion
            if (resultado.valido) {
                const { id, tipo, monto } = resultado.datos;
                transacciones.push(new Transaccion(id, tipo, monto));
            } else {
                // Si no son válidos, registramos el error con la utilidad Logger
                LoggerErrores.logear(index, id, tipo, monto, resultado.error);
            }
        });

        // Devolvemos la lista final de transacciones válidas
        return transacciones;
    }
}
