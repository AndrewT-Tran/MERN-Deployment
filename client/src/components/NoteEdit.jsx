import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import GoBackHomeButton from "../components/GoBackButton";

const Edit = () => {
	const { id } = useParams();
	const [note, setNote] = useState({ noteTitle: "", noteBody: "" });
	const [errors, setErrors] = useState({});

	useEffect(() => {
		axios
			.get(`http://localhost:8000/api/NoteWall/${id}`)
			.then((res) => setNote(res.data))
			.catch((err) => console.error(err));
	}, [id]);

	const handleInputChange = (event) => {
		const { name, value } = event.target;
		setNote({
			...note,
			[name]: value,
		});
	};

	const onSubmitHandler = (e) => {
		e.preventDefault();
		if (!note.noteTitle) {
			setErrors({ noteTitle: "Note title cannot be empty" });
			return;
		}
		if (!note.noteBody) {
			setErrors({ noteBody: "Note body cannot be empty" });
			return;
		}
		axios
			.patch(`http://localhost:8000/api/NoteWall/${id}`, note)
			.then(() => {
				alert("Note updated successfully!");
				navigate("/");
			})
			.catch((err) => {
				if (err.response && err.response.data) {
					const filteredErrors = Object.fromEntries(
						Object.entries(err.response.data.errors).filter(
							([key, value]) => key === "noteTitle" || key === "noteBody"
						)
					);
					setErrors(filteredErrors);
				} else {
					alert.error(err);
				}
			});
	};

	const deleteNote = (e) => {
		e.preventDefault();
		console.log("Deleting note...");
		axios
			.delete(`http://localhost:8000/api/NoteWall/${id}`)
			.then(() => {
				alert("Note deleted successfully!");
				navigate("/");
			})
			.catch((err) => console.error(err));
	};

	const navigate = useNavigate();

	console.log("Rendering Edit component...");

	return (
		<>
			<div className="navbar w-3/4 mb-10 bg-base-100 mx-auto">
				<div className="navbar-start">
					<h1 className="text-primary text-start px-3 font-light text-5xl">
						Note<span className="text-secondary font-semibold">Wall </span>
					</h1>
				</div>
				<div className="navbar-center text-3xl text-center text-primary">
					Edit an{" "}
					<span className="text-secondary font-light px-2"> Existing </span>{" "}
					Note
				</div>
				<div className="navbar-end">
					<GoBackHomeButton />
				</div>
			</div>

			<form className="form-control mx-auto w-3/4" onSubmit={onSubmitHandler}>
				{errors.error && (
					<p className="text-red-500 text-2xl mb-2">{errors.error}</p>
				)}
				<label htmlFor="noteTitle" className="text-xl font-bold mb-2">
					Note Title:
				</label>
				<input
					className="input input-bordered input-secondary my-2 "
					type="text"
					name="noteTitle"
					value={note.noteTitle}
					onChange={handleInputChange}
				/>
				{errors.noteTitle && (
					<p className="text-red-500 text-2xl mb-2">{errors.noteTitle}</p>
				)}
				<label htmlFor="noteBody" className="text-xl font-bold mb-2">
					Note Body:
				</label>
				<textarea
					className="input input-bordered input-secondary my-2"
					name="noteBody"
					value={note.noteBody}
					onChange={handleInputChange}
					placeholder={note.noteBody}
				/>
				{errors.noteBody && (
					<p className="text-red-500 text-2xl mb-2">{errors.noteBody}</p>
				)}
				<div className="flex justify-around my-5">
					<button className="inlinebtn w-1/3 glass bg-green-500" type="submit">
						Update
					</button>
					<button className="btn w-1/3 glass bg-red-500" onClick={deleteNote}>
						Delete
					</button>
				</div>
			</form>
		</>
	);
};

export default Edit;
