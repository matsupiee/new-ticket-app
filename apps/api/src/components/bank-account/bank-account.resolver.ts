// import {
//   Args,
//   ID,
//   Info,
//   Parent,
//   Query,
//   ResolveField,
//   Resolver,
// } from '@nestjs/graphql';
// import {
//   BankAccount,
//   EventOrganizer,
//   EventOrganizer,
// } from 'src/generated/prisma-nestjs-graphql';
// import { BankAccountConnection } from './dto/bank-account.connection';
// import { type GraphQLResolveInfo } from 'graphql';
// import { BankAccountsArgs } from './dto/bank-accounts.args';
// import { BankAccountService } from './bank-account.service';
// import { PrismaService } from '../prisma/prisma.service';

// @Resolver(() => BankAccount)
// export class BankAccountResolver {
//   constructor(
//     private readonly bankAccountService: BankAccountService,
//     private readonly prisma: PrismaService,
//   ) {}

//   @Query(() => BankAccount, {
//     description: '銀行口座を1件取得する',
//     nullable: true,
//   })
//   async bankAccount(@Args('id', { type: () => ID }) id: string) {
//     return this.bankAccountService.findOne(id);
//   }

//   @Query(() => BankAccountConnection, {
//     description: '銀行口座を複数取得する',
//   })
//   async bankAccounts(
//     @Args() args: BankAccountsArgs,
//     @Info() resolveInfo: GraphQLResolveInfo,
//   ): Promise<BankAccountConnection> {
//     return this.bankAccountService.findMany(args, resolveInfo);
//   }

//   @ResolveField(() => EventOrganizer, {
//     nullable: false,
//   })
//   async EventOrganizer(@Parent() bankAccount: BankAccount) {
//     return this.prisma.bankAccount
//       .findUnique({ where: { id: bankAccount.id } })
//       .eventOrganizer();
//   }
// }
