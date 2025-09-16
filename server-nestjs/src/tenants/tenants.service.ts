import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { Tenant } from '../../generated/prisma';

@Injectable()
export class TenantsService {
  constructor(private prisma: PrismaService) {}

  async findOne(cognitoId: string): Promise<Tenant> {
    const tenant = await this.prisma.tenant.findUnique({
      where: { cognitoId },
      include: {
        properties: {
          include: {
            location: true,
            manager: true,
          },
        },
        favorites: {
          include: {
            location: true,
            manager: true,
          },
        },
        applications: {
          include: {
            property: {
              include: {
                location: true,
                manager: true,
              },
            },
            lease: true,
          },
        },
        leases: {
          include: {
            property: {
              include: {
                location: true,
                manager: true,
              },
            },
            payments: true,
          },
        },
      },
    });

    if (!tenant) {
      throw new NotFoundException(
        `Tenant with cognitoId ${cognitoId} not found`,
      );
    }

    return tenant;
  }

  async update(
    cognitoId: string,
    updateData: Partial<Tenant>,
  ): Promise<Tenant> {
    const tenant = await this.prisma.tenant.update({
      where: { cognitoId },
      data: updateData,
    });

    return tenant;
  }
}
