const express = require('express');
const app = express();
const port = process.env.PORT || 5000
const cors = require('cors')

app.use(cors());

const server = app.listen(port, () => {
    console.log(`escuchando en el puerto ${port}`)
})


const io = require('socket.io')(server);

let objeto;

io.on('connection', client => {
    console.log('nueva coneccion ' + client.id)

    client.join('room 8');

    client.on('messageCliente', mensaje => {
        objeto = {
            mensaje,
            id: client.id,
        }
        io.to('room 8').emit('nuevo', objeto);
    })

});