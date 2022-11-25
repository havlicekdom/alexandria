import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MailerModule } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { ServeStaticModule } from '@nestjs/serve-static';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { BookModule } from './book/book.module';
import { AuthorModule } from './author/author.module';
import { GenreModule } from './genre/genre.module';
import { LoansModule } from './loans/loans.module';

const ENV = process.env.NODE_ENV;
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: !ENV ? '.env' : `.env.${ENV}`,
    }),
    MailerModule.forRootAsync({
      useFactory: () => ({
        transport: `smtps://${process.env.SMTP_USER}@${process.env.SMTP_DOMAIN}:${process.env.SMTP_PASS}@${process.env.SMTP_URL}`,
        defaults: {
          from: '"Alexandria" <noreply@alexandria.com>',
        },
        preview: true,
        template: {
          dir: `${__dirname}/templates/mailing`,
          adapter: new HandlebarsAdapter(),
          options: {
            strict: true,
          },
        },
        options: {
          partials: {
            dir: `${__dirname}/templates/mailing/partials`,
            options: {
              strict: true,
            },
          },
        },
      }),
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', '..', 'client', 'build'),
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST ?? '127.0.0.1',
      port: 3306,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      autoLoadEntities: true,
      synchronize: true,
    }),
    UserModule,
    AuthModule,
    BookModule,
    AuthorModule,
    GenreModule,
    LoansModule,
  ],
  providers: [],
})
export class AppModule {}
