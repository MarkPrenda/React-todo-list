import { useState } from "react";
import TodoContext from "./TodoContext";

export function TodoProvider({ children }) {
	const [todos, setTodos] = useState([
		{
			id: 1,
			description: "JSX e componentes",
			completed: false,
			createdAt: "2022-10-31",
		},
		{
			id: 2,
			description: "Controle de inputs e formulários controlados",
			completed: true,
			createdAt: "2022-10-31",
		},
	]);

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
