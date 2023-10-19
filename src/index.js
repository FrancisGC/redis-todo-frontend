import './styles.css';
import {TodoList} from "./classes";
import {crearTodoHtml} from "./js/componentes";

export const todoList = new TodoList();
await todoList.cargarLocalStorage();

todoList.todos.forEach(crearTodoHtml);
