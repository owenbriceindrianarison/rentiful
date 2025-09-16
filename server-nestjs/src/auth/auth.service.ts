import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { Manager, Tenant } from '../../generated/prisma';

export interface CognitoUser {
  sub: string; // Cognito User ID
  email: string;
  'custom:role': string;
  name?: string;
  phone_number?: string;
}

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService) {}

  async validateCognitoUser(
    cognitoUser: CognitoUser,
  ): Promise<Manager | Tenant | null> {
    const { sub: cognitoId, 'custom:role': role } = cognitoUser;

    try {
      if (role === 'manager') {
        return await this.prisma.manager.findUnique({
          where: { cognitoId },
        });
      } else if (role === 'tenant') {
        return await this.prisma.tenant.findUnique({
          where: { cognitoId },
        });
      }
    } catch (error) {
      console.error('Error validating Cognito user:', error);
      return null;
    }

    return null;
  }

  async createOrUpdateUser(
    cognitoUser: CognitoUser,
  ): Promise<Manager | Tenant> {
    const {
      sub: cognitoId,
      email,
      'custom:role': role,
      name,
      phone_number,
    } = cognitoUser;

    const userData = {
      cognitoId,
      email,
      name: name || email.split('@')[0], // Fallback to email prefix if name not provided
      phoneNumber: phone_number || '',
    };

    if (role === 'manager') {
      return await this.prisma.manager.upsert({
        where: { cognitoId },
        update: userData,
        create: userData,
      });
    } else {
      return await this.prisma.tenant.upsert({
        where: { cognitoId },
        update: userData,
        create: userData,
      });
    }
  }
}
