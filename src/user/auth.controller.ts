import {
    Body,
    Controller,
    Post,
    Req,
    UseGuards,
    ValidationPipe,
  } from '@nestjs/common';
  import { AuthGuard } from '@nestjs/passport';
  import { ApiBearerAuth, ApiBody, ApiTags } from '@nestjs/swagger';
  import { AuthService } from './auth.service';
  import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { GetUser } from './get-user.decorator';
  import { User } from './user.entity';
  
  @Controller('auth')
  @ApiTags('User Auth Related Apis')
  export class AuthController {
    constructor(private authService: AuthService) {}
  
    @Post('/signup')
    @ApiBody({ type: AuthCredentialsDto })
    signUp(
      @Body(ValidationPipe) authCredentialsDto: AuthCredentialsDto,
    ): Promise<void> {
      return this.authService.signUp(authCredentialsDto);
    }
  
    @Post('/signin')
    signIn(
      @Body(ValidationPipe) authCredentialsDto: AuthCredentialsDto,
    ): Promise<{ accessToken: string }> {
      return this.authService.signIn(authCredentialsDto);
    }
    @ApiBearerAuth()
    @Post('/test')
    @UseGuards(AuthGuard())
    test(@GetUser() user: User) {
      console.log(user);
    }
  }
  