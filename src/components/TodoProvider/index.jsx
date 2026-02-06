import { useEffect, useState } from "react";
import TodoContext from "./TodoContext";

const TODOS = "todos";
export function TodoProvider({ children }) {
	const savedTodos = localStorage.getItem(TODOS);

	const [todos, setTodos] = useState(savedTodos ? JSON.parse(savedTodos) : []);

	useEffect(() => {
		localStorage.setItem(TODOS, JSON.stringify(todos));
	}, [todos]);

	const addToDo = (formData) => {
		const description = formData.get("description");
		setTodos((prevState) => {
			const todo = {
				id: prevState.length + 1,
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
			}}
		>
			{children}
		</TodoContext>
	);
}
