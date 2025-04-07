/**
 * Representa una transacción financiera.
 */
export class Transaccion {
    /**
     * Crea una nueva instancia de Transaccion.
     *
     * @param {number} id - Identificador único de la transacción.
     * @param {string} tipo - Tipo de la transacción ("Crédito" o "Débito").
     * @param {number} monto - Monto de la transacción.
     *
     * @example
     * const t = new Transaccion(1, 'Crédito', 100.50);
     */
    constructor(id, tipo, monto) {
        this.id = id;
        this.tipo = tipo;
        this.monto = monto;
    }
}