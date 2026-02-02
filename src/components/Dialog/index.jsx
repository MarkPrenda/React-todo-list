// import React from "react";
// import { useRef } from "react";
// import "./dialog.style.css";
// export function Dialog() {
// 	//Não deveriamos fazer buscas no DOM desse jeito!
// 	//const dialog = document.querySelector("dialog");

// 	const dialogRef = useRef(null);

// 	// "Show the dialog" button opens the dialog modally
// 	const openDialog = () => {
// 		dialogRef.current.showModal();
// 	};

// 	// "Close" button closes the dialog
// 	const closeDialog = () => {
// 		dialogRef.current.close();
// 	};

// 	return (
// 		<React.Fragment>
// 			<dialog ref={dialogRef}>
// 				<button autoFocus onClick={closeDialog}>
// 					Close
// 				</button>
// 				<p>This modal dialog has a groovy backdrop!</p>
// 			</dialog>
// 			<button onClick={openDialog}>Show the dialog</button>
// 		</React.Fragment>
// 	);
// }

import React from "react";
import { useRef } from "react";
import "./dialog.style.css";

export function Dialog() {
	// ============================
	// RENDER PHASE (pure)
	// ============================
	// O React está EXECUTANDO a função do componente.
	// Aqui ele:
	// - ainda NÃO criou DOM
	// - ainda NÃO fez commit
	// - só está calculando a "descrição" da UI (Virtual DOM)

	// Hook chamado durante o render
	// useRef cria um objeto estável:
	// { current: null }
	// Esse valor NÃO muda entre renders
	// NÃO dispara re-render quando mutado
	const dialogRef = useRef(null);

	// ============================
	// EVENT HANDLERS (fora do render)
	// ============================
	// Essas funções são DEFINIDAS durante o render,
	// mas NÃO EXECUTADAS nele.
	// Elas só rodam em resposta a eventos do usuário.

	// Imperativo controlado:
	// Executa APÓS o commit, quando o DOM já existe
	const openDialog = () => {
		// Aqui o React NÃO está renderizando
		// Nenhum hook roda
		// Nenhum JSX é reavaliado
		dialogRef.current.showModal();
	};

	const closeDialog = () => {
		// Mesmo caso: efeito imperativo fora do render
		dialogRef.current.close();
	};

	// ============================
	// RETURN / JSX (ainda render phase)
	// ============================
	// Aqui o React cria a árvore de elementos (Virtual DOM)
	// Ainda NÃO existe DOM real

	return (
		<React.Fragment>
			{/* ============================
			    COMMIT PHASE (acontece DEPOIS do render)
			    ============================
			    Quando este <dialog> for criado no DOM real,
			    o React vai:
			    dialogRef.current = HTMLDialogElement
			*/}
			<dialog ref={dialogRef}>
				<button autoFocus onClick={closeDialog}>
					Close
				</button>
				<p>This modal dialog has a groovy backdrop!</p>
			</dialog>

			{/* Esse botão NÃO abre o dialog agora.
			    Ele apenas registra um handler.
			    A execução acontece fora do render,
			    em resposta ao click. */}
			<button onClick={openDialog}>Show the dialog</button>
		</React.Fragment>
	);
}
