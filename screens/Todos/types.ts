export type TodosStateType = {
  filter: string;
  todoIds: string[];
  todos: any;
  error: string;
  loading: {
    fetchTodos: boolean;
    toggleAll: boolean;
    addTodo: boolean;
    editTodo: boolean;
    toggleTodo: boolean;
    deleteTodo: boolean;
    clearCompleted: boolean;
  };
  endReached: boolean;
};
