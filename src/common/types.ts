import { Prisma } from '@prisma/client'

export const UserDataSelect = {
  id: true,
  username: true,
  email: true,
  bio: true,
  avatarUrl: true,
} satisfies Prisma.UserSelect

export const BlogsDataInclude = {
  author: {
    select: UserDataSelect,
  },
} satisfies Prisma.BlogInclude

export type UserData = Prisma.UserGetPayload<{ select: typeof UserDataSelect }>
export type BlogData = Prisma.BlogGetPayload<{
  include: typeof BlogsDataInclude
}>
export interface BlogsPages {
  blogs: BlogData[]
  nextCursor: string | null
}
