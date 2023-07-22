const NoteWall = require("../models/NoteWall.model");

module.exports.index = (request, response) => {
	response.json({
		message: "Hello World"
	});
};

module.exports.getAllNoteWall = (request, response) => {
	NoteWall.find({})
		.then((note) => response.json(note))
		.catch((err) => response.json(err));
};

module.exports.createNote = (request, response) => {
	const { noteTitle, noteBody } = request.body;
	const newNote = new NoteWall({
		noteTitle,
		noteBody
	});
	newNote
		.save()
		.then((note) => response.json(note))
		.catch((err) => response.json(err));
};

module.exports.updateNote = (request, response) => {
	const { noteTitle, noteBody } = request.body;
	if (!noteTitle || !noteBody) {
		return response
			.status(400)
			.json({ error: "Note title and body cannot be empty" });
	}
	NoteWall.findOneAndUpdate({ _id: request.params.id }, request.body, {
		new: true,
	})
		.then((updatedNote) => response.json(updatedNote))
		.catch((err) => response.json(err));
};

module.exports.deleteOne = (request, response) => {
	NoteWall.deleteOne({ _id: request.params.id })
		.then((deleteConfirmation) => response.json(deleteConfirmation))
		.catch((err) => response.json(err));
};
