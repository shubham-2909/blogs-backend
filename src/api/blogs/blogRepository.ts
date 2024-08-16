import type { Blog } from '@/api/blogs/blogModel'

export const blogs: Blog[] = [
  {
    title: 'My first blog',
    content: 'Its my blog content',
  },
  {
    title: 'My second blog',
    content: 'Sfsfsfssfffffffffff',
  },
]

export class BlogRepository {
  async findAllAsync(): Promise<Blog[]> {
    return blogs
  }

  async findByIdAsync(title: string): Promise<Blog | null> {
    return blogs.find((blog) => blog.title === title) || null
  }
}
