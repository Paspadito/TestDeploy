import { Controller, Get, Param, ServiceUnavailableException } from '@nestjs/common';
import { InjectConnection } from '@nestjs/mongoose';
import type { Connection } from 'mongoose';
import { AppService } from './app.service.js';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    @InjectConnection() private readonly connection: Connection,
  ) {}

  @Get()
  async getHello(): Promise<{ api: string; database: string }> {
    try {
      if (this.connection.readyState !== 1 || !this.connection.db) {
        throw new Error('MongoDB no está conectada');
      }

      await this.connection.db.admin().ping();
      return { api: 'funciona', database: 'conectada' };
    } catch {
      throw new ServiceUnavailableException({
        api: 'funciona',
        database: 'desconectada',
      });
    }
  }

  @Get('a')
  getA(): string {
    return this.appService.getHello();
  }

  @Get('a/saludar')
  getSaludarSantiago(): string {
    return this.appService.getSaludarAldownDeSantiago();
  }

  @Get('a/:id')
  traerUno(@Param('id') id: string): string {
    return this.appService.traerUno(id);
  }
}
