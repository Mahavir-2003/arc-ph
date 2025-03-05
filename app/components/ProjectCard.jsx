import { Button, Tooltip, Chip } from "@heroui/react";
import { Pencil, Trash2, GripVertical, ExternalLink, LayoutIcon, Calendar } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const ProjectCard = ({ 
  project, 
  onEdit, 
  onDelete, 
  deletingId, 
  isDraggable,
  onDragStart,
  onDragEnd,
  onDragOver,
  index 
}) => {
  return (
    <div
      draggable={isDraggable}
      onDragStart={(e) => onDragStart?.(e, index)}
      onDragEnd={() => onDragEnd?.()}
      onDragOver={(e) => onDragOver?.(e, index)}
      className={`bg-white rounded-xl border-2 relative ${
        isDraggable ? 'cursor-grab active:cursor-grabbing hover:border-blue-400' : ''
      } ${isDraggable ? 'border-blue-200' : 'border-gray-200'} shadow-md p-6 transition-all duration-300 transform`}
    >
      <div className="space-y-4">
        <div className="flex items-center justify-between gap-2">
          <h3 className="text-lg font-semibold truncate flex-grow">{project.projectName}</h3>
          <div className="flex items-center gap-2 flex-shrink-0">
            <Tooltip content="Edit Project">
              <Button
                isIconOnly
                size="sm"
                variant="light"
                onPress={() => onEdit(project)}
                className="text-blue-500"
              >
                <Pencil size={16} />
              </Button>
            </Tooltip>
            <Tooltip content="Delete Project">
              <Button
                isIconOnly
                size="sm"
                variant="light"
                onPress={() => onDelete(project)}
                isLoading={deletingId === project._id}
                className="text-red-500"
              >
                <Trash2 size={16} />
              </Button>
            </Tooltip>
          </div>
        </div>
        
        <div className="relative w-full aspect-[16/9] rounded-lg overflow-hidden border border-gray-100 bg-gray-50">
          {isDraggable && (
            <div className="absolute top-2 right-2 z-10">
              <Chip
                variant="flat"
                size="sm"
                className="bg-white text-black shadow-sm"
              >
                Order {project.order || index + 1}
              </Chip>
            </div>
          )}
          <Image
            src={project.coverImage}
            alt={project.projectName}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            priority={false}
            loading="lazy"
          />
        </div>

        <div className="flex flex-wrap gap-2">
          <Link
            href={project.collectionUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Chip
              variant="flat"
              color="primary"
              size="sm"
              startContent={<ExternalLink size={14} />}
            >
              View Collection
            </Chip>
          </Link>
          <Chip
            variant="flat"
            color="warning"
            size="sm"
            startContent={<LayoutIcon size={14} />}
          >
            {project.fullWidth ? "Full Width" : "Standard"}
          </Chip>
          <Chip
            variant="flat"
            color="success"
            size="sm"
            startContent={<Calendar size={14} />}
          >
            {new Date(project.createdAt).toLocaleDateString()}
          </Chip>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;