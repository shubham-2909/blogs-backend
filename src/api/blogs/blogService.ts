import { BlogRepository } from "@/api/blogs/blogRepository";
import { ServiceResponse } from "@/common/models/serviceResponse";
import type { BlogData, BlogsPages } from "@/common/types";
import { logger } from "@/server";
import { StatusCodes } from "http-status-codes";
import type { CreateBlogValues } from "./blogModel";

export class BlogService {
  private blogRepository: BlogRepository;

  constructor(repository: BlogRepository = new BlogRepository()) {
    this.blogRepository = repository;
  }

  // Retrieves all users from the database
  async findAll(cursor: string | undefined): Promise<ServiceResponse<BlogsPages | null>> {
    try {
      const blogs = await this.blogRepository.findAllAsync(cursor);
      return ServiceResponse.success<BlogsPages>("Blogs found", blogs);
    } catch (ex) {
      const errorMessage = `Error finding all users: $${(ex as Error).message}`;
      logger.error(errorMessage);
      return ServiceResponse.failure(
        "An error occurred while retrieving users.",
        null,
        StatusCodes.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async create(values: CreateBlogValues) {
    try {
      const blog = await this.blogRepository.createAsync(values);
      return ServiceResponse.success<BlogData>("Blog created", blog);
    } catch (ex) {
      const errorMessage = `Error finding all users: $${(ex as Error).message}`;
      logger.error(errorMessage);
      return ServiceResponse.failure("An error occurred while creating blog.", null, StatusCodes.INTERNAL_SERVER_ERROR);
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

export const blogService = new BlogService();
