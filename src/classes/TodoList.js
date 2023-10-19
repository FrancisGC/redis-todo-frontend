import {Todo} from "./todo.class";
import {todoList} from "../index";

export class TodoList {
    constructor() {
    }
    async nuevoTodo(todo) {
        await fetch("http://localhost:8090/todo/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(todo)
        });

        await this.cargarLocalStorage();
    }

    async eliminarTodo(id) {
        await fetch(`http://localhost:8090/todo/${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            }
        });

        this.todos = this.todos.filter(todo => todo.id !== Number(id));
        await this.cargarLocalStorage();
    }

    async marcarCompletado(id) {
        for (const todo of this.todos) {
            if (todo.id === id) {
                todo.completado = !todo.completado;
                await fetch(`http://localhost:8090/todo/`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(todo)
                });
                break;
            }
        }
    }

    async cargarLocalStorage() {
        this.todos = await fetch("http://localhost:8090/todo/")
        this.todos = await this.todos.json()
        this.todos = this.todos.map(Todo.fromJson);
    }
}