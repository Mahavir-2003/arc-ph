import { useState, useRef, useCallback } from "react";
import CarouselCard from "./CarouselCard";

const DraggableCarouselList = ({
  images,
  onReorder,
  onDelete,
  onEdit,
  deletingId
}) => {
  const [localImages, setLocalImages] = useState(images);
  const [draggedIndex, setDraggedIndex] = useState(null);
  const dragNodeRef = useRef(null);

  const handleDragStart = useCallback((e, index) => {
    dragNodeRef.current = e.target;
    setDraggedIndex(index);
    e.dataTransfer.effectAllowed = "move";
  }, []);

  const handleDragEnd = useCallback(async () => {
    setDraggedIndex(null);
    
    try {
      await onReorder(localImages);
    } catch (error) {
      console.error('Error updating order:', error);
      setLocalImages(images);
    }
  }, [localImages, onReorder, images]);

  const handleDragOver = useCallback((e, index) => {
    e.preventDefault();
    if (draggedIndex === null || draggedIndex === index) return;

    const items = Array.from(localImages);
    const [draggedItem] = items.splice(draggedIndex, 1);
    items.splice(index, 0, draggedItem);

    const updatedItems = items.map((item, idx) => ({
      ...item,
      order: idx + 1,
    }));

    setLocalImages(updatedItems);
    setDraggedIndex(index);
  }, [draggedIndex, localImages]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-4">
      {localImages.map((image, index) => (
        <CarouselCard
          key={image._id}
          image={image}
          onEdit={onEdit}
          onDelete={onDelete}
          deletingId={deletingId}
          isDragged={index === draggedIndex}
          onDragStart={handleDragStart}
          onDragEnd={handleDragEnd}
          onDragOver={handleDragOver}
          index={index}
        />
      ))}
    </div>
  );
};

export default DraggableCarouselList; 