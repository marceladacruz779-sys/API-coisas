const coisaModel = require('../models/coisaModel');

async function listarTodos(req, res) {
  try {
  
    const coisa = await coisaModel.listarTodos();
    

    res.status(200).json(coisa);
  } catch (erro) {
  
    res.status(500).json({ 
      mensagem: 'Erro ao listar coisas', 
      erro: erro.message 
    });
  };
};


async function buscarPorId(req, res) {
  try {
    const idc = parseInt(req.params.id);
    
   
    if (isNaN(idc)) {
      return res.status(400).json({ 
        mensagem: 'ID inválido' 
      });
    }
    

    const coisa = await coisaModel.buscarPorId(idc);
    
    if (coisa) {
      res.status(200).json(coisa);
    } else {
      res.status(404).json({ 
        mensagem: 'Coisa de idc ${idc} não encontrado'
      });
    }
  } catch (erro) {
    res.status(500).json({ 
      mensagem: 'Erro ao buscar coisa',
      erro: erro.message 
    });
  };
};



async function criar(req, res) {
  try {
    const { nomec, tipoc, valor, dtcoisa, Qtdc} = req.body;
    

    if (!nomec || !tipoc || !valor || !dtcoisa || !Qtdc) {
      return res.status(400).json({ 
        mensagem: 'Todos os campos são obrigatórios' 
      });
    }
    
    if (parseFloat(valor) <= 0) {
      return res.status(400).json({ 
        mensagem: 'O preço deve ser maior que zero' 
      });
    }
    
    if (parseInt(Qtdc) < 0) {
      return res.status(400).json({ 
        mensagem: 'O estoque não pode ser negativo' 
      });
    }
    

    const novaCoisa = await coisaModel.criar({ 
      nomec, 
      tipoc, 
      valor, 
      dtcoisa,
      Qtdc
    });
   

    res.status(201).json(novaCoisa);
  } catch (erro) {
    res.status(500).json({ 
      mensagem: 'Erro ao criar coisa',
      erro: erro.message 
    });
  }
}



async function atualizar(req, res) {
  try {
    const idc = parseInt(req.params.id);
    const { nomec, tipoc, valor, dtcoisa, Qtdc} = req.body;
    
  
    if (isNaN(idc)) {
      return res.status(400).json({ 
        mensagem: 'ID inválido' 
      });
    }
    
    if (!nomec || !tipoc || !valor || !dtcoisa || !Qtdc) {
      return res.status(400).json({ 
        mensagem: 'Todos os campos são obrigatórios' 
      });
    }
    
    const coisaAtualizada = await coisaModel.atualizar(idc, { 
      nomec, 
      tipoc, 
      valor, 
      dtcoisa,
      Qtdc
    });
    
    if (coisaAtualizada) {
      res.status(200).json(coisaAtualizada);
    } else {
      res.status(404).json({ 
        mensagem: `Coisa de id ${idc} não encontrada`
      });
    }
  } catch (erro) {
    res.status(500).json({ 
      mensagem: 'Erro ao atualizar coisa',
      erro: erro.message 
    });
  }
}




async function deletar(req, res) {
  try {
    const idc = parseInt(req.params.id);
    
    if (isNaN(idc)) {
      return res.status(400).json({ 
        mensagem: 'ID inválido' 
      });
    }

    const deletado = await coisaModel.deletar(idc);
    
    if (deletado) {
      res.status(200).json({ 
        mensagem: `Coisa de id ${idc} removido com sucesso`
      });
    } else {
      res.status(404).json({ 
        mensagem: `Coisa de id ${idc} não encontrado`
      });
    }
  } catch (erro) {
    res.status(500).json({ 
      mensagem: 'Erro ao deletar produto',
      erro: erro.message 
    });
  }
}


async function buscarPortipoc(req, res) {
  try {
    const { tipoc } = req.params;
    

    const coisas = await coisaModel.buscarPortipoc(tipoc);
    
    res.status(200).json(coisas);
  } catch (erro) {
    res.status(500).json({ 
      mensagem: 'Erro ao buscar coisas por tipoc',
      erro: erro.message 
    });
  }
}


module.exports = {
  listarTodos,
  buscarPorId,
  criar,
  atualizar,
  deletar,
  buscarPortipoc
};