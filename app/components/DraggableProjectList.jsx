import { useState, useRef, useCallback } from 'react';
import ProjectCard from './ProjectCard';

const DraggableProjectList = ({ 
  projects, 
  onReorder, 
  onEdit, 
  onDelete, 
  deletingId
}) => {
  const [localProjects, setLocalProjects] = useState(projects);
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
      await onReorder(localProjects);
    } catch (error) {
      console.error('Error updating order:', error);
      setLocalProjects(projects);
    }
  }, [localProjects, onReorder, projects]);

  const handleDragOver = useCallback((e, index) => {
    e.preventDefault();
    if (draggedIndex === null || draggedIndex === index) return;

    const items = Array.from(localProjects);
    const [draggedItem] = items.splice(draggedIndex, 1);
    items.splice(index, 0, draggedItem);

    const updatedItems = items.map((item, idx) => ({
      ...item,
      order: idx + 1
    }));

    setLocalProjects(updatedItems);
    setDraggedIndex(index);
  }, [draggedIndex, localProjects]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-4">
      {localProjects.map((project, index) => (
        <ProjectCard
          key={project._id}
          project={project}
          onEdit={onEdit}
          onDelete={onDelete}
          deletingId={deletingId}
          isDragged={index === draggedIndex}
          onDragStart={handleDragStart}
          onDragEnd={handleDragEnd}
          onDragOver={handleDragOver}
          index={index}
          draggable={true}
        />
      ))}
    </div>
  );
};

export default DraggableProjectList; 