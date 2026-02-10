import { SquareDashed } from "lucide-react";
import "./empty-state.style.css";
export function EmptyState() {
	return (
		<section className="empty-state">
			<p>There are no tasks registered yet, add some to get started!</p>
			<div className="icon-area">
				<SquareDashed />
			</div>
		</section>
	);
}
