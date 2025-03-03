import { Button, Spinner } from "@heroui/react";

const ProjectFormButtons = ({ isLoading, buttonLoading, editingProject, handleCancelEdit }) => {
  return (
    <div className="flex space-x-4 mt-6">
      <Button type="submit" color="primary" disabled={isLoading || buttonLoading !== null}>
        {buttonLoading === 'submit' ? <Spinner size="sm" /> : (editingProject ? 'Update Project' : 'Add Project')}
      </Button>
      {editingProject && (
        <Button color="secondary" onClick={handleCancelEdit} disabled={isLoading || buttonLoading !== null}>
          {buttonLoading === 'cancel' ? <Spinner size="sm" /> : 'Cancel Edit'}
        </Button>
      )}
    </div>
  );
};

export default ProjectFormButtons;