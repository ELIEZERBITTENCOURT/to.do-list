'use strict';

/**Criando o JSON para simular um banco de dados*/
const getBanco = () => JSON.parse(localStorage.getItem ('todoList')) ?? [];
/**Salvando os dados no localStorage */
const setBanco = (banco) => localStorage.setItem ('todoList', JSON.stringify(banco));

/**Criando a função para criar a tarefa*/
const criarItem = (tarefa, status, indice) => {
    const item = document.createElement('label');
    item.classList.add('todo__item');
    item.innerHTML = `
    <input type="checkbox" ${status} data-indice = ${indice}>
    <div>${tarefa}</div>
    <input type="button" value="X" data-indice = ${indice}>
    `;
    document.getElementById('todoList').appendChild(item);
}

/**Criando a função para limpar a tela */
const limparTarefas = () =>{
    const todoList = document.getElementById('todoList');
    while(todoList.firstChild){
        todoList.removeChild(todoList.lastChild);
    }
}

/**Criando a função para atualizar a tela */
const atualizarTela = () =>{
    limparTarefas();
    const banco = getBanco();
    banco.forEach ((item, indice) => criarItem (item.tarefa, item.status, indice));
}

/**Criando a função para inserir uma nova tarefa */
const inserirItem = (evento) =>{
    const tecla = evento.key;
    const texto = evento.target.value;
    if (tecla === 'Enter'){
        const banco = getBanco();
        banco.push({'tarefa': texto, 'status':''});
        setBanco(banco);
        atualizarTela();
        evento.target.value = '';
    }
}

/**Programando a ação de deletar a tarefa */
const removerItem = (indice) => {
    const banco = getbBanco();
    banco.splice(indice,1);
    setBanco(banco);
    atualizarTela();
}

/**Programando a ação de atualizar o status da tarefa */
const atualizarItem = (indice) =>{
    const banco = getBanco();
    banco[indice].status= banco[indice].status ===''?'checked':'';
    setBanco(banco);
    atualizarTela();
}

const clickItem = (evento) =>{
    const elemento = evento.target;
    if(elemento.type ==='button'){
        const indice = elemento.dataset.indice;
        removerItem(indice);
    }else if(elemento.type === 'checkbox'){
        const indice = elemento.dataset.indice;
        atualizarItem(indice);
    }
}

document.getElementById('newItem').addEventListener('keypress', inserirItem);
document.getElementById('todoList').addEventListener('click', clickItem);

atualizarTela();