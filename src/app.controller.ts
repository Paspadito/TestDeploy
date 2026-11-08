import { Controller, Get, ServiceUnavailableException } from '@nestjs/common';
import { InjectConnection } from '@nestjs/mongoose';
import { Connection } from 'mongoose';

@Controller()
export class AppController {
  constructor(@InjectConnection() private readonly connection: Connection) {}

  @Get()
  async getStatus(): Promise<{ api: string; database: string }> {
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
}
