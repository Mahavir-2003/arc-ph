import Image from "next/image";
import Link from "next/link";
import { Button, Spinner } from "@nextui-org/react";
import { Trash2, Pencil, ExternalLink, LayoutIcon, Calendar } from "lucide-react";

const ProjectCard = ({ project, onEdit, onDelete, deletingId }) => {
  return (
    <div className="bg-white rounded-lg overflow-hidden">
      <div className="flex flex-col md:flex-row md:space-x-6">
        <div className="w-full md:w-1/3 mb-4 md:mb-0">
          <Image
            src={project.coverImage}
            alt={project.projectName}
            width={300}
            height={180}
            layout="responsive"
            className="rounded-lg object-cover"
          />
        </div>
        <div className="w-full md:w-2/3 flex flex-col justify-between">
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-3xl font-bold text-gray-800">
                {project.projectName}
              </h3>
            </div>
            <div className="flex flex-col space-y-4">
              <div className="flex flex-wrap gap-2">
                <Link
                  href={project.collectionUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center px-3 py-1.5 rounded-full bg-blue-100 text-blue-800 hover:bg-blue-200 transition-all duration-300 ease-in-out transform hover:scale-105"
                >
                  <ExternalLink size={16} className="mr-2" />
                  View Collection
                </Link>
                <span className="inline-flex items-center px-3 py-1.5 rounded-full bg-gray-100 text-gray-800 transition-all duration-300 ease-in-out hover:bg-gray-200 hover:shadow-md">
                  <LayoutIcon size={16} className="mr-2" />
                  {project.fullWidth ? "Full Width" : "Standard Width"}
                </span>
                <span className="inline-flex items-center px-3 py-1.5 rounded-full bg-green-100 text-green-800 transition-all duration-300 ease-in-out hover:bg-green-200 hover:shadow-md">
                  <Calendar size={16} className="mr-2" />
                  {new Date(project.createdAt).toLocaleDateString()}
                </span>
              </div>
              <div className="flex gap-2 items-end">
                <Button
                  auto
                  light
                  color="primary"
                  startContent={<Pencil size={16} />}
                  onClick={() => onEdit(project)}
                >
                  Edit
                </Button>
                <Button
                  auto
                  light
                  color="danger"
                  startContent={
                    deletingId === project._id ? (
                      <Spinner size="sm" />
                    ) : (
                      <Trash2 size={16} />
                    )
                  }
                  onClick={() => onDelete(project)}
                  disabled={deletingId === project._id}
                >
                  {deletingId === project._id ? "Deleting..." : "Delete"}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;