import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { S3 } from 'aws-sdk';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';

import { BaseService } from '@common';
import { MailService } from '@mail/mail.service';
import { User } from '@modules/user/user.entity';
import { Data } from '@modules/data/data.entity';
import { Page } from '@modules/page/page.entity';
import { LoginAuthRequestDto, RegisterAuthRequestDto } from './dto';

export const P_AUTH_DELETE_IMAGE_TEMP = '11cc566b-b109-49f8-983f-84ff08f9849e';

@Injectable()
export class AuthService extends BaseService {
  constructor(
    @InjectRepository(User) public repo: Repository<User>,
    private readonly jwtService: JwtService,
    @InjectRepository(Page) public repoPage: Repository<Page>,
    @InjectRepository(Data) public repoData: Repository<Data>,
    private mailService: MailService,
  ) {
    super(repo);
  }
  async updateRefreshToken(userId: string, refreshToken: string) {
    await this.repo.update(userId, {
      refreshToken: await bcrypt.hash(refreshToken, 10),
    });
  }

  async getTokens(user: User, returnRefresh = true) {
    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(
        {
          userId: user.id,
          email: user.email,
        },
        {
          secret: process.env.JWT_ACCESS_SECRET,
          expiresIn: process.env.JWT_EXPIRATION_TIME,
        },
      ),
      returnRefresh
        ? this.jwtService.signAsync(
            {
              userId: user.id,
              email: user.email,
            },
            {
              secret: process.env.JWT_REFRESH_SECRET,
              expiresIn: '1d',
            },
          )
        : null,
    ]);
    if (returnRefresh) {
      await this.updateRefreshToken(user.id, refreshToken);
    }
    return {
      accessToken,
      refreshToken,
    };
  }

  async logout(user: User) {
    return await this.repo.update(user.id, { refreshToken: null });
  }

  async login(loginAuthDto: LoginAuthRequestDto) {
    const user = await this.repo.findOne({
      where: { email: loginAuthDto.email },
      relations: ['position'],
      select: {
        position: {
          name: true,
        },
      },
    });

    if (!user) {
      throw new UnauthorizedException(`User ${loginAuthDto.email} not found!`);
    }

    if (!(await bcrypt.compare(loginAuthDto.password, user.password))) {
      throw new UnauthorizedException(`Invalid credentials for user ${loginAuthDto.email}`);
    }
    return user;
  }

  async register(createUserDto: RegisterAuthRequestDto) {
    if (createUserDto.password !== createUserDto.retypedPassword) {
      throw new BadRequestException(['Passwords are not identical']);
    }

    const existingUser = await this.repo.findOne({
      where: [{ email: createUserDto.email }],
    });

    if (existingUser) {
      throw new BadRequestException(['email is already taken']);
    }
    const user = this.repo.create(createUserDto);
    const data = await this.repo.save(user);
    // await this.mailService.sendUserConfirmation(user, 'token');
    return data;
  }

  async uploadS3(file): Promise<any> {
    const { originalname, buffer } = file;
    const s3 = new S3({
      accessKeyId: process.env.AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    });
    return new Promise((resolve, reject) => {
      s3.upload(
        {
          Bucket: process.env.AWS_ACCESS_BUCKET_NAME + '/avata-dev',
          Key: originalname,
          Body: buffer,
        },
        (err, data) => {
          if (err) {
            console.log(err);
            reject(err.message);
          }
          resolve(data);
        },
      );
    });
  }
  async getListS3(): Promise<any> {
    const s3 = new S3({
      accessKeyId: process.env.AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    });
    return new Promise((resolve, reject) => {
      s3.listObjectsV2(
        {
          Bucket: process.env.AWS_ACCESS_BUCKET_NAME,
          Delimiter: '/',
          Prefix: 'avata-dev/',
        },
        (err, data) => {
          if (err) {
            console.log(err);
            reject(err.message);
          }
          resolve(data);
        },
      );
    });
  }
  async checkDeleteFile(fileName: string) {
    let data = await this.repo.count({
      where: { avatar: Like('%' + fileName) },
    });
    if (!data) {
      data = await this.repoData.count({
        where: { image: Like('%' + fileName) },
      });
    }
    // if (!data) {
    //   const dataTemp = await this.repoPage.find({});
    //   dataTemp.forEach((item: Page) => {
    //     item.content.forEach((subItem: any) => {
    //       if (!data && subItem.image && subItem.image.indexOf(fileName) === (process.env.DOMAIN + 'files/').length) {
    //         data = 1;
    //       }
    //       if (!data && subItem?.content?.blocks?.length > 0) {
    //         subItem?.content?.blocks.forEach((block: any) => {
    //           if (!data && block?.data?.file?.url.indexOf(fileName) === (process.env.DOMAIN + 'files/').length) {
    //             data = 1;
    //           }
    //         });
    //       }
    //     });
    //   });
    // }
    return data;
    // if (!data) {
    //   const s3 = new S3({
    //     accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    //     secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    //   });
    //   s3.deleteObject(
    //     {
    //       Bucket: process.env.AWS_ACCESS_BUCKET_NAME,
    //       Key: fileName,
    //     },
    //     (err, data) => {
    //       if (err) {
    //         console.log(err);
    //       }
    //       console.log(data);
    //     },
    //   );
    // }
  }
}
