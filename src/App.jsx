import { use, useState } from "react";
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
import TodoContext from "./components/TodoProvider/TodoContext";
import { TodoGroup } from "./components/TodoGroup";

function App() {
	const [showDialog, setShowDialog] = useState(false);

	const { todos, addToDo } = use(TodoContext);

	const toggleDialog = () => {
		setShowDialog(!showDialog);
	};

	const handleFormSubmit = (formData) => {
		addToDo(formData);
		toggleDialog();
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
						<TodoGroup
							heading="To study"
							items={todos.filter((t) => !t.completed)}
						/>
						<TodoGroup
							heading="Completed"
							items={todos.filter((t) => t.completed)}
						/>
						<Footer>
							<Dialog isOpen={showDialog} onClose={toggleDialog}>
								<ToDoForm onSubmit={handleFormSubmit} />
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
