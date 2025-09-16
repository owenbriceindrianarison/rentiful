import {
  Controller,
  Get,
  Put,
  Param,
  Body,
  UseGuards,
  ForbiddenException,
} from '@nestjs/common';
import { CognitoAuthGuard } from '../auth/guards/cognito-auth.guard';
import { CurrentUser } from '../auth/decorators/user.decorator';
import { TenantsService } from './tenants.service';
import { Tenant } from '../../generated/prisma';

@Controller('tenants')
export class TenantsController {
  constructor(private tenantsService: TenantsService) {}

  @Get(':cognitoId')
  @UseGuards(CognitoAuthGuard)
  async findOne(
    @Param('cognitoId') cognitoId: string,
    @CurrentUser() user: any,
  ): Promise<Tenant> {
    // Verify that the authenticated user is accessing their own data
    if (user.sub !== cognitoId) {
      throw new ForbiddenException('Cannot access other tenant data');
    }

    return this.tenantsService.findOne(cognitoId);
  }

  @Put(':cognitoId')
  @UseGuards(CognitoAuthGuard)
  async update(
    @Param('cognitoId') cognitoId: string,
    @Body() updateData: Partial<Tenant>,
    @CurrentUser() user: any,
  ): Promise<Tenant> {
    // Verify that the authenticated user is updating their own data
    if (user.sub !== cognitoId) {
      throw new ForbiddenException('Cannot update other tenant data');
    }

    return this.tenantsService.update(cognitoId, updateData);
  }
}
