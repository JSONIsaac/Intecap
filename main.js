// Configuración de los ejercicios
const ejercicios = [
    {
        id: 1,
        titulo: "Transformación básica: De promesas a async/await",
        descripcion: `
            <p>En este ejercicio, transformaremos una función basada en promesas a una función que utiliza async/await.</p>
            <p>La función <code>obtenerUsuarioAleatorio()</code> obtiene datos de un usuario aleatorio de la API Random User.</p>
            <h3>Objetivos:</h3>
            <ul>
                <li>Transformar el código basado en promesas a una función con async/await</li>
                <li>Mantener el mismo manejo de errores</li>
                <li>Ejecutar el código para ver el resultado</li>
            </ul>
        `,
        archivoJS: "ejercicio1.js"
    },
    {
        id: 2,
        titulo: "Obtener información secuencial",
        descripcion: `
            <p>En este ejercicio, crearemos una función que realiza varias operaciones asíncronas de forma secuencial.</p>
            <h3>Objetivos:</h3>
            <ul>
                <li>Obtener un usuario aleatorio</li>
                <li>Extraer los datos de contacto de ese usuario</li>
                <li>Generar un mensaje de saludo personalizado</li>
                <li>Implementar manejo de errores con try/catch</li>
            </ul>
        `,
        archivoJS: "ejercicio2.js"
    },
    {
        id: 3,
        titulo: "Procesamiento en paralelo",
        descripcion: `
            <p>En este ejercicio, aprenderemos a procesar múltiples operaciones asíncronas en paralelo.</p>
            <h3>Objetivos:</h3>
            <ul>
                <li>Obtener datos de 10 usuarios al mismo tiempo</li>
                <li>Agrupar los usuarios por nacionalidad</li>
                <li>Utilizar Promise.all para procesamiento en paralelo</li>
                <li>Mostrar estadísticas sobre los usuarios obtenidos</li>
            </ul>
        `,
        archivoJS: "ejercicio3.js"
    },
    {
        id: 4,
        titulo: "Patrón de reintento",
        descripcion: `
            <p>En este ejercicio, implementaremos un patrón de reintento para manejar fallos temporales.</p>
            <h3>Objetivos:</h3>
            <ul>
                <li>Crear una función que simule fallos aleatorios</li>
                <li>Implementar un mecanismo de reintento automático</li>
                <li>Utilizar retroceso exponencial entre reintentos</li>
                <li>Limitar el número máximo de intentos</li>
            </ul>
        `,
        archivoJS: "ejercicio4.js"
    },
    {
        id: 5,
        titulo: "API con limitación de tasa",
        descripcion: `
            <p>En este ejercicio, simularemos el trabajo con una API que tiene limitación de tasa.</p>
            <h3>Objetivos:</h3>
            <ul>
                <li>Procesar múltiples solicitudes de forma secuencial</li>
                <li>Implementar un retraso entre solicitudes</li>
                <li>Manejar errores individuales sin detener todo el proceso</li>
                <li>Mostrar el progreso de las operaciones</li>
            </ul>
        `,
        archivoJS: "ejercicio5.js"
    },
    {
        id: 6,
        titulo: "Sistema de caché simple",
        descripcion: `
            <p>En este ejercicio, implementaremos un sistema de caché para evitar solicitudes repetidas.</p>
            <h3>Objetivos:</h3>
            <ul>
                <li>Crear una clase que gestione la caché de usuarios</li>
                <li>Verificar si un usuario ya está en caché antes de hacer una solicitud</li>
                <li>Implementar un mecanismo de expiración de caché</li>
                <li>Demostrar la eficiencia de la caché con múltiples solicitudes</li>
            </ul>
        `,
        archivoJS: "ejercicio6.js"
    },
    {
        id: 7,
        titulo: "Procesamiento avanzado con manejo de errores",
        descripcion: `
            <p>En este ejercicio, realizaremos un procesamiento más complejo de datos con manejo de errores robusto.</p>
            <h3>Objetivos:</h3>
            <ul>
                <li>Obtener y filtrar usuarios según criterios específicos</li>
                <li>Transformar y ordenar datos</li>
                <li>Implementar manejo de errores en múltiples niveles</li>
                <li>Aplicar un timeout global a toda la operación</li>
            </ul>
        `,
        archivoJS: "ejercicio7.js"
    },
    {
        id: 8,
        titulo: "Integración con interfaz de usuario",
        descripcion: `
            <p>En este ejercicio, veremos cómo integrar código asíncrono con la interfaz de usuario.</p>
            <h3>Objetivos:</h3>
            <ul>
                <li>Mostrar indicadores de carga durante operaciones asíncronas</li>
                <li>Actualizar la interfaz con los resultados obtenidos</li>
                <li>Manejar errores en la interfaz de usuario</li>
                <li>Implementar botones para cargar más datos</li>
            </ul>
        `,
        archivoJS: "ejercicio8.js"
    }
];

// Variables globales
let ejercicioActual = null;
let scriptCargado = null;

// Elementos DOM
const btnEjercicios = document.querySelectorAll('.exercise-btn');
const ejercicioDescripcion = document.getElementById('exercise-description');
const codeDisplay = document.getElementById('code-display');
const runBtn = document.getElementById('run-btn');
const copyBtn = document.getElementById('copy-btn');
const resultDisplay = document.getElementById('result-display');
const loadingIndicator = document.getElementById('loading');

// Función para cargar un ejercicio
async function cargarEjercicio(id) {
    // Resaltar el botón activo
    btnEjercicios.forEach(btn => {
        btn.classList.remove('active');
        if (btn.id === `btn-${id}`) {
            btn.classList.add('active');
        }
    });
    
    // Buscar el ejercicio seleccionado
    ejercicioActual = ejercicios.find(ej => ej.id === id);
    
    if (!ejercicioActual) {
        console.error(`Ejercicio ${id} no encontrado`);
        return;
    }
    
    // Actualizar la descripción
    ejercicioDescripcion.innerHTML = `
        <h3>${ejercicioActual.titulo}</h3>
        ${ejercicioActual.descripcion}
    `;
    
    // Limpiar el resultado anterior
    resultDisplay.innerHTML = '<p>El resultado se mostrará aquí después de ejecutar el código...</p>';
    
    // Cargar el contenido del archivo JS
    try {
        const response = await fetch(ejercicioActual.archivoJS);
        
        if (!response.ok) {
            throw new Error(`Error al cargar el archivo: ${response.status}`);
        }
        
        const codigo = await response.text();
        
        // Mostrar el código en el display con resaltado de sintaxis básico
        codeDisplay.innerHTML = resaltarSintaxis(codigo);
        
        // Cargar el script dinámicamente
        if (scriptCargado) {
            document.head.removeChild(scriptCargado);
        }
        
        scriptCargado = document.createElement('script');
        scriptCargado.src = ejercicioActual.archivoJS;
        document.head.appendChild(scriptCargado);
        
    } catch (error) {
        console.error('Error al cargar el ejercicio:', error);
        codeDisplay.textContent = `// Error al cargar el ejercicio: ${error.message}`;
    }
}

// Función para resaltar la sintaxis (versión simple)
function resaltarSintaxis(codigo) {
    // Reemplazar palabras clave, strings, etc.
    return codigo
        .replace(/\/\/.*$/gm, match => `<span class="syntax-comment">${match}</span>`)
        .replace(/["'`].*?["'`]/g, match => `<span class="syntax-string">${match}</span>`)
        .replace(/\b(const|let|var|function|return|if|else|try|catch|await|async|new|class|for|while|switch|case|break|continue|import|export|from|default)\b/g, match => `<span class="syntax-keyword">${match}</span>`)
        .replace(/\b(console|fetch|Math|JSON|Promise|Array|Object|String|Number|Boolean|Date)\b/g, match => `<span class="syntax-function">${match}</span>`)
        .replace(/\b(true|false|null|undefined)\b/g, match => `<span class="syntax-keyword">${match}</span>`)
        .replace(/\b(\d+)\b/g, match => `<span class="syntax-number">${match}</span>`);
}

// Función para ejecutar el código del ejercicio actual
function ejecutarCodigo() {
    if (!ejercicioActual) {
        mostrarError('Por favor, selecciona un ejercicio primero');
        return;
    }
    
    // Limpiar resultado anterior y mostrar loading
    resultDisplay.innerHTML = '';
    loadingIndicator.style.display = 'block';
    
    // Utilizamos setTimeout para dar tiempo a que se muestre el loading
    setTimeout(() => {
        try {
            // Ejecutar la función del ejercicio (debe estar definida en el script cargado)
            const fnName = `ejecutarEjercicio${ejercicioActual.id}`;
            
            if (typeof window[fnName] !== 'function') {
                throw new Error(`La función ${fnName} no está definida. Asegúrate de que el archivo ${ejercicioActual.archivoJS} la exporta correctamente.`);
            }
            
            // Ejecutar la función del ejercicio (que debe devolver una promesa)
            window[fnName]()
                .then(resultado => {
                    // Ocultar loading
                    loadingIndicator.style.display = 'none';
                    
                    // Si es un string, mostrarlo directamente
                    if (typeof resultado === 'string') {
                        resultDisplay.innerHTML = resultado;
                    } else {
                        // Si es un objeto, convertirlo a string formateado
                        resultDisplay.innerHTML = formatearResultado(resultado);
                    }
                })
                .catch(error => {
                    // Ocultar loading
                    loadingIndicator.style.display = 'none';
                    mostrarError(`Error al ejecutar: ${error.message}`);
                });
                
        } catch (error) {
            // Ocultar loading
            loadingIndicator.style.display = 'none';
            mostrarError(`Error: ${error.message}`);
        }
    }, 100);
}

// Función para formatear el resultado
function formatearResultado(resultado) {
    if (resultado === null || resultado === undefined) {
        return '<p><em>(sin resultado)</em></p>';
    }
    
    if (typeof resultado === 'object') {
        // Si es un array o un objeto, formatearlo como JSON con estilo
        try {
            const json = JSON.stringify(resultado, null, 2);
            return `<pre style="background-color: #f8f8f8; padding: 10px; border-radius: 5px; overflow-x: auto;">${json}</pre>`;
        } catch (error) {
            return `<p>Error al formatear resultado: ${error.message}</p>`;
        }
    }
    
    // Para otros tipos, convertir a string
    return `<p>${resultado.toString()}</p>`;
}

// Función para mostrar un error
function mostrarError(mensaje) {
    resultDisplay.innerHTML = `
        <div class="error-message">
            <strong>Error:</strong> ${mensaje}
        </div>
    `;
}

// Función para copiar el código al portapapeles
function copiarCodigo() {
    const codigo = codeDisplay.textContent;
    
    navigator.clipboard.writeText(codigo)
        .then(() => {
            // Mostrar confirmación temporal
            copyBtn.innerHTML = '<i class="fas fa-check"></i>';
            setTimeout(() => {
                copyBtn.innerHTML = '<i class="fas fa-copy"></i>';
            }, 2000);
        })
        .catch(error => {
            console.error('Error al copiar:', error);
            copyBtn.innerHTML = '<i class="fas fa-times"></i>';
            setTimeout(() => {
                copyBtn.innerHTML = '<i class="fas fa-copy"></i>';
            }, 2000);
        });
}

// Configurar event listeners
function configurarEventListeners() {
    // Event listeners para los botones de ejercicios
    btnEjercicios.forEach(btn => {
        btn.addEventListener('click', () => {
            const id = parseInt(btn.id.replace('btn-', ''));
            cargarEjercicio(id);
        });
    });
    
    // Event listener para el botón de ejecutar
    runBtn.addEventListener('click', ejecutarCodigo);
    
    // Event listener para el botón de copiar
    copyBtn.addEventListener('click', copiarCodigo);
}

// Inicializar la aplicación
function inicializar() {
    configurarEventListeners();
    cargarEjercicio(1); // Cargar el primer ejercicio por defecto
}

// Iniciar la aplicación cuando el DOM esté completamente cargado
document.addEventListener('DOMContentLoaded', inicializar);