"use client";

import { useState, useEffect, useCallback } from "react";
import { Card, CardBody, Spinner, Button, Tooltip, Tabs, Tab } from "@heroui/react";
import AddProjectCard from "../components/AddProjectCard";
import LoginForm from "../components/LoginForm";
import Link from "next/link";
import { HelpCircle, ExternalLink, LogOut, Plus, Info, RefreshCw } from "lucide-react";
import { useToast } from "../hooks/useToast";
import dynamic from 'next/dynamic';
import ProjectList from "../components/ProjectList";
import CarouselManager from "../components/CarouselManager";
import CarouselForm from "../components/CarouselForm";

const SeeDocs = () => {
  const [isTooltipOpen, setIsTooltipOpen] = useState(false);

  const exampleLinks = [
    {
      label: "Collection URL",
      url: "https://collection.cloudinary.com/your-cloud-name/12345abcde67890fghij12345abcde67",
    },
    {
      label: "Image URL",
      url: "https://res.cloudinary.com/your-cloud-name/image/upload/v1234567890/sample.jpg",
    },
  ];

  const tooltipContent = (
    <div className="p-3 sm:p-5 inter rounded-lg max-w-md">
      <h3 className="text-emerald-800 font-semibold mb-2 sm:mb-4 text-base sm:text-lg">
        Cloudinary Collections Help
      </h3>
      <p className="text-emerald-700 mb-2 sm:mb-3 text-sm sm:text-base">
        Example links:
      </p>
      <div className="space-y-2 sm:space-y-4">
        {exampleLinks.map(({ label, url }) => (
          <div key={label} className="flex flex-col gap-1 sm:gap-2">
            <span className="px-2 sm:px-3 py-1 sm:py-1.5 text-emerald-800 rounded-full font-bold text-xs sm:text-sm inline-block w-max">
              {label}
            </span>
            <div className="relative group">
              <p className="cursor-pointer px-2 sm:px-3 py-1 sm:py-2 text-emerald-800 rounded-lg text-xs sm:text-sm break-all hover:bg-emerald-300 transition-colors duration-200 block">
                {url}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const SeeDocsLinkClasses = `
    inline-flex items-center px-3 sm:px-4 py-1 sm:py-2 rounded-full
    text-emerald-800 bg-emerald-200
    hover:bg-emerald-300
    transition-all duration-300 ease-in-out transform hover:scale-105
    focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500
    text-xs sm:text-sm inter
  `;

  return (
    <Tooltip
      content={tooltipContent}
      placement="bottom"
      isOpen={isTooltipOpen}
      onOpenChange={(open) => setIsTooltipOpen(open)}
    >
      <button
        onClick={() => setIsTooltipOpen(!isTooltipOpen)}
        className={SeeDocsLinkClasses}
        aria-label="See Documentation"
      >
        <HelpCircle size={14} className="mr-1.5" />
        See Docs
      </button>
    </Tooltip>
  );
};

const CloudinaryDocs = () => {
  const CloudinaryLinkClasses = `
    inline-flex items-center px-3 sm:px-4 py-1 sm:py-2 rounded-full
    text-blue-800 bg-blue-200
    hover:bg-blue-300
    transition-all duration-300 ease-in-out transform hover:scale-105
    focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500
    text-xs sm:text-sm inter
  `;

  return (
    <Link
      href="https://cloudinary.com/documentation/dam_folders_collections_sharing"
      target="_blank"
      rel="noopener noreferrer"
      className={CloudinaryLinkClasses}
    >
      <ExternalLink size={14} className="mr-1.5" />
      Cloudinary Docs
    </Link>
  );
};

const DocsLinks = () => {
  const linkBaseClasses = `
    inline-flex items-center px-3 sm:px-4 py-1 sm:py-2 rounded-full
    transition-all duration-300 ease-in-out transform hover:scale-105
    focus:outline-none focus:ring-2 focus:ring-offset-2
    text-xs sm:text-sm inter
  `;

  return (
    <div className="flex flex-wrap gap-2">
      <Link
        href="https://cloudinary.com/documentation/image_upload_api_reference"
        target="_blank"
        rel="noopener noreferrer"
        className={`${linkBaseClasses} text-green-800 bg-green-200 hover:bg-green-300 focus:ring-green-500`}
      >
        <ExternalLink size={14} className="mr-1.5" />
        Upload Guide
      </Link>
      <Tooltip
        content={
          <div className="p-3 max-w-xs">
            <h3 className="font-semibold mb-2">URL Formats</h3>
            <div className="space-y-2 text-sm">
              <p><strong>Collection URL:</strong> https://collection.cloudinary.com/your-cloud-name/[hash]</p>
              <p><strong>Image URL:</strong> https://res.cloudinary.com/your-cloud-name/image/upload/[version]/[file]</p>
            </div>
          </div>
        }
        placement="bottom"
      >
        <button className={`${linkBaseClasses} text-purple-800 bg-purple-200 hover:bg-purple-300 focus:ring-purple-500`}>
          <HelpCircle size={14} className="mr-1.5" />
          URL Guide
        </button>
      </Tooltip>
    </div>
  );
};

const Dashboard = () => {
  const [projects, setProjects] = useState([]);
  const [images, setImages] = useState([]);
  const [editingProject, setEditingProject] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isProjectsLoading, setIsProjectsLoading] = useState(false);
  const [isImagesLoading, setIsImagesLoading] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [editingImage, setEditingImage] = useState(null);
  const [isFixingNumbers, setIsFixingNumbers] = useState(false);

  const showToast = useToast();

  const fetchProjects = useCallback(async () => {
    setIsProjectsLoading(true);
    try {
      const response = await fetch("/api/projects");
      if (response.ok) {
        const data = await response.json();
        setProjects(data);
      } else {
        console.error("Failed to fetch projects");
        showToast("Failed to fetch projects", "error");
      }
    } catch (error) {
      console.error("Error:", error);
      showToast("Error fetching projects", "error");
    } finally {
      setIsProjectsLoading(false);
    }
  }, [showToast]);

  const fetchImages = useCallback(async () => {
    setIsImagesLoading(true);
    try {
      const response = await fetch("/api/carousel");
      if (response.ok) {
        const data = await response.json();
        const sortedData = (Array.isArray(data) ? data : []).sort(
          (a, b) => a.order - b.order
        );
        setImages(sortedData);
      } else {
        console.error("Failed to fetch images");
        showToast("Failed to fetch images", "error");
      }
    } catch (error) {
      console.error("Error:", error);
      showToast("Error fetching images", "error");
    } finally {
      setIsImagesLoading(false);
    }
  }, [showToast]);

  useEffect(() => {
    const checkAuth = async () => {
      const storedIsLoggedIn = localStorage.getItem("isLoggedIn");
      if (storedIsLoggedIn === "true") {
        setIsAuthenticated(true);
        fetchProjects();
        fetchImages();
      } else {
        try {
          const response = await fetch("/api/check-auth");
          if (response.ok) {
            setIsAuthenticated(true);
            localStorage.setItem("isLoggedIn", "true");
            fetchProjects();
            fetchImages();
          } else {
            setIsAuthenticated(false);
          }
        } catch (error) {
          console.error("Error checking authentication:", error);
          showToast("An error occurred while checking authentication", "error");
        }
      }
      setIsLoading(false);
    };

    checkAuth();
  }, [fetchProjects, fetchImages, showToast]);

  const handleLoginSuccess = () => {
    setIsAuthenticated(true);
    fetchProjects();
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem("isLoggedIn");
    showToast("Logged out successfully", "success");
  };

  const handleProjectSubmit = async (projectData) => {
    setIsProjectsLoading(true);
    try {
      const newOrder = parseInt(projectData.order);
      const oldOrder = editingProject?.order;
      
      // Get all projects excluding the current one being edited
      const otherProjects = projects.filter(proj => proj._id !== editingProject?._id);
      
      // Reorder other projects based on the new order
      const reorderedProjects = otherProjects.map(proj => {
        if (editingProject) {
          // When editing
          if (newOrder > oldOrder) {
            // Moving down: decrease order of projects between old and new position
            if (proj.order > oldOrder && proj.order <= newOrder) {
              return { ...proj, order: proj.order - 1 };
            }
          } else if (newOrder < oldOrder) {
            // Moving up: increase order of projects between new and old position
            if (proj.order >= newOrder && proj.order < oldOrder) {
              return { ...proj, order: proj.order + 1 };
            }
          }
        } else {
          // When adding new: increase order of all projects at or after the insertion point
          if (proj.order >= newOrder) {
            return { ...proj, order: proj.order + 1 };
          }
        }
        return proj;
      });

      // First update other projects if needed
      if (reorderedProjects.some(proj => proj.order !== projects.find(p => p._id === proj._id)?.order)) {
        const reorderResponse = await fetch("/api/projects/reorder", {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ projects: reorderedProjects }),
        });

        if (!reorderResponse.ok) {
          throw new Error("Failed to reorder projects");
        }
      }

      // Then add/update the current project
      const url = editingProject
        ? `/api/projects/${editingProject._id}`
        : "/api/projects";
      const method = editingProject ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(projectData),
      });

      if (response.ok) {
        showToast(
          editingProject
            ? "Project updated successfully"
            : "Project added successfully",
          "success"
        );
        fetchProjects();
        setEditingProject(null);
      } else {
        const errorData = await response.json();
        showToast(
          `Failed to ${editingProject ? "update" : "add"} project: ${
            errorData.error
          }`,
          "error"
        );
      }
    } catch (error) {
      console.error("Error:", error);
      showToast(
        `An error occurred while ${
          editingProject ? "updating" : "adding"
        } the project`,
        "error"
      );
    } finally {
      setIsProjectsLoading(false);
    }
  };

  const handleFixNumbers = async () => {
    if (process.env.NODE_ENV !== 'development') {
      showToast('This feature is only available in development', 'error');
      return;
    }

    setIsFixingNumbers(true);
    try {
      const response = await fetch('/api/carousel/fix-numbers', {
        method: 'POST'
      });
      
      if (!response.ok) {
        throw new Error('Failed to fix numbers');
      }

      const data = await response.json();
      showToast(`Fixed ${data.images.length} image numbers`, 'success');
      fetchImages(); // Refresh the images list
    } catch (error) {
      console.error('Error fixing numbers:', error);
      showToast('Failed to fix image numbers', 'error');
    } finally {
      setIsFixingNumbers(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Spinner size="lg" />
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className={`inter bg-[#efebe0] min-h-screen flex items-center justify-center p-4`}>
        <Card className="w-full max-w-md p-6">
          <h1 className="text-2xl font-bold mb-6 text-center">Dashboard Login</h1>
          <LoginForm onLoginSuccess={handleLoginSuccess} />
        </Card>
      </div>
    );
  }

  return (
    <div className={`inter bg-[#efebe0] min-h-screen p-2 sm:p-8`}>
      <div className="max-w-8xl mx-auto h-full flex flex-col">
        <div className="flex flex-col sm:flex-row justify-between items-center mb-6 sm:mb-8 space-y-4 sm:space-y-0">
          <h1 className="text-3xl sm:text-4xl font-bold text-center sm:text-left">
            Dashboard
          </h1>
          <div className="flex flex-wrap justify-center sm:justify-end items-center gap-2 sm:gap-4">
            <SeeDocs />
            <CloudinaryDocs />
            <Button
              onClick={handleLogout}
              color="danger"
              variant="light"
              startContent={<LogOut size={16} />}
              className="text-sm px-3 py-1.5"
            >
              Logout
            </Button>
            {process.env.NODE_ENV === 'development' && (
              <Button
                color="warning"
                variant="flat"
                onPress={handleFixNumbers}
                isLoading={isFixingNumbers}
                startContent={<RefreshCw size={20} />}
              >
                Fix Carousel Numbers
              </Button>
            )}
          </div>
        </div>
        <Tabs aria-label="Options">
          <Tab key="projects" title="Projects">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
              <Card className="p-4 sm:p-6 h-full flex flex-col">
                <h2 className="text-xl sm:text-2xl font-semibold mb-3 sm:mb-4">
                  {editingProject ? "Edit Project" : "Add New Project"}
                </h2>
                <div className="flex-grow overflow-auto">
                  <AddProjectCard
                    onProjectSubmit={handleProjectSubmit}
                    editingProject={editingProject}
                    setEditingProject={setEditingProject}
                    projects={projects}
                  />
                </div>
              </Card>
              <Card className="p-4 sm:p-6 h-full flex flex-col">
                <h2 className="text-xl sm:text-2xl font-semibold mb-3 sm:mb-4">
                  Current Projects
                </h2>
                {isProjectsLoading ? (
                  <div className="flex justify-center items-center h-32 sm:h-40">
                    <Spinner size="lg" />
                  </div>
                ) : (
                  <div className="flex-grow overflow-auto">
                    <ProjectList
                      projects={projects}
                      onProjectUpdated={fetchProjects}
                      setEditingProject={setEditingProject}
                    />
                  </div>
                )}
              </Card>
            </div>
          </Tab>
          <Tab key="carousel" title="Carousel">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
              <Card className="p-4 sm:p-6 h-full flex flex-col">
                <h2 className="text-xl sm:text-2xl font-semibold mb-3 sm:mb-4">
                  {editingImage ? "Edit Image" : "Add New Image"}
                </h2>
                <div className="flex-grow overflow-auto">
                  <CarouselForm 
                    onImageAdded={fetchImages} 
                    images={images}
                    editingImage={editingImage}
                    setEditingImage={setEditingImage}
                  />
                </div>
              </Card>
              <Card className="p-4 sm:p-6 h-full flex flex-col">
                <h2 className="text-xl sm:text-2xl font-semibold mb-3 sm:mb-4">
                  Current Images
                </h2>
                {isImagesLoading ? (
                  <div className="flex justify-center items-center h-32 sm:h-40">
                    <Spinner size="lg" />
                  </div>
                ) : (
                  <div className="flex-grow overflow-auto">
                    <CarouselManager
                      images={images}
                      onImagesUpdated={fetchImages}
                      onEdit={setEditingImage}
                    />
                  </div>
                )}
              </Card>
            </div>
          </Tab>
        </Tabs>
      </div>
    </div>
  );
};

export default Dashboard;