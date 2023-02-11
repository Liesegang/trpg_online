import { Controller, Get } from '@nestjs/common';
import { Roles, Unprotected } from 'nest-keycloak-connect';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @Unprotected()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('/user')
  @Roles({ roles: ['user'] })
  getUser(): string {
    return 'Hello for user';
  }

  @Get('/admin')
  @Roles({ roles: ['admin'] })
  getAdmin(): string {
    return 'Hello for admin';
  }

  @Get('/any')
  @Roles({ roles: [] })
  getAny(): string {
    return 'Hello for anyone';
  }
}
