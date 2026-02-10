import "./todo-item.style.css";
import { IconPencil, IconTrash } from "../icons";
import { use } from "react";
import TodoContext from "../TodoProvider/TodoContext";

export function ToDoItem({ item }) {
	const { toggleTodoCompleted, deleteTodo, openFormTodoDialog } =
		use(TodoContext);
	const styles = ["todo-item"];

	if (item.completed) {
		styles.push("completed");
	}

	return (
		<li className={styles.join(" ")}>
			{/* <p className="date">
				{new Date(item.createdAt).toLocaleDateString("pt-BR")}
			</p> */}
			<div className="details">
				<input
					type="checkbox"
					className="checkbox"
					defaultChecked={item.completed}
					onClick={() => toggleTodoCompleted(item)}
				/>
				<div className="content">
					<p className="date">
						{new Date(item.createdAt).toLocaleDateString("pt-BR")}
					</p>
					<p className="description">{item.description}</p>
				</div>
				<div className="actions">
					<button
						className="icon-btn"
						id="left"
						onClick={() => openFormTodoDialog(item)}
					>
						<IconPencil />
					</button>
					<button
						className="icon-btn"
						id="right"
						onClick={() => deleteTodo(item)}
					>
						<IconTrash />
					</button>
				</div>
			</div>
		</li>
	);
}
