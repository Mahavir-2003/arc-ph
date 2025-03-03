import { useState, useEffect } from 'react';
import { Card, CardBody, Input, Button, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure } from "@heroui/react";
import { useToast } from "../hooks/useToast";
import { Trash2, Pencil, Plus } from "lucide-react";

const CarouselManager = () => {
  const [images, setImages] = useState([]);
  const [editingImage, setEditingImage] = useState(null);
  const [formData, setFormData] = useState({
    url: '',
    number: '',
    info: '',
    order: 0
  });
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const showToast = useToast();

  useEffect(() => {
    fetchImages();
  }, []);

  const fetchImages = async () => {
    try {
      const response = await fetch('/api/carousel');
      const data = await response.json();
      setImages(data);
    } catch (error) {
      showToast('Failed to fetch images', 'error');
    }
  };

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
      onOpenChange(false);
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
    onOpen();
  };

  const resetForm = () => {
    setFormData({
      url: '',
      number: '',
      info: '',
      order: 0
    });
    setEditingImage(null);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Carousel Images</h2>
        <Button
          color="primary"
          startContent={<Plus size={16} />}
          onClick={() => {
            resetForm();
            onOpen();
          }}
        >
          Add Image
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {images.map((image) => (
          <Card key={image._id}>
            <CardBody>
              <div className="relative aspect-video mb-4">
                <img
                  src={image.url}
                  alt={image.info}
                  className="w-full h-full object-cover rounded-lg"
                />
                <div className="absolute top-2 right-2 flex gap-2">
                  <Button
                    isIconOnly
                    color="primary"
                    variant="flat"
                    onClick={() => handleEdit(image)}
                  >
                    <Pencil size={16} />
                  </Button>
                  <Button
                    isIconOnly
                    color="danger"
                    variant="flat"
                    onClick={() => handleDelete(image._id)}
                  >
                    <Trash2 size={16} />
                  </Button>
                </div>
              </div>
              <div className="space-y-2">
                <p className="font-semibold">{image.number}</p>
                <p className="text-sm text-gray-600">{image.info}</p>
                <p className="text-xs text-gray-500">Order: {image.order}</p>
              </div>
            </CardBody>
          </Card>
        ))}
      </div>

      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          <form onSubmit={handleSubmit}>
            <ModalHeader>
              {editingImage ? 'Edit Image' : 'Add New Image'}
            </ModalHeader>
            <ModalBody>
              <div className="space-y-4">
                <Input
                  label="Image URL"
                  value={formData.url}
                  onChange={(e) => setFormData({ ...formData, url: e.target.value })}
                  required
                />
                <Input
                  label="Number"
                  value={formData.number}
                  onChange={(e) => setFormData({ ...formData, number: e.target.value })}
                  required
                />
                <Input
                  label="Info"
                  value={formData.info}
                  onChange={(e) => setFormData({ ...formData, info: e.target.value })}
                  required
                />
                <Input
                  type="number"
                  label="Order"
                  value={formData.order}
                  onChange={(e) => setFormData({ ...formData, order: parseInt(e.target.value) })}
                  required
                />
              </div>
            </ModalBody>
            <ModalFooter>
              <Button color="danger" variant="light" onPress={onOpenChange}>
                Cancel
              </Button>
              <Button color="primary" type="submit">
                {editingImage ? 'Update' : 'Add'}
              </Button>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>
    </div>
  );
};

export default CarouselManager; 