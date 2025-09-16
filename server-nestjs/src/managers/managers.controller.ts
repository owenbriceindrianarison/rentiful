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
import { ManagersService } from './managers.service';
import { Manager } from '../../generated/prisma';

@Controller('managers')
export class ManagersController {
  constructor(private managersService: ManagersService) {}

  @Get(':cognitoId')
  @UseGuards(CognitoAuthGuard)
  async findOne(
    @Param('cognitoId') cognitoId: string,
    @CurrentUser() user: any,
  ): Promise<Manager> {
    // Verify that the authenticated user is accessing their own data
    if (user.sub !== cognitoId) {
      throw new ForbiddenException('Cannot access other manager data');
    }

    return this.managersService.findOne(cognitoId);
  }

  @Put(':cognitoId')
  @UseGuards(CognitoAuthGuard)
  async update(
    @Param('cognitoId') cognitoId: string,
    @Body() updateData: Partial<Manager>,
    @CurrentUser() user: any,
  ): Promise<Manager> {
    // Verify that the authenticated user is updating their own data
    if (user.sub !== cognitoId) {
      throw new ForbiddenException('Cannot update other manager data');
    }

    return this.managersService.update(cognitoId, updateData);
  }
}
