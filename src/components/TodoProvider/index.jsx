import { useEffect, useState } from "react";
import TodoContext from "./TodoContext";
//é passado uma string para uma constante, para evitar erros de digitação, tudo capitalizado para ficar claro
const TODOS = "todos";

export function TodoProvider({ children }) {
	const savedTodos = localStorage.getItem(TODOS);

	const [todos, setTodos] = useState(savedTodos ? JSON.parse(savedTodos) : []);
	const [showDialog, setShowDialog] = useState(false);
	const [selectedTodo, setSelectedTodo] = useState();

	const openFormTodoDialog = (todo) => {
		if (todo) {
			setSelectedTodo(todo);
		}
		setShowDialog(true);
	};

	const closeFormTodoDialog = () => {
		setShowDialog(false);
		setSelectedTodo(null);
	};

	useEffect(() => {
		localStorage.setItem(TODOS, JSON.stringify(todos));
	}, [todos]);

	const addToDo = (formData) => {
		const description = formData.get("description");
		setTodos((prevState) => {
			const todo = {
				//foi modificado, pois foi identificado um problema ao deletar um ide inferior ao ultimo, duplicando id, e apagando 2 quando se quer apagar somente 1
				// id: prevState.length + 1,
				id: crypto.randomUUID(),
				description: description,
				completed: false,
				createdAt: new Date().toISOString(),
			};

			return [...prevState, todo];
		});
		console.log("precisamos add um novo todo");
	};

	const toggleTodoCompleted = (todo) => {
		setTodos((prevState) => {
			return prevState.map((t) => {
				if (t.id == todo.id) {
					return {
						...t,
						completed: !t.completed,
					};
				}
				return t;
			});
		});
	};

	const editTodo = (formData) => {
		setTodos((prevState) => {
			return prevState.map((t) => {
				if (t.id == selectedTodo.id) {
					return {
						...t,
						description: formData.get("description"),
					};
				}
				return t;
			});
		});
	};

	const deleteTodo = (todo) => {
		setTodos((prevState) => {
			return prevState.filter((t) => t.id != todo.id);
		});
	};

	return (
		<TodoContext
			value={{
				todos,
				addToDo,
				toggleTodoCompleted,
				deleteTodo,
				showDialog,
				openFormTodoDialog,
				closeFormTodoDialog,
				selectedTodo,
				editTodo,
			}}
		>
			{children}
		</TodoContext>
	);
}
