import { StatusCodes } from 'http-status-codes'

import type { Blog } from '@/api/blogs/blogModel'
import { BlogRepository } from '@/api/blogs/blogRepository'
import { ServiceResponse } from '@/common/models/serviceResponse'
import { logger } from '@/server'

export class BlogService {
  private blogRepository: BlogRepository

  constructor(repository: BlogRepository = new BlogRepository()) {
    this.blogRepository = repository
  }

  // Retrieves all users from the database
  async findAll(): Promise<ServiceResponse<Blog[] | null>> {
    try {
      const users = await this.blogRepository.findAllAsync()
      if (!users || users.length === 0) {
        return ServiceResponse.failure(
          'No Users found',
          null,
          StatusCodes.NOT_FOUND
        )
      }
      return ServiceResponse.success<Blog[]>('Users found', users)
    } catch (ex) {
      const errorMessage = `Error finding all users: $${(ex as Error).message}`
      logger.error(errorMessage)
      return ServiceResponse.failure(
        'An error occurred while retrieving users.',
        null,
        StatusCodes.INTERNAL_SERVER_ERROR
      )
    }
  }

  // Retrieves a single user by their ID
  // async findById(id: number): Promise<ServiceResponse<User | null>> {
  //   try {
  //     const user = await this.userRepository.findByIdAsync(id);
  //     if (!user) {
  //       return ServiceResponse.failure("User not found", null, StatusCodes.NOT_FOUND);
  //     }
  //     return ServiceResponse.success<User>("User found", user);
  //   } catch (ex) {
  //     const errorMessage = `Error finding user with id ${id}:, ${(ex as Error).message}`;
  //     logger.error(errorMessage);
  //     return ServiceResponse.failure("An error occurred while finding user.", null, StatusCodes.INTERNAL_SERVER_ERROR);
  //   }
  // }
}

export const blogService = new BlogService()
