import Image from "next/image";
import Link from "next/link";
import { Button, Spinner } from "@heroui/react";
import { Trash2, Pencil, ExternalLink, LayoutIcon, Calendar } from "lucide-react";

const ProjectCard = ({ project, onEdit, onDelete, deletingId }) => {
  return (
    <div className="bg-white rounded-lg overflow-hidden flex flex-col sm:flex-row w-full h-auto sm:h-40">
      <div className="w-full sm:w-1/3 h-48 sm:h-full relative p-2">
        <div className="relative w-full h-full rounded-lg overflow-hidden">
          <Image
            src={project.coverImage}
            alt={project.projectName}
            layout="fill"
            objectFit="cover"
          />
        </div>
      </div>
      <div className="w-full sm:w-2/3 flex flex-col justify-between p-4">
        <div className="space-y-3">
          <h3 className="text-xl font-bold text-gray-800 truncate">
            {project.projectName}
          </h3>
          <div className="flex flex-wrap gap-2">
            <Link
              href={project.collectionUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-3 py-1.5 rounded-full bg-blue-100 text-blue-800 hover:bg-blue-200 transition-all duration-300 ease-in-out transform hover:scale-105 text-sm"
            >
              <ExternalLink size={14} className="mr-1.5" />
              View Collection
            </Link>
            <span className="inline-flex items-center px-3 py-1.5 rounded-full bg-yellow-100 text-yellow-800 transition-all duration-300 ease-in-out hover:bg-yellow-200 hover:shadow-md text-sm">
              <LayoutIcon size={14} className="mr-1.5" />
              {project.fullWidth ? "Full Width" : "Standard Width"}
            </span>
            <span className="inline-flex items-center px-3 py-1.5 rounded-full bg-green-100 text-green-800 transition-all duration-300 ease-in-out hover:bg-green-200 hover:shadow-md text-sm">
              <Calendar size={14} className="mr-1.5" />
              {new Date(project.createdAt).toLocaleDateString()}
            </span>
          </div>
        </div>
        <div className="flex gap-2 items-end mt-2">
          <Button
            auto
            light
            color="primary"
            startContent={<Pencil size={16} />}
            onClick={() => onEdit(project)}
            className="text-sm px-3 py-1.5"
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
            className="text-sm px-3 py-1.5"
          >
            {deletingId === project._id ? "Deleting..." : "Delete"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;