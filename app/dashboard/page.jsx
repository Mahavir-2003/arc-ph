"use client";

import { useState, useEffect, useCallback } from "react";
import { Card, Spinner, Button, Tooltip } from "@nextui-org/react";
import AddProjectCard from "../components/AddProjectCard";
import ProjectList from "../components/ProjectList";
import LoginForm from "../components/LoginForm";
import Link from "next/link";
import { HelpCircle } from "lucide-react";
import { useToast } from "../hooks/useToast";

const DocsLink = ({ highlight }) => (
  <div className="inter">
    <Tooltip
      content={
        <div className="p-2 inter">
          <p>Click here if you need help with Cloudinary collections.</p>
          <p className="mt-2">Example links:</p>
          <ul className="list-disc list-inside mt-1">
            <li>
              Collection URL:
              https://collection.cloudinary.com/your-cloud-name/12345abcde67890fghij12345abcde67
            </li>
            <li>
              Image URL:
              https://res.cloudinary.com/your-cloud-name/image/upload/v1234567890/sample.jpg
            </li>
          </ul>
        </div>
      }
      placement="bottom"
    >
      <Link
        href="https://cloudinary.com/documentation/dam_folders_collections_sharing"
        target="_blank"
        rel="noopener noreferrer"
        className={`inline-flex items-center px-3 py-1.5 rounded-full ${
          highlight
            ? "bg-yellow-300 text-yellow-800 animate-pulse"
            : "bg-blue-100 text-blue-800"
        } hover:bg-blue-200 transition-all duration-300 ease-in-out transform hover:scale-105`}
      >
        <HelpCircle size={16} className="mr-2" />
        Need Help?
      </Link>
    </Tooltip>
  </div>
);

const Dashboard = () => {
  const [projects, setProjects] = useState([]);
  const [editingProject, setEditingProject] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isProjectsLoading, setIsProjectsLoading] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [highlightDocs, setHighlightDocs] = useState(false);

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
        if (errorData.error.includes("Invalid URL")) {
          setHighlightDocs(true);
          setTimeout(() => setHighlightDocs(false), 5000);
        }
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
            <DocsLink highlight={highlightDocs} />
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
              setHighlightDocs={setHighlightDocs}
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
