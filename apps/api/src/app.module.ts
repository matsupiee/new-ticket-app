import { Module } from '@nestjs/common';
import { join } from 'path';

import { AppService } from './app.service';
import { GraphQLModule } from '@nestjs/graphql';
import { MercuriusDriver, MercuriusDriverConfig } from '@nestjs/mercurius';
import { UserModule } from './components/user/user.module';
import { PrismaModule } from './components/prisma/prisma.module';
import { EventModule } from './components/event/event.module';
import { SessionModule } from './components/session/session.module';
import { AccountModule } from './components/account/account.module';
import { VerificationModule } from './components/verification/verification.module';
import { UserRestrictionModule } from './components/user-restriction/user-restriction.module';
import { EventOrganizerModule } from './components/event-organizer/event-organizer.module';
import { EventOrganizerFeatureModule } from './components/event-organizer-feature/event-organizer-feature.module';
// import { BankAccountModule } from './components/bank-account/bank-account.module';
import { EventOrganizerReferrerModule } from './components/event-organizer-referrer/event-organizer-referrer.module';
import { StageModule } from './components/stage/stage.module';
import { VenueModule } from './components/venue/venue.module';
import { ArtistModule } from './components/artist/artist.module';
import { StageArtistModule } from './components/stage-artist/stage-artist.module';
import { SaleScheduleModule } from './components/sale-schedule/sale-schedule.module';
import { AvailablePaymentMethodModule } from './components/available-payment-method/available-payment-method.module';
import { TicketTypeModule } from './components/ticket-type/ticket-type.module';
import { TicketTypePriceDistributionModule } from './components/ticket-type-price-distribution/ticket-type-price-distribution.module';
import { TicketTypeFeeModule } from './components/ticket-type-fee/ticket-type-fee.module';
import { TicketTypeFeeDistributionModule } from './components/ticket-type-fee-distribution/ticket-type-fee-distribution.module';
import { TicketApplicationModule } from './components/ticket-application/ticket-application.module';
import { TicketApplicationItemModule } from './components/ticket-application-item/ticket-application-item.module';
import { PaymentModule } from './components/payment/payment.module';
import { PaymentItemModule } from './components/payment-item/payment-item.module';
import { PaymentCardModule } from './components/payment-card/payment-card.module';
import { TicketModule } from './components/ticket/ticket.module';
import { FavoriteArtistModule } from './components/favorite-artist/favorite-artist.module';
import { FavoriteEventModule } from './components/favorite-event/favorite-event.module';
import { FeaturedEventModule } from './components/featured-event/featured-event.module';

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
    EventModule,
    SessionModule,
    AccountModule,
    VerificationModule,
    UserRestrictionModule,
    EventOrganizerModule,
    EventOrganizerFeatureModule,
    // BankAccountModule,
    EventOrganizerReferrerModule,
    StageModule,
    VenueModule,
    ArtistModule,
    StageArtistModule,
    SaleScheduleModule,
    AvailablePaymentMethodModule,
    TicketTypeModule,
    TicketTypePriceDistributionModule,
    TicketTypeFeeModule,
    TicketTypeFeeDistributionModule,
    TicketApplicationModule,
    TicketApplicationItemModule,
    PaymentModule,
    PaymentItemModule,
    PaymentCardModule,
    TicketModule,
    FavoriteArtistModule,
    FavoriteEventModule,
    FeaturedEventModule,
  ],
  providers: [AppService],
})
export class AppModule {}
