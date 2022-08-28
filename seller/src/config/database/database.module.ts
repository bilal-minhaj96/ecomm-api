/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-var-requires */
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CustomConfigService } from '../../shared/services/custom-config.service';
require('dotenv').config();
require('dotenv').config({
  path: `./environment/.env.${process.env.NODE_ENV}`,
});
@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'mysql',
        host: configService.get('DB_HOST'),
        port: configService.get('DB_PORT'),
        username: configService.get('DB_USERNAME'),
        password: configService.get('DB_PASSWORD'),
        database: configService.get('DB_NAME'),
        entities: ['dist/**/*.entity.js'],
        synchronize: false,
        ssl: new CustomConfigService().get('SSL'),
        migrations: ['dist/migration/*.js'],
        cli: {
          migrationsDir: 'migration',
        },
        factories: __dirname + 'dist/**/database/factories/**/*.js',
        seeds: __dirname + 'dist/**/database/seeds/**/*.js',
        //   cache: {
        //     duration: 60000, // 60 seconds
        //     type: "database",
        //     tableName: "query-result-cache"
        // }
      }),
    }),
  ],
  providers: [CustomConfigService],
})
export class DatabaseModule {
  constructor() {}
}
