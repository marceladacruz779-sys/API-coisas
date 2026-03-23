const express = require('express');
const router = express.Router();


const coisaController = require('../controllers/coisaController');


router.get('/', coisaController.listarTodos);


router.get('/tipoc/:tipoc', coisaController.buscarPortipoc);


router.get('/:id', coisaController.buscarPorId);

router.post('/', coisaController.criar);

router.put('/:id', coisaController.atualizar);

router.delete('/:id', coisaController.deletar);




module.exports = router;