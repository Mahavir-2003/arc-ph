import { useState, useEffect, createContext, useContext, useCallback } from 'react';
import { Input, Button, Spinner, Card, Tooltip } from "@heroui/react";
import { useToast } from "../hooks/useToast";
import { Trash2, Pencil, Info, Search, LayoutIcon, Calendar } from "lucide-react";
import Image from 'next/image';

const CarouselContext = createContext();

const CarouselProvider = ({ children }) => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingImage, setEditingImage] = useState(null);
  const [formData, setFormData] = useState({
    url: '',
    number: '',
    info: '',
    order: 1
  });
  const showToast = useToast();

  const getNextAvailableOrder = useCallback(() => {
    const usedOrders = new Set(images.map(img => img.order));
    for (let i = 1; i <= 12; i++) {
      if (!usedOrders.has(i)) return i;
    }
    return 1;
  }, [images]);

  const fetchImages = useCallback(async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/carousel');
      if (!response.ok) throw new Error('Failed to fetch images');
      const data = await response.json();
      const sortedData = (Array.isArray(data) ? data : []).sort((a, b) => a.order - b.order);
      setImages(sortedData);
    } catch (error) {
      console.error('Failed to fetch carousel images:', error);
      showToast('Failed to fetch images', 'error');
      setImages([]);
    } finally {
      setLoading(false);
    }
  }, [showToast]);

  useEffect(() => {
    fetchImages();
  }, [fetchImages]);

  useEffect(() => {
    if (!editingImage) {
      setFormData(prev => ({
        ...prev,
        order: getNextAvailableOrder()
      }));
    }
  }, [editingImage, getNextAvailableOrder]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingImage) {
        await fetch('/api/carousel', {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ ...formData, _id: editingImage._id })
        });
        showToast('Image updated successfully', 'success');
      } else {
        await fetch('/api/carousel', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData)
        });
        showToast('Image added successfully', 'success');
      }
      fetchImages();
      resetForm();
    } catch (error) {
      showToast('Failed to save image', 'error');
    }
  };

  const handleDelete = async (id) => {
    try {
      await fetch(`/api/carousel?id=${id}`, { method: 'DELETE' });
      showToast('Image deleted successfully', 'success');
      fetchImages();
    } catch (error) {
      showToast('Failed to delete image', 'error');
    }
  };

  const handleEdit = (image) => {
    setEditingImage(image);
    setFormData(image);
  };

  const resetForm = () => {
    setFormData({
      url: '',
      number: '',
      info: '',
      order: 1
    });
    setEditingImage(null);
  };

  const value = {
    images,
    loading,
    editingImage,
    formData,
    setFormData,
    handleSubmit,
    handleDelete,
    handleEdit,
    resetForm
  };

  return (
    <CarouselContext.Provider value={value}>
      {children}
    </CarouselContext.Provider>
  );
};

const useCarousel = () => {
  const context = useContext(CarouselContext);
  if (!context) {
    throw new Error('useCarousel must be used within a CarouselProvider');
  }
  return context;
};

const Form = () => {
  const {
    editingImage,
    formData,
    setFormData,
    handleSubmit,
    resetForm
  } = useCarousel();
  const [isTooltipOpen, setIsTooltipOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (formData.order < 1 || formData.order > 12) {
      showToast('Order must be between 1 and 12', 'error');
      return;
    }
    setIsLoading(true);
    try {
      await handleSubmit(e);
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
        This is a preview. The actual image will be displayed in full orientation.
      </p>
    </div>
  );

  return (
    <form onSubmit={handleFormSubmit} className="space-y-6">
      <div className="w-full mb-6 relative">
        {formData.url ? (
          <div className="relative h-64 md:h-80 lg:h-96 rounded-lg overflow-hidden group">
            <Image
              src={formData.url}
              alt="Image Preview"
              layout="fill"
              objectFit="cover"
              className="rounded-lg"
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
      <div className="space-y-6">
        <div className="w-full md:w-2/3 space-y-4">
          <Input
            label="Image URL"
            placeholder="Enter image URL"
            value={formData.url}
            onChange={(e) => setFormData({ ...formData, url: e.target.value })}
            required
            variant="bordered"
            className="break-words"
          />
          <Input
            label="Number"
            placeholder="Enter number"
            value={formData.number}
            onChange={(e) => setFormData({ ...formData, number: e.target.value })}
            required
            variant="bordered"
            className="break-words"
          />
          <Input
            label="Info"
            placeholder="Enter info"
            value={formData.info}
            onChange={(e) => setFormData({ ...formData, info: e.target.value })}
            required
            variant="bordered"
            className="break-words"
          />
          <Input
            type="number"
            min="1"
            max="12"
            label="Order (1-12)"
            placeholder="Enter display order"
            value={formData.order}
            onChange={(e) => setFormData({ ...formData, order: parseInt(e.target.value) || 0 })}
            required
            variant="bordered"
            className="break-words"
          />
        </div>
        <div className="flex space-x-4">
          <Button 
            color="primary" 
            type="submit"
            isLoading={isLoading}
          >
            {editingImage ? 'Update Image' : 'Add Image'}
          </Button>
          {editingImage && (
            <Button 
              color="secondary" 
              onPress={resetForm}
              isLoading={isLoading}
            >
              Cancel Edit
            </Button>
          )}
        </div>
      </div>
    </form>
  );
};

const List = () => {
  const {
    images,
    loading,
    handleEdit,
    handleDelete
  } = useCarousel();
  const [searchTerm, setSearchTerm] = useState('');
  const [deletingId, setDeletingId] = useState(null);

  const filteredImages = images.filter(image => 
    image.number.toLowerCase().includes(searchTerm.toLowerCase()) ||
    image.info.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDeleteWithState = async (image) => {
    setDeletingId(image._id);
    try {
      await handleDelete(image._id);
    } finally {
      setDeletingId(null);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[200px]">
        <Spinner size="lg" />
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="mb-6">
        <Input
          type="search"
          placeholder="Search images..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full md:w-2/3"
          variant="bordered"
          startContent={<Search size={18} />}
        />
      </div>
      <div className="space-y-4">
        {filteredImages.length > 0 ? (
          filteredImages.map((image) => (
            <div key={image._id} className="bg-white rounded-lg overflow-hidden flex flex-col sm:flex-row w-full h-auto sm:h-40">
              <div className="w-full sm:w-1/3 h-48 sm:h-full relative p-2">
                <div className="relative w-full h-full rounded-lg overflow-hidden">
                  <Image
                    src={image.url}
                    alt={image.info}
                    layout="fill"
                    objectFit="cover"
                  />
                </div>
              </div>
              <div className="w-full sm:w-2/3 flex flex-col justify-between p-4">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xl font-bold text-gray-800 truncate">
                      {image.number}
                    </h3>
                    <span className="inline-flex items-center px-3 py-1.5 rounded-full bg-blue-100 text-blue-800 text-sm">
                      <LayoutIcon size={14} className="mr-1.5" />
                      Order: {image.order}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 line-clamp-2">{image.info}</p>
                  <div className="flex items-center justify-between">
                    <span className="inline-flex items-center px-3 py-1.5 rounded-full bg-green-100 text-green-800 text-sm">
                      <Calendar size={14} className="mr-1.5" />
                      {new Date(image.createdAt).toLocaleDateString()}
                    </span>
                    <div className="flex gap-2">
                      <Button
                        auto
                        light
                        color="primary"
                        startContent={<Pencil size={16} />}
                        onPress={() => handleEdit(image)}
                        className="text-sm px-3 py-1.5"
                      >
                        Edit
                      </Button>
                      <Button
                        auto
                        light
                        color="danger"
                        startContent={
                          deletingId === image._id ? (
                            <Spinner size="sm" />
                          ) : (
                            <Trash2 size={16} />
                          )
                        }
                        onPress={() => handleDeleteWithState(image)}
                        disabled={deletingId === image._id}
                        className="text-sm px-3 py-1.5"
                      >
                        {deletingId === image._id ? "Deleting..." : "Delete"}
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-8 text-gray-500">
            {searchTerm ? "No images found matching your search." : "No images found. Add some images to get started."}
          </div>
        )}
      </div>
    </div>
  );
};

const Manager = () => {
  return (
    <CarouselProvider>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 min-h-screen p-4">
        <Card className="p-4 sm:p-6 h-[calc(100vh-2rem)] flex flex-col">
          <h2 className="text-xl sm:text-2xl font-semibold mb-3 sm:mb-4">
            Add New Image
          </h2>
          <div className="flex-grow overflow-y-auto">
            <Form />
          </div>
        </Card>
        <Card className="p-4 sm:p-6 h-[calc(100vh-2rem)] flex flex-col">
          <h2 className="text-xl sm:text-2xl font-semibold mb-3 sm:mb-4">
            Current Images
          </h2>
          <div className="flex-grow overflow-y-auto">
            <List />
          </div>
        </Card>
      </div>
    </CarouselProvider>
  );
};

const CarouselManager = {
  Manager,
  Form,
  List
};

export default CarouselManager;