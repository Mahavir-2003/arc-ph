import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Card, Button, Spinner } from "@nextui-org/react";
import { Trash2, Pencil } from 'lucide-react';
import toast from 'react-hot-toast';

const ProjectList = ({ projects, onProjectUpdated, setEditingProject }) => {
  const [deletingId, setDeletingId] = useState(null);

  const handleDelete = async (projectId) => {
    setDeletingId(projectId);
    try {
      const response = await fetch(`/api/projects/${projectId}`, {
        method: "DELETE",
      });

      if (response.ok) {
        onProjectUpdated();
        toast.success('Project deleted successfully');
      } else {
        const errorData = await response.json();
        toast.error(`Failed to delete project: ${errorData.error}`);
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error('An error occurred while deleting the project');
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div className="space-y-4">
      {projects.map((project) => (
        <Card key={project._id} className="p-4">
          <div className="flex space-x-4">
            <div className="w-1/3">
              <Image
                src={project.coverImage}
                alt={project.projectName}
                width={200}
                height={120}
                objectFit="cover"
              />
            </div>
            <div className="w-2/3">
              <h3 className="text-lg font-semibold">{project.projectName}</h3>
              <Link
                href={project.collectionUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline"
              >
                View Collection
              </Link>
              <p>Full Width: {project.fullWidth ? 'Yes' : 'No'}</p>
              <div className="flex justify-end mt-4 space-x-2">
                <Button
                  auto
                  light
                  color="primary"
                  icon={<Pencil size={16} />}
                  onClick={() => setEditingProject(project)}
                >
                  Edit
                </Button>
                <Button
                  auto
                  light
                  color="error"
                  icon={deletingId === project._id ? <Spinner size="sm" /> : <Trash2 size={16} />}
                  onClick={() => handleDelete(project._id)}
                  disabled={deletingId === project._id}
                >
                  {deletingId === project._id ? 'Deleting...' : 'Delete'}
                </Button>
              </div>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
};

export default ProjectList;