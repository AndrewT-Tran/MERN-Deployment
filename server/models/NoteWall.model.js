const mongoose = require("mongoose");

const NoteWallSchema = new mongoose.Schema(
    {
        noteTitle: {
            type: String,
            required: [true, "Title is required"],
            minlength: [2, "Title must be at least 2 characters long"],
            validate: {
                validator: async function (value) {
                    const note = await this.constructor.findOne({ noteTitle: value });
                    if (note && !note._id.equals(this._id)) {
                        throw new Error("Note title must be unique");
                    }
                },
                message: "Note title must be unique",
            },
        },
        noteBody: {
            type: String,
            required: [true, "Note is required"],
            minlength: [15, "Note must be at least 15 characters long"],
            maxlength: [255, "No more than 255 characters"],
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model("NoteWall", NoteWallSchema);
console.log(`middleware works`);
