import FormField from "./FormField";

const ProjectFormInputs = ({ formData, handleChange }) => {
  return (
    <div className="space-y-4">
      <FormField
        label="Project Name"
        type="text"
        name="projectName" // Make sure this matches the formData key
        value={formData.projectName}
        onChange={(e) => handleChange(e.target.name, e.target.value)}
        required
      />
      <FormField
        label="Collection URL"
        type="url"
        name="collectionUrl" // Make sure this matches the formData key
        value={formData.collectionUrl}
        onChange={(e) => handleChange(e.target.name, e.target.value)}
        required
      />
      <FormField
        label="Cover Image URL"
        type="url"
        name="coverImage" // Make sure this matches the formData key
        value={formData.coverImage}
        onChange={(e) => handleChange(e.target.name, e.target.value)}
        required
      />
      <FormField
        label="Display Order"
        type="number"
        min={1}
        name="order" // Make sure this matches the formData key
        value={formData.order}
        onChange={(e) => {
          const value = parseInt(e.target.value);
          if (value >= 1) {
            handleChange(e.target.name, e.target.value);
          }
        }}
        required
        helperText="Enter the display order number"
      />
    </div>
  );
};

export default ProjectFormInputs;