import {Todo} from "../classes";
import {todoList} from "../index"

const divTodoList = document.querySelector('.todo-list');
const txtInput = document.querySelector('.new-todo');
const cmbFrecuente = document.querySelector('.new-select');
// const btnBorrar = document.querySelector('.clear-completed');
const ulFiltros = document.querySelector('.filters');
const anchorFiltros = document.querySelectorAll('.filtro');

const options = ['Frecuente', 'Tarea del día'];

export const crearTodoHtml = (todo) => {
    const htmlTodo = `
    <li class="${(todo.completado) ? 'completed' : ''}" data-id="${todo.id}">
        <div class="view">
            <input class="toggle" type="checkbox" ${(todo.completado) ? 'checked' : ''}>
            <label> ${todo.tarea} - ${options[todo.frecuencia]}</label>
            <button class="destroy"></button>
        </div>
        <input class="edit" value="Create a TodoMVC template">
    </li>`;

    const div = document.createElement('div');
    div.innerHTML = htmlTodo;

    divTodoList.append(div.firstElementChild);

    return div.firstElementChild;

};

txtInput.addEventListener('keyup', (event) => {
    if (event.keyCode === 13 && txtInput.value.length > 0) {
        const nuevoTodo = new Todo(txtInput.value, cmbFrecuente.value);
        todoList.nuevoTodo(nuevoTodo);
        crearTodoHtml(nuevoTodo);
        txtInput.value = '';
    }
});

divTodoList.addEventListener('click', async (event) => {
    const nombreElemento = event.target.localName; // va a ser el input(check), label, button
    const todoElemento = event.target.parentElement.parentElement;
    const todoId = todoElemento.getAttribute('data-id');

    if (nombreElemento.includes('input')) { // click en el check
        await todoList.marcarCompletado(todoId);
        todoElemento.classList.toggle('completed'); // agrega o quita clase a un elemento HTML
    } else if (nombreElemento.includes('button')) {
        await todoList.eliminarTodo(todoId);
        divTodoList.removeChild(todoElemento);
    }
});

// btnBorrar.addEventListener('click', () => {
//     todoList.eliminarCompletados();
//     for (let i = divTodoList.children.length - 1; i >= 0; i--) {
//         const elemento = divTodoList.children[i];
//         if (elemento.classList.contains('completed')) {
//             divTodoList.removeChild(elemento);
//         }
//     }
// });

ulFiltros.addEventListener('click', (event) => {
    const filtro = event.target.text;
    if (!filtro) {
        return;
    }

    anchorFiltros.forEach(elem => elem.classList.remove('selected'));
    event.target.classList.add('selected');

    for (const elemento of divTodoList.children) {
        elemento.classList.remove('hidden'); // Clase de CSS
        const completado = elemento.classList.contains('completed');

        switch (filtro) {
            case 'Pendientes':
                if (completado) {
                    elemento.classList.add('hidden');
                }
                break;
            case 'Completados':
                if (!completado) {
                    elemento.classList.add('hidden');
                }
                break;
        }
    }
});
