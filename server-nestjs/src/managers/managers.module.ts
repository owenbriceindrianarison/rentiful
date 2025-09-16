import { Module } from '@nestjs/common';
import { ManagersController } from './managers.controller';
import { ManagersService } from './managers.service';
import { PrismaService } from '../prisma.service';

@Module({
  controllers: [ManagersController],
  providers: [ManagersService, PrismaService],
})
export class ManagersModule {}
