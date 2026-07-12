import {
	CanActivate,
	ExecutionContext,
	Injectable,
	UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';

import { jwtConstants } from './jwt.strategy';

@Injectable()
export class JwtAuthGuard implements CanActivate {
	private readonly jwtService = new JwtService({
		secret: jwtConstants.secret,
	});

	async canActivate(context: ExecutionContext): Promise<boolean> {
		const request = context.switchToHttp().getRequest<Request & { user?: unknown }>();
		const authorizationHeader = request.headers.authorization;

		if (!authorizationHeader?.startsWith('Bearer ')) {
			throw new UnauthorizedException('Missing bearer token');
		}

		const token = authorizationHeader.slice('Bearer '.length).trim();

		if (!token) {
			throw new UnauthorizedException('Missing bearer token');
		}

		try {
			const payload = await this.jwtService.verifyAsync<Record<string, unknown>>(token);
			request.user = payload;
			return true;
		} catch {
			throw new UnauthorizedException('Invalid or expired token');
		}
	}
}
