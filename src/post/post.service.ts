import { Injectable } from "@nestjs/common";
import { Post as PostModel } from "@prisma/client";
import { PrismaService } from "src/prisma/prisma.service";
import { UserResponseDto } from "src/user/dto/register.dto";
import { PostDto, PostUpdateDto } from "./dto/post.dto";

@Injectable()
export class PostService {
  constructor(private readonly prisma: PrismaService) {}

  // get all posts
  async getAllPosts(): Promise<PostModel[]> {
    return await this.prisma.post.findMany();
  }
  
  // single user's all posts
  async getUserPosts(id: number) : Promise<UserResponseDto> {
    return await this.prisma.user.findUnique({
      where: { id: Number(id) },
      include: {
        posts: true,
      }
    })
  }

  // create
  async createPost(data: PostDto) : Promise<PostModel> {
    const res = await this.prisma.post.create({
    data: 
      {
        nickname: data.nickname,
        mng_no: data.mng_no,
        title: data.title,
        content: data.content,
        post_user: {
          connect: { id: data.postId }
        }
      },
    })
    return res;
  }
  
  // Delete
  async deletePost(id: number): Promise<PostModel> {
    return await this.prisma.post.delete({
      where: {
        id : Number(id)
      }
    });
  }

  // update 
  async updateStNote(id: number, data: PostUpdateDto): Promise<PostModel> {
    const res = await this.prisma.post.update({
      where: {
        id: Number(id)
      },
      data: {
        mng_no: data.mng_no,
        nickname: data.nickname,
        title: data.title,
        content: data.content,
      }
    });
    return res;
  }
}