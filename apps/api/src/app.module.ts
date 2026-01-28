import { Module } from '@nestjs/common';
import { join } from 'path';

import { AppService } from './app.service';
import { AppController } from './app.controller';
import { GraphQLModule } from '@nestjs/graphql';
import { MercuriusDriver, MercuriusDriverConfig } from '@nestjs/mercurius';
import { UserModule } from './components/user/user.module';
import { PrismaModule } from './components/prisma/prisma.module';
import { TicketModule } from './components/ticket/ticket.module';
import { EventModule } from './components/event/event.module';

@Module({
  imports: [
    GraphQLModule.forRoot<MercuriusDriverConfig>({
      driver: MercuriusDriver,
      fieldResolverEnhancers: ['guards'],
      autoSchemaFile: join(process.cwd(), 'src/generated/schema.gql'),
      sortSchema: true,
      graphiql: false,
    }),
    PrismaModule,
    UserModule,
    TicketModule,
    EventModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
