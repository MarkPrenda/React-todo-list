import { TextInput } from "../TextInput";
import { Button } from "../Button";
import "./to-do-form.style.css";

export function ToDoForm({ onSubmit }) {
	return (
		<form action={onSubmit} className="to-do-form">
			<TextInput placeholder="Type a new item..." required name="description" />
			<Button>Save</Button>
		</form>
	);
}
