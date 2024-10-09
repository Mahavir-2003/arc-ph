"use client";

import { useState, useEffect } from "react";
import { Inter } from "next/font/google";
import { Card } from "@nextui-org/react";
import AddProjectCard from "../components/AddProjectCard";
import ProjectList from "../components/ProjectList";
import { Toaster } from 'react-hot-toast';

const inter = Inter({ subsets: ['latin'] });

const Dashboard = () => {
  const [projects, setProjects] = useState([]);
  const [editingProject, setEditingProject] = useState(null);

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const response = await fetch("/api/projects");
      if (response.ok) {
        const data = await response.json();
        setProjects(data);
      } else {
        console.error("Failed to fetch projects");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className={`${inter.className} bg-[#efebe0] min-h-screen p-8 flex justify-center items-start`}>
      <Toaster position="top-right" />
      <div className="max-w-4xl w-full">
        <h1 className="text-4xl font-bold mb-8 text-center">Dashboard</h1>
        <div className="space-y-8">
          <Card className="p-6">
            <h2 className="text-2xl font-semibold mb-4">
              {editingProject ? 'Edit Project' : 'Add New Project'}
            </h2>
            <AddProjectCard 
              onProjectAdded={fetchProjects} 
              editingProject={editingProject}
              setEditingProject={setEditingProject}
            />
          </Card>
          <Card className="p-6">
            <h2 className="text-2xl font-semibold mb-4">Current Projects</h2>
            <ProjectList 
              projects={projects} 
              onProjectUpdated={fetchProjects} 
              setEditingProject={setEditingProject}
            />
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
