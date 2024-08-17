import type { Request, RequestHandler, Response } from 'express'

import { blogService } from '@/api/blogs/blogService'
import { handleServiceResponse } from '@/common/utils/httpHandlers'

class BlogController {
  public getBlogs: RequestHandler = async (_req: Request, _res: Response) => {
    const cursor = _req.query.cursor as string | undefined
    const serviceResponse = await blogService.findAll(cursor)
    return handleServiceResponse(serviceResponse, _res)
  }

  public createBlog: RequestHandler = async (_req: Request, _res: Response) => {
    const values = _req.body
    const serviceResponse = await blogService.create(values)
    return handleServiceResponse(serviceResponse, _res)
  }

  // public getUser: RequestHandler = async (req: Request, res: Response) => {
  //   const id = Number.parseInt(req.params.id as string, 10)
  //   const serviceResponse = await blogService.findById(id)
  //   return handleServiceResponse(serviceResponse, res)
  // }
}

export const blogController = new BlogController()
