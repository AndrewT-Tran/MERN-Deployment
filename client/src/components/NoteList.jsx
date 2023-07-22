import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";


const NoteList = () => {
	const [notes, setNotes] = useState([]);
	const [loaded, setLoaded] = useState(false);
	const [sortOrder, setSortOrder] = useState("newest");

	useEffect(() => {
		axios
			.get("http://localhost:8000/api/NoteWall")
			.then((res) => {
				if (Array.isArray(res.data)) {
					const sortedNotes = res.data.sort((a, b) => {
						if (sortOrder === "oldest") {
							return new Date(a.createdAt) - new Date(b.createdAt);
						} else {
							return new Date(b.createdAt) - new Date(a.createdAt);
						}
					});
					setNotes(sortedNotes);
					setLoaded(true);
				} else {
					console.error("Data is not an array:", res.data);
				}
			})
			.catch((err) => console.error(err.message));
	}, [sortOrder]);

	const handleSortOrderChange = (order) => {
		setSortOrder(order);
	};

	return (
		<>
			<div className="w-document.classList.add('class'); mx-auto mt-5">
				<div className="flex justify-center items-center mb-2 rounded">
					<button
						className="btn-md rounded glass font-semibold bg-primary mx-10 text-black"
						onClick={() => handleSortOrderChange("oldest")}>
						Sort by Oldest
					</button>
					<button
						className="btn-md mx-10 rounded glass bg-secondary font-semibold"
						onClick={() => handleSortOrderChange("newest")}>
						Sort by Newest
					</button>
				</div>
				{loaded ? (
					<div className="flex flex-col w-1/2 mx-auto">
						<ul className=" w-full mx-auto content-center">
							{notes.map((note) => (
								<li
									className="p-4  w-4/5 mx-auto outline-secondary outline-4
								my-10 rounded-md outline text-center font-semibold"
									key={note._id}>
									<p className="text-primary text-2xl my-1">{note.noteTitle}</p>
									<p className="text-sm text-content my-1">{note.noteBody}</p>
									<p className="text-xs text-info my-2">{note.createdAt}</p>
									<Link
										className="mx-auto btn btn-md my-3 px-5 rounded glass bg-success text-lg text-slate-800 font-semibold"
										to={`/note/${note._id}/edit`}>
										Edit
									</Link>
								</li>
							))}
						</ul>
					</div>
				) : (
					<p>Loading...</p>
				)}
			</div>
		</>
	);
};

export default NoteList;
