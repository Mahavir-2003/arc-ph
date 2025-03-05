import { Button, Tooltip, Chip } from "@heroui/react";
import { Pencil, Trash2, GripVertical, ExternalLink, LayoutIcon, Calendar } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const CarouselCard = ({ 
  image, 
  onEdit, 
  onDelete, 
  deletingId, 
  isDraggable,
  onDragStart,
  onDragEnd,
  onDragOver,
  index,
  isDragging,
  isDragged,
}) => {
  return (
    <div
      draggable={isDraggable}
      onDragStart={(e) => onDragStart?.(e, index)}
      onDragEnd={onDragEnd}
      onDragOver={(e) => onDragOver?.(e, index)}
      className={`bg-white rounded-xl border-2 relative ${
        isDraggable ? 'cursor-grab active:cursor-grabbing hover:border-blue-400' : ''
      } ${isDraggable ? 'border-blue-200' : 'border-gray-200'} shadow-md p-6 transition-all duration-300 transform ${
        isDragged ? 'opacity-50 scale-105' : ''
      }`}
    >
      <div className="space-y-4">
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-2 flex-grow">
            {isDraggable && (
              <GripVertical size={16} className="text-gray-400" />
            )}
            <h3 className="text-lg font-semibold truncate">{image.info || image.title || 'Untitled'}</h3>
          </div>
          <div className="flex items-center gap-2 flex-shrink-0">
            <Tooltip content="Edit Image">
              <Button
                isIconOnly
                size="sm"
                variant="light"
                onPress={() => onEdit(image)}
                className="text-blue-500"
              >
                <Pencil size={16} />
              </Button>
            </Tooltip>
            <Tooltip content="Delete Image">
              <Button
                isIconOnly
                size="sm"
                variant="light"
                onPress={() => onDelete(image)}
                isLoading={deletingId === image._id}
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
                Order {image.order || index + 1}
              </Chip>
            </div>
          )}
          {image.url ? (
            <Image
              src={image.url}
              alt={image.info || image.title || 'Carousel Image'}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              priority={false}
              loading="lazy"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gray-100">
              <span className="text-gray-400">No image available</span>
            </div>
          )}
        </div>

        <div className="flex flex-wrap gap-2">
          {image.url && (
            <Link
              href={image.url}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Chip
                variant="flat"
                color="primary"
                size="sm"
                startContent={<ExternalLink size={14} />}
              >
                View Image
              </Chip>
            </Link>
          )}
          <Chip
            variant="flat"
            color="warning"
            size="sm"
            startContent={<LayoutIcon size={14} />}
          >
            {image.fullWidth ? "Full Width" : "Standard"}
          </Chip>
          <Chip
            variant="flat"
            color="success"
            size="sm"
            startContent={<Calendar size={14} />}
          >
            {new Date(image.createdAt).toLocaleDateString()}
          </Chip>
        </div>
      </div>
    </div>
  );
};

export default CarouselCard; 