import { useState, useEffect } from "react";
import { Input, Button, Image, Spinner, Checkbox } from "@nextui-org/react";
import toast from 'react-hot-toast';

const AddProjectCard = ({ onProjectAdded, editingProject, setEditingProject }) => {
  const [formData, setFormData] = useState({
    coverImage: "",
    collectionUrl: "",
    projectName: "",
    fullWidth: false,
  });
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (editingProject) {
      setFormData(editingProject);
    } else {
      resetForm();
    }
  }, [editingProject]);

  const resetForm = () => {
    setFormData({
      coverImage: "",
      collectionUrl: "",
      projectName: "",
      fullWidth: false,
    });
  };

  const handleChange = (name, value) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
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
        resetForm();
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
    } finally {
      setIsLoading(false);
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
            variant="bordered"
          />
          <Input
            label="Collection URL"
            placeholder="Enter collection URL"
            value={formData.collectionUrl}
            onChange={(e) => handleChange("collectionUrl", e.target.value)}
            fullWidth
            required
            variant="bordered"
          />
          <Input
            label="Project Name"
            placeholder="Enter project name"
            value={formData.projectName}
            onChange={(e) => handleChange("projectName", e.target.value)}
            fullWidth
            required
            variant="bordered"
          />
          <Checkbox
            isSelected={formData.fullWidth}
            onValueChange={(isChecked) => handleChange("fullWidth", isChecked)}
          >
            Full Width
          </Checkbox>
        </div>
      </div>
      <div className="flex space-x-4 mt-4">
        <Button type="submit" color="primary" disabled={isLoading}>
          {isLoading ? <Spinner size="sm" /> : (editingProject ? 'Update Project' : 'Add Project')}
        </Button>
        {editingProject && (
          <Button color="secondary" onClick={() => setEditingProject(null)} disabled={isLoading}>
            Cancel Edit
          </Button>
        )}
      </div>
    </form>
  );
};

export default AddProjectCard;