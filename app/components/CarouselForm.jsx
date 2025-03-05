import { useState } from "react";
import { Input, Button, Image, Tooltip } from "@heroui/react";
import { Plus, Info } from "lucide-react";
import { useToast } from "../hooks/useToast";

const CarouselForm = ({ onImageAdded, images }) => {
  const [formData, setFormData] = useState({
    url: "",
    title: "",
    info: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [isTooltipOpen, setIsTooltipOpen] = useState(false);
  const showToast = useToast();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Calculate the next order number
      const maxOrder = images?.length ? Math.max(...images.map(img => img.number || 0)) : 0;
      const submitData = {
        ...formData,
        number: maxOrder + 1
      };

      const response = await fetch("/api/carousel", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(submitData),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "Failed to add image");
      }

      showToast("Image added successfully", "success");
      setFormData({ url: "", title: "", info: "" });
      onImageAdded();
    } catch (error) {
      console.error("Error adding image:", error);
      showToast(error.message || "Failed to add image", "error");
    } finally {
      setIsLoading(false);
    }
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
      </div>

      <Button
        color="primary"
        type="submit"
        isLoading={isLoading}
        className="w-full"
        startContent={<Plus size={20} />}
      >
        Add Image
      </Button>
    </form>
  );
};

export default CarouselForm; 