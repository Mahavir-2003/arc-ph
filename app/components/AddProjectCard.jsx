import { useState, useEffect } from "react";
import { Input, Button, Image } from "@nextui-org/react";
import toast from 'react-hot-toast';

const AddProjectCard = ({ onProjectAdded, editingProject, setEditingProject }) => {
  const [formData, setFormData] = useState({
    coverImage: "",
    collectionUrl: "",
    projectName: "",
    fullWidth: false,
  });

  useEffect(() => {
    if (editingProject) {
      setFormData(editingProject);
    }
  }, [editingProject]);

  const handleChange = (name, value) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = editingProject ? `/api/projects/${editingProject._id}` : "/api/projects";
      const method = editingProject ? "PUT" : "POST";

      const response = await fetch(url, {
        method: method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setFormData({ coverImage: "", collectionUrl: "", projectName: "", fullWidth: false });
        onProjectAdded();
        setEditingProject(null);
        toast.success(editingProject ? 'Project updated successfully!' : 'Project added successfully!');
      } else {
        const errorData = await response.json();
        toast.error(`Failed to ${editingProject ? 'update' : 'add'} project: ${errorData.error}`);
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error(`An error occurred while ${editingProject ? 'updating' : 'adding'} the project`);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="flex space-x-4">
        <div className="w-1/3">
          {formData.coverImage && (
            <Image
              src={formData.coverImage}
              alt="Cover Image Preview"
              width={200}
              height={200}
              objectFit="cover"
            />
          )}
        </div>
        <div className="w-2/3 space-y-4">
          <Input
            label="Cover Image URL"
            placeholder="Enter cover image URL"
            value={formData.coverImage}
            onChange={(e) => handleChange("coverImage", e.target.value)}
            fullWidth
            required
          />
          <Input
            label="Collection URL"
            placeholder="Enter collection URL"
            value={formData.collectionUrl}
            onChange={(e) => handleChange("collectionUrl", e.target.value)}
            fullWidth
            required
          />
          <Input
            label="Project Name"
            placeholder="Enter project name"
            value={formData.projectName}
            onChange={(e) => handleChange("projectName", e.target.value)}
            fullWidth
            required
          />
          <div className="flex items-center">
            <input
              type="checkbox"
              id="fullWidth"
              checked={formData.fullWidth}
              onChange={(e) => handleChange("fullWidth", e.target.checked)}
              className="mr-2"
            />
            <label htmlFor="fullWidth">Full Width</label>
          </div>
        </div>
      </div>
      <Button type="submit" color="primary">
        {editingProject ? 'Update Project' : 'Add Project'}
      </Button>
      {editingProject && (
        <Button color="secondary" onClick={() => setEditingProject(null)}>
          Cancel Edit
        </Button>
      )}
    </form>
  );
};

export default AddProjectCard;