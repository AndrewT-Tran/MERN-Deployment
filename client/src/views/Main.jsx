import React, { useEffect, useState } from "react";
import NoteList from "../components/NoteList";
import axios from "axios";
import { Link, Route, Routes } from "react-router-dom";
import New from "./New";
const Main = () => {
	const [notes, setNotes] = useState([]);
	const [loaded, setLoaded] = useState(false);

	useEffect(() => {
		axios
			.get("http://localhost:8000/api/NoteWall")
			.then((res) => {
				setNotes(res.data);
				setLoaded(true);
			})
			.catch((err) => console.error(err));
	}, []);

	const removeFromDom = (noteId) => {
		setNotes(notes.filter((note) => note._id !== noteId));
	};

	return (
		<>
			<hr />
			<Routes>
				<Route path="/New" element={<New />} />
			</Routes>

			<div className="navbar w-3/5 bg-base-100 mx-auto">
				<div className="navbar-start">
					<h1 className="text-primary font-light text-5xl">
						Note<span className="text-secondary font-semibold">Wall </span>
					</h1>
				</div>
				<div className="navbar-center hidden lg:flex"></div>
				<div className="navbar-end">
					<Link
						to="/New"
						className="btn glass bg-warning btn-sm my-3 text-green-900 ">
						<span className="font-bold my-2 text-black">+</span> Write a Note
					</Link>
				</div>
			</div>
			{loaded && <NoteList notes={notes} removeFromDom={removeFromDom} />}
		</>
	);
};

export default Main;
