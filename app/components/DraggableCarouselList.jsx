import { useState, useRef } from "react";
import CarouselCard from "./CarouselCard";

const DraggableCarouselList = ({
  images,
  onReorder,
  onDelete,
  onEdit,
  deletingId,
  isEditMode,
}) => {
  const [draggedIndex, setDraggedIndex] = useState(null);
  const reorderTimeoutRef = useRef(null);

  const handleDragStart = (e, index) => {
    if (!isEditMode) return;
    setDraggedIndex(index);
    e.dataTransfer.effectAllowed = "move";
    e.target.classList.add("opacity-50");
  };

  const handleDragEnd = (e) => {
    e?.target?.classList?.remove("opacity-50");
    if (!isEditMode) {
      setDraggedIndex(null);
      return;
    }
  };

  const handleDragOver = (e, index) => {
    e.preventDefault();
    if (!isEditMode || draggedIndex === null || draggedIndex === index) return;

    const items = Array.from(images);
    const [draggedItem] = items.splice(draggedIndex, 1);
    items.splice(index, 0, draggedItem);

    const updatedItems = items.map((item, idx) => ({
      ...item,
      order: idx + 1,
    }));

    if (reorderTimeoutRef.current) {
      clearTimeout(reorderTimeoutRef.current);
    }

    reorderTimeoutRef.current = setTimeout(() => onReorder(updatedItems), 500);
    setDraggedIndex(index);
  };

  const CarouselList = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-4">
      {images.map((image, index) => (
        <CarouselCard
          key={image._id}
          image={image}
          onEdit={onEdit}
          onDelete={onDelete}
          deletingId={deletingId}
          index={index}
        />
      ))}
    </div>
  );

  if (!isEditMode) {
    return <CarouselList />;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-4">
      {images.map((image, index) => (
        <CarouselCard
          key={image._id}
          image={image}
          onEdit={onEdit}
          onDelete={onDelete}
          deletingId={deletingId}
          isDraggable={isEditMode}
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