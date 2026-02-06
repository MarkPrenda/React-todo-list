import { useState } from "react";
import { ChecklistsWrapper } from "./components/ChecklistsWrapper";
import { Container } from "./components/Container";
import { Dialog } from "./components/Dialog";
import { FabButton } from "./components/FabButton";
import { Footer } from "./components/Footer";
import { Header } from "./components/Header";
import { Heading } from "./components/Heading";
import { IconPlus, IconSchool } from "./components/icons";
import { SubHeading } from "./components/SubHeading";
import { ToDoItem } from "./components/ToDoItem";
import { ToDoList } from "./components/ToDoList";
import { ToDoForm } from "./components/ToDoForm";

function App() {
	const [showDialog, setShowDialog] = useState(false);
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

	const toggleDialog = () => {
		setShowDialog(!showDialog);
		// console.log("alternar modal");
	};

	const addToDo = (formData) => {
		const description = formData.get("description");
		setTodos((prevState) => {
			const todo = {
				// id: todo.length + 1,
				// porque não se faz assim? quando usa usa um setState ele não é sincrono, podendo acarretar conflito de ID
				id: prevState.length + 1,
				description: description,
				//outra forma de declarar, quando o objeto tem uma propriedade que o valor dela esta em uma variavel ou constante que possui o mesmo nome
				// description,
				completed: false,
				createdAt: new Date().toISOString(),
				// porque faer isso? normalmente quando cuida do estado, colocar algo que seja serializavel, caso isso pare de vir do react e passe a vir de uma API, por exemplo, código ja esta serializavel, ou seja uma string é, um objeto de data não, tem que se adequar ao parse ou stringfy do json
			};
			//Mistake: mutating state
			//prevTodos.push(todo())
			//o objetivo é criar um novo objeto
			return [...prevState, todo];
		});
		console.log("precisamos add um novo todo");
		toggleDialog();
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
		<>
			<main>
				<Container>
					<Header>
						<Heading>
							<IconSchool /> Midnite - TODO
						</Heading>
					</Header>

					<ChecklistsWrapper>
						<SubHeading>To study</SubHeading>
						<ToDoList>
							{todos
								.filter((t) => !t.completed)
								.map(function (t) {
									return (
										<ToDoItem
											key={t.id}
											item={t}
											onToggleCompleted={toggleTodoCompleted}
											onDeleteTodo={deleteTodo}
										/>
									);
								})}
						</ToDoList>
						<SubHeading>Finished</SubHeading>
						<ToDoList>
							{todos
								.filter((t) => t.completed)
								.map(function (t) {
									return (
										<ToDoItem
											key={t.id}
											item={t}
											onToggleCompleted={toggleTodoCompleted}
											onDeleteTodo={deleteTodo}
										/>
									);
								})}
						</ToDoList>
						<Footer>
							<Dialog isOpen={showDialog} onClose={toggleDialog}>
								<ToDoForm onSubmit={addToDo} />
							</Dialog>

							<FabButton onClick={toggleDialog}>
								<IconPlus />
							</FabButton>
						</Footer>
					</ChecklistsWrapper>
				</Container>
			</main>
		</>
	);
}

export default App;
