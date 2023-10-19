export class Todo {
    static fromJson({id, tarea, frecuencia, completado, creado}) {
        const tempTodo = new Todo(tarea, frecuencia);

        tempTodo.id = id;
        tempTodo.completado = completado;
        tempTodo.creado = creado;

        return tempTodo;
    }

    constructor(tarea, frecuencia) {
        this.id = new Date().getTime();
        this.tarea = tarea;
        this.frecuencia = frecuencia;
        this.completado = false;
        this.creado = new Date();
    }
}