import { Input, Checkbox } from "@nextui-org/react";

const ProjectFormInputs = ({ formData, handleChange }) => {
  return (
    <div className="w-full md:w-2/3 space-y-4">
      <Input
        label="Cover Image URL"
        placeholder="Enter cover image URL"
        value={formData.coverImage}
        onChange={(e) => handleChange("coverImage", e.target.value)}
        fullWidth
        required
        variant="bordered"
        className="break-words"
      />
      <Input
        label="Collection URL"
        placeholder="Enter collection URL"
        value={formData.collectionUrl}
        onChange={(e) => handleChange("collectionUrl", e.target.value)}
        fullWidth
        required
        variant="bordered"
        className="break-words"
      />
      <Input
        label="Project Name"
        placeholder="Enter project name"
        value={formData.projectName}
        onChange={(e) => handleChange("projectName", e.target.value)}
        fullWidth
        required
        variant="bordered"
        className="break-words"
      />
      <Checkbox
        isSelected={formData.fullWidth}
        onValueChange={(isChecked) => handleChange("fullWidth", isChecked)}
      >
        Full Width
      </Checkbox>
    </div>
  );
};

export default ProjectFormInputs;