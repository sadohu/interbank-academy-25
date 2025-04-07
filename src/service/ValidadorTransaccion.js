/**
 * Clase ValidadorTransaccion
 * @class ValidadorTransaccion
 * @description
 * Esta clase valida las transacciones financieras.
 * Realiza las siguientes validaciones:
 * 1. ID: Debe ser un número entero positivo y único.
 * 2. Tipo: Debe ser 'Crédito' o 'Débito'.
 * 3. Monto: Debe ser un número positivo con hasta dos decimales.
 * 4. Formato de Monto: Debe ser un número con formato correcto (ej. 123.45).
 * 5. Rango de Monto: Debe ser mayor o igual a cero.
 */
export class ValidadorTransaccion {

    constructor() {
        // Conjunto para registrar IDs ya procesados y evitar duplicados
        this.idsVistos = new Set();

        // Lista de tipos de transacciones permitidos
        this.tiposPermitidos = ['Crédito', 'Débito'];
    }

    /**
     * Método principal que valida una transacción completa.
     * @param {string} id - ID de la transacción.
     * @param {string} tipo - Tipo de transacción.
     * @param {string} monto - Monto como string.
     * @returns {Object} - Resultado de la validación con estado y datos o error.
     * @example
     * // Resultado válido
     * {
     *   valido: true,
     *   datos: { id: 1, tipo: 'Crédito', monto: 100.50 }
     * }
     *
     * // Resultado inválido
     * {
     *   valido: false,
     *   error: 'Monto inválido (formato): abc'
     * }
     */
    esValido(id, tipo, monto) {
        const idNum = parseInt(id);
        const montoStr = monto;
        let montoNum;

        // 1. Validación del ID (estructura y valor)
        const errorId = this.validarId(idNum);
        if (errorId)
            return { valido: false, error: errorId };

        // 2. Validación de duplicado
        const errorDuplicado = this.validarIdDuplicado(idNum);
        if (errorDuplicado)
            return { valido: false, error: errorDuplicado };

        // 3. Validación del tipo de transacción
        const errorTipo = this.validarTipo(tipo);
        if (errorTipo)
            return { valido: false, error: errorTipo };

        // 4. Validación de formato del monto (ej. 100.50 o 75)
        const errorFormato = this.validarFormatoMonto(montoStr);
        if (errorFormato)
            return { valido: false, error: errorFormato };

        // 5. Conversión y validación del valor numérico del monto
        montoNum = parseFloat(montoStr);
        const errorMontoValor = this.validarRangoMonto(montoNum);
        if (errorMontoValor)
            return { valido: false, error: errorMontoValor };

        /* Validaciones completadas con éxito */

        // 6. Agregamos el ID a los ya vistos, para evitar duplicados en el futuro
        this.idsVistos.add(idNum);

        // 7. Devolvemos los datos ya convertidos y listos para ser procesados
        return { valido: true, datos: { id: idNum, tipo, monto: montoNum } };
    }

    /**
     * Verifica si el ID es válido (número entero positivo)
     * @param {number} idNum
     * @returns {string|null}
     */
    validarId(idNum) {
        if (isNaN(idNum) || idNum <= 0 || !Number.isInteger(idNum)) {
            return `ID inválido: ${idNum}`;
        }
        return null;
    }

    /**
     * Verifica si el ID ya ha sido registrado previamente
     * @param {number} idNum
     * @returns {string|null}
     */
    validarIdDuplicado(idNum) {
        if (this.idsVistos.has(idNum)) {
            return `ID duplicado: ${idNum}`;
        }
        return null;
    }

    /**
     * Verifica si el tipo de transacción es uno de los permitidos
     * @param {string} tipo
     * @returns {string|null}
     */
    validarTipo(tipo) {
        if (!this.tiposPermitidos.includes(tipo)) {
            return `Tipo inválido: ${tipo}`;
        }
        return null;
    }

    /**
     * Verifica que el formato del monto sea numérico y con hasta 2 decimales
     * @param {string} monto
     * @returns {string|null}
     */
    validarFormatoMonto(monto) {
        const regex = /^\d+(\.\d{1,2})?$/;
        if (!regex.test(monto)) {
            return `Monto inválido (formato): ${monto}`;
        }
        return null;
    }

    /**
     * Verifica que el valor del monto sea un número válido y positivo
     * @param {number} montoNum
     * @returns {string|null}
     */
    validarRangoMonto(montoNum) {
        if (isNaN(montoNum) || montoNum < 0) {
            return `Monto inválido (valor): ${montoNum}`;
        }
        return null;
    }
}
