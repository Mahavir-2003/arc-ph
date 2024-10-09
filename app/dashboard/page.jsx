"use client";

import { useState, useEffect } from "react";
import { Inter } from "next/font/google";
import { Card, Spinner, Input, Button } from "@nextui-org/react";
import AddProjectCard from "../components/AddProjectCard";
import ProjectList from "../components/ProjectList";
import { Toaster } from 'react-hot-toast';
import toast from 'react-hot-toast';

const inter = Inter({ subsets: ['latin'] });

const Dashboard = () => {
  const [projects, setProjects] = useState([]);
  const [editingProject, setEditingProject] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await fetch('/api/auth', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      if (response.ok) {
        setIsAuthenticated(true);
        fetchProjects();
      } else {
        toast.error('Invalid credentials');
      }
    } catch (error) {
      console.error('Error during login:', error);
      toast.error('An error occurred during login');
    } finally {
      setIsLoading(false);
    }
  };

  const fetchProjects = async () => {
    setIsLoading(true);
    try {
      const response = await fetch("/api/projects");
      if (response.ok) {
        const data = await response.json();
        setProjects(data);
      } else {
        console.error("Failed to fetch projects");
        toast.error("Failed to fetch projects");
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("Error fetching projects");
    } finally {
      setIsLoading(false);
    }
  };

  if (!isAuthenticated) {
    return (
      <div className={`${inter.className} bg-[#efebe0] min-h-screen p-8 flex justify-center items-center`}>
        <Card className="p-6 w-full max-w-md">
          <h1 className="text-2xl font-bold mb-4 text-center">Dashboard Login</h1>
          <form onSubmit={handleLogin} className="space-y-4">
            <Input
              type="text"
              label="Username"
              placeholder="Enter username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
            <Input
              type="password"
              label="Password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <Button type="submit" color="primary" fullWidth isLoading={isLoading}>
              Login
            </Button>
          </form>
        </Card>
      </div>
    );
  }

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
            {isLoading ? (
              <div className="flex justify-center">
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
