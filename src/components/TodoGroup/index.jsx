import { SubHeading } from "../SubHeading";
import { ToDoItem } from "../ToDoItem";
import { ToDoList } from "../ToDoList";

export function TodoGroup({ items, heading }) {
	// export function TodoGroup(props) {
	// console.log("este é o props:", props);
	// console.log("este são os item:", props.items);
	// console.log("este é o heading:", props.heading);
	return (
		<>
			<SubHeading>{heading}</SubHeading>
			<ToDoList>
				{items.map(function (t) {
					// console.log("antes do retorno", t);
					return <ToDoItem key={t.id} item={t} />;
				})}
			</ToDoList>
			;
		</>
	);
}
