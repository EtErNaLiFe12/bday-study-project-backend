import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { Post as PostModel} from '@prisma/client';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { UserResponseDto } from 'src/user/dto/register.dto';
import { PostDto, PostResponseDto } from './dto/post.dto';
import { PostService } from './post.service';

@Controller('post')
@ApiTags('post')
export class PostController {
  constructor(private readonly  postService: PostService ) {}
  // Get all post
  @Get('/')
  @ApiOperation({ summary: '모든 post 조회', description: '모든 post 가져오기'})
   async getAllPosts() {
     return await this.postService.getAllPosts();
   }

  // Param decorator로 get에 선언한 id를 가져온 후 id에 넣음 return 으로는 userdto를 가져옴
  // get a single user's all posts
  @UseGuards(JwtAuthGuard)
  @Get('/posts/:id')
  @ApiOperation({ summary: '한개의 모든 Post 조회', description: '한개의 모든 Post 가져오기'})
  async getUserPosts(@Param('id') id: number): Promise<UserResponseDto> {
    const result = await this.postService.getUserPosts(id);
    return result;
  }

  // Create
  @Post('/create')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'post 생성 API', description: 'post 생성 실행' })
    async createPost(@Body() postInfo : PostDto): Promise<PostResponseDto> { 
      const result = await this.postService.createPost(postInfo);
      const res = new PostResponseDto(result)
      return res;
  }

  // Delete
  @Delete('/:id')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Post 삭제', description: 'post 삭제 하기'})
  async deletePost(@Param('id') id: number): Promise<PostModel> {
    const result = await this.postService.deletePost(id)
    return result;
  }
  
  // Update 
  @Patch('/:id')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Post 수정', description: 'post 수정 하기'})
  async updateStNote(@Param('id') id: number, @Body() data: PostDto) : Promise<PostResponseDto> {
    const result = await this.postService.updateStNote(id, data);
    const res = new PostResponseDto(result);
    return res;
  }
}

