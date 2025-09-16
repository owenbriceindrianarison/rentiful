import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaService } from './prisma.service';
import { AuthModule } from './auth/auth.module';
import { ManagersModule } from './managers/managers.module';
import { TenantsModule } from './tenants/tenants.module';

@Module({
  imports: [AuthModule, ManagersModule, TenantsModule],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}
