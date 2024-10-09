import mongoose from "mongoose";

const ProjectSchema = new mongoose.Schema(
  {
    projectName: {
      type: String,
      required: [true, "Please provide a project name"],
      maxlength: [60, "Project name cannot be more than 60 characters"],
    },
    coverImage: {
      type: String,
      required: [true, "Please provide a cover image URL"],
    },
    collectionUrl: {
      type: String,
      required: [true, "Please provide a collection URL"],
    },
    fullWidth: {
      type: Boolean,
      default: false,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { collection: "archi" }
);

export default mongoose.models.Project ||
  mongoose.model("Project", ProjectSchema);
