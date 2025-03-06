import { useState, useEffect } from "react";
import { Input, Button, Image, Tooltip } from "@heroui/react";
import { Plus, Info } from "lucide-react";
import { useToast } from "../hooks/useToast";

const CarouselForm = ({ onImageAdded, images = [], editingImage = null, setEditingImage }) => {
  const [formData, setFormData] = useState({
    url: "",
    title: "",
    info: "",
    order: 1
  });
  const [isLoading, setIsLoading] = useState(false);
  const [isTooltipOpen, setIsTooltipOpen] = useState(false);
  const showToast = useToast();

  // Set initial form data when editing or calculate next order
  useEffect(() => {
    if (editingImage) {
      setFormData(editingImage);
    } else {
      // Find the highest order number
      const maxOrder = images.length > 0 
        ? Math.max(...images.map(img => img.order || 0))
        : 0;
      setFormData(prev => ({
        ...prev,
        order: maxOrder + 1
      }));
    }
  }, [editingImage, images]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const newOrder = parseInt(formData.order);
      const oldOrder = editingImage?.order;
      
      // Get all images excluding the current one being edited
      const otherImages = images.filter(img => img._id !== editingImage?._id);
      
      // Reorder other images based on the new order
      const reorderedImages = otherImages.map(img => {
        if (editingImage) {
          // When editing
          if (newOrder > oldOrder) {
            // Moving down: decrease order of images between old and new position
            if (img.order > oldOrder && img.order <= newOrder) {
              return { ...img, order: img.order - 1 };
            }
          } else if (newOrder < oldOrder) {
            // Moving up: increase order of images between new and old position
            if (img.order >= newOrder && img.order < oldOrder) {
              return { ...img, order: img.order + 1 };
            }
          }
        } else {
          // When adding new: increase order of all images at or after the insertion point
          if (img.order >= newOrder) {
            return { ...img, order: img.order + 1 };
          }
        }
        return img;
      });

      // First update other images if needed
      if (reorderedImages.some(img => img.order !== images.find(i => i._id === img._id)?.order)) {
        const reorderResponse = await fetch("/api/carousel/reorder", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ images: reorderedImages }),
        });

        if (!reorderResponse.ok) {
          throw new Error("Failed to reorder images");
        }
      }

      // Then add/update the current image
      const submitData = {
        ...formData,
        order: newOrder
      };

      const url = editingImage ? `/api/carousel/${editingImage._id}` : "/api/carousel";
      const method = editingImage ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(submitData),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || `Failed to ${editingImage ? 'update' : 'add'} image`);
      }

      showToast(`Image ${editingImage ? 'updated' : 'added'} successfully`, "success");
      setFormData({ url: "", title: "", info: "", order: 1 });
      setEditingImage(null);
      onImageAdded();
    } catch (error) {
      console.error("Error with image:", error);
      showToast(error.message || `Failed to ${editingImage ? 'update' : 'add'} image`, "error");
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancelEdit = () => {
    setEditingImage(null);
  };

  const tooltipContent = (
    <div className="p-3 sm:p-5 inter rounded-lg max-w-md">
      <h3 className="text-emerald-800 font-semibold mb-2 sm:mb-4 text-base sm:text-lg">
        Image Preview Notice
      </h3>
      <p className="text-emerald-700 text-sm sm:text-base">
        This is a preview. The actual image will be displayed in full
        orientation.
      </p>
    </div>
  );

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="w-full mb-6 relative">
        {formData.url ? (
          <div className="relative h-64 md:h-80 lg:h-96 rounded-lg overflow-hidden group">
            <Image
              src={formData.url}
              alt="Image Preview"
              className="rounded-lg object-cover w-full h-full"
            />
            <Tooltip
              content={tooltipContent}
              placement="bottom"
              isOpen={isTooltipOpen}
              onOpenChange={(open) => setIsTooltipOpen(open)}
            >
              <button
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  setIsTooltipOpen(!isTooltipOpen);
                }}
                className="absolute top-2 right-2 z-50 p-2 bg-emerald-200 rounded-full"
                aria-label="Image Preview Notice"
              >
                <Info size={24} color="green" />
              </button>
            </Tooltip>
          </div>
        ) : (
          <div className="h-64 md:h-80 lg:h-96 bg-gray-200 rounded-lg flex items-center justify-center">
            <p className="text-gray-500 text-lg">No image preview</p>
          </div>
        )}
      </div>

      <div className="space-y-4">
        <Input
          label="Image URL"
          placeholder="Enter image URL"
          value={formData.url}
          onChange={(e) =>
            setFormData({ ...formData, url: e.target.value })
          }
          required
          variant="bordered"
        />
        <Input
          label="Title"
          placeholder="Enter title"
          value={formData.title}
          onChange={(e) =>
            setFormData({ ...formData, title: e.target.value })
          }
          required
          variant="bordered"
        />
        <Input
          label="Info"
          placeholder="Enter info"
          value={formData.info}
          onChange={(e) =>
            setFormData({ ...formData, info: e.target.value })
          }
          required
          variant="bordered"
        />
        <Input
          type="number"
          label="Display Order"
          placeholder="Enter display order"
          value={formData.order}
          min={1}
          max={images.length + 1}
          onChange={(e) => {
            const value = parseInt(e.target.value);
            if (value >= 1 && value <= images.length + 1) {
              setFormData({ ...formData, order: value });
            }
          }}
          required
          variant="bordered"
          helperText={`Enter a number between 1 and ${images.length + 1}`}
        />
      </div>

      <div className="flex gap-4">
        <Button
          color="primary"
          type="submit"
          isLoading={isLoading}
          className="flex-1"
          startContent={!editingImage && <Plus size={20} />}
        >
          {editingImage ? 'Update Image' : 'Add Image'}
        </Button>
        {editingImage && (
          <Button
            color="default"
            variant="light"
            onPress={handleCancelEdit}
            className="flex-1"
          >
            Cancel
          </Button>
        )}
      </div>
    </form>
  );
};

export default CarouselForm; 