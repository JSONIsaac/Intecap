function obtenerUsuarioConPromesa() {
    return fetch('https://randomuser.me/api/')
        .then(response =>{
            if(!response.ok){
                throw new Error('Error al obtener el usuario')
            }
            return response.json()
        })
        .then(data => {
            return data.results[0]
        })
        .catch(error => {
            console.error('Error:', error)
            return null
        })
}

// transaformaciona asyn-await
async function obtenerUsuarioAleatorio(){
    try{
        const response = await fetch('https://randomuser.me/api/')
        if(!response.ok){
            throw new Error('Error al obtener el usuario')
        }
        const data = await (response.json())
        return data.results[0]
    }
    catch(error){
        console.error('Error:', error)
        return null
    }
}

function mostrarUsuarioEnUI(usuario){
    if(!usuario){
        return '<div class="error-message">Error al obtener el usuario</div>'
    }

    return `
        <div class="user-card">
            <img src="${usuario.picture.large}" alt="user" class="user-card__img">
            <div class="user-info">
                <div class="user-name">${usuario.name.title} ${usuario.name.first} ${usuario.name.last}</div>
                <div class="user-details">Email: ${usuario.email}</div>
                <div class="user-details">Telefono: ${usuario.phone}</div>
                <div class="user-details">Pais: ${usuario.country}</div>
                <div class="user-details">Ciudad: ${usuario.location.city}</div>
            </div>
        </div>
        <div>
            <p><strong>Comparacion:</strong></p>
            <p>Este ejercicio muestra como async await hace que el codigo sea mas legible y facil de enteder.</p>
            <p>El flujo del codigo se lee de manera secuencial, similiar a un codigo sincronico, aunque este sigue siendo sincronico, por detras</p>
        </div>
    `
}

async function ejecutarEjercicio1(){
    try{
        console.log('Obteniendo usuario con async-await...')
        const usuario = await obtenerUsuarioAleatorio()
        return mostrarUsuarioEnUI(usuario)
    }
    catch(error){
        console.error('Error:', error)
        return `<div class="error-message">Error al obtener el usuario</div>`
    }
}