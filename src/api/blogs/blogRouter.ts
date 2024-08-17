import { OpenAPIRegistry } from '@asteasolutions/zod-to-openapi'
import express, { type Router } from 'express'
import { z } from 'zod'
import { createApiResponse } from '@/api-docs/openAPIResponseBuilders'
import { blogController } from './blogController'
import { BlogSchema, GetBlogSchema } from './blogModel'

export const blogRegistry = new OpenAPIRegistry()
export const blogRouter: Router = express.Router()

blogRegistry.register('Blogs', BlogSchema)

blogRegistry.registerPath({
  method: 'get',
  path: '/blogs',
  tags: ['Blog'],
  request: { query: GetBlogSchema.shape.query },
  responses: createApiResponse(z.array(BlogSchema), 'Success'),
})

blogRouter.get('/', blogController.getBlogs)

blogRouter.post('/', blogController.createBlog)
// register path for common blog
// blogRegistry.registerPath({
//   method: 'get',
//   path: '/users/{id}',
//   tags: ['Blog'],
//   request: { params: GetUserSchema.shape.params },
//   responses: createApiResponse(UserSchema, 'Success'),
// })

// userRouter.get('/:id', validateRequest(GetUserSchema), userController.getUser)
