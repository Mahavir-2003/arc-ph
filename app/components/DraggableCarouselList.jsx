import { useState, useRef, useCallback } from "react";
import CarouselCard from "./CarouselCard";
import debounce from "lodash/debounce";

const DraggableCarouselList = ({
  images,
  onReorder,
  onDelete,
  onEdit,
  deletingId,
  isEditMode,
}) => {
  const [draggedIndex, setDraggedIndex] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const reorderTimeoutRef = useRef(null);
  const dragStateRef = useRef({
    draggedIndex: null,
    currentIndex: null,
  });

  const debouncedReorder = useCallback(
    debounce((items) => {
      onReorder(items);
    }, 1000),
    [onReorder]
  );

  const handleDragStart = (e, index) => {
    if (!isEditMode) return;
    setIsDragging(true);
    setDraggedIndex(index);
    dragStateRef.current.draggedIndex = index;
    e.dataTransfer.effectAllowed = "move";
    e.target.classList.add("opacity-50");
  };

  const handleDragEnd = (e) => {
    e?.target?.classList?.remove("opacity-50");
    setIsDragging(false);
    setDraggedIndex(null);
    dragStateRef.current.draggedIndex = null;
    dragStateRef.current.currentIndex = null;
  };

  const handleDragOver = (e, index) => {
    e.preventDefault();
    if (!isEditMode || !isDragging || dragStateRef.current.draggedIndex === index) return;

    dragStateRef.current.currentIndex = index;
    const items = Array.from(images);
    const [draggedItem] = items.splice(dragStateRef.current.draggedIndex, 1);
    items.splice(index, 0, draggedItem);

    const updatedItems = items.map((item, idx) => ({
      ...item,
      order: idx + 1,
    }));

    if (reorderTimeoutRef.current) {
      clearTimeout(reorderTimeoutRef.current);
    }

    reorderTimeoutRef.current = setTimeout(() => {
      debouncedReorder(updatedItems);
    }, 500);

    setDraggedIndex(index);
    dragStateRef.current.draggedIndex = index;
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
          isDragging={isDragging}
          isDragged={index === draggedIndex}
        />
      ))}
    </div>
  );
};

export default DraggableCarouselList; 