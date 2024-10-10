import { useState, useEffect } from "react";
import { Image } from "@nextui-org/react";
import { useToast } from "../hooks/useToast";
import ProjectFormInputs from "./ProjectFormInputs";
import ProjectFormButtons from "./ProjectFormButtons";

const AddProjectCard = ({ onProjectSubmit, editingProject, setEditingProject, setHighlightDocs }) => {
  const [formData, setFormData] = useState({
    coverImage: "",
    collectionUrl: "",
    projectName: "",
    fullWidth: false,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [buttonLoading, setButtonLoading] = useState(null);
  const showToast = useToast();

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

  const validateCloudinaryLinks = (collectionUrl, coverImage) => {
    const collectionRegex = /^https:\/\/collection\.cloudinary\.com\/[a-zA-Z0-9-]+\/[a-f0-9]{32}$/;
    const resRegex = /^https:\/\/res\.cloudinary\.com\/[a-zA-Z0-9-]+\/image\/upload\/.+$/;
    
    if (!collectionRegex.test(collectionUrl)) {
      showToast('Invalid Cloudinary collection URL. Please check the documentation and try again.', 'error');
      setHighlightDocs(true);
      setTimeout(() => setHighlightDocs(false), 5000);
      return false;
    }
    
    if (!resRegex.test(coverImage)) {
      showToast('Invalid Cloudinary image URL. Please check the documentation and try again.', 'error');
      setHighlightDocs(true);
      setTimeout(() => setHighlightDocs(false), 5000);
      return false;
    }
    
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateCloudinaryLinks(formData.collectionUrl, formData.coverImage)) {
      return;
    }
    setIsLoading(true);
    setButtonLoading('submit');
    try {
      await onProjectSubmit(formData);
      resetForm();
      setEditingProject(null);
      showToast(editingProject ? 'Project updated successfully!' : 'Project added successfully!', 'success');
    } catch (error) {
      console.error("Error:", error);
      showToast(`An error occurred while ${editingProject ? 'updating' : 'adding'} the project`, 'error');
    } finally {
      setIsLoading(false);
      setButtonLoading(null);
    }
  };

  const handleCancelEdit = () => {
    setButtonLoading('cancel');
    setEditingProject(null);
    setButtonLoading(null);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="flex flex-col md:flex-row md:space-x-6">
        <div className="w-full md:w-1/3 mb-4 md:mb-0">
          {formData.coverImage && (
            <Image
              src={formData.coverImage}
              alt="Cover Image Preview"
              width={300}
              height={200}
              className="rounded-lg object-cover"
            />
          )}
        </div>
        <ProjectFormInputs formData={formData} handleChange={handleChange} />
      </div>
      <ProjectFormButtons
        isLoading={isLoading}
        buttonLoading={buttonLoading}
        editingProject={editingProject}
        handleCancelEdit={handleCancelEdit}
      />
    </form>
  );
};

export default AddProjectCard;