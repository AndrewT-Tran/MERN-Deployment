import React from "react";
import { Routes, Route} from "react-router-dom";
import Main from "./views/Main";
import Edit from "./views/Edit";
import NoteCreate from "./components/NoteCreate";
import "./App.css";

function App() {
	return (
		<>
			<Routes>
				<Route path="/" element={<Main />}></Route>
				<Route path="/new" element={<NoteCreate />}></Route>
				<Route element={<Edit />} path="Note/:id/edit" />
			</Routes>
		</>
	);
}

export default App;
