# Proyecto de Procesamiento de Transacciones Bancarias

## **Introducción**

Este proyecto tiene como objetivo desarrollar una aplicación de línea de comandos (CLI) que procese un archivo CSV con transacciones bancarias y genere un reporte que incluya:

- **Balance Final:** La diferencia entre las transacciones de tipo "Crédito" y "Débito".
- **Transacción de Mayor Monto:** La transacción con el valor más alto.
- **Conteo de Transacciones:** El número total de transacciones de cada tipo ("Crédito" y "Débito").

La aplicación valida los datos del CSV, asegurándose de que los IDs sean únicos, los tipos de transacciones sean válidos y los montos tengan el formato correcto. En caso de errores, se registran en un archivo de log.

## **Instrucciones de Ejecución**

### Requisitos Previos

Asegúrate de tener [Node.js](https://nodejs.org/) instalado en tu máquina. Este proyecto no requiere dependencias adicionales, ya que se utiliza únicamente el módulo `fs` de Node.js.

### Instalación

1. Clona o descarga los archivos del proyecto.
2. No es necesario instalar dependencias externas ya que el proyecto solo usa el módulo `fs`, que está incluido por defecto con Node.js.

### Ejecución

Para ejecutar el proyecto, sigue estos pasos:

1. Abre una terminal en la carpeta raíz del proyecto.
2. Ejecuta el siguiente comando:

   ```bash
   node main.js
   ```

   Esto procesará el archivo CSV por defecto `./src/data/data.csv` y generará un reporte en la consola.

### Salida

La aplicación generará un reporte en la consola con la siguiente información:
- **Balance Final**
- **Transacción de Mayor Monto**
- **Conteo de Transacciones (Crédito/Débito)**

En caso de que se detecten errores en los datos del archivo CSV (por ejemplo, un ID duplicado, tipo de transacción inválido, o formato de monto incorrecto), los errores se registrarán en el archivo `./src/data/errores.log`.

## **Enfoque y Solución**

### **Lógica Implementada**

La solución se divide en varios módulos para mantener el código organizado y reutilizable. Estos módulos son:

1. **`CSVReader`**: Esta clase se encarga de leer el archivo CSV, procesar cada línea y extraer los datos de las transacciones. Si los datos son válidos, se pasan al siguiente paso; si no, se registran los errores en un archivo de log.

2. **`ValidadorTransaccion`**: Realiza la validación de los datos de cada transacción. Primero valida el ID (debe ser único y válido), luego el tipo de transacción (debe ser "Crédito" o "Débito"), y finalmente el monto (debe tener el formato adecuado y ser un número positivo).

3. **`TransactionProcessor`**: Se encarga de procesar las transacciones válidas, calculando el balance final, identificando la transacción de mayor monto y contando las transacciones por tipo.

4. **`ReportPrinter`**: Esta clase es responsable de generar la salida del reporte, mostrando la información de manera estructurada y legible.

### **Decisiones de Diseño**

- **Separación de responsabilidades**: Cada clase tiene una responsabilidad única, lo que facilita la mantenibilidad del código.
- **Validación antes de procesamiento**: Los datos se validan antes de ser procesados, asegurando que solo los datos correctos se incluyan en el reporte.
- **Uso de un archivo de log**: Los errores se registran de manera detallada en un archivo para facilitar la depuración y la trazabilidad de los problemas.
- **Aplicación de los principios SOLID**: El diseño sigue los principios SOLID para asegurar que el código sea modular, mantenible, extensible y fácil de comprender.

## **Estructura del Proyecto**

El proyecto sigue una estructura simple, organizada en carpetas para separar la lógica de negocio, la validación, el reporte y la lectura de archivos.

```
/project-root
│
├── /src
│   ├── /controller
│   │   ├── CSVReader.js          # Clase para leer y procesar el archivo CSV
│   │   └── TransactionProcessor.js # Clase para procesar las transacciones
│   │
│   ├── /report
│   │   └── ReportPrinter.js      # Clase para imprimir el reporte
│   │
│   ├── /service
│   │   └── ValidadorTransaccion.js  # Clase para validar las transacciones
│   │
│   └── /utils
│       └── LoggerErrores.js      # Clase para registrar errores en un archivo
│
├── /data
│   └── data.csv                  # Archivo CSV de ejemplo con transacciones
│   └── errores.log               # Archivo donde se registran los errores
│
├── main.js                        # Archivo principal para ejecutar el programa
├── README.md                      # Este archivo
```
