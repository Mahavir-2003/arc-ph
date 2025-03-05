import { useState, useRef, useEffect } from 'react';
import { useToast } from "../hooks/useToast";
import ProjectCard from './ProjectCard';

const DraggableProjectList = ({ 
  projects, 
  onReorder, 
  onEdit, 
  onDelete, 
  deletingId,
  isEditMode 
}) => {
  const showToast = useToast();
  const [draggedIndex, setDraggedIndex] = useState(null);
  const [localProjects, setLocalProjects] = useState(projects);
  const reorderTimeoutRef = useRef(null);

  useEffect(() => {
    if (!isEditMode) {
      setDraggedIndex(null);
    }
  }, [isEditMode]);

  useEffect(() => {
    if (JSON.stringify(projects) !== JSON.stringify(localProjects) && !draggedIndex) {
      setLocalProjects(projects);
    }
  }, [projects, localProjects, draggedIndex]);

  const handleDragStart = (e, index) => {
    if (!isEditMode) return;
    setDraggedIndex(index);
    e.dataTransfer.effectAllowed = 'move';
    e.target.classList.add('opacity-50');
  };

  const handleDragEnd = (e) => {
    e?.target?.classList?.remove('opacity-50');
    if (!isEditMode) {
      setDraggedIndex(null);
      return;
    }
  };

  const handleDragOver = (e, index) => {
    e.preventDefault();
    if (!isEditMode || draggedIndex === null || draggedIndex === index) return;

    const items = Array.from(localProjects);
    const [draggedItem] = items.splice(draggedIndex, 1);
    items.splice(index, 0, draggedItem);

    // Update order numbers
    const updatedItems = items.map((item, idx) => ({
      ...item,
      order: idx + 1
    }));

    setLocalProjects(updatedItems);
    setDraggedIndex(index);

    // Debounce the API call
    if (reorderTimeoutRef.current) {
      clearTimeout(reorderTimeoutRef.current);
    }

    reorderTimeoutRef.current = setTimeout(async () => {
      try {
        await onReorder(updatedItems);
        showToast('Order updated', 'success');
      } catch (error) {
        console.error('Error updating order:', error);
        showToast('Failed to update order', 'error');
        setLocalProjects(projects);
      }
    }, 500);
  };

  const ProjectList = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-4">
      {localProjects.map((project, index) => (
        <ProjectCard
          key={project._id}
          project={project}
          index={index}
          onEdit={onEdit}
          onDelete={onDelete}
          deletingId={deletingId}
        />
      ))}
    </div>
  );

  if (!isEditMode) {
    return <ProjectList />;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-4">
      {localProjects.map((project, index) => (
        <ProjectCard
          key={project._id}
          project={project}
          index={index}
          onEdit={onEdit}
          onDelete={onDelete}
          deletingId={deletingId}
          isDraggable={isEditMode}
          onDragStart={handleDragStart}
          onDragEnd={handleDragEnd}
          onDragOver={handleDragOver}
        />
      ))}
    </div>
  );
};

export default DraggableProjectList; 