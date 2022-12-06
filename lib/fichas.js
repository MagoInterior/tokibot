const fs = require('fs');
const path = require('../database/json/tokens.json');

//verifica se o id da ficha existe na database
const checkID = number => {
  let condition = false;
  path.fichas.map(tokens => {
    if (number in tokens) {
      condition = number in tokens;
    }
  });
  return condition;
};

//adiciona a ficha na database
const addToken = (number, token) => {
  if (!checkID(number)) {
    path.fichas.push({[number]: { token }});
    fs.writeFileSync('./db/json/tokens.js', JSON.stringify(path, null, '\t'));
    return 'ficha adicionada com sucesso!';
  } else return 'ficha existente!';
};

//remove uma ficha da database
const removeToken = number => {
  if (checkID(number)) {
    let position = false;
    for (let index = 0; index < path.fichas.length; index++) {
      if (number in path.fichas[index]) {
        position = index;
      }
    }
    if (position !== false) {
      path.fichas.splice(position, 1);
    }
    fs.writeFileSync('./db/json/tokens.js', JSON.stringify(path, null, '\t'));
    return 'ficha deletada com sucesso!';
  } else return 'essa ficha não existe!';
};

//busca e retorna uma ficha pelo id do portador
const getTokenByNumber = number => {
  let token;
  if (!checkID(number)) return 'esse usuario não possui uma ficha!';
  path.fichas.map(tokens => {
    if (number in tokens) {
      token = tokens[number].token;
    }
  });
  return token;
};

//busca e cria uma lista com todos os usuarios que possuem fichas
const getAllTokens = () => {
  const ids = [];
  let tokens = ' LISTA DE FICHEIROS\n\n';
  path.fichas.map(token => {
    ids.push(Object.keys(token)[0]);
    tokens += '» ' + Object.keys(token)[0].split('@')[0] + '\n';
  });
  if (ids.length == 0) return 'não tem nenhuma ficha para ser exibida!';
  return {
    numbers: ids,
    list: tokens.trim()
  };
};

module.exports = {
  addToken,
  removeToken,
  getAllTokens,
  getTokenByNumber
};