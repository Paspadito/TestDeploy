import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';

function getMongoUri(): string {
  const uri = process.env.MONGODB_URI;

  if (!uri || uri.includes('USUARIO:CONTRASENA') || uri.includes('cluster.mongodb.net')) {
    throw new Error(
      'MONGODB_URI no está configurada. Reemplaza los valores de ejemplo en .env por la URI de MongoDB Atlas.',
    );
  }

  return uri;
}

@Module({
  imports: [
    MongooseModule.forRootAsync({
      useFactory: () => ({
        uri: getMongoUri(),
        retryAttempts: 1,
        serverSelectionTimeoutMS: 10_000,
        maxPoolSize: 5,
      }),
    }),
  ],
  controllers: [AppController],
})
export class AppModule {}
