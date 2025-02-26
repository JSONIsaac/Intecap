// Ejercicio 2: OBTENER INFORMACION DE FORMA SECUENCIAL
// api: https://randomuser.me/api/

//Funcion para obtener un usuario aleatorio

async function obtenerUsuario(){
    const response = await fetch('https://randomuser.me/api/')
    if(!response.ok){
        throw new Error('Error al obtener el usuario')
    }

    const data = await response.json()
    return data.results[0]
}

//Funcion para obttener datos de contacto de un usuario

async function obtenerDatosContacto(usuario){
    // Simular que esta podria ser otra llamada a API
    //Usamos el seTimeout para simular un retrazo de la respuesta

    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const datosContacto = {
                email: usuario.email,
                telefono: usuario.phone,
                pais: usuario.location.country,
                ciudad: usuario.location.city,
                direccion: `${usuario.location.street.number}, ${usuario.location.street.name}, ${usuario.location.city}, ${usuario.location.country}` // av 4 de la calle democracia
            };
            resolve(datosContacto)
        }, 500)// 500ms de retrazo simulado
    })
}

async function generaSaludo(usuario, datosContacto){
    // Simular otra operacion asincrona
    return new Promise((resolve) => {
        setTimeout(() =>{
            const horaDia = new Date().getHours()
            let saludo = '';

            if(horaDia < 12){
                saludo = 'Buenos dias';
            } else if (horaDia < 18){
                saludo = 'Buenas tardes';
            }
            else{
                saludo = 'Buenas noches';
            }

            console.log(horaDia, saludo);

            const mensajeSaludo = `
                <div style="background-color:#f0f8ff; padding: 15px;" border-radius: 8px; border-left: 5px solid #4682b4;">
                <p><strong>${saludo}, ${usuario.name.title} ${usuario.name.first} ${usuario.name.last}.</strong></p>
                <p>Nos pondremos en contacto contigo a traves de tu email (${datosContacto.email}</p>
                o por telefono (${datosContacto.telefono}).</p>
                <p>Tu direccion registrada es: ${datosContacto.direccion}</p>
                <p>!Gracias por registrarte en nuestro servicio</p>
                </div>
            `;
            resolve(mensajeSaludo)
        }, 500)// 500ms de retrazo simulado
    })
}

async function obtenerInformacionUsuario(){
    try{
        //1. Obtener usuario de forma aleatoria

        const usuario = await obtenerUsuario()
        console.log('Usuario obtenido:', usuario);

        //2. Obtener datos del contacto del usuario
        const datosContacto = await obtenerDatosContacto(usuario);
        console.log('Datos de contacto obtenidos:', datosContacto);

        //3. Generar un mensaje de saludo personalizado
        const mensajeSaludo = await generaSaludo(usuario, datosContacto)
        console.log("Saludo generado");

        return {
            usuario,
            datosContacto,
            mensajeSaludo
        };
    }  catch(error){
        console.error('Error:', error)
        return null
    }
}

// Una funcion que muestra la informacion del usuario en la UI

function mostrarResultadoEnUI(resultado){
    if(!resultado || !resultado.usuario){
        return '<div class="error-message">Error al obtener la informacion del usuario</div>'
    }

    const usuario = resultado.usuario;

    return `
        <div class="user-card">
            <img src="${usuario.picture.large}" alt="user" class="user-card__img">
            <div class="user-info">
                <div class="user-name">${usuario.name.title} ${usuario.name.first} ${usuario.name.last}</div>
                <div class="user-details">Email: ${resultado.datosContacto.email}</div>
                <div class="user-details">Telefono: ${resultado.datosContacto.telefono}</div>
                <div class="user-details">Pais: ${resultado.datosContacto.pais}</div>
                <div class="user-details">Ciudad: ${resultado.datosContacto.ciudad}</div>
            </div>

            <h3 style="margin-top: 20px;">Datos de contacto obtenidos:</h3>
            <div style="background-color:#f0f8ff; padding: 15px; border-radius: 8px; border-left: 5px solid #4682b4;">
                <p><strong>Email:</strong> ${resultado.datosContacto.email}</p>
                <p><strong>Telefono:</strong> ${resultado.datosContacto.telefono}</p>
                <p><strong>Telefono:</strong> ${resultado.datosContacto.celular}</p>
                <p><strong>Direccion:</strong> ${resultado.datosContacto.direccion}</p>
            </div>
            
            <h3>Mensaje personalizado: </h3>
            ${resultado.mensajeSaludo}

            <div style="margin-top: 20px; padding: 15px; background-color: #f0f8ff; border-radius: 8px; border-left: 5px solid #4682b4;">
                <p><strong>Aprendizaje clave:</strong> Este ejercicio demuestra como async/await facilita la lectura y escritura de operaciones asincronicas secuenciales. Cada paso espera que el anterior se compelte antes de continuar</p>
            </div>
    `;
}


async function ejecutarEjercicio2(){
    try{
        console.log('Obteniendo informacion de usuario de forma secuencial...')
        const resultado = await obtenerInformacionUsuario()
        return mostrarResultadoEnUI(resultado)
    } catch(error){
        console.error('Error:', error)
        return '<div class="error-message">Error al obtener la informacion del usuario</div>'
    }
}