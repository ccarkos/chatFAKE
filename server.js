// → IMPORTAR O MÓDULO EXPRESS
const app = require('express')();

// → IMPORTAR O MÓDULO HTTP E CRIAR UM SERVIDOR
const http = require('http').createServer(app);

// → IMPORTAR O MÓDULO SOCKET E ADICIONA O SERVIDOR HTTP
const io = require('socket.io')(http);

// → ROTA PARA PÁGINA PRINCIPAL
app.get('/', (req, res) => res.sendFile(__dirname + '/index.html'));

// → EVENTO QUANDO O CLIENTE SE CONECTA AO SERVIDOR
io.on('connection', (socket) => {
    console.log('Usuário conectado');

    // EVENTO PARA CLIENTE ENVIA UMA MENSAGEM ↓
    socket.on('chat message', (data) => io.emit('chat message', data));

    // EVENTO PARA O CLIENTE SE DESCONECTAR
    socket.on('disconnect', () => console.log('Usuário desconectado'));
});

// → INICIAR O SERVIDOR NA PORTA 300
http.listen(3000, () => {
    console.log(`Servidor rodando na porta 300 - Link http://localhost:3000`)
});