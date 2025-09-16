import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { PrismaService } from '../prisma.service';

describe('AuthService', () => {
  let service: AuthService;
  let prismaService: PrismaService;

  const mockPrismaService = {
    manager: {
      findUnique: jest.fn(),
      upsert: jest.fn(),
    },
    tenant: {
      findUnique: jest.fn(),
      upsert: jest.fn(),
    },
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: PrismaService,
          useValue: mockPrismaService,
        },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
    prismaService = module.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('validateCognitoUser', () => {
    it('should return manager when role is manager', async () => {
      const cognitoUser = {
        sub: 'test-cognito-id',
        email: 'test@example.com',
        'custom:role': 'manager',
      };

      const mockManager = {
        id: 1,
        cognitoId: 'test-cognito-id',
        name: 'Test Manager',
        email: 'test@example.com',
        phoneNumber: '1234567890',
      };

      mockPrismaService.manager.findUnique.mockResolvedValue(mockManager);

      const result = await service.validateCognitoUser(cognitoUser);

      expect(result).toEqual(mockManager);
      expect(mockPrismaService.manager.findUnique).toHaveBeenCalledWith({
        where: { cognitoId: 'test-cognito-id' },
      });
    });

    it('should return tenant when role is tenant', async () => {
      const cognitoUser = {
        sub: 'test-cognito-id',
        email: 'test@example.com',
        'custom:role': 'tenant',
      };

      const mockTenant = {
        id: 1,
        cognitoId: 'test-cognito-id',
        name: 'Test Tenant',
        email: 'test@example.com',
        phoneNumber: '1234567890',
      };

      mockPrismaService.tenant.findUnique.mockResolvedValue(mockTenant);

      const result = await service.validateCognitoUser(cognitoUser);

      expect(result).toEqual(mockTenant);
      expect(mockPrismaService.tenant.findUnique).toHaveBeenCalledWith({
        where: { cognitoId: 'test-cognito-id' },
      });
    });

    it('should return null for unknown role', async () => {
      const cognitoUser = {
        sub: 'test-cognito-id',
        email: 'test@example.com',
        'custom:role': 'unknown',
      };

      const result = await service.validateCognitoUser(cognitoUser);

      expect(result).toBeNull();
    });
  });
});
