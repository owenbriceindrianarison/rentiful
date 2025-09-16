import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { Manager } from '../../generated/prisma';

@Injectable()
export class ManagersService {
  constructor(private prisma: PrismaService) {}

  async findOne(cognitoId: string): Promise<Manager> {
    const manager = await this.prisma.manager.findUnique({
      where: { cognitoId },
      include: {
        managedProperties: {
          include: {
            location: true,
            applications: true,
            leases: true,
          },
        },
      },
    });

    if (!manager) {
      throw new NotFoundException(
        `Manager with cognitoId ${cognitoId} not found`,
      );
    }

    return manager;
  }

  async update(
    cognitoId: string,
    updateData: Partial<Manager>,
  ): Promise<Manager> {
    const manager = await this.prisma.manager.update({
      where: { cognitoId },
      data: updateData,
    });

    return manager;
  }
}
