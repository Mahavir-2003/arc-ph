import FormField from "./FormField";

const ProjectFormInputs = ({ formData, onChange }) => {
  return (
    <div className="space-y-4">
      <FormField
        label="Project Name"
        type="text"
        value={formData.projectName}
        onChange={(e) => onChange("projectName", e.target.value)}
        required
      />
      <FormField
        label="Collection URL"
        type="url"
        value={formData.collectionUrl}
        onChange={(e) => onChange("collectionUrl", e.target.value)}
        required
      />
      <FormField
        label="Cover Image URL"
        type="url"
        value={formData.coverImage}
        onChange={(e) => onChange("coverImage", e.target.value)}
        required
      />
      <FormField
        label="Display Order"
        type="number"
        min={1}
        value={formData.order}
        onChange={(e) => {
          const value = parseInt(e.target.value);
          if (value >= 1) {
            onChange("order", value);
          }
        }}
        required
        helperText="Enter the display order number"
      />
    </div>
  );
};

export default ProjectFormInputs;