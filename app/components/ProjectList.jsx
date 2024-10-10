import { useState, useEffect } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
  Input,
  Pagination,
  Button,
} from "@nextui-org/react";
import { Search } from "lucide-react";
import { useToast } from "../hooks/useToast";
import ProjectCard from "./ProjectCard";

const ProjectList = ({ projects, onProjectUpdated, setEditingProject }) => {
  const [deletingId, setDeletingId] = useState(null);
  const [projectToDelete, setProjectToDelete] = useState(null);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredProjects, setFilteredProjects] = useState(projects);
  const [currentPage, setCurrentPage] = useState(1);
  const projectsPerPage = 2;

  const showToast = useToast();

  useEffect(() => {
    const results = projects.filter((project) =>
      project.projectName.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredProjects(results);
    setCurrentPage(1);
  }, [searchTerm, projects]);

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
        showToast("Project deleted successfully", 'success');
      } else {
        const errorData = await response.json();
        showToast(`Failed to delete project: ${errorData.error}`, 'error');
      }
    } catch (error) {
      console.error("Error:", error);
      showToast("An error occurred while deleting the project", 'error');
    } finally {
      setDeletingId(null);
      setProjectToDelete(null);
    }
  };

  const indexOfLastProject = currentPage * projectsPerPage;
  const indexOfFirstProject = indexOfLastProject - projectsPerPage;
  const currentProjects = filteredProjects.slice(indexOfFirstProject, indexOfLastProject);

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <Input
        clearable
        contentLeft={<Search size={16} />}
        placeholder="Search projects..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="mb-4"
        variant="bordered"
      />
      {currentProjects.map((project) => (
        <ProjectCard
          key={project._id}
          project={project}
          onEdit={setEditingProject}
          onDelete={handleDeleteClick}
          deletingId={deletingId}
        />
      ))}
      <Pagination
        total={Math.ceil(filteredProjects.length / projectsPerPage)}
        page={currentPage}
        onChange={setCurrentPage}
        className="mt-4"
      />
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