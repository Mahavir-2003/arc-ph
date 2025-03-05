import { useState, useEffect, useMemo } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
  Input,
  Button,
  Switch,
} from "@heroui/react";
import { Search, GripVertical } from "lucide-react";
import { useToast } from "../hooks/useToast";
import DraggableProjectList from "./DraggableProjectList";

const ProjectList = ({ projects, onProjectUpdated, setEditingProject }) => {
  const [deletingId, setDeletingId] = useState(null);
  const [projectToDelete, setProjectToDelete] = useState(null);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredProjects, setFilteredProjects] = useState(projects);
  const [isEditMode, setIsEditMode] = useState(false);

  const showToast = useToast();

  useEffect(() => {
    if (!projects) return;

    const results = projects.filter((project) =>
      project.projectName.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredProjects(results);
  }, [searchTerm, projects]);

  // Memoize the filtered projects to prevent unnecessary re-renders
  const currentFilteredProjects = useMemo(() => {
    if (!filteredProjects) return [];
    return filteredProjects;
  }, [filteredProjects]);

  const handleDeleteClick = (project) => {
    setProjectToDelete(project);
    onOpen();
  };

  const handleDelete = async () => {
    if (!projectToDelete) return;

    setDeletingId(projectToDelete._id);
    onOpenChange(false);

    try {
      const response = await fetch(`/api/projects/${projectToDelete._id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        onProjectUpdated();
        showToast("Project deleted successfully", "success");
      } else {
        const errorData = await response.json();
        showToast(`Failed to delete project: ${errorData.error}`, "error");
      }
    } catch (error) {
      console.error("Error:", error);
      showToast("An error occurred while deleting the project", "error");
    } finally {
      setDeletingId(null);
      setProjectToDelete(null);
    }
  };

  const handleReorder = async (reorderedProjects) => {
    try {
      const response = await fetch("/api/projects/reorder", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ projects: reorderedProjects }),
      });

      if (!response.ok) {
        throw new Error("Failed to update project order");
      }

      onProjectUpdated();
    } catch (error) {
      console.error("Error reordering projects:", error);
      throw error;
    }
  };

  return (
    <div className="flex flex-col h-full">
      <div className="sticky top-0 bg-white z-10 pb-4">
        <div className="flex items-center gap-4">
          <div className="flex-1">
            <Input
              clearable
              contentLeft={<Search size={16} />}
              placeholder="Search projects..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              variant="bordered"
            />
          </div>
          <div className="flex items-center gap-2 flex-shrink-0">
            <Switch
              size="sm"
              isSelected={isEditMode}
              onValueChange={setIsEditMode}
              aria-label="Toggle drag mode"
              startContent={
                <GripVertical
                  size={14}
                  className={isEditMode ? "text-white" : "text-gray-400"}
                />
              }
            >
              Drag
            </Switch>
          </div>
        </div>
      </div>
      <div className="flex-grow overflow-auto">
        <DraggableProjectList
          projects={currentFilteredProjects}
          onReorder={handleReorder}
          onEdit={setEditingProject}
          onDelete={handleDeleteClick}
          deletingId={deletingId}
          isEditMode={isEditMode}
        />
      </div>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} className="inter">
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Confirm Deletion
              </ModalHeader>
              <ModalBody>
                <p>
                  Are you sure you want to delete the project &#34;
                  {projectToDelete?.projectName}&#34;? This action cannot be
                  undone.
                </p>
              </ModalBody>
              <ModalFooter>
                <Button color="default" variant="light" onPress={onClose}>
                  Cancel
                </Button>
                <Button color="danger" onPress={handleDelete}>
                  Delete
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
};

export default ProjectList;
