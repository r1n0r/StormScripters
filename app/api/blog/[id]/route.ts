import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Blog from '@/models/Blog';

// GET /api/blog/[id] - Get a single blog post
export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    await dbConnect();

    const blog = await Blog.findById(params.id)
      .populate('author', 'name email');

    if (!blog) {
      return NextResponse.json(
        { error: 'Blog not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: blog,
    });
  } catch (error) {
    return NextResponse.json(
      { error: 'Error fetching blog' },
      { status: 500 }
    );
  }
}

// PUT /api/blog/[id] - Update a blog post
export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { title, content, tags, image, status } = await request.json();
    const userId = request.headers.get('x-user-id');

    if (!userId) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    await dbConnect();

    const blog = await Blog.findById(params.id);

    if (!blog) {
      return NextResponse.json(
        { error: 'Blog not found' },
        { status: 404 }
      );
    }

    // Check if user is the author
    if (blog.author.toString() !== userId) {
      return NextResponse.json(
        { error: 'Not authorized to update this blog' },
        { status: 403 }
      );
    }

    const updatedBlog = await Blog.findByIdAndUpdate(
      params.id,
      {
        title,
        content,
        tags,
        image,
        status,
        updatedAt: new Date(),
      },
      { new: true }
    ).populate('author', 'name email');

    return NextResponse.json({
      success: true,
      data: updatedBlog,
    });
  } catch (error) {
    return NextResponse.json(
      { error: 'Error updating blog' },
      { status: 500 }
    );
  }
}

// DELETE /api/blog/[id] - Delete a blog post
export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const userId = request.headers.get('x-user-id');

    if (!userId) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    await dbConnect();

    const blog = await Blog.findById(params.id);

    if (!blog) {
      return NextResponse.json(
        { error: 'Blog not found' },
        { status: 404 }
      );
    }

    // Check if user is the author
    if (blog.author.toString() !== userId) {
      return NextResponse.json(
        { error: 'Not authorized to delete this blog' },
        { status: 403 }
      );
    }

    await Blog.findByIdAndDelete(params.id);

    return NextResponse.json({
      success: true,
      data: {},
    });
  } catch (error) {
    return NextResponse.json(
      { error: 'Error deleting blog' },
      { status: 500 }
    );
  }
} 