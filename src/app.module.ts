import { ConfigModule } from '@nestjs/config';
import { Module } from '@nestjs/common';
// import { TypeOrmModule } from '@nestjs/typeorm';
import { GraphQLModule } from '@nestjs/graphql';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { join } from 'path';
import { CommandModule } from 'nestjs-command';
import { CurrenciesModule } from './currencies/currencies.module';
import { RatesModule } from './rates/rates.module';
import { ServeStaticModule } from '@nestjs/serve-static';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'client/dist'),
      serveRoot: '/api',
    }),
    CommandModule,
    ConfigModule.forRoot(),
    // TypeOrmModule.forRoot(),
    GraphQLModule.forRoot({
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      sortSchema: true,
      playground: true,
      debug: false,
    }),
    MongooseModule.forRoot(process.env.mongoURI),
    CurrenciesModule,
    RatesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
