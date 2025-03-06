import { memo } from "react";
import { Button, Tooltip, Chip } from "@heroui/react";
import { Pencil, Trash2, GripVertical, ExternalLink, LayoutIcon, Calendar } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const CarouselCard = ({ 
  image, 
  onEdit, 
  onDelete, 
  deletingId, 
  isDragged,
  onDragStart,
  onDragEnd,
  onDragOver,
  index,
  draggable = false
}) => {
  return (
    <div
      draggable={draggable}
      onDragStart={(e) => onDragStart?.(e, index)}
      onDragEnd={onDragEnd}
      onDragOver={(e) => onDragOver?.(e, index)}
      className={`
        bg-white rounded-xl border-2 relative 
        cursor-grab active:cursor-grabbing
        hover:border-blue-400 hover:shadow-lg
        border-gray-200 shadow-md p-6 
        transition-all duration-300 transform
        ${isDragged ? 'opacity-50 scale-105 border-blue-500 z-50 shadow-xl' : ''}
      `}
    >
      <div className="space-y-4">
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-2 flex-grow group">
            <GripVertical 
              size={16} 
              className="text-gray-400 group-hover:text-blue-500 transition-colors duration-200" 
            />
            <h3 className="text-lg font-semibold truncate">{image.info || image.title || 'Untitled'}</h3>
          </div>
          <div className="flex items-center gap-2 flex-shrink-0">
            <Tooltip content="Edit Image">
              <Button
                isIconOnly
                size="sm"
                variant="light"
                onPress={() => onEdit(image)}
                className="text-blue-500 hover:bg-blue-50"
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
                className="text-red-500 hover:bg-red-50"
              >
                <Trash2 size={16} />
              </Button>
            </Tooltip>
          </div>
        </div>
        
        <div className="relative w-full aspect-[16/9] rounded-lg overflow-hidden border border-gray-100 bg-gray-50 group">
          <div className="absolute top-2 right-2 z-10">
            <Chip
              variant="flat"
              size="sm"
              className="bg-white text-black shadow-sm"
            >
              Order {image.order || index + 1}
            </Chip>
          </div>
          {image.url ? (
            <>
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-200" />
              <Image
                src={image.url}
                alt={image.info || image.title || 'Carousel Image'}
                fill
                className="object-cover transition-transform duration-200 group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                priority={false}
                loading="lazy"
              />
            </>
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
                className="hover:bg-blue-100 transition-colors duration-200"
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
            className="hover:bg-orange-100 transition-colors duration-200"
          >
            {image.fullWidth ? "Full Width" : "Standard"}
          </Chip>
          <Chip
            variant="flat"
            color="success"
            size="sm"
            startContent={<Calendar size={14} />}
            className="hover:bg-green-100 transition-colors duration-200"
          >
            {new Date(image.createdAt).toLocaleDateString()}
          </Chip>
        </div>
      </div>
    </div>
  );
};

export default memo(CarouselCard); 