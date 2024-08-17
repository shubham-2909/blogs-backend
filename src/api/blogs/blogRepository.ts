import { type Blog, CreateBlogSchema, type CreateBlogValues } from "@/api/blogs/blogModel";
import prisma from "@/common/prisma";
import type { BlogsPages } from "@/common/types";
import { BlogsDataInclude } from "@/common/types";
import cuid from "cuid";
export const blogs: Blog[] = [
  {
    title: "My first blog",
    content: "Its my blog content",
  },
  {
    title: "My second blog",
    content: "Sfsfsfssfffffffffff",
  },
];

export class BlogRepository {
  async findAllAsync(cursor: string | undefined): Promise<BlogsPages> {
    const pageSize = 10;
    const blogs = await prisma.blog.findMany({
      orderBy: { createdAt: "desc" },
      take: pageSize + 1,
      include: BlogsDataInclude,
      cursor: cursor ? { id: cursor } : undefined,
    });
    const nextCursor = blogs.length > pageSize ? blogs[pageSize].id : null;

    const data: BlogsPages = {
      nextCursor,
      blogs: blogs.slice(0, pageSize),
    };
    return data;
  }
  async createAsync(values: CreateBlogValues) {
    const { content, title } = CreateBlogSchema.parse(values);
    const newBlog = await prisma.blog.create({
      data: {
        title,
        content,
      },
      include: BlogsDataInclude,
    });

    return newBlog;
  }
  async findByIdAsync(title: string): Promise<Blog | null> {
    return blogs.find((blog) => blog.title === title) || null;
  }
}
