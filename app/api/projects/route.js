import dbConnect from '@/lib/mongodb';
import Project from '@/models/Project';

export async function GET() {
  try {
    console.log("Attempting to connect to MongoDB...");
    await dbConnect();
    console.log("Connected to MongoDB successfully");

    console.log('Accessing "archi" collection');
    const projects = await Project.find({});
    console.log(`Found ${projects.length} projects`);

    return new Response(JSON.stringify(projects), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error in GET function:", error);
    return new Response(
      JSON.stringify({
        error: "Failed to fetch projects",
        details: error.message,
        stack: error.stack,
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}

export async function POST(request) {
  try {
    await dbConnect();
    const projectData = await request.json();
    const project = new Project(projectData);
    const savedProject = await project.save();

    return new Response(JSON.stringify(savedProject), {
      status: 201,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    return new Response(
      JSON.stringify({
        error: "Failed to add project",
        details: error.message,
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}
