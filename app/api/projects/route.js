import { getProjects, createProject, updateProject, deleteProject } from '@/lib/projectHandlers';

export const GET = getProjects;
export const POST = createProject;
export const PUT = updateProject;
export const DELETE = deleteProject;
