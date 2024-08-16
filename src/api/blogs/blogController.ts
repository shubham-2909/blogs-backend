import type { Request, RequestHandler, Response } from 'express'

import { blogService } from '@/api/blogs/blogService'
import { handleServiceResponse } from '@/common/utils/httpHandlers'

class BlogController {
  public getBlogs: RequestHandler = async (_req: Request, res: Response) => {
    const serviceResponse = await blogService.findAll()
    return handleServiceResponse(serviceResponse, res)
  }

  // public getUser: RequestHandler = async (req: Request, res: Response) => {
  //   const id = Number.parseInt(req.params.id as string, 10)
  //   const serviceResponse = await blogService.findById(id)
  //   return handleServiceResponse(serviceResponse, res)
  // }
}

export const blogController = new BlogController()
