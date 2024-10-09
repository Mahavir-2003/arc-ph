import dbConnect from '@/lib/mongodb';
import Project from '@/models/Project';

export async function PUT(request, { params }) {
  try {
    await dbConnect();
    const { id } = params;
    const updatedData = await request.json();
    const project = await Project.findByIdAndUpdate(id, updatedData, { new: true });
    if (project) {
      return new Response(JSON.stringify(project), { status: 200 });
    } else {
      return new Response(JSON.stringify({ error: 'Project not found' }), { status: 404 });
    }
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Failed to update project' }), { status: 500 });
  }
}

export async function DELETE(request, { params }) {
  try {
    await dbConnect();
    const { id } = params;
    const result = await Project.findByIdAndDelete(id);
    if (result) {
      return new Response(JSON.stringify({ message: 'Project deleted successfully' }), { status: 200 });
    } else {
      return new Response(JSON.stringify({ error: 'Project not found' }), { status: 404 });
    }
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Failed to delete project' }), { status: 500 });
  }
}