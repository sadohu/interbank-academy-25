import fs from 'fs';

/**
 * Clase para registrar errores en un archivo de log.
 * @class LoggerErrores
 */
export class LoggerErrores {

    /**
    * Registra un error en el archivo de log.
    * @static
    * @method logear
    * @param {number} index - El índice de la línea en el archivo CSV.
    * @param {string} id - El ID del registro.
    * @param {string} tipo - El tipo de registro.
    * @param {number} monto - El monto del registro.
    * @param {string} error - El mensaje de error.
    * @description
    * El método `logear` toma el índice de la línea, el ID, el tipo, el monto y el mensaje de error,
    * y lo registra en un archivo de log llamado `errores.log`.
    * La fecha y hora actuales se incluyen en el mensaje de error.
    * El mensaje se registra en la consola y se guarda en el archivo de log.
    * El archivo de log se encuentra en la ruta `./src/data/errores.log`.
    */
    static logear(index, id, tipo, monto, error) {
        const fechaHora = new Date().toISOString();
        const mensaje = `[${fechaHora}] Línea ${index + 2} - Datos id: ${id}, tipo: ${tipo}, monto: ${monto} - Error: ${error} (Omitida)`;
        console.warn('⚠️', mensaje);
        fs.appendFileSync('./src/data/errores.log', mensaje + '\n');
    }
}
