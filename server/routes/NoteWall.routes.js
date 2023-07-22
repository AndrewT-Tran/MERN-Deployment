const NoteWallController = require("../controllers/NoteWall.controller");
module.exports = function (app) {
	app.get("/api", NoteWallController.index);
	app.get("/api/NoteWall/", NoteWallController.getAllNoteWall);
	app.post("/api/NoteWall/", NoteWallController.createNote);
	app.patch("/api/NoteWall/:id", NoteWallController.updateNote);
	app.delete("/api/NoteWall/:id", NoteWallController.deleteOne);
	app.post("/api/NoteWall", (req, res) => {
		const { title, body } = req.body;

		// Check if a note with the same title already exists
		const existingNote = notes.find((note) => note.title === title);
		if (existingNote) {
			return res.status(400).json({ message: "Note title must be unique" });
		}

		const newNote = {
			id: uuidv4(),
			title,
			body,
			createdAt: new Date().toISOString(),
		};
		notes.push(newNote);
		res.json(newNote);
	});
};
