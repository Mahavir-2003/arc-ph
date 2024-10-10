import { useState, useEffect } from "react";
import { Image, Tooltip } from "@nextui-org/react";
import { useToast } from "../hooks/useToast";
import ProjectFormInputs from "./ProjectFormInputs";
import ProjectFormButtons from "./ProjectFormButtons";
import { Info } from "lucide-react";

const AddProjectCard = ({
  onProjectSubmit,
  editingProject,
  setEditingProject,
  setHighlightDocs,
}) => {
  const [formData, setFormData] = useState({
    coverImage: "",
    collectionUrl: "",
    projectName: "",
    fullWidth: false,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [buttonLoading, setButtonLoading] = useState(null);
  const [isTooltipOpen, setIsTooltipOpen] = useState(false);
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
    const collectionRegex =
      /^https:\/\/collection\.cloudinary\.com\/[a-zA-Z0-9-]+\/[a-f0-9]{32}$/;
    const resRegex =
      /^https:\/\/res\.cloudinary\.com\/[a-zA-Z0-9-]+\/image\/upload\/.+$/;

    if (!collectionRegex.test(collectionUrl)) {
      showToast(
        "Invalid Cloudinary collection URL. Please check the documentation and try again.",
        "error"
      );
      setHighlightDocs(true);
      setTimeout(() => setHighlightDocs(false), 5000);
      return false;
    }

    if (!resRegex.test(coverImage)) {
      showToast(
        "Invalid Cloudinary image URL. Please check the documentation and try again.",
        "error"
      );
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
    setButtonLoading("submit");
    try {
      await onProjectSubmit(formData);
      resetForm();
      setEditingProject(null);
      showToast(
        editingProject
          ? "Project updated successfully!"
          : "Project added successfully!",
        "success"
      );
    } catch (error) {
      console.error("Error:", error);
      showToast(
        `An error occurred while ${
          editingProject ? "updating" : "adding"
        } the project`,
        "error"
      );
    } finally {
      setIsLoading(false);
      setButtonLoading(null);
    }
  };

  const handleCancelEdit = () => {
    setButtonLoading("cancel");
    setEditingProject(null);
    setButtonLoading(null);
  };

  const tooltipContent = (
    <div className="p-3 sm:p-5 inter rounded-lg max-w-md">
      <h3 className="text-emerald-800 font-semibold mb-2 sm:mb-4 text-base sm:text-lg">
        Image Preview Notice
      </h3>
      <p className="text-emerald-700 text-sm sm:text-base">
        This is a preview. The actual image will be displayed in full
        orientation.
      </p>
    </div>
  );

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="w-full mb-6 relative">
        {formData.coverImage ? (
          <div className="relative h-64 md:h-80 lg:h-96 rounded-lg overflow-hidden group">
            <Image
              src={formData.coverImage}
              alt="Cover Image Preview"
              className="rounded-lg object-cover w-full h-full"
            />
            <Tooltip
              content={tooltipContent}
              placement="bottom"
              isOpen={isTooltipOpen}
              onOpenChange={(open) => setIsTooltipOpen(open)}
            >
              <button
                onClick={() => setIsTooltipOpen(!isTooltipOpen)}
                className="absolute top-2 right-2 z-50 p-2 bg-emerald-200 rounded-full"
                aria-label="Image Preview Notice"
              >
                <Info size={24} color="green" />
              </button>
            </Tooltip>
          </div>
        ) : (
          <div className="h-64 md:h-80 lg:h-96 bg-gray-200 rounded-lg flex items-center justify-center">
            <p className="text-gray-500 text-lg">No image preview</p>
          </div>
        )}
      </div>
      <div className="space-y-6">
        <ProjectFormInputs formData={formData} handleChange={handleChange} />
        <ProjectFormButtons
          isLoading={isLoading}
          buttonLoading={buttonLoading}
          editingProject={editingProject}
          handleCancelEdit={handleCancelEdit}
        />
      </div>
    </form>
  );
};

export default AddProjectCard;
