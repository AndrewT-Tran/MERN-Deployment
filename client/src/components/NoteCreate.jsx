import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import GoBackHomeButton from "./GoBackButton";

const NoteCreate = () => {
	const [noteTitle, setNoteTitle] = useState("");
	const [noteBody, setNoteBody] = useState("");
	const [errors, setErrors] = useState({});

	const navigate = useNavigate();

	const handleSubmit = (event) => {
		event.preventDefault();
		if (!noteTitle) {
			setErrors({ noteTitle: "Note title cannot be empty" });
			return;
		}
		if (!noteBody) {
			setErrors({ noteBody: "Note body cannot be empty" });
			return;
		}
		axios
			.post("http://localhost:8000/api/NoteWall/", {
				noteTitle,
				noteBody,
			})
			.then((res) => {
				console.log(res);
				setNoteTitle("");
				setNoteBody("");
			})
			.then(() => navigate("/"))
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

	return (
		<div>
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

			<form className="form-control mx-auto w-3/5" onSubmit={handleSubmit}>
				{errors.noteTitle && (
					<p className="text-red-500 text-2xl mb-2">{errors.noteTitle}</p>
				)}
				<label htmlFor="noteTitle" className="text-xl font-bold mb-3">
					Title:
				</label>
				<input
					className="input input-bordered input-secondary my-4"
					type="text"
					id="noteTitle"
					value={noteTitle}
					onChange={(event) => setNoteTitle(event.target.value)}
				/>
				{errors.noteBody && (
					<p className="text-red-500 text-2xl mb-2">{errors.noteBody}</p>
				)}
				<label htmlFor="noteBody" className="text-xl font-bold mb-3">
					Body:
				</label>
				<input
					className="input input-bordered input-secondary my-2 "
					id="noteBody"
					value={noteBody}
					onChange={(event) => setNoteBody(event.target.value)}
				/>
				<button
					className=" glass btn text-black bg-success mx-auto my-2 py-2"
					type="submit">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						className="h-6 w-6"
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor">
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth="2"
							d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
						/>
					</svg>
					Submit
				</button>
			</form>
		</div>
	);
};

export default NoteCreate;
