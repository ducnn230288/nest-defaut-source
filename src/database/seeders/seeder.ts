import { Injectable, Logger } from '@nestjs/common';
import commandLineArgs from 'command-line-args';
import { RolesService } from '../../modules/user/roles/roles.service';
import { UserService } from '../../modules/user/user.service';
import { NewRoleInput } from '../../modules/user/roles/dto/new-role.input';
import { NewUserInput } from '../../modules/user/dto/new-user.input';

export interface CommandLineArgsOptions extends commandLineArgs.CommandLineOptions {
  truncate: boolean;
  merchants: number;
}

@Injectable()
export class Seeder {
  constructor(
    private readonly logger: Logger,
    private readonly rolesService: RolesService,
    private readonly usersService: UserService,
  ) {}
  public async run(args: CommandLineArgsOptions) {
    // if (args.prod) {
    //   return await this.seedProd();
    // }
    return;
  }

  private async seedProd() {
    try {
      await this.adminUser();
    } catch (error) {
      this.logger.error('Failed seeding users...');
      throw error;
    }

    this.logger.debug('Production Seeding complete.');
  }

  private async adminUser() {
    const adminRole = await this.adminRole();

    const adminUser = await this.usersService.findOne('1');
    if (adminUser) {
      this.logger.debug('Admin user already exists, skipping.');
      return adminUser;
    }

    // await this.usersService.repo.save([
    //   {
    //     email: 'admin@site.com',
    //     password: 'password',
    //     firstName: 'Site',
    //     lastName: 'Admin',
    //     roleId: adminRole.id,
    //   } as NewUserInput,
    // ]);
    await new Promise((resolve) => setTimeout(resolve, 500)); // https://github.com/nestjs/typeorm/issues/646
    this.logger.debug('Admin user created.');
  }

  private async adminRole() {
    const adminRole = await this.rolesService.findOne('1');
    if (adminRole) {
      this.logger.debug('Admin role already exists, skipping.');
      return adminRole;
    }

    const createdRoles = await this.rolesService.create([
      { id: '1', name: 'Administrator', isSystemAdmin: true } as NewRoleInput,
    ]);
    this.logger.debug('Admin role created.');

    return createdRoles[0];
  }
}
