import { use } from "react";
import { ChecklistsWrapper } from "./components/ChecklistsWrapper";
import { Container } from "./components/Container";
import { Dialog } from "./components/Dialog";
import { FabButton } from "./components/FabButton";
import { Footer } from "./components/Footer";
import { Header } from "./components/Header";
import { Heading } from "./components/Heading";
import { IconPlus } from "./components/icons";
import { ToDoForm } from "./components/ToDoForm";
import TodoContext from "./components/TodoProvider/TodoContext";
import { TodoGroup } from "./components/TodoGroup";
import { ListTodo, SquareDashed } from "lucide-react";
import { EmptyState } from "./components/EmptyState";

function App() {
	const {
		todos,
		addToDo,
		showDialog,
		openFormTodoDialog,
		closeFormTodoDialog,
		selectedTodo,
		editTodo,
	} = use(TodoContext);

	const handleFormSubmit = (formData) => {
		if (selectedTodo) {
			editTodo(formData);
		} else {
			addToDo(formData);
		}

		closeFormTodoDialog();
	};

	return (
		<>
			<main>
				<Container>
					<Header>
						<Heading>
							<ListTodo /> Midnite - TODO
						</Heading>
					</Header>
					<ChecklistsWrapper>
						{todos.length && (
							<TodoGroup
								heading="To study"
								items={todos.filter((t) => !t.completed)}
							/>
						)}
						{!todos.length && <EmptyState />}

						{todos.length && (
							<TodoGroup
								heading="Completed"
								items={todos.filter((t) => t.completed)}
							/>
						)}
						<Footer>
							<Dialog isOpen={showDialog} onClose={closeFormTodoDialog}>
								<ToDoForm
									onSubmit={handleFormSubmit}
									defaultValue={selectedTodo?.description}
								/>
							</Dialog>

							<FabButton onClick={() => openFormTodoDialog()}>
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
