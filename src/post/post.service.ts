import { Injectable } from "@nestjs/common";
import { Post } from "@prisma/client";
import { PrismaService } from "src/prisma/prisma.service";
import { PostDto, PostUpdateDto } from "./dto/post.dto";

@Injectable()
export class PostService {
  constructor(private readonly prisma: PrismaService) {}

  // get all posts
  async getAllPosts(): Promise<Post[]> {
    return await this.prisma.post.findMany();
  }
  
  // single user's all posts
  async getUserPosts(id: number) : Promise<any> {
    return await this.prisma.user.findFirst({
      where: { id: Number(id) },
      include: {
        posts: true,
      }
    })
  }

  // // get single post
  // async getPost(id: number): Promise<Post> {
  //   return await this.prisma.post.findUnique({
  //     where: {
  //       id : Number(id),
  //     }
  //   });
  // };

  // create
  async createPost(data: PostDto) : Promise<Post> {
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
  async deletePost(id: number): Promise<Post> {
    return await this.prisma.post.delete({
      where: {
        id : Number(id)
      }
    });
  }

  // update 
  async updateStNote(id: number, data: PostUpdateDto): Promise<Post> {
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