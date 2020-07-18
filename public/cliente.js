const client = io.connect('https://chat-choquito.herokuapp.com');
const input = document.getElementById('input');
const boton = document.getElementById('boton');
const respuesta = document.getElementById('respuesta');

client.on('nuevo', d => {
    if (d.id !== client.id) {
        let div = document.createElement('div');
        div.setAttribute('class', 'verde');
        div.innerText = 'EL: ' + d.mensaje;
        respuesta.appendChild(div)
    } else if (d.id === client.id) {
        let div = document.createElement('div');
        div.setAttribute('class', 'azul');
        div.innerText = 'TU: ' + d.mensaje;
        respuesta.appendChild(div)
    }
})

boton.addEventListener('click', () => {
    if (input.value !== '') {
        client.emit('messageCliente', `${input.value}`)
        input.value = '';
    }

})

client.on('disconnect', () => {
    console.log('se desconecto la sesion');
})