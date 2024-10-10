"use client";

import { useState, useEffect, useCallback } from "react";
import { Card, Spinner, Button, Tooltip } from "@nextui-org/react";
import AddProjectCard from "../components/AddProjectCard";
import ProjectList from "../components/ProjectList";
import LoginForm from "../components/LoginForm";
import Link from "next/link";
import { HelpCircle, ExternalLink } from "lucide-react";
import { useToast } from "../hooks/useToast";

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
    <div className="p-5 inter rounded-lg max-w-md">
      <h3 className="text-emerald-800 font-semibold mb-4 text-lg">
        Cloudinary Collections Help
      </h3>
      <p className="text-emerald-700 mb-3">Example links:</p>
      <div className="space-y-4">
        {exampleLinks.map(({ label, url }) => (
          <div key={label} className="flex flex-col gap-2">
            <span className="px-3 py-1.5 text-emerald-800 rounded-full font-bold text-sm inline-block w-max">
              {label}
            </span>
            <div className="relative group">
              <p
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className="cursor-pointer px-3 py-2 text-emerald-800 rounded-lg text-sm break-all hover:bg-emerald-300 transition-colors duration-200 block"
              >
                {url}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const SeeDocsLinkClasses = `
    inline-flex items-center px-4 py-2 rounded-full
    text-green-800 bg-green-200
    hover:bg-green-300
    transition-all duration-300 ease-in-out transform hover:scale-105
    focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500
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
        <HelpCircle size={16} className="mr-2" />
        See Docs
      </button>
    </Tooltip>
  );
};

const CloudinaryLinkClasses = `
    inline-flex items-center px-4 py-2 rounded-full
    text-blue-800 bg-blue-200
    hover:bg-blue-300
    transition-all duration-300 ease-in-out transform hover:scale-105
    focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500
  `;

const CloudinaryDocs = () => {
  return (
    <Link
      href="https://cloudinary.com/documentation/dam_folders_collections_sharing"
      target="_blank"
      rel="noopener noreferrer"
      className={CloudinaryLinkClasses}
    >
      <ExternalLink size={16} className="mr-2" />
      Cloudinary Docs
    </Link>
  );
};

const Dashboard = () => {
  const [projects, setProjects] = useState([]);
  const [editingProject, setEditingProject] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isProjectsLoading, setIsProjectsLoading] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

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

  useEffect(() => {
    const checkAuth = async () => {
      const storedIsLoggedIn = localStorage.getItem("isLoggedIn");
      if (storedIsLoggedIn === "true") {
        setIsAuthenticated(true);
        fetchProjects();
      } else {
        try {
          const response = await fetch("/api/check-auth");
          if (response.ok) {
            setIsAuthenticated(true);
            localStorage.setItem("isLoggedIn", "true");
            fetchProjects();
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
  }, [fetchProjects, showToast]);

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

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Spinner size="lg" />
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div
        className={`inter bg-[#efebe0] min-h-screen p-8 flex justify-center items-center`}
      >
        <LoginForm onLoginSuccess={handleLoginSuccess} />
      </div>
    );
  }

  return (
    <div className={`inter bg-[#efebe0] min-h-screen p-8`}>
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold text-center">Dashboard</h1>
          <div className="flex items-center space-x-4">
            <SeeDocs />
            <CloudinaryDocs />
            <Button onClick={handleLogout} color="danger">
              Logout
            </Button>
          </div>
        </div>
        <div className="space-y-8">
          <Card className="p-6">
            <h2 className="text-2xl font-semibold mb-4">
              {editingProject ? "Edit Project" : "Add New Project"}
            </h2>
            <AddProjectCard
              onProjectSubmit={handleProjectSubmit}
              editingProject={editingProject}
              setEditingProject={setEditingProject}
            />
          </Card>
          <Card className="p-6">
            <h2 className="text-2xl font-semibold mb-4">Current Projects</h2>
            {isProjectsLoading ? (
              <div className="flex justify-center items-center h-40">
                <Spinner size="lg" />
              </div>
            ) : (
              <ProjectList
                projects={projects}
                onProjectUpdated={fetchProjects}
                setEditingProject={setEditingProject}
              />
            )}
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
