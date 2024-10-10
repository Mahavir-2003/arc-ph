import dbConnect from "@/lib/mongodb";
import Project from "@/models/Project";
import { NextResponse } from 'next/server';

export const getProjects = async () => {
  try {
    await dbConnect();
    const projects = await Project.find({}).sort({ createdAt: -1 });
    return NextResponse.json(projects);
  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json({ error: 'An unexpected error occurred' }, { status: 500 });
  }
};

export const createProject = async (request) => {
  try {
    await dbConnect();
    const data = await request.json();
    const project = new Project(data);
    await project.save();
    return NextResponse.json(project, { status: 201 });
  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json({ error: 'An unexpected error occurred' }, { status: 500 });
  }
};

export const updateProject = async (request, { params }) => {
  try {
    await dbConnect();
    const data = await request.json();
    const project = await Project.findByIdAndUpdate(params.id, data, {
      new: true,
      runValidators: true,
    });
    if (!project) {
      return NextResponse.json({ error: 'Project not found' }, { status: 404 });
    }
    return NextResponse.json(project);
  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json({ error: 'An unexpected error occurred' }, { status: 500 });
  }
};

export const deleteProject = async (request, { params }) => {
  try {
    await dbConnect();
    const project = await Project.findByIdAndDelete(params.id);
    if (!project) {
      return NextResponse.json({ error: 'Project not found' }, { status: 404 });
    }
    return NextResponse.json({ message: 'Project deleted successfully' });
  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json({ error: 'An unexpected error occurred' }, { status: 500 });
  }
};