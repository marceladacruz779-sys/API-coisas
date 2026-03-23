const db = require('../config/coisas');


function listarTodos () {
    return new Promise ((resolve, reject) =>{
        const sql = 'SELECT * FROM coisas';

        db.all(sql, [], (erro, linhas) => {
        if (erro) {
        reject(erro);    
      } else {
        resolve(linhas); 
      }
        });
    });
};


function buscarPorId(idc) {
  return new Promise((resolve, reject) => {

    const sql = 'SELECT * FROM coisas WHERE id = ?';

    db.get(sql, [idc], (erro, linha) => {
      if (erro) {
        reject(erro);
      } else {
        resolve(linha); 
      }
    });
  });
}


function criar(dados) {
  return new Promise((resolve, reject) => {

    const { nomec, tipoc, valor, dtcoisa, Qtdc} = dados;

    const sql = `
      INSERT INTO coisas (nomec, tipoc, valor, dtcoisa, Qtdc)
      VALUES (?, ?, ?, ?, ?)
    `;
    

    db.run(sql, [nomec, tipoc, valor, dtcoisa, Qtdc], function(erro) {
      if (erro) {
        reject(erro);
      } else {
    
        resolve({
          idc: this.lastID,
          nomec,
          tipoc,
          valor,
          dtcoisa,
          Qtdc
        });
      }
    });
  });
}


function atualizar(idc, dados) {
  return new Promise((resolve, reject) => {
    const { nomec, tipoc, valor, dtcoisa, Qtdc } = dados;

    const sql = `
      UPDATE coisas 
      SET nomec = ?, tipoc = ?, valor = ?, dtcoisa = ?, Qtdc = ?
      WHERE id = ?
    `;
    

    db.run(sql, [nomec, tipoc, valor, dtcoisa, Qtdc, idc], function(erro) {
      if (erro) {
        reject(erro);
      } else if (this.changes === 0) {

        resolve(null);
      } else {

        resolve({ idc, nomec, tipoc, valor, dtcoisa, Qtdc});
      }
    });
  });
}


function deletar(idc) {
  return new Promise((resolve, reject) => {

    const sql = 'DELETE FROM coisas WHERE id = ?';
    
    db.run(sql, [idc], function(erro) {
      if (erro) {
        reject(erro);
      } else {

        resolve(this.changes > 0);
      }
    });
  });
}


function buscarPortipoc(tipoc) {
  return new Promise((resolve, reject) => {

    const sql = 'SELECT * FROM coisas WHERE tipoc LIKE ?';
    
    db.all(sql, [`%${tipoc}%`], (erro, linhas) => {
      if (erro) {
        reject(erro);
      } else {
        resolve(linhas);
      }
    });
  });
}


module.exports = {
  listarTodos,
  buscarPorId,
  criar,
  atualizar,
  deletar,
  buscarPortipoc
};

