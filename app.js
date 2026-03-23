const express = require('express');
const app = express();
const PORT = 3000;


app.use(express.json());


const produtoRoutes = require ('./src/routes/coisaRoutes')

app.use('/coisa', produtoRoutes);


app.get('/', (req, res) => {
  res.json({ 
    mensagem: 'API de Coisas com SQLite - Bem-vindo!',
    versao: '2.0',
    banco: 'SQLite',
    rotas_disponiveis: {
    listar_Todos: 'GET /coisa',
    buscar_Por_id: 'GET /coisa/:id',
    buscar_Por_tipoc: 'GET /coisa/tipoc/:tipoc',
    criar: 'POST /coisa',
    atualizar: 'PUT /coisa/:id',
    deletar: 'DELETE /coisa/:id'
    }



  });
});


app.listen(PORT, () => {
  console.log('='.repeat(50));
  console.log('🚀 Servidor rodando!');
  console.log(`📍 URL: http://localhost:${PORT}`);
  console.log(`💾 Banco de Dados: SQLite`);
  console.log(`📂 Arquivo do banco: database.sqlite`);
  console.log('='.repeat(50));
  console.log(`📋 Rotas disponíveis:`);
  console.log(`  GET    http://localhost:${PORT}/coisa`);
  console.log(`   GET    http://localhost:${PORT}/coisa/:id`);
  console.log(`   POST   http://localhost:${PORT}/coisa`);
  console.log(`   PUT    http://localhost:${PORT}/coisa/:id`);
  console.log(`   DELETE http://localhost:${PORT}/coisa/:id`);
  console.log('='.repeat(50));
});
//rota raiz /coisas