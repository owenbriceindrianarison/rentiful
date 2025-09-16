import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-jwt';
import { CognitoJwtVerifier } from 'aws-jwt-verify';
import { AuthService, CognitoUser } from '../auth.service';

@Injectable()
export class CognitoStrategy extends PassportStrategy(Strategy, 'cognito') {
  private verifier: any;

  constructor(private authService: AuthService) {
    super({
      jwtFromRequest: (req) => {
        const authHeader = req.headers.authorization;
        if (authHeader && authHeader.startsWith('Bearer ')) {
          return authHeader.substring(7);
        }
        return null;
      },
      ignoreExpiration: false,
      secretOrKey: process.env.COGNITO_USER_POOL_ID,
    });

    // Initialize Cognito JWT Verifier
    this.verifier = CognitoJwtVerifier.create({
      userPoolId: process.env.COGNITO_USER_POOL_ID!,
      tokenUse: 'id',
      clientId: process.env.COGNITO_CLIENT_ID!,
    });
  }

  async validate(payload: any): Promise<CognitoUser> {
    try {
      // Verify the JWT token with Cognito
      const verifiedPayload = await this.verifier.verify(payload);

      const cognitoUser: CognitoUser = {
        sub: verifiedPayload.sub,
        email: verifiedPayload.email,
        'custom:role': verifiedPayload['custom:role'] || 'tenant',
        name: verifiedPayload.name,
        phone_number: verifiedPayload.phone_number,
      };

      // Validate user exists in database
      const user = await this.authService.validateCognitoUser(cognitoUser);
      if (!user) {
        // If user doesn't exist, create them
        await this.authService.createOrUpdateUser(cognitoUser);
      }

      return cognitoUser;
    } catch (error) {
      console.error('JWT validation error:', error);
      throw new UnauthorizedException('Invalid token');
    }
  }
}
