import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { Type } from 'class-transformer';
import { Prisma } from 'src/generated/prisma/client';
import { registerEnumType } from '@nestjs/graphql';
import { ObjectType } from '@nestjs/graphql';
import { ID } from '@nestjs/graphql';
import { Int } from '@nestjs/graphql';
import { Float } from '@nestjs/graphql';

export enum UserScalarFieldEnum {
    id = "id",
    createdAt = "createdAt",
    updatedAt = "updatedAt",
    email = "email",
    name = "name"
}

export enum TicketScalarFieldEnum {
    id = "id",
    createdAt = "createdAt",
    updatedAt = "updatedAt",
    eventId = "eventId",
    name = "name",
    price = "price",
    stock = "stock"
}

export enum TransactionIsolationLevel {
    ReadUncommitted = "ReadUncommitted",
    ReadCommitted = "ReadCommitted",
    RepeatableRead = "RepeatableRead",
    Serializable = "Serializable"
}

export enum SortOrder {
    asc = "asc",
    desc = "desc"
}

export enum QueryMode {
    'default' = "default",
    insensitive = "insensitive"
}

export enum OrderStatus {
    PENDING = "PENDING",
    COMPLETED = "COMPLETED",
    CANCELLED = "CANCELLED"
}

export enum NullsOrder {
    first = "first",
    last = "last"
}

export enum OrderItemScalarFieldEnum {
    id = "id",
    createdAt = "createdAt",
    updatedAt = "updatedAt",
    orderId = "orderId",
    ticketId = "ticketId",
    quantity = "quantity",
    unitPrice = "unitPrice"
}

export enum OrderScalarFieldEnum {
    id = "id",
    createdAt = "createdAt",
    updatedAt = "updatedAt",
    userId = "userId",
    totalPrice = "totalPrice",
    status = "status"
}

export enum EventScalarFieldEnum {
    id = "id",
    createdAt = "createdAt",
    updatedAt = "updatedAt",
    title = "title",
    description = "description",
    venue = "venue",
    date = "date"
}

registerEnumType(EventScalarFieldEnum, { name: 'EventScalarFieldEnum', description: undefined })
registerEnumType(OrderScalarFieldEnum, { name: 'OrderScalarFieldEnum', description: undefined })
registerEnumType(OrderItemScalarFieldEnum, { name: 'OrderItemScalarFieldEnum', description: undefined })
registerEnumType(NullsOrder, { name: 'NullsOrder', description: undefined })
registerEnumType(OrderStatus, { name: 'OrderStatus', description: undefined })
registerEnumType(QueryMode, { name: 'QueryMode', description: undefined })
registerEnumType(SortOrder, { name: 'SortOrder', description: undefined })
registerEnumType(TransactionIsolationLevel, { name: 'TransactionIsolationLevel', description: undefined })
registerEnumType(TicketScalarFieldEnum, { name: 'TicketScalarFieldEnum', description: undefined })
registerEnumType(UserScalarFieldEnum, { name: 'UserScalarFieldEnum', description: undefined })

@InputType()
export class EventCountOrderByAggregateInput {
    @Field(() => SortOrder, {nullable:true})
    id?: `${SortOrder}`;
    @Field(() => SortOrder, {nullable:true})
    createdAt?: `${SortOrder}`;
    @Field(() => SortOrder, {nullable:true})
    updatedAt?: `${SortOrder}`;
    @Field(() => SortOrder, {nullable:true})
    title?: `${SortOrder}`;
    @Field(() => SortOrder, {nullable:true})
    description?: `${SortOrder}`;
    @Field(() => SortOrder, {nullable:true})
    venue?: `${SortOrder}`;
    @Field(() => SortOrder, {nullable:true})
    date?: `${SortOrder}`;
}

@InputType()
export class EventCreateManyInput {
    @Field(() => String, {nullable:true})
    id?: string;
    @Field(() => Date, {nullable:true})
    createdAt?: Date | string;
    @Field(() => Date, {nullable:true})
    updatedAt?: Date | string;
    @Field(() => String, {nullable:false})
    title!: string;
    @Field(() => String, {nullable:true})
    description?: string;
    @Field(() => String, {nullable:false})
    venue!: string;
    @Field(() => Date, {nullable:false})
    date!: Date | string;
}

@InputType()
export class EventCreateNestedOneWithoutTicketsInput {
    @Field(() => EventCreateWithoutTicketsInput, {nullable:true})
    @Type(() => EventCreateWithoutTicketsInput)
    create?: InstanceType<typeof EventCreateWithoutTicketsInput>;
    @Field(() => EventCreateOrConnectWithoutTicketsInput, {nullable:true})
    @Type(() => EventCreateOrConnectWithoutTicketsInput)
    connectOrCreate?: InstanceType<typeof EventCreateOrConnectWithoutTicketsInput>;
    @Field(() => EventWhereUniqueInput, {nullable:true})
    @Type(() => EventWhereUniqueInput)
    connect?: Prisma.AtLeast<EventWhereUniqueInput, 'id'>;
}

@InputType()
export class EventCreateOrConnectWithoutTicketsInput {
    @Field(() => EventWhereUniqueInput, {nullable:false})
    @Type(() => EventWhereUniqueInput)
    where!: Prisma.AtLeast<EventWhereUniqueInput, 'id'>;
    @Field(() => EventCreateWithoutTicketsInput, {nullable:false})
    @Type(() => EventCreateWithoutTicketsInput)
    create!: InstanceType<typeof EventCreateWithoutTicketsInput>;
}

@InputType()
export class EventCreateWithoutTicketsInput {
    @Field(() => String, {nullable:true})
    id?: string;
    @Field(() => Date, {nullable:true})
    createdAt?: Date | string;
    @Field(() => Date, {nullable:true})
    updatedAt?: Date | string;
    @Field(() => String, {nullable:false})
    title!: string;
    @Field(() => String, {nullable:true})
    description?: string;
    @Field(() => String, {nullable:false})
    venue!: string;
    @Field(() => Date, {nullable:false})
    date!: Date | string;
}

@InputType()
export class EventCreateInput {
    @Field(() => String, {nullable:true})
    id?: string;
    @Field(() => Date, {nullable:true})
    createdAt?: Date | string;
    @Field(() => Date, {nullable:true})
    updatedAt?: Date | string;
    @Field(() => String, {nullable:false})
    title!: string;
    @Field(() => String, {nullable:true})
    description?: string;
    @Field(() => String, {nullable:false})
    venue!: string;
    @Field(() => Date, {nullable:false})
    date!: Date | string;
    @Field(() => TicketCreateNestedManyWithoutEventInput, {nullable:true})
    tickets?: InstanceType<typeof TicketCreateNestedManyWithoutEventInput>;
}

@InputType()
export class EventMaxOrderByAggregateInput {
    @Field(() => SortOrder, {nullable:true})
    id?: `${SortOrder}`;
    @Field(() => SortOrder, {nullable:true})
    createdAt?: `${SortOrder}`;
    @Field(() => SortOrder, {nullable:true})
    updatedAt?: `${SortOrder}`;
    @Field(() => SortOrder, {nullable:true})
    title?: `${SortOrder}`;
    @Field(() => SortOrder, {nullable:true})
    description?: `${SortOrder}`;
    @Field(() => SortOrder, {nullable:true})
    venue?: `${SortOrder}`;
    @Field(() => SortOrder, {nullable:true})
    date?: `${SortOrder}`;
}

@InputType()
export class EventMinOrderByAggregateInput {
    @Field(() => SortOrder, {nullable:true})
    id?: `${SortOrder}`;
    @Field(() => SortOrder, {nullable:true})
    createdAt?: `${SortOrder}`;
    @Field(() => SortOrder, {nullable:true})
    updatedAt?: `${SortOrder}`;
    @Field(() => SortOrder, {nullable:true})
    title?: `${SortOrder}`;
    @Field(() => SortOrder, {nullable:true})
    description?: `${SortOrder}`;
    @Field(() => SortOrder, {nullable:true})
    venue?: `${SortOrder}`;
    @Field(() => SortOrder, {nullable:true})
    date?: `${SortOrder}`;
}

@InputType()
export class EventOrderByWithAggregationInput {
    @Field(() => SortOrder, {nullable:true})
    id?: `${SortOrder}`;
    @Field(() => SortOrder, {nullable:true})
    createdAt?: `${SortOrder}`;
    @Field(() => SortOrder, {nullable:true})
    updatedAt?: `${SortOrder}`;
    @Field(() => SortOrder, {nullable:true})
    title?: `${SortOrder}`;
    @Field(() => SortOrderInput, {nullable:true})
    description?: InstanceType<typeof SortOrderInput>;
    @Field(() => SortOrder, {nullable:true})
    venue?: `${SortOrder}`;
    @Field(() => SortOrder, {nullable:true})
    date?: `${SortOrder}`;
    @Field(() => EventCountOrderByAggregateInput, {nullable:true})
    _count?: InstanceType<typeof EventCountOrderByAggregateInput>;
    @Field(() => EventMaxOrderByAggregateInput, {nullable:true})
    _max?: InstanceType<typeof EventMaxOrderByAggregateInput>;
    @Field(() => EventMinOrderByAggregateInput, {nullable:true})
    _min?: InstanceType<typeof EventMinOrderByAggregateInput>;
}

@InputType()
export class EventOrderByWithRelationInput {
    @Field(() => SortOrder, {nullable:true})
    id?: `${SortOrder}`;
    @Field(() => SortOrder, {nullable:true})
    createdAt?: `${SortOrder}`;
    @Field(() => SortOrder, {nullable:true})
    updatedAt?: `${SortOrder}`;
    @Field(() => SortOrder, {nullable:true})
    title?: `${SortOrder}`;
    @Field(() => SortOrderInput, {nullable:true})
    description?: InstanceType<typeof SortOrderInput>;
    @Field(() => SortOrder, {nullable:true})
    venue?: `${SortOrder}`;
    @Field(() => SortOrder, {nullable:true})
    date?: `${SortOrder}`;
    @Field(() => TicketOrderByRelationAggregateInput, {nullable:true})
    tickets?: InstanceType<typeof TicketOrderByRelationAggregateInput>;
}

@InputType()
export class EventScalarRelationFilter {
    @Field(() => EventWhereInput, {nullable:true})
    is?: InstanceType<typeof EventWhereInput>;
    @Field(() => EventWhereInput, {nullable:true})
    isNot?: InstanceType<typeof EventWhereInput>;
}

@InputType()
export class EventScalarWhereWithAggregatesInput {
    @Field(() => [EventScalarWhereWithAggregatesInput], {nullable:true})
    AND?: Array<EventScalarWhereWithAggregatesInput>;
    @Field(() => [EventScalarWhereWithAggregatesInput], {nullable:true})
    OR?: Array<EventScalarWhereWithAggregatesInput>;
    @Field(() => [EventScalarWhereWithAggregatesInput], {nullable:true})
    NOT?: Array<EventScalarWhereWithAggregatesInput>;
    @Field(() => StringWithAggregatesFilter, {nullable:true})
    id?: InstanceType<typeof StringWithAggregatesFilter>;
    @Field(() => DateTimeWithAggregatesFilter, {nullable:true})
    createdAt?: InstanceType<typeof DateTimeWithAggregatesFilter>;
    @Field(() => DateTimeWithAggregatesFilter, {nullable:true})
    updatedAt?: InstanceType<typeof DateTimeWithAggregatesFilter>;
    @Field(() => StringWithAggregatesFilter, {nullable:true})
    title?: InstanceType<typeof StringWithAggregatesFilter>;
    @Field(() => StringNullableWithAggregatesFilter, {nullable:true})
    description?: InstanceType<typeof StringNullableWithAggregatesFilter>;
    @Field(() => StringWithAggregatesFilter, {nullable:true})
    venue?: InstanceType<typeof StringWithAggregatesFilter>;
    @Field(() => DateTimeWithAggregatesFilter, {nullable:true})
    date?: InstanceType<typeof DateTimeWithAggregatesFilter>;
}

@InputType()
export class EventUncheckedCreateWithoutTicketsInput {
    @Field(() => String, {nullable:true})
    id?: string;
    @Field(() => Date, {nullable:true})
    createdAt?: Date | string;
    @Field(() => Date, {nullable:true})
    updatedAt?: Date | string;
    @Field(() => String, {nullable:false})
    title!: string;
    @Field(() => String, {nullable:true})
    description?: string;
    @Field(() => String, {nullable:false})
    venue!: string;
    @Field(() => Date, {nullable:false})
    date!: Date | string;
}

@InputType()
export class EventUncheckedCreateInput {
    @Field(() => String, {nullable:true})
    id?: string;
    @Field(() => Date, {nullable:true})
    createdAt?: Date | string;
    @Field(() => Date, {nullable:true})
    updatedAt?: Date | string;
    @Field(() => String, {nullable:false})
    title!: string;
    @Field(() => String, {nullable:true})
    description?: string;
    @Field(() => String, {nullable:false})
    venue!: string;
    @Field(() => Date, {nullable:false})
    date!: Date | string;
    @Field(() => TicketUncheckedCreateNestedManyWithoutEventInput, {nullable:true})
    tickets?: InstanceType<typeof TicketUncheckedCreateNestedManyWithoutEventInput>;
}

@InputType()
export class EventUncheckedUpdateManyInput {
    @Field(() => StringFieldUpdateOperationsInput, {nullable:true})
    id?: InstanceType<typeof StringFieldUpdateOperationsInput>;
    @Field(() => DateTimeFieldUpdateOperationsInput, {nullable:true})
    createdAt?: InstanceType<typeof DateTimeFieldUpdateOperationsInput>;
    @Field(() => DateTimeFieldUpdateOperationsInput, {nullable:true})
    updatedAt?: InstanceType<typeof DateTimeFieldUpdateOperationsInput>;
    @Field(() => StringFieldUpdateOperationsInput, {nullable:true})
    title?: InstanceType<typeof StringFieldUpdateOperationsInput>;
    @Field(() => NullableStringFieldUpdateOperationsInput, {nullable:true})
    description?: InstanceType<typeof NullableStringFieldUpdateOperationsInput>;
    @Field(() => StringFieldUpdateOperationsInput, {nullable:true})
    venue?: InstanceType<typeof StringFieldUpdateOperationsInput>;
    @Field(() => DateTimeFieldUpdateOperationsInput, {nullable:true})
    date?: InstanceType<typeof DateTimeFieldUpdateOperationsInput>;
}

@InputType()
export class EventUncheckedUpdateWithoutTicketsInput {
    @Field(() => StringFieldUpdateOperationsInput, {nullable:true})
    id?: InstanceType<typeof StringFieldUpdateOperationsInput>;
    @Field(() => DateTimeFieldUpdateOperationsInput, {nullable:true})
    createdAt?: InstanceType<typeof DateTimeFieldUpdateOperationsInput>;
    @Field(() => DateTimeFieldUpdateOperationsInput, {nullable:true})
    updatedAt?: InstanceType<typeof DateTimeFieldUpdateOperationsInput>;
    @Field(() => StringFieldUpdateOperationsInput, {nullable:true})
    title?: InstanceType<typeof StringFieldUpdateOperationsInput>;
    @Field(() => NullableStringFieldUpdateOperationsInput, {nullable:true})
    description?: InstanceType<typeof NullableStringFieldUpdateOperationsInput>;
    @Field(() => StringFieldUpdateOperationsInput, {nullable:true})
    venue?: InstanceType<typeof StringFieldUpdateOperationsInput>;
    @Field(() => DateTimeFieldUpdateOperationsInput, {nullable:true})
    date?: InstanceType<typeof DateTimeFieldUpdateOperationsInput>;
}

@InputType()
export class EventUncheckedUpdateInput {
    @Field(() => StringFieldUpdateOperationsInput, {nullable:true})
    id?: InstanceType<typeof StringFieldUpdateOperationsInput>;
    @Field(() => DateTimeFieldUpdateOperationsInput, {nullable:true})
    createdAt?: InstanceType<typeof DateTimeFieldUpdateOperationsInput>;
    @Field(() => DateTimeFieldUpdateOperationsInput, {nullable:true})
    updatedAt?: InstanceType<typeof DateTimeFieldUpdateOperationsInput>;
    @Field(() => StringFieldUpdateOperationsInput, {nullable:true})
    title?: InstanceType<typeof StringFieldUpdateOperationsInput>;
    @Field(() => NullableStringFieldUpdateOperationsInput, {nullable:true})
    description?: InstanceType<typeof NullableStringFieldUpdateOperationsInput>;
    @Field(() => StringFieldUpdateOperationsInput, {nullable:true})
    venue?: InstanceType<typeof StringFieldUpdateOperationsInput>;
    @Field(() => DateTimeFieldUpdateOperationsInput, {nullable:true})
    date?: InstanceType<typeof DateTimeFieldUpdateOperationsInput>;
    @Field(() => TicketUncheckedUpdateManyWithoutEventNestedInput, {nullable:true})
    tickets?: InstanceType<typeof TicketUncheckedUpdateManyWithoutEventNestedInput>;
}

@InputType()
export class EventUpdateManyMutationInput {
    @Field(() => StringFieldUpdateOperationsInput, {nullable:true})
    id?: InstanceType<typeof StringFieldUpdateOperationsInput>;
    @Field(() => DateTimeFieldUpdateOperationsInput, {nullable:true})
    createdAt?: InstanceType<typeof DateTimeFieldUpdateOperationsInput>;
    @Field(() => DateTimeFieldUpdateOperationsInput, {nullable:true})
    updatedAt?: InstanceType<typeof DateTimeFieldUpdateOperationsInput>;
    @Field(() => StringFieldUpdateOperationsInput, {nullable:true})
    title?: InstanceType<typeof StringFieldUpdateOperationsInput>;
    @Field(() => NullableStringFieldUpdateOperationsInput, {nullable:true})
    description?: InstanceType<typeof NullableStringFieldUpdateOperationsInput>;
    @Field(() => StringFieldUpdateOperationsInput, {nullable:true})
    venue?: InstanceType<typeof StringFieldUpdateOperationsInput>;
    @Field(() => DateTimeFieldUpdateOperationsInput, {nullable:true})
    date?: InstanceType<typeof DateTimeFieldUpdateOperationsInput>;
}

@InputType()
export class EventUpdateOneRequiredWithoutTicketsNestedInput {
    @Field(() => EventCreateWithoutTicketsInput, {nullable:true})
    @Type(() => EventCreateWithoutTicketsInput)
    create?: InstanceType<typeof EventCreateWithoutTicketsInput>;
    @Field(() => EventCreateOrConnectWithoutTicketsInput, {nullable:true})
    @Type(() => EventCreateOrConnectWithoutTicketsInput)
    connectOrCreate?: InstanceType<typeof EventCreateOrConnectWithoutTicketsInput>;
    @Field(() => EventUpsertWithoutTicketsInput, {nullable:true})
    @Type(() => EventUpsertWithoutTicketsInput)
    upsert?: InstanceType<typeof EventUpsertWithoutTicketsInput>;
    @Field(() => EventWhereUniqueInput, {nullable:true})
    @Type(() => EventWhereUniqueInput)
    connect?: Prisma.AtLeast<EventWhereUniqueInput, 'id'>;
    @Field(() => EventUpdateToOneWithWhereWithoutTicketsInput, {nullable:true})
    @Type(() => EventUpdateToOneWithWhereWithoutTicketsInput)
    update?: InstanceType<typeof EventUpdateToOneWithWhereWithoutTicketsInput>;
}

@InputType()
export class EventUpdateToOneWithWhereWithoutTicketsInput {
    @Field(() => EventWhereInput, {nullable:true})
    @Type(() => EventWhereInput)
    where?: InstanceType<typeof EventWhereInput>;
    @Field(() => EventUpdateWithoutTicketsInput, {nullable:false})
    @Type(() => EventUpdateWithoutTicketsInput)
    data!: InstanceType<typeof EventUpdateWithoutTicketsInput>;
}

@InputType()
export class EventUpdateWithoutTicketsInput {
    @Field(() => StringFieldUpdateOperationsInput, {nullable:true})
    id?: InstanceType<typeof StringFieldUpdateOperationsInput>;
    @Field(() => DateTimeFieldUpdateOperationsInput, {nullable:true})
    createdAt?: InstanceType<typeof DateTimeFieldUpdateOperationsInput>;
    @Field(() => DateTimeFieldUpdateOperationsInput, {nullable:true})
    updatedAt?: InstanceType<typeof DateTimeFieldUpdateOperationsInput>;
    @Field(() => StringFieldUpdateOperationsInput, {nullable:true})
    title?: InstanceType<typeof StringFieldUpdateOperationsInput>;
    @Field(() => NullableStringFieldUpdateOperationsInput, {nullable:true})
    description?: InstanceType<typeof NullableStringFieldUpdateOperationsInput>;
    @Field(() => StringFieldUpdateOperationsInput, {nullable:true})
    venue?: InstanceType<typeof StringFieldUpdateOperationsInput>;
    @Field(() => DateTimeFieldUpdateOperationsInput, {nullable:true})
    date?: InstanceType<typeof DateTimeFieldUpdateOperationsInput>;
}

@InputType()
export class EventUpdateInput {
    @Field(() => StringFieldUpdateOperationsInput, {nullable:true})
    id?: InstanceType<typeof StringFieldUpdateOperationsInput>;
    @Field(() => DateTimeFieldUpdateOperationsInput, {nullable:true})
    createdAt?: InstanceType<typeof DateTimeFieldUpdateOperationsInput>;
    @Field(() => DateTimeFieldUpdateOperationsInput, {nullable:true})
    updatedAt?: InstanceType<typeof DateTimeFieldUpdateOperationsInput>;
    @Field(() => StringFieldUpdateOperationsInput, {nullable:true})
    title?: InstanceType<typeof StringFieldUpdateOperationsInput>;
    @Field(() => NullableStringFieldUpdateOperationsInput, {nullable:true})
    description?: InstanceType<typeof NullableStringFieldUpdateOperationsInput>;
    @Field(() => StringFieldUpdateOperationsInput, {nullable:true})
    venue?: InstanceType<typeof StringFieldUpdateOperationsInput>;
    @Field(() => DateTimeFieldUpdateOperationsInput, {nullable:true})
    date?: InstanceType<typeof DateTimeFieldUpdateOperationsInput>;
    @Field(() => TicketUpdateManyWithoutEventNestedInput, {nullable:true})
    tickets?: InstanceType<typeof TicketUpdateManyWithoutEventNestedInput>;
}

@InputType()
export class EventUpsertWithoutTicketsInput {
    @Field(() => EventUpdateWithoutTicketsInput, {nullable:false})
    @Type(() => EventUpdateWithoutTicketsInput)
    update!: InstanceType<typeof EventUpdateWithoutTicketsInput>;
    @Field(() => EventCreateWithoutTicketsInput, {nullable:false})
    @Type(() => EventCreateWithoutTicketsInput)
    create!: InstanceType<typeof EventCreateWithoutTicketsInput>;
    @Field(() => EventWhereInput, {nullable:true})
    @Type(() => EventWhereInput)
    where?: InstanceType<typeof EventWhereInput>;
}

@InputType()
export class EventWhereUniqueInput {
    @Field(() => String, {nullable:true})
    id?: string;
    @Field(() => [EventWhereInput], {nullable:true})
    AND?: Array<EventWhereInput>;
    @Field(() => [EventWhereInput], {nullable:true})
    OR?: Array<EventWhereInput>;
    @Field(() => [EventWhereInput], {nullable:true})
    NOT?: Array<EventWhereInput>;
    @Field(() => DateTimeFilter, {nullable:true})
    createdAt?: InstanceType<typeof DateTimeFilter>;
    @Field(() => DateTimeFilter, {nullable:true})
    updatedAt?: InstanceType<typeof DateTimeFilter>;
    @Field(() => StringFilter, {nullable:true})
    title?: InstanceType<typeof StringFilter>;
    @Field(() => StringNullableFilter, {nullable:true})
    description?: InstanceType<typeof StringNullableFilter>;
    @Field(() => StringFilter, {nullable:true})
    venue?: InstanceType<typeof StringFilter>;
    @Field(() => DateTimeFilter, {nullable:true})
    date?: InstanceType<typeof DateTimeFilter>;
    @Field(() => TicketListRelationFilter, {nullable:true})
    tickets?: InstanceType<typeof TicketListRelationFilter>;
}

@InputType()
export class EventWhereInput {
    @Field(() => [EventWhereInput], {nullable:true})
    AND?: Array<EventWhereInput>;
    @Field(() => [EventWhereInput], {nullable:true})
    OR?: Array<EventWhereInput>;
    @Field(() => [EventWhereInput], {nullable:true})
    NOT?: Array<EventWhereInput>;
    @Field(() => StringFilter, {nullable:true})
    id?: InstanceType<typeof StringFilter>;
    @Field(() => DateTimeFilter, {nullable:true})
    createdAt?: InstanceType<typeof DateTimeFilter>;
    @Field(() => DateTimeFilter, {nullable:true})
    updatedAt?: InstanceType<typeof DateTimeFilter>;
    @Field(() => StringFilter, {nullable:true})
    title?: InstanceType<typeof StringFilter>;
    @Field(() => StringNullableFilter, {nullable:true})
    description?: InstanceType<typeof StringNullableFilter>;
    @Field(() => StringFilter, {nullable:true})
    venue?: InstanceType<typeof StringFilter>;
    @Field(() => DateTimeFilter, {nullable:true})
    date?: InstanceType<typeof DateTimeFilter>;
    @Field(() => TicketListRelationFilter, {nullable:true})
    tickets?: InstanceType<typeof TicketListRelationFilter>;
}

@ObjectType()
export class Event {
    @Field(() => ID, {nullable:false})
    id!: string;
    @Field(() => Date, {nullable:false})
    createdAt!: Date;
    @Field(() => Date, {nullable:false})
    updatedAt!: Date;
    @Field(() => String, {nullable:false})
    title!: string;
    @Field(() => String, {nullable:true})
    description!: string | null;
    @Field(() => String, {nullable:false})
    venue!: string;
    @Field(() => Date, {nullable:false})
    date!: Date;
    @Field(() => [Ticket], {nullable:true})
    tickets?: Array<Ticket>;
}

@InputType()
export class OrderAvgOrderByAggregateInput {
    @Field(() => SortOrder, {nullable:true})
    totalPrice?: `${SortOrder}`;
}

@InputType()
export class OrderCountOrderByAggregateInput {
    @Field(() => SortOrder, {nullable:true})
    id?: `${SortOrder}`;
    @Field(() => SortOrder, {nullable:true})
    createdAt?: `${SortOrder}`;
    @Field(() => SortOrder, {nullable:true})
    updatedAt?: `${SortOrder}`;
    @Field(() => SortOrder, {nullable:true})
    userId?: `${SortOrder}`;
    @Field(() => SortOrder, {nullable:true})
    totalPrice?: `${SortOrder}`;
    @Field(() => SortOrder, {nullable:true})
    status?: `${SortOrder}`;
}

@InputType()
export class OrderCreateManyUserInputEnvelope {
    @Field(() => [OrderCreateManyUserInput], {nullable:false})
    @Type(() => OrderCreateManyUserInput)
    data!: Array<OrderCreateManyUserInput>;
    @Field(() => Boolean, {nullable:true})
    skipDuplicates?: boolean;
}

@InputType()
export class OrderCreateManyUserInput {
    @Field(() => String, {nullable:true})
    id?: string;
    @Field(() => Date, {nullable:true})
    createdAt?: Date | string;
    @Field(() => Date, {nullable:true})
    updatedAt?: Date | string;
    @Field(() => Int, {nullable:false})
    totalPrice!: number;
    @Field(() => OrderStatus, {nullable:true})
    status?: `${OrderStatus}`;
}

@InputType()
export class OrderCreateManyInput {
    @Field(() => String, {nullable:true})
    id?: string;
    @Field(() => Date, {nullable:true})
    createdAt?: Date | string;
    @Field(() => Date, {nullable:true})
    updatedAt?: Date | string;
    @Field(() => String, {nullable:false})
    userId!: string;
    @Field(() => Int, {nullable:false})
    totalPrice!: number;
    @Field(() => OrderStatus, {nullable:true})
    status?: `${OrderStatus}`;
}

@InputType()
export class OrderCreateNestedManyWithoutUserInput {
    @Field(() => [OrderCreateWithoutUserInput], {nullable:true})
    @Type(() => OrderCreateWithoutUserInput)
    create?: Array<OrderCreateWithoutUserInput>;
    @Field(() => [OrderCreateOrConnectWithoutUserInput], {nullable:true})
    @Type(() => OrderCreateOrConnectWithoutUserInput)
    connectOrCreate?: Array<OrderCreateOrConnectWithoutUserInput>;
    @Field(() => OrderCreateManyUserInputEnvelope, {nullable:true})
    @Type(() => OrderCreateManyUserInputEnvelope)
    createMany?: InstanceType<typeof OrderCreateManyUserInputEnvelope>;
    @Field(() => [OrderWhereUniqueInput], {nullable:true})
    @Type(() => OrderWhereUniqueInput)
    connect?: Array<Prisma.AtLeast<OrderWhereUniqueInput, 'id'>>;
}

@InputType()
export class OrderCreateNestedOneWithoutItemsInput {
    @Field(() => OrderCreateWithoutItemsInput, {nullable:true})
    @Type(() => OrderCreateWithoutItemsInput)
    create?: InstanceType<typeof OrderCreateWithoutItemsInput>;
    @Field(() => OrderCreateOrConnectWithoutItemsInput, {nullable:true})
    @Type(() => OrderCreateOrConnectWithoutItemsInput)
    connectOrCreate?: InstanceType<typeof OrderCreateOrConnectWithoutItemsInput>;
    @Field(() => OrderWhereUniqueInput, {nullable:true})
    @Type(() => OrderWhereUniqueInput)
    connect?: Prisma.AtLeast<OrderWhereUniqueInput, 'id'>;
}

@InputType()
export class OrderCreateOrConnectWithoutItemsInput {
    @Field(() => OrderWhereUniqueInput, {nullable:false})
    @Type(() => OrderWhereUniqueInput)
    where!: Prisma.AtLeast<OrderWhereUniqueInput, 'id'>;
    @Field(() => OrderCreateWithoutItemsInput, {nullable:false})
    @Type(() => OrderCreateWithoutItemsInput)
    create!: InstanceType<typeof OrderCreateWithoutItemsInput>;
}

@InputType()
export class OrderCreateOrConnectWithoutUserInput {
    @Field(() => OrderWhereUniqueInput, {nullable:false})
    @Type(() => OrderWhereUniqueInput)
    where!: Prisma.AtLeast<OrderWhereUniqueInput, 'id'>;
    @Field(() => OrderCreateWithoutUserInput, {nullable:false})
    @Type(() => OrderCreateWithoutUserInput)
    create!: InstanceType<typeof OrderCreateWithoutUserInput>;
}

@InputType()
export class OrderCreateWithoutItemsInput {
    @Field(() => String, {nullable:true})
    id?: string;
    @Field(() => Date, {nullable:true})
    createdAt?: Date | string;
    @Field(() => Date, {nullable:true})
    updatedAt?: Date | string;
    @Field(() => Int, {nullable:false})
    totalPrice!: number;
    @Field(() => OrderStatus, {nullable:true})
    status?: `${OrderStatus}`;
    @Field(() => UserCreateNestedOneWithoutOrdersInput, {nullable:false})
    user!: InstanceType<typeof UserCreateNestedOneWithoutOrdersInput>;
}

@InputType()
export class OrderCreateWithoutUserInput {
    @Field(() => String, {nullable:true})
    id?: string;
    @Field(() => Date, {nullable:true})
    createdAt?: Date | string;
    @Field(() => Date, {nullable:true})
    updatedAt?: Date | string;
    @Field(() => Int, {nullable:false})
    totalPrice!: number;
    @Field(() => OrderStatus, {nullable:true})
    status?: `${OrderStatus}`;
    @Field(() => OrderItemCreateNestedManyWithoutOrderInput, {nullable:true})
    items?: InstanceType<typeof OrderItemCreateNestedManyWithoutOrderInput>;
}

@InputType()
export class OrderCreateInput {
    @Field(() => String, {nullable:true})
    id?: string;
    @Field(() => Date, {nullable:true})
    createdAt?: Date | string;
    @Field(() => Date, {nullable:true})
    updatedAt?: Date | string;
    @Field(() => Int, {nullable:false})
    totalPrice!: number;
    @Field(() => OrderStatus, {nullable:true})
    status?: `${OrderStatus}`;
    @Field(() => UserCreateNestedOneWithoutOrdersInput, {nullable:false})
    user!: InstanceType<typeof UserCreateNestedOneWithoutOrdersInput>;
    @Field(() => OrderItemCreateNestedManyWithoutOrderInput, {nullable:true})
    items?: InstanceType<typeof OrderItemCreateNestedManyWithoutOrderInput>;
}

@InputType()
export class OrderListRelationFilter {
    @Field(() => OrderWhereInput, {nullable:true})
    every?: InstanceType<typeof OrderWhereInput>;
    @Field(() => OrderWhereInput, {nullable:true})
    some?: InstanceType<typeof OrderWhereInput>;
    @Field(() => OrderWhereInput, {nullable:true})
    none?: InstanceType<typeof OrderWhereInput>;
}

@InputType()
export class OrderMaxOrderByAggregateInput {
    @Field(() => SortOrder, {nullable:true})
    id?: `${SortOrder}`;
    @Field(() => SortOrder, {nullable:true})
    createdAt?: `${SortOrder}`;
    @Field(() => SortOrder, {nullable:true})
    updatedAt?: `${SortOrder}`;
    @Field(() => SortOrder, {nullable:true})
    userId?: `${SortOrder}`;
    @Field(() => SortOrder, {nullable:true})
    totalPrice?: `${SortOrder}`;
    @Field(() => SortOrder, {nullable:true})
    status?: `${SortOrder}`;
}

@InputType()
export class OrderMinOrderByAggregateInput {
    @Field(() => SortOrder, {nullable:true})
    id?: `${SortOrder}`;
    @Field(() => SortOrder, {nullable:true})
    createdAt?: `${SortOrder}`;
    @Field(() => SortOrder, {nullable:true})
    updatedAt?: `${SortOrder}`;
    @Field(() => SortOrder, {nullable:true})
    userId?: `${SortOrder}`;
    @Field(() => SortOrder, {nullable:true})
    totalPrice?: `${SortOrder}`;
    @Field(() => SortOrder, {nullable:true})
    status?: `${SortOrder}`;
}

@InputType()
export class OrderOrderByRelationAggregateInput {
    @Field(() => SortOrder, {nullable:true})
    _count?: `${SortOrder}`;
}

@InputType()
export class OrderOrderByWithAggregationInput {
    @Field(() => SortOrder, {nullable:true})
    id?: `${SortOrder}`;
    @Field(() => SortOrder, {nullable:true})
    createdAt?: `${SortOrder}`;
    @Field(() => SortOrder, {nullable:true})
    updatedAt?: `${SortOrder}`;
    @Field(() => SortOrder, {nullable:true})
    userId?: `${SortOrder}`;
    @Field(() => SortOrder, {nullable:true})
    totalPrice?: `${SortOrder}`;
    @Field(() => SortOrder, {nullable:true})
    status?: `${SortOrder}`;
    @Field(() => OrderCountOrderByAggregateInput, {nullable:true})
    _count?: InstanceType<typeof OrderCountOrderByAggregateInput>;
    @Field(() => OrderAvgOrderByAggregateInput, {nullable:true})
    _avg?: InstanceType<typeof OrderAvgOrderByAggregateInput>;
    @Field(() => OrderMaxOrderByAggregateInput, {nullable:true})
    _max?: InstanceType<typeof OrderMaxOrderByAggregateInput>;
    @Field(() => OrderMinOrderByAggregateInput, {nullable:true})
    _min?: InstanceType<typeof OrderMinOrderByAggregateInput>;
    @Field(() => OrderSumOrderByAggregateInput, {nullable:true})
    _sum?: InstanceType<typeof OrderSumOrderByAggregateInput>;
}

@InputType()
export class OrderOrderByWithRelationInput {
    @Field(() => SortOrder, {nullable:true})
    id?: `${SortOrder}`;
    @Field(() => SortOrder, {nullable:true})
    createdAt?: `${SortOrder}`;
    @Field(() => SortOrder, {nullable:true})
    updatedAt?: `${SortOrder}`;
    @Field(() => SortOrder, {nullable:true})
    userId?: `${SortOrder}`;
    @Field(() => SortOrder, {nullable:true})
    totalPrice?: `${SortOrder}`;
    @Field(() => SortOrder, {nullable:true})
    status?: `${SortOrder}`;
    @Field(() => UserOrderByWithRelationInput, {nullable:true})
    user?: InstanceType<typeof UserOrderByWithRelationInput>;
    @Field(() => OrderItemOrderByRelationAggregateInput, {nullable:true})
    items?: InstanceType<typeof OrderItemOrderByRelationAggregateInput>;
}

@InputType()
export class OrderScalarRelationFilter {
    @Field(() => OrderWhereInput, {nullable:true})
    is?: InstanceType<typeof OrderWhereInput>;
    @Field(() => OrderWhereInput, {nullable:true})
    isNot?: InstanceType<typeof OrderWhereInput>;
}

@InputType()
export class OrderScalarWhereWithAggregatesInput {
    @Field(() => [OrderScalarWhereWithAggregatesInput], {nullable:true})
    AND?: Array<OrderScalarWhereWithAggregatesInput>;
    @Field(() => [OrderScalarWhereWithAggregatesInput], {nullable:true})
    OR?: Array<OrderScalarWhereWithAggregatesInput>;
    @Field(() => [OrderScalarWhereWithAggregatesInput], {nullable:true})
    NOT?: Array<OrderScalarWhereWithAggregatesInput>;
    @Field(() => StringWithAggregatesFilter, {nullable:true})
    id?: InstanceType<typeof StringWithAggregatesFilter>;
    @Field(() => DateTimeWithAggregatesFilter, {nullable:true})
    createdAt?: InstanceType<typeof DateTimeWithAggregatesFilter>;
    @Field(() => DateTimeWithAggregatesFilter, {nullable:true})
    updatedAt?: InstanceType<typeof DateTimeWithAggregatesFilter>;
    @Field(() => StringWithAggregatesFilter, {nullable:true})
    userId?: InstanceType<typeof StringWithAggregatesFilter>;
    @Field(() => IntWithAggregatesFilter, {nullable:true})
    totalPrice?: InstanceType<typeof IntWithAggregatesFilter>;
    @Field(() => EnumOrderStatusWithAggregatesFilter, {nullable:true})
    status?: InstanceType<typeof EnumOrderStatusWithAggregatesFilter>;
}

@InputType()
export class OrderScalarWhereInput {
    @Field(() => [OrderScalarWhereInput], {nullable:true})
    AND?: Array<OrderScalarWhereInput>;
    @Field(() => [OrderScalarWhereInput], {nullable:true})
    OR?: Array<OrderScalarWhereInput>;
    @Field(() => [OrderScalarWhereInput], {nullable:true})
    NOT?: Array<OrderScalarWhereInput>;
    @Field(() => StringFilter, {nullable:true})
    id?: InstanceType<typeof StringFilter>;
    @Field(() => DateTimeFilter, {nullable:true})
    createdAt?: InstanceType<typeof DateTimeFilter>;
    @Field(() => DateTimeFilter, {nullable:true})
    updatedAt?: InstanceType<typeof DateTimeFilter>;
    @Field(() => StringFilter, {nullable:true})
    userId?: InstanceType<typeof StringFilter>;
    @Field(() => IntFilter, {nullable:true})
    totalPrice?: InstanceType<typeof IntFilter>;
    @Field(() => EnumOrderStatusFilter, {nullable:true})
    status?: InstanceType<typeof EnumOrderStatusFilter>;
}

@InputType()
export class OrderSumOrderByAggregateInput {
    @Field(() => SortOrder, {nullable:true})
    totalPrice?: `${SortOrder}`;
}

@InputType()
export class OrderUncheckedCreateNestedManyWithoutUserInput {
    @Field(() => [OrderCreateWithoutUserInput], {nullable:true})
    @Type(() => OrderCreateWithoutUserInput)
    create?: Array<OrderCreateWithoutUserInput>;
    @Field(() => [OrderCreateOrConnectWithoutUserInput], {nullable:true})
    @Type(() => OrderCreateOrConnectWithoutUserInput)
    connectOrCreate?: Array<OrderCreateOrConnectWithoutUserInput>;
    @Field(() => OrderCreateManyUserInputEnvelope, {nullable:true})
    @Type(() => OrderCreateManyUserInputEnvelope)
    createMany?: InstanceType<typeof OrderCreateManyUserInputEnvelope>;
    @Field(() => [OrderWhereUniqueInput], {nullable:true})
    @Type(() => OrderWhereUniqueInput)
    connect?: Array<Prisma.AtLeast<OrderWhereUniqueInput, 'id'>>;
}

@InputType()
export class OrderUncheckedCreateWithoutItemsInput {
    @Field(() => String, {nullable:true})
    id?: string;
    @Field(() => Date, {nullable:true})
    createdAt?: Date | string;
    @Field(() => Date, {nullable:true})
    updatedAt?: Date | string;
    @Field(() => String, {nullable:false})
    userId!: string;
    @Field(() => Int, {nullable:false})
    totalPrice!: number;
    @Field(() => OrderStatus, {nullable:true})
    status?: `${OrderStatus}`;
}

@InputType()
export class OrderUncheckedCreateWithoutUserInput {
    @Field(() => String, {nullable:true})
    id?: string;
    @Field(() => Date, {nullable:true})
    createdAt?: Date | string;
    @Field(() => Date, {nullable:true})
    updatedAt?: Date | string;
    @Field(() => Int, {nullable:false})
    totalPrice!: number;
    @Field(() => OrderStatus, {nullable:true})
    status?: `${OrderStatus}`;
    @Field(() => OrderItemUncheckedCreateNestedManyWithoutOrderInput, {nullable:true})
    items?: InstanceType<typeof OrderItemUncheckedCreateNestedManyWithoutOrderInput>;
}

@InputType()
export class OrderUncheckedCreateInput {
    @Field(() => String, {nullable:true})
    id?: string;
    @Field(() => Date, {nullable:true})
    createdAt?: Date | string;
    @Field(() => Date, {nullable:true})
    updatedAt?: Date | string;
    @Field(() => String, {nullable:false})
    userId!: string;
    @Field(() => Int, {nullable:false})
    totalPrice!: number;
    @Field(() => OrderStatus, {nullable:true})
    status?: `${OrderStatus}`;
    @Field(() => OrderItemUncheckedCreateNestedManyWithoutOrderInput, {nullable:true})
    items?: InstanceType<typeof OrderItemUncheckedCreateNestedManyWithoutOrderInput>;
}

@InputType()
export class OrderUncheckedUpdateManyWithoutUserNestedInput {
    @Field(() => [OrderCreateWithoutUserInput], {nullable:true})
    @Type(() => OrderCreateWithoutUserInput)
    create?: Array<OrderCreateWithoutUserInput>;
    @Field(() => [OrderCreateOrConnectWithoutUserInput], {nullable:true})
    @Type(() => OrderCreateOrConnectWithoutUserInput)
    connectOrCreate?: Array<OrderCreateOrConnectWithoutUserInput>;
    @Field(() => [OrderUpsertWithWhereUniqueWithoutUserInput], {nullable:true})
    @Type(() => OrderUpsertWithWhereUniqueWithoutUserInput)
    upsert?: Array<OrderUpsertWithWhereUniqueWithoutUserInput>;
    @Field(() => OrderCreateManyUserInputEnvelope, {nullable:true})
    @Type(() => OrderCreateManyUserInputEnvelope)
    createMany?: InstanceType<typeof OrderCreateManyUserInputEnvelope>;
    @Field(() => [OrderWhereUniqueInput], {nullable:true})
    @Type(() => OrderWhereUniqueInput)
    set?: Array<Prisma.AtLeast<OrderWhereUniqueInput, 'id'>>;
    @Field(() => [OrderWhereUniqueInput], {nullable:true})
    @Type(() => OrderWhereUniqueInput)
    disconnect?: Array<Prisma.AtLeast<OrderWhereUniqueInput, 'id'>>;
    @Field(() => [OrderWhereUniqueInput], {nullable:true})
    @Type(() => OrderWhereUniqueInput)
    delete?: Array<Prisma.AtLeast<OrderWhereUniqueInput, 'id'>>;
    @Field(() => [OrderWhereUniqueInput], {nullable:true})
    @Type(() => OrderWhereUniqueInput)
    connect?: Array<Prisma.AtLeast<OrderWhereUniqueInput, 'id'>>;
    @Field(() => [OrderUpdateWithWhereUniqueWithoutUserInput], {nullable:true})
    @Type(() => OrderUpdateWithWhereUniqueWithoutUserInput)
    update?: Array<OrderUpdateWithWhereUniqueWithoutUserInput>;
    @Field(() => [OrderUpdateManyWithWhereWithoutUserInput], {nullable:true})
    @Type(() => OrderUpdateManyWithWhereWithoutUserInput)
    updateMany?: Array<OrderUpdateManyWithWhereWithoutUserInput>;
    @Field(() => [OrderScalarWhereInput], {nullable:true})
    @Type(() => OrderScalarWhereInput)
    deleteMany?: Array<OrderScalarWhereInput>;
}

@InputType()
export class OrderUncheckedUpdateManyWithoutUserInput {
    @Field(() => StringFieldUpdateOperationsInput, {nullable:true})
    id?: InstanceType<typeof StringFieldUpdateOperationsInput>;
    @Field(() => DateTimeFieldUpdateOperationsInput, {nullable:true})
    createdAt?: InstanceType<typeof DateTimeFieldUpdateOperationsInput>;
    @Field(() => DateTimeFieldUpdateOperationsInput, {nullable:true})
    updatedAt?: InstanceType<typeof DateTimeFieldUpdateOperationsInput>;
    @Field(() => IntFieldUpdateOperationsInput, {nullable:true})
    totalPrice?: InstanceType<typeof IntFieldUpdateOperationsInput>;
    @Field(() => EnumOrderStatusFieldUpdateOperationsInput, {nullable:true})
    status?: InstanceType<typeof EnumOrderStatusFieldUpdateOperationsInput>;
}

@InputType()
export class OrderUncheckedUpdateManyInput {
    @Field(() => StringFieldUpdateOperationsInput, {nullable:true})
    id?: InstanceType<typeof StringFieldUpdateOperationsInput>;
    @Field(() => DateTimeFieldUpdateOperationsInput, {nullable:true})
    createdAt?: InstanceType<typeof DateTimeFieldUpdateOperationsInput>;
    @Field(() => DateTimeFieldUpdateOperationsInput, {nullable:true})
    updatedAt?: InstanceType<typeof DateTimeFieldUpdateOperationsInput>;
    @Field(() => StringFieldUpdateOperationsInput, {nullable:true})
    userId?: InstanceType<typeof StringFieldUpdateOperationsInput>;
    @Field(() => IntFieldUpdateOperationsInput, {nullable:true})
    totalPrice?: InstanceType<typeof IntFieldUpdateOperationsInput>;
    @Field(() => EnumOrderStatusFieldUpdateOperationsInput, {nullable:true})
    status?: InstanceType<typeof EnumOrderStatusFieldUpdateOperationsInput>;
}

@InputType()
export class OrderUncheckedUpdateWithoutItemsInput {
    @Field(() => StringFieldUpdateOperationsInput, {nullable:true})
    id?: InstanceType<typeof StringFieldUpdateOperationsInput>;
    @Field(() => DateTimeFieldUpdateOperationsInput, {nullable:true})
    createdAt?: InstanceType<typeof DateTimeFieldUpdateOperationsInput>;
    @Field(() => DateTimeFieldUpdateOperationsInput, {nullable:true})
    updatedAt?: InstanceType<typeof DateTimeFieldUpdateOperationsInput>;
    @Field(() => StringFieldUpdateOperationsInput, {nullable:true})
    userId?: InstanceType<typeof StringFieldUpdateOperationsInput>;
    @Field(() => IntFieldUpdateOperationsInput, {nullable:true})
    totalPrice?: InstanceType<typeof IntFieldUpdateOperationsInput>;
    @Field(() => EnumOrderStatusFieldUpdateOperationsInput, {nullable:true})
    status?: InstanceType<typeof EnumOrderStatusFieldUpdateOperationsInput>;
}

@InputType()
export class OrderUncheckedUpdateWithoutUserInput {
    @Field(() => StringFieldUpdateOperationsInput, {nullable:true})
    id?: InstanceType<typeof StringFieldUpdateOperationsInput>;
    @Field(() => DateTimeFieldUpdateOperationsInput, {nullable:true})
    createdAt?: InstanceType<typeof DateTimeFieldUpdateOperationsInput>;
    @Field(() => DateTimeFieldUpdateOperationsInput, {nullable:true})
    updatedAt?: InstanceType<typeof DateTimeFieldUpdateOperationsInput>;
    @Field(() => IntFieldUpdateOperationsInput, {nullable:true})
    totalPrice?: InstanceType<typeof IntFieldUpdateOperationsInput>;
    @Field(() => EnumOrderStatusFieldUpdateOperationsInput, {nullable:true})
    status?: InstanceType<typeof EnumOrderStatusFieldUpdateOperationsInput>;
    @Field(() => OrderItemUncheckedUpdateManyWithoutOrderNestedInput, {nullable:true})
    items?: InstanceType<typeof OrderItemUncheckedUpdateManyWithoutOrderNestedInput>;
}

@InputType()
export class OrderUncheckedUpdateInput {
    @Field(() => StringFieldUpdateOperationsInput, {nullable:true})
    id?: InstanceType<typeof StringFieldUpdateOperationsInput>;
    @Field(() => DateTimeFieldUpdateOperationsInput, {nullable:true})
    createdAt?: InstanceType<typeof DateTimeFieldUpdateOperationsInput>;
    @Field(() => DateTimeFieldUpdateOperationsInput, {nullable:true})
    updatedAt?: InstanceType<typeof DateTimeFieldUpdateOperationsInput>;
    @Field(() => StringFieldUpdateOperationsInput, {nullable:true})
    userId?: InstanceType<typeof StringFieldUpdateOperationsInput>;
    @Field(() => IntFieldUpdateOperationsInput, {nullable:true})
    totalPrice?: InstanceType<typeof IntFieldUpdateOperationsInput>;
    @Field(() => EnumOrderStatusFieldUpdateOperationsInput, {nullable:true})
    status?: InstanceType<typeof EnumOrderStatusFieldUpdateOperationsInput>;
    @Field(() => OrderItemUncheckedUpdateManyWithoutOrderNestedInput, {nullable:true})
    items?: InstanceType<typeof OrderItemUncheckedUpdateManyWithoutOrderNestedInput>;
}

@InputType()
export class OrderUpdateManyMutationInput {
    @Field(() => StringFieldUpdateOperationsInput, {nullable:true})
    id?: InstanceType<typeof StringFieldUpdateOperationsInput>;
    @Field(() => DateTimeFieldUpdateOperationsInput, {nullable:true})
    createdAt?: InstanceType<typeof DateTimeFieldUpdateOperationsInput>;
    @Field(() => DateTimeFieldUpdateOperationsInput, {nullable:true})
    updatedAt?: InstanceType<typeof DateTimeFieldUpdateOperationsInput>;
    @Field(() => IntFieldUpdateOperationsInput, {nullable:true})
    totalPrice?: InstanceType<typeof IntFieldUpdateOperationsInput>;
    @Field(() => EnumOrderStatusFieldUpdateOperationsInput, {nullable:true})
    status?: InstanceType<typeof EnumOrderStatusFieldUpdateOperationsInput>;
}

@InputType()
export class OrderUpdateManyWithWhereWithoutUserInput {
    @Field(() => OrderScalarWhereInput, {nullable:false})
    @Type(() => OrderScalarWhereInput)
    where!: InstanceType<typeof OrderScalarWhereInput>;
    @Field(() => OrderUpdateManyMutationInput, {nullable:false})
    @Type(() => OrderUpdateManyMutationInput)
    data!: InstanceType<typeof OrderUpdateManyMutationInput>;
}

@InputType()
export class OrderUpdateManyWithoutUserNestedInput {
    @Field(() => [OrderCreateWithoutUserInput], {nullable:true})
    @Type(() => OrderCreateWithoutUserInput)
    create?: Array<OrderCreateWithoutUserInput>;
    @Field(() => [OrderCreateOrConnectWithoutUserInput], {nullable:true})
    @Type(() => OrderCreateOrConnectWithoutUserInput)
    connectOrCreate?: Array<OrderCreateOrConnectWithoutUserInput>;
    @Field(() => [OrderUpsertWithWhereUniqueWithoutUserInput], {nullable:true})
    @Type(() => OrderUpsertWithWhereUniqueWithoutUserInput)
    upsert?: Array<OrderUpsertWithWhereUniqueWithoutUserInput>;
    @Field(() => OrderCreateManyUserInputEnvelope, {nullable:true})
    @Type(() => OrderCreateManyUserInputEnvelope)
    createMany?: InstanceType<typeof OrderCreateManyUserInputEnvelope>;
    @Field(() => [OrderWhereUniqueInput], {nullable:true})
    @Type(() => OrderWhereUniqueInput)
    set?: Array<Prisma.AtLeast<OrderWhereUniqueInput, 'id'>>;
    @Field(() => [OrderWhereUniqueInput], {nullable:true})
    @Type(() => OrderWhereUniqueInput)
    disconnect?: Array<Prisma.AtLeast<OrderWhereUniqueInput, 'id'>>;
    @Field(() => [OrderWhereUniqueInput], {nullable:true})
    @Type(() => OrderWhereUniqueInput)
    delete?: Array<Prisma.AtLeast<OrderWhereUniqueInput, 'id'>>;
    @Field(() => [OrderWhereUniqueInput], {nullable:true})
    @Type(() => OrderWhereUniqueInput)
    connect?: Array<Prisma.AtLeast<OrderWhereUniqueInput, 'id'>>;
    @Field(() => [OrderUpdateWithWhereUniqueWithoutUserInput], {nullable:true})
    @Type(() => OrderUpdateWithWhereUniqueWithoutUserInput)
    update?: Array<OrderUpdateWithWhereUniqueWithoutUserInput>;
    @Field(() => [OrderUpdateManyWithWhereWithoutUserInput], {nullable:true})
    @Type(() => OrderUpdateManyWithWhereWithoutUserInput)
    updateMany?: Array<OrderUpdateManyWithWhereWithoutUserInput>;
    @Field(() => [OrderScalarWhereInput], {nullable:true})
    @Type(() => OrderScalarWhereInput)
    deleteMany?: Array<OrderScalarWhereInput>;
}

@InputType()
export class OrderUpdateOneRequiredWithoutItemsNestedInput {
    @Field(() => OrderCreateWithoutItemsInput, {nullable:true})
    @Type(() => OrderCreateWithoutItemsInput)
    create?: InstanceType<typeof OrderCreateWithoutItemsInput>;
    @Field(() => OrderCreateOrConnectWithoutItemsInput, {nullable:true})
    @Type(() => OrderCreateOrConnectWithoutItemsInput)
    connectOrCreate?: InstanceType<typeof OrderCreateOrConnectWithoutItemsInput>;
    @Field(() => OrderUpsertWithoutItemsInput, {nullable:true})
    @Type(() => OrderUpsertWithoutItemsInput)
    upsert?: InstanceType<typeof OrderUpsertWithoutItemsInput>;
    @Field(() => OrderWhereUniqueInput, {nullable:true})
    @Type(() => OrderWhereUniqueInput)
    connect?: Prisma.AtLeast<OrderWhereUniqueInput, 'id'>;
    @Field(() => OrderUpdateToOneWithWhereWithoutItemsInput, {nullable:true})
    @Type(() => OrderUpdateToOneWithWhereWithoutItemsInput)
    update?: InstanceType<typeof OrderUpdateToOneWithWhereWithoutItemsInput>;
}

@InputType()
export class OrderUpdateToOneWithWhereWithoutItemsInput {
    @Field(() => OrderWhereInput, {nullable:true})
    @Type(() => OrderWhereInput)
    where?: InstanceType<typeof OrderWhereInput>;
    @Field(() => OrderUpdateWithoutItemsInput, {nullable:false})
    @Type(() => OrderUpdateWithoutItemsInput)
    data!: InstanceType<typeof OrderUpdateWithoutItemsInput>;
}

@InputType()
export class OrderUpdateWithWhereUniqueWithoutUserInput {
    @Field(() => OrderWhereUniqueInput, {nullable:false})
    @Type(() => OrderWhereUniqueInput)
    where!: Prisma.AtLeast<OrderWhereUniqueInput, 'id'>;
    @Field(() => OrderUpdateWithoutUserInput, {nullable:false})
    @Type(() => OrderUpdateWithoutUserInput)
    data!: InstanceType<typeof OrderUpdateWithoutUserInput>;
}

@InputType()
export class OrderUpdateWithoutItemsInput {
    @Field(() => StringFieldUpdateOperationsInput, {nullable:true})
    id?: InstanceType<typeof StringFieldUpdateOperationsInput>;
    @Field(() => DateTimeFieldUpdateOperationsInput, {nullable:true})
    createdAt?: InstanceType<typeof DateTimeFieldUpdateOperationsInput>;
    @Field(() => DateTimeFieldUpdateOperationsInput, {nullable:true})
    updatedAt?: InstanceType<typeof DateTimeFieldUpdateOperationsInput>;
    @Field(() => IntFieldUpdateOperationsInput, {nullable:true})
    totalPrice?: InstanceType<typeof IntFieldUpdateOperationsInput>;
    @Field(() => EnumOrderStatusFieldUpdateOperationsInput, {nullable:true})
    status?: InstanceType<typeof EnumOrderStatusFieldUpdateOperationsInput>;
    @Field(() => UserUpdateOneRequiredWithoutOrdersNestedInput, {nullable:true})
    user?: InstanceType<typeof UserUpdateOneRequiredWithoutOrdersNestedInput>;
}

@InputType()
export class OrderUpdateWithoutUserInput {
    @Field(() => StringFieldUpdateOperationsInput, {nullable:true})
    id?: InstanceType<typeof StringFieldUpdateOperationsInput>;
    @Field(() => DateTimeFieldUpdateOperationsInput, {nullable:true})
    createdAt?: InstanceType<typeof DateTimeFieldUpdateOperationsInput>;
    @Field(() => DateTimeFieldUpdateOperationsInput, {nullable:true})
    updatedAt?: InstanceType<typeof DateTimeFieldUpdateOperationsInput>;
    @Field(() => IntFieldUpdateOperationsInput, {nullable:true})
    totalPrice?: InstanceType<typeof IntFieldUpdateOperationsInput>;
    @Field(() => EnumOrderStatusFieldUpdateOperationsInput, {nullable:true})
    status?: InstanceType<typeof EnumOrderStatusFieldUpdateOperationsInput>;
    @Field(() => OrderItemUpdateManyWithoutOrderNestedInput, {nullable:true})
    items?: InstanceType<typeof OrderItemUpdateManyWithoutOrderNestedInput>;
}

@InputType()
export class OrderUpdateInput {
    @Field(() => StringFieldUpdateOperationsInput, {nullable:true})
    id?: InstanceType<typeof StringFieldUpdateOperationsInput>;
    @Field(() => DateTimeFieldUpdateOperationsInput, {nullable:true})
    createdAt?: InstanceType<typeof DateTimeFieldUpdateOperationsInput>;
    @Field(() => DateTimeFieldUpdateOperationsInput, {nullable:true})
    updatedAt?: InstanceType<typeof DateTimeFieldUpdateOperationsInput>;
    @Field(() => IntFieldUpdateOperationsInput, {nullable:true})
    totalPrice?: InstanceType<typeof IntFieldUpdateOperationsInput>;
    @Field(() => EnumOrderStatusFieldUpdateOperationsInput, {nullable:true})
    status?: InstanceType<typeof EnumOrderStatusFieldUpdateOperationsInput>;
    @Field(() => UserUpdateOneRequiredWithoutOrdersNestedInput, {nullable:true})
    user?: InstanceType<typeof UserUpdateOneRequiredWithoutOrdersNestedInput>;
    @Field(() => OrderItemUpdateManyWithoutOrderNestedInput, {nullable:true})
    items?: InstanceType<typeof OrderItemUpdateManyWithoutOrderNestedInput>;
}

@InputType()
export class OrderUpsertWithWhereUniqueWithoutUserInput {
    @Field(() => OrderWhereUniqueInput, {nullable:false})
    @Type(() => OrderWhereUniqueInput)
    where!: Prisma.AtLeast<OrderWhereUniqueInput, 'id'>;
    @Field(() => OrderUpdateWithoutUserInput, {nullable:false})
    @Type(() => OrderUpdateWithoutUserInput)
    update!: InstanceType<typeof OrderUpdateWithoutUserInput>;
    @Field(() => OrderCreateWithoutUserInput, {nullable:false})
    @Type(() => OrderCreateWithoutUserInput)
    create!: InstanceType<typeof OrderCreateWithoutUserInput>;
}

@InputType()
export class OrderUpsertWithoutItemsInput {
    @Field(() => OrderUpdateWithoutItemsInput, {nullable:false})
    @Type(() => OrderUpdateWithoutItemsInput)
    update!: InstanceType<typeof OrderUpdateWithoutItemsInput>;
    @Field(() => OrderCreateWithoutItemsInput, {nullable:false})
    @Type(() => OrderCreateWithoutItemsInput)
    create!: InstanceType<typeof OrderCreateWithoutItemsInput>;
    @Field(() => OrderWhereInput, {nullable:true})
    @Type(() => OrderWhereInput)
    where?: InstanceType<typeof OrderWhereInput>;
}

@InputType()
export class OrderWhereUniqueInput {
    @Field(() => String, {nullable:true})
    id?: string;
    @Field(() => [OrderWhereInput], {nullable:true})
    AND?: Array<OrderWhereInput>;
    @Field(() => [OrderWhereInput], {nullable:true})
    OR?: Array<OrderWhereInput>;
    @Field(() => [OrderWhereInput], {nullable:true})
    NOT?: Array<OrderWhereInput>;
    @Field(() => DateTimeFilter, {nullable:true})
    createdAt?: InstanceType<typeof DateTimeFilter>;
    @Field(() => DateTimeFilter, {nullable:true})
    updatedAt?: InstanceType<typeof DateTimeFilter>;
    @Field(() => StringFilter, {nullable:true})
    userId?: InstanceType<typeof StringFilter>;
    @Field(() => IntFilter, {nullable:true})
    totalPrice?: InstanceType<typeof IntFilter>;
    @Field(() => EnumOrderStatusFilter, {nullable:true})
    status?: InstanceType<typeof EnumOrderStatusFilter>;
    @Field(() => UserScalarRelationFilter, {nullable:true})
    user?: InstanceType<typeof UserScalarRelationFilter>;
    @Field(() => OrderItemListRelationFilter, {nullable:true})
    items?: InstanceType<typeof OrderItemListRelationFilter>;
}

@InputType()
export class OrderWhereInput {
    @Field(() => [OrderWhereInput], {nullable:true})
    AND?: Array<OrderWhereInput>;
    @Field(() => [OrderWhereInput], {nullable:true})
    OR?: Array<OrderWhereInput>;
    @Field(() => [OrderWhereInput], {nullable:true})
    NOT?: Array<OrderWhereInput>;
    @Field(() => StringFilter, {nullable:true})
    id?: InstanceType<typeof StringFilter>;
    @Field(() => DateTimeFilter, {nullable:true})
    createdAt?: InstanceType<typeof DateTimeFilter>;
    @Field(() => DateTimeFilter, {nullable:true})
    updatedAt?: InstanceType<typeof DateTimeFilter>;
    @Field(() => StringFilter, {nullable:true})
    userId?: InstanceType<typeof StringFilter>;
    @Field(() => IntFilter, {nullable:true})
    totalPrice?: InstanceType<typeof IntFilter>;
    @Field(() => EnumOrderStatusFilter, {nullable:true})
    status?: InstanceType<typeof EnumOrderStatusFilter>;
    @Field(() => UserScalarRelationFilter, {nullable:true})
    user?: InstanceType<typeof UserScalarRelationFilter>;
    @Field(() => OrderItemListRelationFilter, {nullable:true})
    items?: InstanceType<typeof OrderItemListRelationFilter>;
}

@ObjectType()
export class Order {
    @Field(() => ID, {nullable:false})
    id!: string;
    @Field(() => Date, {nullable:false})
    createdAt!: Date;
    @Field(() => Date, {nullable:false})
    updatedAt!: Date;
    @Field(() => String, {nullable:false})
    userId!: string;
    @Field(() => Int, {nullable:false})
    totalPrice!: number;
    @Field(() => OrderStatus, {defaultValue:'PENDING',nullable:false})
    status!: `${OrderStatus}`;
    @Field(() => User, {nullable:false})
    user?: InstanceType<typeof User>;
    @Field(() => [OrderItem], {nullable:true})
    items?: Array<OrderItem>;
}

@InputType()
export class OrderItemAvgOrderByAggregateInput {
    @Field(() => SortOrder, {nullable:true})
    quantity?: `${SortOrder}`;
    @Field(() => SortOrder, {nullable:true})
    unitPrice?: `${SortOrder}`;
}

@InputType()
export class OrderItemCountOrderByAggregateInput {
    @Field(() => SortOrder, {nullable:true})
    id?: `${SortOrder}`;
    @Field(() => SortOrder, {nullable:true})
    createdAt?: `${SortOrder}`;
    @Field(() => SortOrder, {nullable:true})
    updatedAt?: `${SortOrder}`;
    @Field(() => SortOrder, {nullable:true})
    orderId?: `${SortOrder}`;
    @Field(() => SortOrder, {nullable:true})
    ticketId?: `${SortOrder}`;
    @Field(() => SortOrder, {nullable:true})
    quantity?: `${SortOrder}`;
    @Field(() => SortOrder, {nullable:true})
    unitPrice?: `${SortOrder}`;
}

@InputType()
export class OrderItemCreateManyOrderInputEnvelope {
    @Field(() => [OrderItemCreateManyOrderInput], {nullable:false})
    @Type(() => OrderItemCreateManyOrderInput)
    data!: Array<OrderItemCreateManyOrderInput>;
    @Field(() => Boolean, {nullable:true})
    skipDuplicates?: boolean;
}

@InputType()
export class OrderItemCreateManyOrderInput {
    @Field(() => String, {nullable:true})
    id?: string;
    @Field(() => Date, {nullable:true})
    createdAt?: Date | string;
    @Field(() => Date, {nullable:true})
    updatedAt?: Date | string;
    @Field(() => String, {nullable:false})
    ticketId!: string;
    @Field(() => Int, {nullable:false})
    quantity!: number;
    @Field(() => Int, {nullable:false})
    unitPrice!: number;
}

@InputType()
export class OrderItemCreateManyTicketInputEnvelope {
    @Field(() => [OrderItemCreateManyTicketInput], {nullable:false})
    @Type(() => OrderItemCreateManyTicketInput)
    data!: Array<OrderItemCreateManyTicketInput>;
    @Field(() => Boolean, {nullable:true})
    skipDuplicates?: boolean;
}

@InputType()
export class OrderItemCreateManyTicketInput {
    @Field(() => String, {nullable:true})
    id?: string;
    @Field(() => Date, {nullable:true})
    createdAt?: Date | string;
    @Field(() => Date, {nullable:true})
    updatedAt?: Date | string;
    @Field(() => String, {nullable:false})
    orderId!: string;
    @Field(() => Int, {nullable:false})
    quantity!: number;
    @Field(() => Int, {nullable:false})
    unitPrice!: number;
}

@InputType()
export class OrderItemCreateManyInput {
    @Field(() => String, {nullable:true})
    id?: string;
    @Field(() => Date, {nullable:true})
    createdAt?: Date | string;
    @Field(() => Date, {nullable:true})
    updatedAt?: Date | string;
    @Field(() => String, {nullable:false})
    orderId!: string;
    @Field(() => String, {nullable:false})
    ticketId!: string;
    @Field(() => Int, {nullable:false})
    quantity!: number;
    @Field(() => Int, {nullable:false})
    unitPrice!: number;
}

@InputType()
export class OrderItemCreateNestedManyWithoutOrderInput {
    @Field(() => [OrderItemCreateWithoutOrderInput], {nullable:true})
    @Type(() => OrderItemCreateWithoutOrderInput)
    create?: Array<OrderItemCreateWithoutOrderInput>;
    @Field(() => [OrderItemCreateOrConnectWithoutOrderInput], {nullable:true})
    @Type(() => OrderItemCreateOrConnectWithoutOrderInput)
    connectOrCreate?: Array<OrderItemCreateOrConnectWithoutOrderInput>;
    @Field(() => OrderItemCreateManyOrderInputEnvelope, {nullable:true})
    @Type(() => OrderItemCreateManyOrderInputEnvelope)
    createMany?: InstanceType<typeof OrderItemCreateManyOrderInputEnvelope>;
    @Field(() => [OrderItemWhereUniqueInput], {nullable:true})
    @Type(() => OrderItemWhereUniqueInput)
    connect?: Array<Prisma.AtLeast<OrderItemWhereUniqueInput, 'id'>>;
}

@InputType()
export class OrderItemCreateNestedManyWithoutTicketInput {
    @Field(() => [OrderItemCreateWithoutTicketInput], {nullable:true})
    @Type(() => OrderItemCreateWithoutTicketInput)
    create?: Array<OrderItemCreateWithoutTicketInput>;
    @Field(() => [OrderItemCreateOrConnectWithoutTicketInput], {nullable:true})
    @Type(() => OrderItemCreateOrConnectWithoutTicketInput)
    connectOrCreate?: Array<OrderItemCreateOrConnectWithoutTicketInput>;
    @Field(() => OrderItemCreateManyTicketInputEnvelope, {nullable:true})
    @Type(() => OrderItemCreateManyTicketInputEnvelope)
    createMany?: InstanceType<typeof OrderItemCreateManyTicketInputEnvelope>;
    @Field(() => [OrderItemWhereUniqueInput], {nullable:true})
    @Type(() => OrderItemWhereUniqueInput)
    connect?: Array<Prisma.AtLeast<OrderItemWhereUniqueInput, 'id'>>;
}

@InputType()
export class OrderItemCreateOrConnectWithoutOrderInput {
    @Field(() => OrderItemWhereUniqueInput, {nullable:false})
    @Type(() => OrderItemWhereUniqueInput)
    where!: Prisma.AtLeast<OrderItemWhereUniqueInput, 'id'>;
    @Field(() => OrderItemCreateWithoutOrderInput, {nullable:false})
    @Type(() => OrderItemCreateWithoutOrderInput)
    create!: InstanceType<typeof OrderItemCreateWithoutOrderInput>;
}

@InputType()
export class OrderItemCreateOrConnectWithoutTicketInput {
    @Field(() => OrderItemWhereUniqueInput, {nullable:false})
    @Type(() => OrderItemWhereUniqueInput)
    where!: Prisma.AtLeast<OrderItemWhereUniqueInput, 'id'>;
    @Field(() => OrderItemCreateWithoutTicketInput, {nullable:false})
    @Type(() => OrderItemCreateWithoutTicketInput)
    create!: InstanceType<typeof OrderItemCreateWithoutTicketInput>;
}

@InputType()
export class OrderItemCreateWithoutOrderInput {
    @Field(() => String, {nullable:true})
    id?: string;
    @Field(() => Date, {nullable:true})
    createdAt?: Date | string;
    @Field(() => Date, {nullable:true})
    updatedAt?: Date | string;
    @Field(() => Int, {nullable:false})
    quantity!: number;
    @Field(() => Int, {nullable:false})
    unitPrice!: number;
    @Field(() => TicketCreateNestedOneWithoutOrderItemsInput, {nullable:false})
    ticket!: InstanceType<typeof TicketCreateNestedOneWithoutOrderItemsInput>;
}

@InputType()
export class OrderItemCreateWithoutTicketInput {
    @Field(() => String, {nullable:true})
    id?: string;
    @Field(() => Date, {nullable:true})
    createdAt?: Date | string;
    @Field(() => Date, {nullable:true})
    updatedAt?: Date | string;
    @Field(() => Int, {nullable:false})
    quantity!: number;
    @Field(() => Int, {nullable:false})
    unitPrice!: number;
    @Field(() => OrderCreateNestedOneWithoutItemsInput, {nullable:false})
    order!: InstanceType<typeof OrderCreateNestedOneWithoutItemsInput>;
}

@InputType()
export class OrderItemCreateInput {
    @Field(() => String, {nullable:true})
    id?: string;
    @Field(() => Date, {nullable:true})
    createdAt?: Date | string;
    @Field(() => Date, {nullable:true})
    updatedAt?: Date | string;
    @Field(() => Int, {nullable:false})
    quantity!: number;
    @Field(() => Int, {nullable:false})
    unitPrice!: number;
    @Field(() => TicketCreateNestedOneWithoutOrderItemsInput, {nullable:false})
    ticket!: InstanceType<typeof TicketCreateNestedOneWithoutOrderItemsInput>;
    @Field(() => OrderCreateNestedOneWithoutItemsInput, {nullable:false})
    order!: InstanceType<typeof OrderCreateNestedOneWithoutItemsInput>;
}

@InputType()
export class OrderItemListRelationFilter {
    @Field(() => OrderItemWhereInput, {nullable:true})
    every?: InstanceType<typeof OrderItemWhereInput>;
    @Field(() => OrderItemWhereInput, {nullable:true})
    some?: InstanceType<typeof OrderItemWhereInput>;
    @Field(() => OrderItemWhereInput, {nullable:true})
    none?: InstanceType<typeof OrderItemWhereInput>;
}

@InputType()
export class OrderItemMaxOrderByAggregateInput {
    @Field(() => SortOrder, {nullable:true})
    id?: `${SortOrder}`;
    @Field(() => SortOrder, {nullable:true})
    createdAt?: `${SortOrder}`;
    @Field(() => SortOrder, {nullable:true})
    updatedAt?: `${SortOrder}`;
    @Field(() => SortOrder, {nullable:true})
    orderId?: `${SortOrder}`;
    @Field(() => SortOrder, {nullable:true})
    ticketId?: `${SortOrder}`;
    @Field(() => SortOrder, {nullable:true})
    quantity?: `${SortOrder}`;
    @Field(() => SortOrder, {nullable:true})
    unitPrice?: `${SortOrder}`;
}

@InputType()
export class OrderItemMinOrderByAggregateInput {
    @Field(() => SortOrder, {nullable:true})
    id?: `${SortOrder}`;
    @Field(() => SortOrder, {nullable:true})
    createdAt?: `${SortOrder}`;
    @Field(() => SortOrder, {nullable:true})
    updatedAt?: `${SortOrder}`;
    @Field(() => SortOrder, {nullable:true})
    orderId?: `${SortOrder}`;
    @Field(() => SortOrder, {nullable:true})
    ticketId?: `${SortOrder}`;
    @Field(() => SortOrder, {nullable:true})
    quantity?: `${SortOrder}`;
    @Field(() => SortOrder, {nullable:true})
    unitPrice?: `${SortOrder}`;
}

@InputType()
export class OrderItemOrderByRelationAggregateInput {
    @Field(() => SortOrder, {nullable:true})
    _count?: `${SortOrder}`;
}

@InputType()
export class OrderItemOrderByWithAggregationInput {
    @Field(() => SortOrder, {nullable:true})
    id?: `${SortOrder}`;
    @Field(() => SortOrder, {nullable:true})
    createdAt?: `${SortOrder}`;
    @Field(() => SortOrder, {nullable:true})
    updatedAt?: `${SortOrder}`;
    @Field(() => SortOrder, {nullable:true})
    orderId?: `${SortOrder}`;
    @Field(() => SortOrder, {nullable:true})
    ticketId?: `${SortOrder}`;
    @Field(() => SortOrder, {nullable:true})
    quantity?: `${SortOrder}`;
    @Field(() => SortOrder, {nullable:true})
    unitPrice?: `${SortOrder}`;
    @Field(() => OrderItemCountOrderByAggregateInput, {nullable:true})
    _count?: InstanceType<typeof OrderItemCountOrderByAggregateInput>;
    @Field(() => OrderItemAvgOrderByAggregateInput, {nullable:true})
    _avg?: InstanceType<typeof OrderItemAvgOrderByAggregateInput>;
    @Field(() => OrderItemMaxOrderByAggregateInput, {nullable:true})
    _max?: InstanceType<typeof OrderItemMaxOrderByAggregateInput>;
    @Field(() => OrderItemMinOrderByAggregateInput, {nullable:true})
    _min?: InstanceType<typeof OrderItemMinOrderByAggregateInput>;
    @Field(() => OrderItemSumOrderByAggregateInput, {nullable:true})
    _sum?: InstanceType<typeof OrderItemSumOrderByAggregateInput>;
}

@InputType()
export class OrderItemOrderByWithRelationInput {
    @Field(() => SortOrder, {nullable:true})
    id?: `${SortOrder}`;
    @Field(() => SortOrder, {nullable:true})
    createdAt?: `${SortOrder}`;
    @Field(() => SortOrder, {nullable:true})
    updatedAt?: `${SortOrder}`;
    @Field(() => SortOrder, {nullable:true})
    orderId?: `${SortOrder}`;
    @Field(() => SortOrder, {nullable:true})
    ticketId?: `${SortOrder}`;
    @Field(() => SortOrder, {nullable:true})
    quantity?: `${SortOrder}`;
    @Field(() => SortOrder, {nullable:true})
    unitPrice?: `${SortOrder}`;
    @Field(() => TicketOrderByWithRelationInput, {nullable:true})
    ticket?: InstanceType<typeof TicketOrderByWithRelationInput>;
    @Field(() => OrderOrderByWithRelationInput, {nullable:true})
    order?: InstanceType<typeof OrderOrderByWithRelationInput>;
}

@InputType()
export class OrderItemScalarWhereWithAggregatesInput {
    @Field(() => [OrderItemScalarWhereWithAggregatesInput], {nullable:true})
    AND?: Array<OrderItemScalarWhereWithAggregatesInput>;
    @Field(() => [OrderItemScalarWhereWithAggregatesInput], {nullable:true})
    OR?: Array<OrderItemScalarWhereWithAggregatesInput>;
    @Field(() => [OrderItemScalarWhereWithAggregatesInput], {nullable:true})
    NOT?: Array<OrderItemScalarWhereWithAggregatesInput>;
    @Field(() => StringWithAggregatesFilter, {nullable:true})
    id?: InstanceType<typeof StringWithAggregatesFilter>;
    @Field(() => DateTimeWithAggregatesFilter, {nullable:true})
    createdAt?: InstanceType<typeof DateTimeWithAggregatesFilter>;
    @Field(() => DateTimeWithAggregatesFilter, {nullable:true})
    updatedAt?: InstanceType<typeof DateTimeWithAggregatesFilter>;
    @Field(() => StringWithAggregatesFilter, {nullable:true})
    orderId?: InstanceType<typeof StringWithAggregatesFilter>;
    @Field(() => StringWithAggregatesFilter, {nullable:true})
    ticketId?: InstanceType<typeof StringWithAggregatesFilter>;
    @Field(() => IntWithAggregatesFilter, {nullable:true})
    quantity?: InstanceType<typeof IntWithAggregatesFilter>;
    @Field(() => IntWithAggregatesFilter, {nullable:true})
    unitPrice?: InstanceType<typeof IntWithAggregatesFilter>;
}

@InputType()
export class OrderItemScalarWhereInput {
    @Field(() => [OrderItemScalarWhereInput], {nullable:true})
    AND?: Array<OrderItemScalarWhereInput>;
    @Field(() => [OrderItemScalarWhereInput], {nullable:true})
    OR?: Array<OrderItemScalarWhereInput>;
    @Field(() => [OrderItemScalarWhereInput], {nullable:true})
    NOT?: Array<OrderItemScalarWhereInput>;
    @Field(() => StringFilter, {nullable:true})
    id?: InstanceType<typeof StringFilter>;
    @Field(() => DateTimeFilter, {nullable:true})
    createdAt?: InstanceType<typeof DateTimeFilter>;
    @Field(() => DateTimeFilter, {nullable:true})
    updatedAt?: InstanceType<typeof DateTimeFilter>;
    @Field(() => StringFilter, {nullable:true})
    orderId?: InstanceType<typeof StringFilter>;
    @Field(() => StringFilter, {nullable:true})
    ticketId?: InstanceType<typeof StringFilter>;
    @Field(() => IntFilter, {nullable:true})
    quantity?: InstanceType<typeof IntFilter>;
    @Field(() => IntFilter, {nullable:true})
    unitPrice?: InstanceType<typeof IntFilter>;
}

@InputType()
export class OrderItemSumOrderByAggregateInput {
    @Field(() => SortOrder, {nullable:true})
    quantity?: `${SortOrder}`;
    @Field(() => SortOrder, {nullable:true})
    unitPrice?: `${SortOrder}`;
}

@InputType()
export class OrderItemUncheckedCreateNestedManyWithoutOrderInput {
    @Field(() => [OrderItemCreateWithoutOrderInput], {nullable:true})
    @Type(() => OrderItemCreateWithoutOrderInput)
    create?: Array<OrderItemCreateWithoutOrderInput>;
    @Field(() => [OrderItemCreateOrConnectWithoutOrderInput], {nullable:true})
    @Type(() => OrderItemCreateOrConnectWithoutOrderInput)
    connectOrCreate?: Array<OrderItemCreateOrConnectWithoutOrderInput>;
    @Field(() => OrderItemCreateManyOrderInputEnvelope, {nullable:true})
    @Type(() => OrderItemCreateManyOrderInputEnvelope)
    createMany?: InstanceType<typeof OrderItemCreateManyOrderInputEnvelope>;
    @Field(() => [OrderItemWhereUniqueInput], {nullable:true})
    @Type(() => OrderItemWhereUniqueInput)
    connect?: Array<Prisma.AtLeast<OrderItemWhereUniqueInput, 'id'>>;
}

@InputType()
export class OrderItemUncheckedCreateNestedManyWithoutTicketInput {
    @Field(() => [OrderItemCreateWithoutTicketInput], {nullable:true})
    @Type(() => OrderItemCreateWithoutTicketInput)
    create?: Array<OrderItemCreateWithoutTicketInput>;
    @Field(() => [OrderItemCreateOrConnectWithoutTicketInput], {nullable:true})
    @Type(() => OrderItemCreateOrConnectWithoutTicketInput)
    connectOrCreate?: Array<OrderItemCreateOrConnectWithoutTicketInput>;
    @Field(() => OrderItemCreateManyTicketInputEnvelope, {nullable:true})
    @Type(() => OrderItemCreateManyTicketInputEnvelope)
    createMany?: InstanceType<typeof OrderItemCreateManyTicketInputEnvelope>;
    @Field(() => [OrderItemWhereUniqueInput], {nullable:true})
    @Type(() => OrderItemWhereUniqueInput)
    connect?: Array<Prisma.AtLeast<OrderItemWhereUniqueInput, 'id'>>;
}

@InputType()
export class OrderItemUncheckedCreateWithoutOrderInput {
    @Field(() => String, {nullable:true})
    id?: string;
    @Field(() => Date, {nullable:true})
    createdAt?: Date | string;
    @Field(() => Date, {nullable:true})
    updatedAt?: Date | string;
    @Field(() => String, {nullable:false})
    ticketId!: string;
    @Field(() => Int, {nullable:false})
    quantity!: number;
    @Field(() => Int, {nullable:false})
    unitPrice!: number;
}

@InputType()
export class OrderItemUncheckedCreateWithoutTicketInput {
    @Field(() => String, {nullable:true})
    id?: string;
    @Field(() => Date, {nullable:true})
    createdAt?: Date | string;
    @Field(() => Date, {nullable:true})
    updatedAt?: Date | string;
    @Field(() => String, {nullable:false})
    orderId!: string;
    @Field(() => Int, {nullable:false})
    quantity!: number;
    @Field(() => Int, {nullable:false})
    unitPrice!: number;
}

@InputType()
export class OrderItemUncheckedCreateInput {
    @Field(() => String, {nullable:true})
    id?: string;
    @Field(() => Date, {nullable:true})
    createdAt?: Date | string;
    @Field(() => Date, {nullable:true})
    updatedAt?: Date | string;
    @Field(() => String, {nullable:false})
    orderId!: string;
    @Field(() => String, {nullable:false})
    ticketId!: string;
    @Field(() => Int, {nullable:false})
    quantity!: number;
    @Field(() => Int, {nullable:false})
    unitPrice!: number;
}

@InputType()
export class OrderItemUncheckedUpdateManyWithoutOrderNestedInput {
    @Field(() => [OrderItemCreateWithoutOrderInput], {nullable:true})
    @Type(() => OrderItemCreateWithoutOrderInput)
    create?: Array<OrderItemCreateWithoutOrderInput>;
    @Field(() => [OrderItemCreateOrConnectWithoutOrderInput], {nullable:true})
    @Type(() => OrderItemCreateOrConnectWithoutOrderInput)
    connectOrCreate?: Array<OrderItemCreateOrConnectWithoutOrderInput>;
    @Field(() => [OrderItemUpsertWithWhereUniqueWithoutOrderInput], {nullable:true})
    @Type(() => OrderItemUpsertWithWhereUniqueWithoutOrderInput)
    upsert?: Array<OrderItemUpsertWithWhereUniqueWithoutOrderInput>;
    @Field(() => OrderItemCreateManyOrderInputEnvelope, {nullable:true})
    @Type(() => OrderItemCreateManyOrderInputEnvelope)
    createMany?: InstanceType<typeof OrderItemCreateManyOrderInputEnvelope>;
    @Field(() => [OrderItemWhereUniqueInput], {nullable:true})
    @Type(() => OrderItemWhereUniqueInput)
    set?: Array<Prisma.AtLeast<OrderItemWhereUniqueInput, 'id'>>;
    @Field(() => [OrderItemWhereUniqueInput], {nullable:true})
    @Type(() => OrderItemWhereUniqueInput)
    disconnect?: Array<Prisma.AtLeast<OrderItemWhereUniqueInput, 'id'>>;
    @Field(() => [OrderItemWhereUniqueInput], {nullable:true})
    @Type(() => OrderItemWhereUniqueInput)
    delete?: Array<Prisma.AtLeast<OrderItemWhereUniqueInput, 'id'>>;
    @Field(() => [OrderItemWhereUniqueInput], {nullable:true})
    @Type(() => OrderItemWhereUniqueInput)
    connect?: Array<Prisma.AtLeast<OrderItemWhereUniqueInput, 'id'>>;
    @Field(() => [OrderItemUpdateWithWhereUniqueWithoutOrderInput], {nullable:true})
    @Type(() => OrderItemUpdateWithWhereUniqueWithoutOrderInput)
    update?: Array<OrderItemUpdateWithWhereUniqueWithoutOrderInput>;
    @Field(() => [OrderItemUpdateManyWithWhereWithoutOrderInput], {nullable:true})
    @Type(() => OrderItemUpdateManyWithWhereWithoutOrderInput)
    updateMany?: Array<OrderItemUpdateManyWithWhereWithoutOrderInput>;
    @Field(() => [OrderItemScalarWhereInput], {nullable:true})
    @Type(() => OrderItemScalarWhereInput)
    deleteMany?: Array<OrderItemScalarWhereInput>;
}

@InputType()
export class OrderItemUncheckedUpdateManyWithoutOrderInput {
    @Field(() => StringFieldUpdateOperationsInput, {nullable:true})
    id?: InstanceType<typeof StringFieldUpdateOperationsInput>;
    @Field(() => DateTimeFieldUpdateOperationsInput, {nullable:true})
    createdAt?: InstanceType<typeof DateTimeFieldUpdateOperationsInput>;
    @Field(() => DateTimeFieldUpdateOperationsInput, {nullable:true})
    updatedAt?: InstanceType<typeof DateTimeFieldUpdateOperationsInput>;
    @Field(() => StringFieldUpdateOperationsInput, {nullable:true})
    ticketId?: InstanceType<typeof StringFieldUpdateOperationsInput>;
    @Field(() => IntFieldUpdateOperationsInput, {nullable:true})
    quantity?: InstanceType<typeof IntFieldUpdateOperationsInput>;
    @Field(() => IntFieldUpdateOperationsInput, {nullable:true})
    unitPrice?: InstanceType<typeof IntFieldUpdateOperationsInput>;
}

@InputType()
export class OrderItemUncheckedUpdateManyWithoutTicketNestedInput {
    @Field(() => [OrderItemCreateWithoutTicketInput], {nullable:true})
    @Type(() => OrderItemCreateWithoutTicketInput)
    create?: Array<OrderItemCreateWithoutTicketInput>;
    @Field(() => [OrderItemCreateOrConnectWithoutTicketInput], {nullable:true})
    @Type(() => OrderItemCreateOrConnectWithoutTicketInput)
    connectOrCreate?: Array<OrderItemCreateOrConnectWithoutTicketInput>;
    @Field(() => [OrderItemUpsertWithWhereUniqueWithoutTicketInput], {nullable:true})
    @Type(() => OrderItemUpsertWithWhereUniqueWithoutTicketInput)
    upsert?: Array<OrderItemUpsertWithWhereUniqueWithoutTicketInput>;
    @Field(() => OrderItemCreateManyTicketInputEnvelope, {nullable:true})
    @Type(() => OrderItemCreateManyTicketInputEnvelope)
    createMany?: InstanceType<typeof OrderItemCreateManyTicketInputEnvelope>;
    @Field(() => [OrderItemWhereUniqueInput], {nullable:true})
    @Type(() => OrderItemWhereUniqueInput)
    set?: Array<Prisma.AtLeast<OrderItemWhereUniqueInput, 'id'>>;
    @Field(() => [OrderItemWhereUniqueInput], {nullable:true})
    @Type(() => OrderItemWhereUniqueInput)
    disconnect?: Array<Prisma.AtLeast<OrderItemWhereUniqueInput, 'id'>>;
    @Field(() => [OrderItemWhereUniqueInput], {nullable:true})
    @Type(() => OrderItemWhereUniqueInput)
    delete?: Array<Prisma.AtLeast<OrderItemWhereUniqueInput, 'id'>>;
    @Field(() => [OrderItemWhereUniqueInput], {nullable:true})
    @Type(() => OrderItemWhereUniqueInput)
    connect?: Array<Prisma.AtLeast<OrderItemWhereUniqueInput, 'id'>>;
    @Field(() => [OrderItemUpdateWithWhereUniqueWithoutTicketInput], {nullable:true})
    @Type(() => OrderItemUpdateWithWhereUniqueWithoutTicketInput)
    update?: Array<OrderItemUpdateWithWhereUniqueWithoutTicketInput>;
    @Field(() => [OrderItemUpdateManyWithWhereWithoutTicketInput], {nullable:true})
    @Type(() => OrderItemUpdateManyWithWhereWithoutTicketInput)
    updateMany?: Array<OrderItemUpdateManyWithWhereWithoutTicketInput>;
    @Field(() => [OrderItemScalarWhereInput], {nullable:true})
    @Type(() => OrderItemScalarWhereInput)
    deleteMany?: Array<OrderItemScalarWhereInput>;
}

@InputType()
export class OrderItemUncheckedUpdateManyWithoutTicketInput {
    @Field(() => StringFieldUpdateOperationsInput, {nullable:true})
    id?: InstanceType<typeof StringFieldUpdateOperationsInput>;
    @Field(() => DateTimeFieldUpdateOperationsInput, {nullable:true})
    createdAt?: InstanceType<typeof DateTimeFieldUpdateOperationsInput>;
    @Field(() => DateTimeFieldUpdateOperationsInput, {nullable:true})
    updatedAt?: InstanceType<typeof DateTimeFieldUpdateOperationsInput>;
    @Field(() => StringFieldUpdateOperationsInput, {nullable:true})
    orderId?: InstanceType<typeof StringFieldUpdateOperationsInput>;
    @Field(() => IntFieldUpdateOperationsInput, {nullable:true})
    quantity?: InstanceType<typeof IntFieldUpdateOperationsInput>;
    @Field(() => IntFieldUpdateOperationsInput, {nullable:true})
    unitPrice?: InstanceType<typeof IntFieldUpdateOperationsInput>;
}

@InputType()
export class OrderItemUncheckedUpdateManyInput {
    @Field(() => StringFieldUpdateOperationsInput, {nullable:true})
    id?: InstanceType<typeof StringFieldUpdateOperationsInput>;
    @Field(() => DateTimeFieldUpdateOperationsInput, {nullable:true})
    createdAt?: InstanceType<typeof DateTimeFieldUpdateOperationsInput>;
    @Field(() => DateTimeFieldUpdateOperationsInput, {nullable:true})
    updatedAt?: InstanceType<typeof DateTimeFieldUpdateOperationsInput>;
    @Field(() => StringFieldUpdateOperationsInput, {nullable:true})
    orderId?: InstanceType<typeof StringFieldUpdateOperationsInput>;
    @Field(() => StringFieldUpdateOperationsInput, {nullable:true})
    ticketId?: InstanceType<typeof StringFieldUpdateOperationsInput>;
    @Field(() => IntFieldUpdateOperationsInput, {nullable:true})
    quantity?: InstanceType<typeof IntFieldUpdateOperationsInput>;
    @Field(() => IntFieldUpdateOperationsInput, {nullable:true})
    unitPrice?: InstanceType<typeof IntFieldUpdateOperationsInput>;
}

@InputType()
export class OrderItemUncheckedUpdateWithoutOrderInput {
    @Field(() => StringFieldUpdateOperationsInput, {nullable:true})
    id?: InstanceType<typeof StringFieldUpdateOperationsInput>;
    @Field(() => DateTimeFieldUpdateOperationsInput, {nullable:true})
    createdAt?: InstanceType<typeof DateTimeFieldUpdateOperationsInput>;
    @Field(() => DateTimeFieldUpdateOperationsInput, {nullable:true})
    updatedAt?: InstanceType<typeof DateTimeFieldUpdateOperationsInput>;
    @Field(() => StringFieldUpdateOperationsInput, {nullable:true})
    ticketId?: InstanceType<typeof StringFieldUpdateOperationsInput>;
    @Field(() => IntFieldUpdateOperationsInput, {nullable:true})
    quantity?: InstanceType<typeof IntFieldUpdateOperationsInput>;
    @Field(() => IntFieldUpdateOperationsInput, {nullable:true})
    unitPrice?: InstanceType<typeof IntFieldUpdateOperationsInput>;
}

@InputType()
export class OrderItemUncheckedUpdateWithoutTicketInput {
    @Field(() => StringFieldUpdateOperationsInput, {nullable:true})
    id?: InstanceType<typeof StringFieldUpdateOperationsInput>;
    @Field(() => DateTimeFieldUpdateOperationsInput, {nullable:true})
    createdAt?: InstanceType<typeof DateTimeFieldUpdateOperationsInput>;
    @Field(() => DateTimeFieldUpdateOperationsInput, {nullable:true})
    updatedAt?: InstanceType<typeof DateTimeFieldUpdateOperationsInput>;
    @Field(() => StringFieldUpdateOperationsInput, {nullable:true})
    orderId?: InstanceType<typeof StringFieldUpdateOperationsInput>;
    @Field(() => IntFieldUpdateOperationsInput, {nullable:true})
    quantity?: InstanceType<typeof IntFieldUpdateOperationsInput>;
    @Field(() => IntFieldUpdateOperationsInput, {nullable:true})
    unitPrice?: InstanceType<typeof IntFieldUpdateOperationsInput>;
}

@InputType()
export class OrderItemUncheckedUpdateInput {
    @Field(() => StringFieldUpdateOperationsInput, {nullable:true})
    id?: InstanceType<typeof StringFieldUpdateOperationsInput>;
    @Field(() => DateTimeFieldUpdateOperationsInput, {nullable:true})
    createdAt?: InstanceType<typeof DateTimeFieldUpdateOperationsInput>;
    @Field(() => DateTimeFieldUpdateOperationsInput, {nullable:true})
    updatedAt?: InstanceType<typeof DateTimeFieldUpdateOperationsInput>;
    @Field(() => StringFieldUpdateOperationsInput, {nullable:true})
    orderId?: InstanceType<typeof StringFieldUpdateOperationsInput>;
    @Field(() => StringFieldUpdateOperationsInput, {nullable:true})
    ticketId?: InstanceType<typeof StringFieldUpdateOperationsInput>;
    @Field(() => IntFieldUpdateOperationsInput, {nullable:true})
    quantity?: InstanceType<typeof IntFieldUpdateOperationsInput>;
    @Field(() => IntFieldUpdateOperationsInput, {nullable:true})
    unitPrice?: InstanceType<typeof IntFieldUpdateOperationsInput>;
}

@InputType()
export class OrderItemUpdateManyMutationInput {
    @Field(() => StringFieldUpdateOperationsInput, {nullable:true})
    id?: InstanceType<typeof StringFieldUpdateOperationsInput>;
    @Field(() => DateTimeFieldUpdateOperationsInput, {nullable:true})
    createdAt?: InstanceType<typeof DateTimeFieldUpdateOperationsInput>;
    @Field(() => DateTimeFieldUpdateOperationsInput, {nullable:true})
    updatedAt?: InstanceType<typeof DateTimeFieldUpdateOperationsInput>;
    @Field(() => IntFieldUpdateOperationsInput, {nullable:true})
    quantity?: InstanceType<typeof IntFieldUpdateOperationsInput>;
    @Field(() => IntFieldUpdateOperationsInput, {nullable:true})
    unitPrice?: InstanceType<typeof IntFieldUpdateOperationsInput>;
}

@InputType()
export class OrderItemUpdateManyWithWhereWithoutOrderInput {
    @Field(() => OrderItemScalarWhereInput, {nullable:false})
    @Type(() => OrderItemScalarWhereInput)
    where!: InstanceType<typeof OrderItemScalarWhereInput>;
    @Field(() => OrderItemUpdateManyMutationInput, {nullable:false})
    @Type(() => OrderItemUpdateManyMutationInput)
    data!: InstanceType<typeof OrderItemUpdateManyMutationInput>;
}

@InputType()
export class OrderItemUpdateManyWithWhereWithoutTicketInput {
    @Field(() => OrderItemScalarWhereInput, {nullable:false})
    @Type(() => OrderItemScalarWhereInput)
    where!: InstanceType<typeof OrderItemScalarWhereInput>;
    @Field(() => OrderItemUpdateManyMutationInput, {nullable:false})
    @Type(() => OrderItemUpdateManyMutationInput)
    data!: InstanceType<typeof OrderItemUpdateManyMutationInput>;
}

@InputType()
export class OrderItemUpdateManyWithoutOrderNestedInput {
    @Field(() => [OrderItemCreateWithoutOrderInput], {nullable:true})
    @Type(() => OrderItemCreateWithoutOrderInput)
    create?: Array<OrderItemCreateWithoutOrderInput>;
    @Field(() => [OrderItemCreateOrConnectWithoutOrderInput], {nullable:true})
    @Type(() => OrderItemCreateOrConnectWithoutOrderInput)
    connectOrCreate?: Array<OrderItemCreateOrConnectWithoutOrderInput>;
    @Field(() => [OrderItemUpsertWithWhereUniqueWithoutOrderInput], {nullable:true})
    @Type(() => OrderItemUpsertWithWhereUniqueWithoutOrderInput)
    upsert?: Array<OrderItemUpsertWithWhereUniqueWithoutOrderInput>;
    @Field(() => OrderItemCreateManyOrderInputEnvelope, {nullable:true})
    @Type(() => OrderItemCreateManyOrderInputEnvelope)
    createMany?: InstanceType<typeof OrderItemCreateManyOrderInputEnvelope>;
    @Field(() => [OrderItemWhereUniqueInput], {nullable:true})
    @Type(() => OrderItemWhereUniqueInput)
    set?: Array<Prisma.AtLeast<OrderItemWhereUniqueInput, 'id'>>;
    @Field(() => [OrderItemWhereUniqueInput], {nullable:true})
    @Type(() => OrderItemWhereUniqueInput)
    disconnect?: Array<Prisma.AtLeast<OrderItemWhereUniqueInput, 'id'>>;
    @Field(() => [OrderItemWhereUniqueInput], {nullable:true})
    @Type(() => OrderItemWhereUniqueInput)
    delete?: Array<Prisma.AtLeast<OrderItemWhereUniqueInput, 'id'>>;
    @Field(() => [OrderItemWhereUniqueInput], {nullable:true})
    @Type(() => OrderItemWhereUniqueInput)
    connect?: Array<Prisma.AtLeast<OrderItemWhereUniqueInput, 'id'>>;
    @Field(() => [OrderItemUpdateWithWhereUniqueWithoutOrderInput], {nullable:true})
    @Type(() => OrderItemUpdateWithWhereUniqueWithoutOrderInput)
    update?: Array<OrderItemUpdateWithWhereUniqueWithoutOrderInput>;
    @Field(() => [OrderItemUpdateManyWithWhereWithoutOrderInput], {nullable:true})
    @Type(() => OrderItemUpdateManyWithWhereWithoutOrderInput)
    updateMany?: Array<OrderItemUpdateManyWithWhereWithoutOrderInput>;
    @Field(() => [OrderItemScalarWhereInput], {nullable:true})
    @Type(() => OrderItemScalarWhereInput)
    deleteMany?: Array<OrderItemScalarWhereInput>;
}

@InputType()
export class OrderItemUpdateManyWithoutTicketNestedInput {
    @Field(() => [OrderItemCreateWithoutTicketInput], {nullable:true})
    @Type(() => OrderItemCreateWithoutTicketInput)
    create?: Array<OrderItemCreateWithoutTicketInput>;
    @Field(() => [OrderItemCreateOrConnectWithoutTicketInput], {nullable:true})
    @Type(() => OrderItemCreateOrConnectWithoutTicketInput)
    connectOrCreate?: Array<OrderItemCreateOrConnectWithoutTicketInput>;
    @Field(() => [OrderItemUpsertWithWhereUniqueWithoutTicketInput], {nullable:true})
    @Type(() => OrderItemUpsertWithWhereUniqueWithoutTicketInput)
    upsert?: Array<OrderItemUpsertWithWhereUniqueWithoutTicketInput>;
    @Field(() => OrderItemCreateManyTicketInputEnvelope, {nullable:true})
    @Type(() => OrderItemCreateManyTicketInputEnvelope)
    createMany?: InstanceType<typeof OrderItemCreateManyTicketInputEnvelope>;
    @Field(() => [OrderItemWhereUniqueInput], {nullable:true})
    @Type(() => OrderItemWhereUniqueInput)
    set?: Array<Prisma.AtLeast<OrderItemWhereUniqueInput, 'id'>>;
    @Field(() => [OrderItemWhereUniqueInput], {nullable:true})
    @Type(() => OrderItemWhereUniqueInput)
    disconnect?: Array<Prisma.AtLeast<OrderItemWhereUniqueInput, 'id'>>;
    @Field(() => [OrderItemWhereUniqueInput], {nullable:true})
    @Type(() => OrderItemWhereUniqueInput)
    delete?: Array<Prisma.AtLeast<OrderItemWhereUniqueInput, 'id'>>;
    @Field(() => [OrderItemWhereUniqueInput], {nullable:true})
    @Type(() => OrderItemWhereUniqueInput)
    connect?: Array<Prisma.AtLeast<OrderItemWhereUniqueInput, 'id'>>;
    @Field(() => [OrderItemUpdateWithWhereUniqueWithoutTicketInput], {nullable:true})
    @Type(() => OrderItemUpdateWithWhereUniqueWithoutTicketInput)
    update?: Array<OrderItemUpdateWithWhereUniqueWithoutTicketInput>;
    @Field(() => [OrderItemUpdateManyWithWhereWithoutTicketInput], {nullable:true})
    @Type(() => OrderItemUpdateManyWithWhereWithoutTicketInput)
    updateMany?: Array<OrderItemUpdateManyWithWhereWithoutTicketInput>;
    @Field(() => [OrderItemScalarWhereInput], {nullable:true})
    @Type(() => OrderItemScalarWhereInput)
    deleteMany?: Array<OrderItemScalarWhereInput>;
}

@InputType()
export class OrderItemUpdateWithWhereUniqueWithoutOrderInput {
    @Field(() => OrderItemWhereUniqueInput, {nullable:false})
    @Type(() => OrderItemWhereUniqueInput)
    where!: Prisma.AtLeast<OrderItemWhereUniqueInput, 'id'>;
    @Field(() => OrderItemUpdateWithoutOrderInput, {nullable:false})
    @Type(() => OrderItemUpdateWithoutOrderInput)
    data!: InstanceType<typeof OrderItemUpdateWithoutOrderInput>;
}

@InputType()
export class OrderItemUpdateWithWhereUniqueWithoutTicketInput {
    @Field(() => OrderItemWhereUniqueInput, {nullable:false})
    @Type(() => OrderItemWhereUniqueInput)
    where!: Prisma.AtLeast<OrderItemWhereUniqueInput, 'id'>;
    @Field(() => OrderItemUpdateWithoutTicketInput, {nullable:false})
    @Type(() => OrderItemUpdateWithoutTicketInput)
    data!: InstanceType<typeof OrderItemUpdateWithoutTicketInput>;
}

@InputType()
export class OrderItemUpdateWithoutOrderInput {
    @Field(() => StringFieldUpdateOperationsInput, {nullable:true})
    id?: InstanceType<typeof StringFieldUpdateOperationsInput>;
    @Field(() => DateTimeFieldUpdateOperationsInput, {nullable:true})
    createdAt?: InstanceType<typeof DateTimeFieldUpdateOperationsInput>;
    @Field(() => DateTimeFieldUpdateOperationsInput, {nullable:true})
    updatedAt?: InstanceType<typeof DateTimeFieldUpdateOperationsInput>;
    @Field(() => IntFieldUpdateOperationsInput, {nullable:true})
    quantity?: InstanceType<typeof IntFieldUpdateOperationsInput>;
    @Field(() => IntFieldUpdateOperationsInput, {nullable:true})
    unitPrice?: InstanceType<typeof IntFieldUpdateOperationsInput>;
    @Field(() => TicketUpdateOneRequiredWithoutOrderItemsNestedInput, {nullable:true})
    ticket?: InstanceType<typeof TicketUpdateOneRequiredWithoutOrderItemsNestedInput>;
}

@InputType()
export class OrderItemUpdateWithoutTicketInput {
    @Field(() => StringFieldUpdateOperationsInput, {nullable:true})
    id?: InstanceType<typeof StringFieldUpdateOperationsInput>;
    @Field(() => DateTimeFieldUpdateOperationsInput, {nullable:true})
    createdAt?: InstanceType<typeof DateTimeFieldUpdateOperationsInput>;
    @Field(() => DateTimeFieldUpdateOperationsInput, {nullable:true})
    updatedAt?: InstanceType<typeof DateTimeFieldUpdateOperationsInput>;
    @Field(() => IntFieldUpdateOperationsInput, {nullable:true})
    quantity?: InstanceType<typeof IntFieldUpdateOperationsInput>;
    @Field(() => IntFieldUpdateOperationsInput, {nullable:true})
    unitPrice?: InstanceType<typeof IntFieldUpdateOperationsInput>;
    @Field(() => OrderUpdateOneRequiredWithoutItemsNestedInput, {nullable:true})
    order?: InstanceType<typeof OrderUpdateOneRequiredWithoutItemsNestedInput>;
}

@InputType()
export class OrderItemUpdateInput {
    @Field(() => StringFieldUpdateOperationsInput, {nullable:true})
    id?: InstanceType<typeof StringFieldUpdateOperationsInput>;
    @Field(() => DateTimeFieldUpdateOperationsInput, {nullable:true})
    createdAt?: InstanceType<typeof DateTimeFieldUpdateOperationsInput>;
    @Field(() => DateTimeFieldUpdateOperationsInput, {nullable:true})
    updatedAt?: InstanceType<typeof DateTimeFieldUpdateOperationsInput>;
    @Field(() => IntFieldUpdateOperationsInput, {nullable:true})
    quantity?: InstanceType<typeof IntFieldUpdateOperationsInput>;
    @Field(() => IntFieldUpdateOperationsInput, {nullable:true})
    unitPrice?: InstanceType<typeof IntFieldUpdateOperationsInput>;
    @Field(() => TicketUpdateOneRequiredWithoutOrderItemsNestedInput, {nullable:true})
    ticket?: InstanceType<typeof TicketUpdateOneRequiredWithoutOrderItemsNestedInput>;
    @Field(() => OrderUpdateOneRequiredWithoutItemsNestedInput, {nullable:true})
    order?: InstanceType<typeof OrderUpdateOneRequiredWithoutItemsNestedInput>;
}

@InputType()
export class OrderItemUpsertWithWhereUniqueWithoutOrderInput {
    @Field(() => OrderItemWhereUniqueInput, {nullable:false})
    @Type(() => OrderItemWhereUniqueInput)
    where!: Prisma.AtLeast<OrderItemWhereUniqueInput, 'id'>;
    @Field(() => OrderItemUpdateWithoutOrderInput, {nullable:false})
    @Type(() => OrderItemUpdateWithoutOrderInput)
    update!: InstanceType<typeof OrderItemUpdateWithoutOrderInput>;
    @Field(() => OrderItemCreateWithoutOrderInput, {nullable:false})
    @Type(() => OrderItemCreateWithoutOrderInput)
    create!: InstanceType<typeof OrderItemCreateWithoutOrderInput>;
}

@InputType()
export class OrderItemUpsertWithWhereUniqueWithoutTicketInput {
    @Field(() => OrderItemWhereUniqueInput, {nullable:false})
    @Type(() => OrderItemWhereUniqueInput)
    where!: Prisma.AtLeast<OrderItemWhereUniqueInput, 'id'>;
    @Field(() => OrderItemUpdateWithoutTicketInput, {nullable:false})
    @Type(() => OrderItemUpdateWithoutTicketInput)
    update!: InstanceType<typeof OrderItemUpdateWithoutTicketInput>;
    @Field(() => OrderItemCreateWithoutTicketInput, {nullable:false})
    @Type(() => OrderItemCreateWithoutTicketInput)
    create!: InstanceType<typeof OrderItemCreateWithoutTicketInput>;
}

@InputType()
export class OrderItemWhereUniqueInput {
    @Field(() => String, {nullable:true})
    id?: string;
    @Field(() => [OrderItemWhereInput], {nullable:true})
    AND?: Array<OrderItemWhereInput>;
    @Field(() => [OrderItemWhereInput], {nullable:true})
    OR?: Array<OrderItemWhereInput>;
    @Field(() => [OrderItemWhereInput], {nullable:true})
    NOT?: Array<OrderItemWhereInput>;
    @Field(() => DateTimeFilter, {nullable:true})
    createdAt?: InstanceType<typeof DateTimeFilter>;
    @Field(() => DateTimeFilter, {nullable:true})
    updatedAt?: InstanceType<typeof DateTimeFilter>;
    @Field(() => StringFilter, {nullable:true})
    orderId?: InstanceType<typeof StringFilter>;
    @Field(() => StringFilter, {nullable:true})
    ticketId?: InstanceType<typeof StringFilter>;
    @Field(() => IntFilter, {nullable:true})
    quantity?: InstanceType<typeof IntFilter>;
    @Field(() => IntFilter, {nullable:true})
    unitPrice?: InstanceType<typeof IntFilter>;
    @Field(() => TicketScalarRelationFilter, {nullable:true})
    ticket?: InstanceType<typeof TicketScalarRelationFilter>;
    @Field(() => OrderScalarRelationFilter, {nullable:true})
    order?: InstanceType<typeof OrderScalarRelationFilter>;
}

@InputType()
export class OrderItemWhereInput {
    @Field(() => [OrderItemWhereInput], {nullable:true})
    AND?: Array<OrderItemWhereInput>;
    @Field(() => [OrderItemWhereInput], {nullable:true})
    OR?: Array<OrderItemWhereInput>;
    @Field(() => [OrderItemWhereInput], {nullable:true})
    NOT?: Array<OrderItemWhereInput>;
    @Field(() => StringFilter, {nullable:true})
    id?: InstanceType<typeof StringFilter>;
    @Field(() => DateTimeFilter, {nullable:true})
    createdAt?: InstanceType<typeof DateTimeFilter>;
    @Field(() => DateTimeFilter, {nullable:true})
    updatedAt?: InstanceType<typeof DateTimeFilter>;
    @Field(() => StringFilter, {nullable:true})
    orderId?: InstanceType<typeof StringFilter>;
    @Field(() => StringFilter, {nullable:true})
    ticketId?: InstanceType<typeof StringFilter>;
    @Field(() => IntFilter, {nullable:true})
    quantity?: InstanceType<typeof IntFilter>;
    @Field(() => IntFilter, {nullable:true})
    unitPrice?: InstanceType<typeof IntFilter>;
    @Field(() => TicketScalarRelationFilter, {nullable:true})
    ticket?: InstanceType<typeof TicketScalarRelationFilter>;
    @Field(() => OrderScalarRelationFilter, {nullable:true})
    order?: InstanceType<typeof OrderScalarRelationFilter>;
}

@ObjectType()
export class OrderItem {
    @Field(() => ID, {nullable:false})
    id!: string;
    @Field(() => Date, {nullable:false})
    createdAt!: Date;
    @Field(() => Date, {nullable:false})
    updatedAt!: Date;
    @Field(() => String, {nullable:false})
    orderId!: string;
    @Field(() => String, {nullable:false})
    ticketId!: string;
    @Field(() => Int, {nullable:false})
    quantity!: number;
    @Field(() => Int, {nullable:false})
    unitPrice!: number;
    @Field(() => Ticket, {nullable:false})
    ticket?: InstanceType<typeof Ticket>;
    @Field(() => Order, {nullable:false})
    order?: InstanceType<typeof Order>;
}

@InputType()
export class DateTimeFieldUpdateOperationsInput {
    @Field(() => Date, {nullable:true})
    set?: Date | string;
}

@InputType()
export class DateTimeFilter {
    @Field(() => Date, {nullable:true})
    equals?: Date | string;
    @Field(() => [Date], {nullable:true})
    in?: Array<Date> | Array<string>;
    @Field(() => [Date], {nullable:true})
    notIn?: Array<Date> | Array<string>;
    @Field(() => Date, {nullable:true})
    lt?: Date | string;
    @Field(() => Date, {nullable:true})
    lte?: Date | string;
    @Field(() => Date, {nullable:true})
    gt?: Date | string;
    @Field(() => Date, {nullable:true})
    gte?: Date | string;
    @Field(() => NestedDateTimeFilter, {nullable:true})
    not?: InstanceType<typeof NestedDateTimeFilter>;
}

@InputType()
export class DateTimeWithAggregatesFilter {
    @Field(() => Date, {nullable:true})
    equals?: Date | string;
    @Field(() => [Date], {nullable:true})
    in?: Array<Date> | Array<string>;
    @Field(() => [Date], {nullable:true})
    notIn?: Array<Date> | Array<string>;
    @Field(() => Date, {nullable:true})
    lt?: Date | string;
    @Field(() => Date, {nullable:true})
    lte?: Date | string;
    @Field(() => Date, {nullable:true})
    gt?: Date | string;
    @Field(() => Date, {nullable:true})
    gte?: Date | string;
    @Field(() => NestedDateTimeWithAggregatesFilter, {nullable:true})
    not?: InstanceType<typeof NestedDateTimeWithAggregatesFilter>;
    @Field(() => NestedIntFilter, {nullable:true})
    _count?: InstanceType<typeof NestedIntFilter>;
    @Field(() => NestedDateTimeFilter, {nullable:true})
    _min?: InstanceType<typeof NestedDateTimeFilter>;
    @Field(() => NestedDateTimeFilter, {nullable:true})
    _max?: InstanceType<typeof NestedDateTimeFilter>;
}

@InputType()
export class EnumOrderStatusFieldUpdateOperationsInput {
    @Field(() => OrderStatus, {nullable:true})
    set?: `${OrderStatus}`;
}

@InputType()
export class EnumOrderStatusFilter {
    @Field(() => OrderStatus, {nullable:true})
    equals?: `${OrderStatus}`;
    @Field(() => [OrderStatus], {nullable:true})
    in?: Array<`${OrderStatus}`>;
    @Field(() => [OrderStatus], {nullable:true})
    notIn?: Array<`${OrderStatus}`>;
    @Field(() => NestedEnumOrderStatusFilter, {nullable:true})
    not?: InstanceType<typeof NestedEnumOrderStatusFilter>;
}

@InputType()
export class EnumOrderStatusWithAggregatesFilter {
    @Field(() => OrderStatus, {nullable:true})
    equals?: `${OrderStatus}`;
    @Field(() => [OrderStatus], {nullable:true})
    in?: Array<`${OrderStatus}`>;
    @Field(() => [OrderStatus], {nullable:true})
    notIn?: Array<`${OrderStatus}`>;
    @Field(() => NestedEnumOrderStatusWithAggregatesFilter, {nullable:true})
    not?: InstanceType<typeof NestedEnumOrderStatusWithAggregatesFilter>;
    @Field(() => NestedIntFilter, {nullable:true})
    _count?: InstanceType<typeof NestedIntFilter>;
    @Field(() => NestedEnumOrderStatusFilter, {nullable:true})
    _min?: InstanceType<typeof NestedEnumOrderStatusFilter>;
    @Field(() => NestedEnumOrderStatusFilter, {nullable:true})
    _max?: InstanceType<typeof NestedEnumOrderStatusFilter>;
}

@InputType()
export class IntFieldUpdateOperationsInput {
    @Field(() => Int, {nullable:true})
    set?: number;
    @Field(() => Int, {nullable:true})
    increment?: number;
    @Field(() => Int, {nullable:true})
    decrement?: number;
    @Field(() => Int, {nullable:true})
    multiply?: number;
    @Field(() => Int, {nullable:true})
    divide?: number;
}

@InputType()
export class IntFilter {
    @Field(() => Int, {nullable:true})
    equals?: number;
    @Field(() => [Int], {nullable:true})
    in?: Array<number>;
    @Field(() => [Int], {nullable:true})
    notIn?: Array<number>;
    @Field(() => Int, {nullable:true})
    lt?: number;
    @Field(() => Int, {nullable:true})
    lte?: number;
    @Field(() => Int, {nullable:true})
    gt?: number;
    @Field(() => Int, {nullable:true})
    gte?: number;
    @Field(() => NestedIntFilter, {nullable:true})
    not?: InstanceType<typeof NestedIntFilter>;
}

@InputType()
export class IntWithAggregatesFilter {
    @Field(() => Int, {nullable:true})
    equals?: number;
    @Field(() => [Int], {nullable:true})
    in?: Array<number>;
    @Field(() => [Int], {nullable:true})
    notIn?: Array<number>;
    @Field(() => Int, {nullable:true})
    lt?: number;
    @Field(() => Int, {nullable:true})
    lte?: number;
    @Field(() => Int, {nullable:true})
    gt?: number;
    @Field(() => Int, {nullable:true})
    gte?: number;
    @Field(() => NestedIntWithAggregatesFilter, {nullable:true})
    not?: InstanceType<typeof NestedIntWithAggregatesFilter>;
    @Field(() => NestedIntFilter, {nullable:true})
    _count?: InstanceType<typeof NestedIntFilter>;
    @Field(() => NestedFloatFilter, {nullable:true})
    _avg?: InstanceType<typeof NestedFloatFilter>;
    @Field(() => NestedIntFilter, {nullable:true})
    _sum?: InstanceType<typeof NestedIntFilter>;
    @Field(() => NestedIntFilter, {nullable:true})
    _min?: InstanceType<typeof NestedIntFilter>;
    @Field(() => NestedIntFilter, {nullable:true})
    _max?: InstanceType<typeof NestedIntFilter>;
}

@InputType()
export class NestedDateTimeFilter {
    @Field(() => Date, {nullable:true})
    equals?: Date | string;
    @Field(() => [Date], {nullable:true})
    in?: Array<Date> | Array<string>;
    @Field(() => [Date], {nullable:true})
    notIn?: Array<Date> | Array<string>;
    @Field(() => Date, {nullable:true})
    lt?: Date | string;
    @Field(() => Date, {nullable:true})
    lte?: Date | string;
    @Field(() => Date, {nullable:true})
    gt?: Date | string;
    @Field(() => Date, {nullable:true})
    gte?: Date | string;
    @Field(() => NestedDateTimeFilter, {nullable:true})
    not?: InstanceType<typeof NestedDateTimeFilter>;
}

@InputType()
export class NestedDateTimeWithAggregatesFilter {
    @Field(() => Date, {nullable:true})
    equals?: Date | string;
    @Field(() => [Date], {nullable:true})
    in?: Array<Date> | Array<string>;
    @Field(() => [Date], {nullable:true})
    notIn?: Array<Date> | Array<string>;
    @Field(() => Date, {nullable:true})
    lt?: Date | string;
    @Field(() => Date, {nullable:true})
    lte?: Date | string;
    @Field(() => Date, {nullable:true})
    gt?: Date | string;
    @Field(() => Date, {nullable:true})
    gte?: Date | string;
    @Field(() => NestedDateTimeWithAggregatesFilter, {nullable:true})
    not?: InstanceType<typeof NestedDateTimeWithAggregatesFilter>;
    @Field(() => NestedIntFilter, {nullable:true})
    _count?: InstanceType<typeof NestedIntFilter>;
    @Field(() => NestedDateTimeFilter, {nullable:true})
    _min?: InstanceType<typeof NestedDateTimeFilter>;
    @Field(() => NestedDateTimeFilter, {nullable:true})
    _max?: InstanceType<typeof NestedDateTimeFilter>;
}

@InputType()
export class NestedEnumOrderStatusFilter {
    @Field(() => OrderStatus, {nullable:true})
    equals?: `${OrderStatus}`;
    @Field(() => [OrderStatus], {nullable:true})
    in?: Array<`${OrderStatus}`>;
    @Field(() => [OrderStatus], {nullable:true})
    notIn?: Array<`${OrderStatus}`>;
    @Field(() => NestedEnumOrderStatusFilter, {nullable:true})
    not?: InstanceType<typeof NestedEnumOrderStatusFilter>;
}

@InputType()
export class NestedEnumOrderStatusWithAggregatesFilter {
    @Field(() => OrderStatus, {nullable:true})
    equals?: `${OrderStatus}`;
    @Field(() => [OrderStatus], {nullable:true})
    in?: Array<`${OrderStatus}`>;
    @Field(() => [OrderStatus], {nullable:true})
    notIn?: Array<`${OrderStatus}`>;
    @Field(() => NestedEnumOrderStatusWithAggregatesFilter, {nullable:true})
    not?: InstanceType<typeof NestedEnumOrderStatusWithAggregatesFilter>;
    @Field(() => NestedIntFilter, {nullable:true})
    _count?: InstanceType<typeof NestedIntFilter>;
    @Field(() => NestedEnumOrderStatusFilter, {nullable:true})
    _min?: InstanceType<typeof NestedEnumOrderStatusFilter>;
    @Field(() => NestedEnumOrderStatusFilter, {nullable:true})
    _max?: InstanceType<typeof NestedEnumOrderStatusFilter>;
}

@InputType()
export class NestedFloatFilter {
    @Field(() => Float, {nullable:true})
    equals?: number;
    @Field(() => [Float], {nullable:true})
    in?: Array<number>;
    @Field(() => [Float], {nullable:true})
    notIn?: Array<number>;
    @Field(() => Float, {nullable:true})
    lt?: number;
    @Field(() => Float, {nullable:true})
    lte?: number;
    @Field(() => Float, {nullable:true})
    gt?: number;
    @Field(() => Float, {nullable:true})
    gte?: number;
    @Field(() => NestedFloatFilter, {nullable:true})
    not?: InstanceType<typeof NestedFloatFilter>;
}

@InputType()
export class NestedIntFilter {
    @Field(() => Int, {nullable:true})
    equals?: number;
    @Field(() => [Int], {nullable:true})
    in?: Array<number>;
    @Field(() => [Int], {nullable:true})
    notIn?: Array<number>;
    @Field(() => Int, {nullable:true})
    lt?: number;
    @Field(() => Int, {nullable:true})
    lte?: number;
    @Field(() => Int, {nullable:true})
    gt?: number;
    @Field(() => Int, {nullable:true})
    gte?: number;
    @Field(() => NestedIntFilter, {nullable:true})
    not?: InstanceType<typeof NestedIntFilter>;
}

@InputType()
export class NestedIntNullableFilter {
    @Field(() => Int, {nullable:true})
    equals?: number;
    @Field(() => [Int], {nullable:true})
    in?: Array<number>;
    @Field(() => [Int], {nullable:true})
    notIn?: Array<number>;
    @Field(() => Int, {nullable:true})
    lt?: number;
    @Field(() => Int, {nullable:true})
    lte?: number;
    @Field(() => Int, {nullable:true})
    gt?: number;
    @Field(() => Int, {nullable:true})
    gte?: number;
    @Field(() => NestedIntNullableFilter, {nullable:true})
    not?: InstanceType<typeof NestedIntNullableFilter>;
}

@InputType()
export class NestedIntWithAggregatesFilter {
    @Field(() => Int, {nullable:true})
    equals?: number;
    @Field(() => [Int], {nullable:true})
    in?: Array<number>;
    @Field(() => [Int], {nullable:true})
    notIn?: Array<number>;
    @Field(() => Int, {nullable:true})
    lt?: number;
    @Field(() => Int, {nullable:true})
    lte?: number;
    @Field(() => Int, {nullable:true})
    gt?: number;
    @Field(() => Int, {nullable:true})
    gte?: number;
    @Field(() => NestedIntWithAggregatesFilter, {nullable:true})
    not?: InstanceType<typeof NestedIntWithAggregatesFilter>;
    @Field(() => NestedIntFilter, {nullable:true})
    _count?: InstanceType<typeof NestedIntFilter>;
    @Field(() => NestedFloatFilter, {nullable:true})
    _avg?: InstanceType<typeof NestedFloatFilter>;
    @Field(() => NestedIntFilter, {nullable:true})
    _sum?: InstanceType<typeof NestedIntFilter>;
    @Field(() => NestedIntFilter, {nullable:true})
    _min?: InstanceType<typeof NestedIntFilter>;
    @Field(() => NestedIntFilter, {nullable:true})
    _max?: InstanceType<typeof NestedIntFilter>;
}

@InputType()
export class NestedStringFilter {
    @Field(() => String, {nullable:true})
    equals?: string;
    @Field(() => [String], {nullable:true})
    in?: Array<string>;
    @Field(() => [String], {nullable:true})
    notIn?: Array<string>;
    @Field(() => String, {nullable:true})
    lt?: string;
    @Field(() => String, {nullable:true})
    lte?: string;
    @Field(() => String, {nullable:true})
    gt?: string;
    @Field(() => String, {nullable:true})
    gte?: string;
    @Field(() => String, {nullable:true})
    contains?: string;
    @Field(() => String, {nullable:true})
    startsWith?: string;
    @Field(() => String, {nullable:true})
    endsWith?: string;
    @Field(() => NestedStringFilter, {nullable:true})
    not?: InstanceType<typeof NestedStringFilter>;
}

@InputType()
export class NestedStringNullableFilter {
    @Field(() => String, {nullable:true})
    equals?: string;
    @Field(() => [String], {nullable:true})
    in?: Array<string>;
    @Field(() => [String], {nullable:true})
    notIn?: Array<string>;
    @Field(() => String, {nullable:true})
    lt?: string;
    @Field(() => String, {nullable:true})
    lte?: string;
    @Field(() => String, {nullable:true})
    gt?: string;
    @Field(() => String, {nullable:true})
    gte?: string;
    @Field(() => String, {nullable:true})
    contains?: string;
    @Field(() => String, {nullable:true})
    startsWith?: string;
    @Field(() => String, {nullable:true})
    endsWith?: string;
    @Field(() => NestedStringNullableFilter, {nullable:true})
    not?: InstanceType<typeof NestedStringNullableFilter>;
}

@InputType()
export class NestedStringNullableWithAggregatesFilter {
    @Field(() => String, {nullable:true})
    equals?: string;
    @Field(() => [String], {nullable:true})
    in?: Array<string>;
    @Field(() => [String], {nullable:true})
    notIn?: Array<string>;
    @Field(() => String, {nullable:true})
    lt?: string;
    @Field(() => String, {nullable:true})
    lte?: string;
    @Field(() => String, {nullable:true})
    gt?: string;
    @Field(() => String, {nullable:true})
    gte?: string;
    @Field(() => String, {nullable:true})
    contains?: string;
    @Field(() => String, {nullable:true})
    startsWith?: string;
    @Field(() => String, {nullable:true})
    endsWith?: string;
    @Field(() => NestedStringNullableWithAggregatesFilter, {nullable:true})
    not?: InstanceType<typeof NestedStringNullableWithAggregatesFilter>;
    @Field(() => NestedIntNullableFilter, {nullable:true})
    _count?: InstanceType<typeof NestedIntNullableFilter>;
    @Field(() => NestedStringNullableFilter, {nullable:true})
    _min?: InstanceType<typeof NestedStringNullableFilter>;
    @Field(() => NestedStringNullableFilter, {nullable:true})
    _max?: InstanceType<typeof NestedStringNullableFilter>;
}

@InputType()
export class NestedStringWithAggregatesFilter {
    @Field(() => String, {nullable:true})
    equals?: string;
    @Field(() => [String], {nullable:true})
    in?: Array<string>;
    @Field(() => [String], {nullable:true})
    notIn?: Array<string>;
    @Field(() => String, {nullable:true})
    lt?: string;
    @Field(() => String, {nullable:true})
    lte?: string;
    @Field(() => String, {nullable:true})
    gt?: string;
    @Field(() => String, {nullable:true})
    gte?: string;
    @Field(() => String, {nullable:true})
    contains?: string;
    @Field(() => String, {nullable:true})
    startsWith?: string;
    @Field(() => String, {nullable:true})
    endsWith?: string;
    @Field(() => NestedStringWithAggregatesFilter, {nullable:true})
    not?: InstanceType<typeof NestedStringWithAggregatesFilter>;
    @Field(() => NestedIntFilter, {nullable:true})
    _count?: InstanceType<typeof NestedIntFilter>;
    @Field(() => NestedStringFilter, {nullable:true})
    _min?: InstanceType<typeof NestedStringFilter>;
    @Field(() => NestedStringFilter, {nullable:true})
    _max?: InstanceType<typeof NestedStringFilter>;
}

@InputType()
export class NullableStringFieldUpdateOperationsInput {
    @Field(() => String, {nullable:true})
    set?: string;
}

@InputType()
export class SortOrderInput {
    @Field(() => SortOrder, {nullable:false})
    sort!: `${SortOrder}`;
    @Field(() => NullsOrder, {nullable:true})
    nulls?: `${NullsOrder}`;
}

@InputType()
export class StringFieldUpdateOperationsInput {
    @Field(() => String, {nullable:true})
    set?: string;
}

@InputType()
export class StringFilter {
    @Field(() => String, {nullable:true})
    equals?: string;
    @Field(() => [String], {nullable:true})
    in?: Array<string>;
    @Field(() => [String], {nullable:true})
    notIn?: Array<string>;
    @Field(() => String, {nullable:true})
    lt?: string;
    @Field(() => String, {nullable:true})
    lte?: string;
    @Field(() => String, {nullable:true})
    gt?: string;
    @Field(() => String, {nullable:true})
    gte?: string;
    @Field(() => String, {nullable:true})
    contains?: string;
    @Field(() => String, {nullable:true})
    startsWith?: string;
    @Field(() => String, {nullable:true})
    endsWith?: string;
    @Field(() => QueryMode, {nullable:true})
    mode?: `${QueryMode}`;
    @Field(() => NestedStringFilter, {nullable:true})
    not?: InstanceType<typeof NestedStringFilter>;
}

@InputType()
export class StringNullableFilter {
    @Field(() => String, {nullable:true})
    equals?: string;
    @Field(() => [String], {nullable:true})
    in?: Array<string>;
    @Field(() => [String], {nullable:true})
    notIn?: Array<string>;
    @Field(() => String, {nullable:true})
    lt?: string;
    @Field(() => String, {nullable:true})
    lte?: string;
    @Field(() => String, {nullable:true})
    gt?: string;
    @Field(() => String, {nullable:true})
    gte?: string;
    @Field(() => String, {nullable:true})
    contains?: string;
    @Field(() => String, {nullable:true})
    startsWith?: string;
    @Field(() => String, {nullable:true})
    endsWith?: string;
    @Field(() => QueryMode, {nullable:true})
    mode?: `${QueryMode}`;
    @Field(() => NestedStringNullableFilter, {nullable:true})
    not?: InstanceType<typeof NestedStringNullableFilter>;
}

@InputType()
export class StringNullableWithAggregatesFilter {
    @Field(() => String, {nullable:true})
    equals?: string;
    @Field(() => [String], {nullable:true})
    in?: Array<string>;
    @Field(() => [String], {nullable:true})
    notIn?: Array<string>;
    @Field(() => String, {nullable:true})
    lt?: string;
    @Field(() => String, {nullable:true})
    lte?: string;
    @Field(() => String, {nullable:true})
    gt?: string;
    @Field(() => String, {nullable:true})
    gte?: string;
    @Field(() => String, {nullable:true})
    contains?: string;
    @Field(() => String, {nullable:true})
    startsWith?: string;
    @Field(() => String, {nullable:true})
    endsWith?: string;
    @Field(() => QueryMode, {nullable:true})
    mode?: `${QueryMode}`;
    @Field(() => NestedStringNullableWithAggregatesFilter, {nullable:true})
    not?: InstanceType<typeof NestedStringNullableWithAggregatesFilter>;
    @Field(() => NestedIntNullableFilter, {nullable:true})
    _count?: InstanceType<typeof NestedIntNullableFilter>;
    @Field(() => NestedStringNullableFilter, {nullable:true})
    _min?: InstanceType<typeof NestedStringNullableFilter>;
    @Field(() => NestedStringNullableFilter, {nullable:true})
    _max?: InstanceType<typeof NestedStringNullableFilter>;
}

@InputType()
export class StringWithAggregatesFilter {
    @Field(() => String, {nullable:true})
    equals?: string;
    @Field(() => [String], {nullable:true})
    in?: Array<string>;
    @Field(() => [String], {nullable:true})
    notIn?: Array<string>;
    @Field(() => String, {nullable:true})
    lt?: string;
    @Field(() => String, {nullable:true})
    lte?: string;
    @Field(() => String, {nullable:true})
    gt?: string;
    @Field(() => String, {nullable:true})
    gte?: string;
    @Field(() => String, {nullable:true})
    contains?: string;
    @Field(() => String, {nullable:true})
    startsWith?: string;
    @Field(() => String, {nullable:true})
    endsWith?: string;
    @Field(() => QueryMode, {nullable:true})
    mode?: `${QueryMode}`;
    @Field(() => NestedStringWithAggregatesFilter, {nullable:true})
    not?: InstanceType<typeof NestedStringWithAggregatesFilter>;
    @Field(() => NestedIntFilter, {nullable:true})
    _count?: InstanceType<typeof NestedIntFilter>;
    @Field(() => NestedStringFilter, {nullable:true})
    _min?: InstanceType<typeof NestedStringFilter>;
    @Field(() => NestedStringFilter, {nullable:true})
    _max?: InstanceType<typeof NestedStringFilter>;
}

@InputType()
export class TicketAvgOrderByAggregateInput {
    @Field(() => SortOrder, {nullable:true})
    price?: `${SortOrder}`;
    @Field(() => SortOrder, {nullable:true})
    stock?: `${SortOrder}`;
}

@InputType()
export class TicketCountOrderByAggregateInput {
    @Field(() => SortOrder, {nullable:true})
    id?: `${SortOrder}`;
    @Field(() => SortOrder, {nullable:true})
    createdAt?: `${SortOrder}`;
    @Field(() => SortOrder, {nullable:true})
    updatedAt?: `${SortOrder}`;
    @Field(() => SortOrder, {nullable:true})
    eventId?: `${SortOrder}`;
    @Field(() => SortOrder, {nullable:true})
    name?: `${SortOrder}`;
    @Field(() => SortOrder, {nullable:true})
    price?: `${SortOrder}`;
    @Field(() => SortOrder, {nullable:true})
    stock?: `${SortOrder}`;
}

@InputType()
export class TicketCreateManyEventInputEnvelope {
    @Field(() => [TicketCreateManyEventInput], {nullable:false})
    @Type(() => TicketCreateManyEventInput)
    data!: Array<TicketCreateManyEventInput>;
    @Field(() => Boolean, {nullable:true})
    skipDuplicates?: boolean;
}

@InputType()
export class TicketCreateManyEventInput {
    @Field(() => String, {nullable:true})
    id?: string;
    @Field(() => Date, {nullable:true})
    createdAt?: Date | string;
    @Field(() => Date, {nullable:true})
    updatedAt?: Date | string;
    @Field(() => String, {nullable:false})
    name!: string;
    @Field(() => Int, {nullable:false})
    price!: number;
    @Field(() => Int, {nullable:false})
    stock!: number;
}

@InputType()
export class TicketCreateManyInput {
    @Field(() => String, {nullable:true})
    id?: string;
    @Field(() => Date, {nullable:true})
    createdAt?: Date | string;
    @Field(() => Date, {nullable:true})
    updatedAt?: Date | string;
    @Field(() => String, {nullable:false})
    eventId!: string;
    @Field(() => String, {nullable:false})
    name!: string;
    @Field(() => Int, {nullable:false})
    price!: number;
    @Field(() => Int, {nullable:false})
    stock!: number;
}

@InputType()
export class TicketCreateNestedManyWithoutEventInput {
    @Field(() => [TicketCreateWithoutEventInput], {nullable:true})
    @Type(() => TicketCreateWithoutEventInput)
    create?: Array<TicketCreateWithoutEventInput>;
    @Field(() => [TicketCreateOrConnectWithoutEventInput], {nullable:true})
    @Type(() => TicketCreateOrConnectWithoutEventInput)
    connectOrCreate?: Array<TicketCreateOrConnectWithoutEventInput>;
    @Field(() => TicketCreateManyEventInputEnvelope, {nullable:true})
    @Type(() => TicketCreateManyEventInputEnvelope)
    createMany?: InstanceType<typeof TicketCreateManyEventInputEnvelope>;
    @Field(() => [TicketWhereUniqueInput], {nullable:true})
    @Type(() => TicketWhereUniqueInput)
    connect?: Array<Prisma.AtLeast<TicketWhereUniqueInput, 'id'>>;
}

@InputType()
export class TicketCreateNestedOneWithoutOrderItemsInput {
    @Field(() => TicketCreateWithoutOrderItemsInput, {nullable:true})
    @Type(() => TicketCreateWithoutOrderItemsInput)
    create?: InstanceType<typeof TicketCreateWithoutOrderItemsInput>;
    @Field(() => TicketCreateOrConnectWithoutOrderItemsInput, {nullable:true})
    @Type(() => TicketCreateOrConnectWithoutOrderItemsInput)
    connectOrCreate?: InstanceType<typeof TicketCreateOrConnectWithoutOrderItemsInput>;
    @Field(() => TicketWhereUniqueInput, {nullable:true})
    @Type(() => TicketWhereUniqueInput)
    connect?: Prisma.AtLeast<TicketWhereUniqueInput, 'id'>;
}

@InputType()
export class TicketCreateOrConnectWithoutEventInput {
    @Field(() => TicketWhereUniqueInput, {nullable:false})
    @Type(() => TicketWhereUniqueInput)
    where!: Prisma.AtLeast<TicketWhereUniqueInput, 'id'>;
    @Field(() => TicketCreateWithoutEventInput, {nullable:false})
    @Type(() => TicketCreateWithoutEventInput)
    create!: InstanceType<typeof TicketCreateWithoutEventInput>;
}

@InputType()
export class TicketCreateOrConnectWithoutOrderItemsInput {
    @Field(() => TicketWhereUniqueInput, {nullable:false})
    @Type(() => TicketWhereUniqueInput)
    where!: Prisma.AtLeast<TicketWhereUniqueInput, 'id'>;
    @Field(() => TicketCreateWithoutOrderItemsInput, {nullable:false})
    @Type(() => TicketCreateWithoutOrderItemsInput)
    create!: InstanceType<typeof TicketCreateWithoutOrderItemsInput>;
}

@InputType()
export class TicketCreateWithoutEventInput {
    @Field(() => String, {nullable:true})
    id?: string;
    @Field(() => Date, {nullable:true})
    createdAt?: Date | string;
    @Field(() => Date, {nullable:true})
    updatedAt?: Date | string;
    @Field(() => String, {nullable:false})
    name!: string;
    @Field(() => Int, {nullable:false})
    price!: number;
    @Field(() => Int, {nullable:false})
    stock!: number;
    @Field(() => OrderItemCreateNestedManyWithoutTicketInput, {nullable:true})
    orderItems?: InstanceType<typeof OrderItemCreateNestedManyWithoutTicketInput>;
}

@InputType()
export class TicketCreateWithoutOrderItemsInput {
    @Field(() => String, {nullable:true})
    id?: string;
    @Field(() => Date, {nullable:true})
    createdAt?: Date | string;
    @Field(() => Date, {nullable:true})
    updatedAt?: Date | string;
    @Field(() => String, {nullable:false})
    name!: string;
    @Field(() => Int, {nullable:false})
    price!: number;
    @Field(() => Int, {nullable:false})
    stock!: number;
    @Field(() => EventCreateNestedOneWithoutTicketsInput, {nullable:false})
    event!: InstanceType<typeof EventCreateNestedOneWithoutTicketsInput>;
}

@InputType()
export class TicketCreateInput {
    @Field(() => String, {nullable:true})
    id?: string;
    @Field(() => Date, {nullable:true})
    createdAt?: Date | string;
    @Field(() => Date, {nullable:true})
    updatedAt?: Date | string;
    @Field(() => String, {nullable:false})
    name!: string;
    @Field(() => Int, {nullable:false})
    price!: number;
    @Field(() => Int, {nullable:false})
    stock!: number;
    @Field(() => OrderItemCreateNestedManyWithoutTicketInput, {nullable:true})
    orderItems?: InstanceType<typeof OrderItemCreateNestedManyWithoutTicketInput>;
    @Field(() => EventCreateNestedOneWithoutTicketsInput, {nullable:false})
    event!: InstanceType<typeof EventCreateNestedOneWithoutTicketsInput>;
}

@InputType()
export class TicketListRelationFilter {
    @Field(() => TicketWhereInput, {nullable:true})
    every?: InstanceType<typeof TicketWhereInput>;
    @Field(() => TicketWhereInput, {nullable:true})
    some?: InstanceType<typeof TicketWhereInput>;
    @Field(() => TicketWhereInput, {nullable:true})
    none?: InstanceType<typeof TicketWhereInput>;
}

@InputType()
export class TicketMaxOrderByAggregateInput {
    @Field(() => SortOrder, {nullable:true})
    id?: `${SortOrder}`;
    @Field(() => SortOrder, {nullable:true})
    createdAt?: `${SortOrder}`;
    @Field(() => SortOrder, {nullable:true})
    updatedAt?: `${SortOrder}`;
    @Field(() => SortOrder, {nullable:true})
    eventId?: `${SortOrder}`;
    @Field(() => SortOrder, {nullable:true})
    name?: `${SortOrder}`;
    @Field(() => SortOrder, {nullable:true})
    price?: `${SortOrder}`;
    @Field(() => SortOrder, {nullable:true})
    stock?: `${SortOrder}`;
}

@InputType()
export class TicketMinOrderByAggregateInput {
    @Field(() => SortOrder, {nullable:true})
    id?: `${SortOrder}`;
    @Field(() => SortOrder, {nullable:true})
    createdAt?: `${SortOrder}`;
    @Field(() => SortOrder, {nullable:true})
    updatedAt?: `${SortOrder}`;
    @Field(() => SortOrder, {nullable:true})
    eventId?: `${SortOrder}`;
    @Field(() => SortOrder, {nullable:true})
    name?: `${SortOrder}`;
    @Field(() => SortOrder, {nullable:true})
    price?: `${SortOrder}`;
    @Field(() => SortOrder, {nullable:true})
    stock?: `${SortOrder}`;
}

@InputType()
export class TicketOrderByRelationAggregateInput {
    @Field(() => SortOrder, {nullable:true})
    _count?: `${SortOrder}`;
}

@InputType()
export class TicketOrderByWithAggregationInput {
    @Field(() => SortOrder, {nullable:true})
    id?: `${SortOrder}`;
    @Field(() => SortOrder, {nullable:true})
    createdAt?: `${SortOrder}`;
    @Field(() => SortOrder, {nullable:true})
    updatedAt?: `${SortOrder}`;
    @Field(() => SortOrder, {nullable:true})
    eventId?: `${SortOrder}`;
    @Field(() => SortOrder, {nullable:true})
    name?: `${SortOrder}`;
    @Field(() => SortOrder, {nullable:true})
    price?: `${SortOrder}`;
    @Field(() => SortOrder, {nullable:true})
    stock?: `${SortOrder}`;
    @Field(() => TicketCountOrderByAggregateInput, {nullable:true})
    _count?: InstanceType<typeof TicketCountOrderByAggregateInput>;
    @Field(() => TicketAvgOrderByAggregateInput, {nullable:true})
    _avg?: InstanceType<typeof TicketAvgOrderByAggregateInput>;
    @Field(() => TicketMaxOrderByAggregateInput, {nullable:true})
    _max?: InstanceType<typeof TicketMaxOrderByAggregateInput>;
    @Field(() => TicketMinOrderByAggregateInput, {nullable:true})
    _min?: InstanceType<typeof TicketMinOrderByAggregateInput>;
    @Field(() => TicketSumOrderByAggregateInput, {nullable:true})
    _sum?: InstanceType<typeof TicketSumOrderByAggregateInput>;
}

@InputType()
export class TicketOrderByWithRelationInput {
    @Field(() => SortOrder, {nullable:true})
    id?: `${SortOrder}`;
    @Field(() => SortOrder, {nullable:true})
    createdAt?: `${SortOrder}`;
    @Field(() => SortOrder, {nullable:true})
    updatedAt?: `${SortOrder}`;
    @Field(() => SortOrder, {nullable:true})
    eventId?: `${SortOrder}`;
    @Field(() => SortOrder, {nullable:true})
    name?: `${SortOrder}`;
    @Field(() => SortOrder, {nullable:true})
    price?: `${SortOrder}`;
    @Field(() => SortOrder, {nullable:true})
    stock?: `${SortOrder}`;
    @Field(() => OrderItemOrderByRelationAggregateInput, {nullable:true})
    orderItems?: InstanceType<typeof OrderItemOrderByRelationAggregateInput>;
    @Field(() => EventOrderByWithRelationInput, {nullable:true})
    event?: InstanceType<typeof EventOrderByWithRelationInput>;
}

@InputType()
export class TicketScalarRelationFilter {
    @Field(() => TicketWhereInput, {nullable:true})
    is?: InstanceType<typeof TicketWhereInput>;
    @Field(() => TicketWhereInput, {nullable:true})
    isNot?: InstanceType<typeof TicketWhereInput>;
}

@InputType()
export class TicketScalarWhereWithAggregatesInput {
    @Field(() => [TicketScalarWhereWithAggregatesInput], {nullable:true})
    AND?: Array<TicketScalarWhereWithAggregatesInput>;
    @Field(() => [TicketScalarWhereWithAggregatesInput], {nullable:true})
    OR?: Array<TicketScalarWhereWithAggregatesInput>;
    @Field(() => [TicketScalarWhereWithAggregatesInput], {nullable:true})
    NOT?: Array<TicketScalarWhereWithAggregatesInput>;
    @Field(() => StringWithAggregatesFilter, {nullable:true})
    id?: InstanceType<typeof StringWithAggregatesFilter>;
    @Field(() => DateTimeWithAggregatesFilter, {nullable:true})
    createdAt?: InstanceType<typeof DateTimeWithAggregatesFilter>;
    @Field(() => DateTimeWithAggregatesFilter, {nullable:true})
    updatedAt?: InstanceType<typeof DateTimeWithAggregatesFilter>;
    @Field(() => StringWithAggregatesFilter, {nullable:true})
    eventId?: InstanceType<typeof StringWithAggregatesFilter>;
    @Field(() => StringWithAggregatesFilter, {nullable:true})
    name?: InstanceType<typeof StringWithAggregatesFilter>;
    @Field(() => IntWithAggregatesFilter, {nullable:true})
    price?: InstanceType<typeof IntWithAggregatesFilter>;
    @Field(() => IntWithAggregatesFilter, {nullable:true})
    stock?: InstanceType<typeof IntWithAggregatesFilter>;
}

@InputType()
export class TicketScalarWhereInput {
    @Field(() => [TicketScalarWhereInput], {nullable:true})
    AND?: Array<TicketScalarWhereInput>;
    @Field(() => [TicketScalarWhereInput], {nullable:true})
    OR?: Array<TicketScalarWhereInput>;
    @Field(() => [TicketScalarWhereInput], {nullable:true})
    NOT?: Array<TicketScalarWhereInput>;
    @Field(() => StringFilter, {nullable:true})
    id?: InstanceType<typeof StringFilter>;
    @Field(() => DateTimeFilter, {nullable:true})
    createdAt?: InstanceType<typeof DateTimeFilter>;
    @Field(() => DateTimeFilter, {nullable:true})
    updatedAt?: InstanceType<typeof DateTimeFilter>;
    @Field(() => StringFilter, {nullable:true})
    eventId?: InstanceType<typeof StringFilter>;
    @Field(() => StringFilter, {nullable:true})
    name?: InstanceType<typeof StringFilter>;
    @Field(() => IntFilter, {nullable:true})
    price?: InstanceType<typeof IntFilter>;
    @Field(() => IntFilter, {nullable:true})
    stock?: InstanceType<typeof IntFilter>;
}

@InputType()
export class TicketSumOrderByAggregateInput {
    @Field(() => SortOrder, {nullable:true})
    price?: `${SortOrder}`;
    @Field(() => SortOrder, {nullable:true})
    stock?: `${SortOrder}`;
}

@InputType()
export class TicketUncheckedCreateNestedManyWithoutEventInput {
    @Field(() => [TicketCreateWithoutEventInput], {nullable:true})
    @Type(() => TicketCreateWithoutEventInput)
    create?: Array<TicketCreateWithoutEventInput>;
    @Field(() => [TicketCreateOrConnectWithoutEventInput], {nullable:true})
    @Type(() => TicketCreateOrConnectWithoutEventInput)
    connectOrCreate?: Array<TicketCreateOrConnectWithoutEventInput>;
    @Field(() => TicketCreateManyEventInputEnvelope, {nullable:true})
    @Type(() => TicketCreateManyEventInputEnvelope)
    createMany?: InstanceType<typeof TicketCreateManyEventInputEnvelope>;
    @Field(() => [TicketWhereUniqueInput], {nullable:true})
    @Type(() => TicketWhereUniqueInput)
    connect?: Array<Prisma.AtLeast<TicketWhereUniqueInput, 'id'>>;
}

@InputType()
export class TicketUncheckedCreateWithoutEventInput {
    @Field(() => String, {nullable:true})
    id?: string;
    @Field(() => Date, {nullable:true})
    createdAt?: Date | string;
    @Field(() => Date, {nullable:true})
    updatedAt?: Date | string;
    @Field(() => String, {nullable:false})
    name!: string;
    @Field(() => Int, {nullable:false})
    price!: number;
    @Field(() => Int, {nullable:false})
    stock!: number;
    @Field(() => OrderItemUncheckedCreateNestedManyWithoutTicketInput, {nullable:true})
    orderItems?: InstanceType<typeof OrderItemUncheckedCreateNestedManyWithoutTicketInput>;
}

@InputType()
export class TicketUncheckedCreateWithoutOrderItemsInput {
    @Field(() => String, {nullable:true})
    id?: string;
    @Field(() => Date, {nullable:true})
    createdAt?: Date | string;
    @Field(() => Date, {nullable:true})
    updatedAt?: Date | string;
    @Field(() => String, {nullable:false})
    eventId!: string;
    @Field(() => String, {nullable:false})
    name!: string;
    @Field(() => Int, {nullable:false})
    price!: number;
    @Field(() => Int, {nullable:false})
    stock!: number;
}

@InputType()
export class TicketUncheckedCreateInput {
    @Field(() => String, {nullable:true})
    id?: string;
    @Field(() => Date, {nullable:true})
    createdAt?: Date | string;
    @Field(() => Date, {nullable:true})
    updatedAt?: Date | string;
    @Field(() => String, {nullable:false})
    eventId!: string;
    @Field(() => String, {nullable:false})
    name!: string;
    @Field(() => Int, {nullable:false})
    price!: number;
    @Field(() => Int, {nullable:false})
    stock!: number;
    @Field(() => OrderItemUncheckedCreateNestedManyWithoutTicketInput, {nullable:true})
    orderItems?: InstanceType<typeof OrderItemUncheckedCreateNestedManyWithoutTicketInput>;
}

@InputType()
export class TicketUncheckedUpdateManyWithoutEventNestedInput {
    @Field(() => [TicketCreateWithoutEventInput], {nullable:true})
    @Type(() => TicketCreateWithoutEventInput)
    create?: Array<TicketCreateWithoutEventInput>;
    @Field(() => [TicketCreateOrConnectWithoutEventInput], {nullable:true})
    @Type(() => TicketCreateOrConnectWithoutEventInput)
    connectOrCreate?: Array<TicketCreateOrConnectWithoutEventInput>;
    @Field(() => [TicketUpsertWithWhereUniqueWithoutEventInput], {nullable:true})
    @Type(() => TicketUpsertWithWhereUniqueWithoutEventInput)
    upsert?: Array<TicketUpsertWithWhereUniqueWithoutEventInput>;
    @Field(() => TicketCreateManyEventInputEnvelope, {nullable:true})
    @Type(() => TicketCreateManyEventInputEnvelope)
    createMany?: InstanceType<typeof TicketCreateManyEventInputEnvelope>;
    @Field(() => [TicketWhereUniqueInput], {nullable:true})
    @Type(() => TicketWhereUniqueInput)
    set?: Array<Prisma.AtLeast<TicketWhereUniqueInput, 'id'>>;
    @Field(() => [TicketWhereUniqueInput], {nullable:true})
    @Type(() => TicketWhereUniqueInput)
    disconnect?: Array<Prisma.AtLeast<TicketWhereUniqueInput, 'id'>>;
    @Field(() => [TicketWhereUniqueInput], {nullable:true})
    @Type(() => TicketWhereUniqueInput)
    delete?: Array<Prisma.AtLeast<TicketWhereUniqueInput, 'id'>>;
    @Field(() => [TicketWhereUniqueInput], {nullable:true})
    @Type(() => TicketWhereUniqueInput)
    connect?: Array<Prisma.AtLeast<TicketWhereUniqueInput, 'id'>>;
    @Field(() => [TicketUpdateWithWhereUniqueWithoutEventInput], {nullable:true})
    @Type(() => TicketUpdateWithWhereUniqueWithoutEventInput)
    update?: Array<TicketUpdateWithWhereUniqueWithoutEventInput>;
    @Field(() => [TicketUpdateManyWithWhereWithoutEventInput], {nullable:true})
    @Type(() => TicketUpdateManyWithWhereWithoutEventInput)
    updateMany?: Array<TicketUpdateManyWithWhereWithoutEventInput>;
    @Field(() => [TicketScalarWhereInput], {nullable:true})
    @Type(() => TicketScalarWhereInput)
    deleteMany?: Array<TicketScalarWhereInput>;
}

@InputType()
export class TicketUncheckedUpdateManyWithoutEventInput {
    @Field(() => StringFieldUpdateOperationsInput, {nullable:true})
    id?: InstanceType<typeof StringFieldUpdateOperationsInput>;
    @Field(() => DateTimeFieldUpdateOperationsInput, {nullable:true})
    createdAt?: InstanceType<typeof DateTimeFieldUpdateOperationsInput>;
    @Field(() => DateTimeFieldUpdateOperationsInput, {nullable:true})
    updatedAt?: InstanceType<typeof DateTimeFieldUpdateOperationsInput>;
    @Field(() => StringFieldUpdateOperationsInput, {nullable:true})
    name?: InstanceType<typeof StringFieldUpdateOperationsInput>;
    @Field(() => IntFieldUpdateOperationsInput, {nullable:true})
    price?: InstanceType<typeof IntFieldUpdateOperationsInput>;
    @Field(() => IntFieldUpdateOperationsInput, {nullable:true})
    stock?: InstanceType<typeof IntFieldUpdateOperationsInput>;
}

@InputType()
export class TicketUncheckedUpdateManyInput {
    @Field(() => StringFieldUpdateOperationsInput, {nullable:true})
    id?: InstanceType<typeof StringFieldUpdateOperationsInput>;
    @Field(() => DateTimeFieldUpdateOperationsInput, {nullable:true})
    createdAt?: InstanceType<typeof DateTimeFieldUpdateOperationsInput>;
    @Field(() => DateTimeFieldUpdateOperationsInput, {nullable:true})
    updatedAt?: InstanceType<typeof DateTimeFieldUpdateOperationsInput>;
    @Field(() => StringFieldUpdateOperationsInput, {nullable:true})
    eventId?: InstanceType<typeof StringFieldUpdateOperationsInput>;
    @Field(() => StringFieldUpdateOperationsInput, {nullable:true})
    name?: InstanceType<typeof StringFieldUpdateOperationsInput>;
    @Field(() => IntFieldUpdateOperationsInput, {nullable:true})
    price?: InstanceType<typeof IntFieldUpdateOperationsInput>;
    @Field(() => IntFieldUpdateOperationsInput, {nullable:true})
    stock?: InstanceType<typeof IntFieldUpdateOperationsInput>;
}

@InputType()
export class TicketUncheckedUpdateWithoutEventInput {
    @Field(() => StringFieldUpdateOperationsInput, {nullable:true})
    id?: InstanceType<typeof StringFieldUpdateOperationsInput>;
    @Field(() => DateTimeFieldUpdateOperationsInput, {nullable:true})
    createdAt?: InstanceType<typeof DateTimeFieldUpdateOperationsInput>;
    @Field(() => DateTimeFieldUpdateOperationsInput, {nullable:true})
    updatedAt?: InstanceType<typeof DateTimeFieldUpdateOperationsInput>;
    @Field(() => StringFieldUpdateOperationsInput, {nullable:true})
    name?: InstanceType<typeof StringFieldUpdateOperationsInput>;
    @Field(() => IntFieldUpdateOperationsInput, {nullable:true})
    price?: InstanceType<typeof IntFieldUpdateOperationsInput>;
    @Field(() => IntFieldUpdateOperationsInput, {nullable:true})
    stock?: InstanceType<typeof IntFieldUpdateOperationsInput>;
    @Field(() => OrderItemUncheckedUpdateManyWithoutTicketNestedInput, {nullable:true})
    orderItems?: InstanceType<typeof OrderItemUncheckedUpdateManyWithoutTicketNestedInput>;
}

@InputType()
export class TicketUncheckedUpdateWithoutOrderItemsInput {
    @Field(() => StringFieldUpdateOperationsInput, {nullable:true})
    id?: InstanceType<typeof StringFieldUpdateOperationsInput>;
    @Field(() => DateTimeFieldUpdateOperationsInput, {nullable:true})
    createdAt?: InstanceType<typeof DateTimeFieldUpdateOperationsInput>;
    @Field(() => DateTimeFieldUpdateOperationsInput, {nullable:true})
    updatedAt?: InstanceType<typeof DateTimeFieldUpdateOperationsInput>;
    @Field(() => StringFieldUpdateOperationsInput, {nullable:true})
    eventId?: InstanceType<typeof StringFieldUpdateOperationsInput>;
    @Field(() => StringFieldUpdateOperationsInput, {nullable:true})
    name?: InstanceType<typeof StringFieldUpdateOperationsInput>;
    @Field(() => IntFieldUpdateOperationsInput, {nullable:true})
    price?: InstanceType<typeof IntFieldUpdateOperationsInput>;
    @Field(() => IntFieldUpdateOperationsInput, {nullable:true})
    stock?: InstanceType<typeof IntFieldUpdateOperationsInput>;
}

@InputType()
export class TicketUncheckedUpdateInput {
    @Field(() => StringFieldUpdateOperationsInput, {nullable:true})
    id?: InstanceType<typeof StringFieldUpdateOperationsInput>;
    @Field(() => DateTimeFieldUpdateOperationsInput, {nullable:true})
    createdAt?: InstanceType<typeof DateTimeFieldUpdateOperationsInput>;
    @Field(() => DateTimeFieldUpdateOperationsInput, {nullable:true})
    updatedAt?: InstanceType<typeof DateTimeFieldUpdateOperationsInput>;
    @Field(() => StringFieldUpdateOperationsInput, {nullable:true})
    eventId?: InstanceType<typeof StringFieldUpdateOperationsInput>;
    @Field(() => StringFieldUpdateOperationsInput, {nullable:true})
    name?: InstanceType<typeof StringFieldUpdateOperationsInput>;
    @Field(() => IntFieldUpdateOperationsInput, {nullable:true})
    price?: InstanceType<typeof IntFieldUpdateOperationsInput>;
    @Field(() => IntFieldUpdateOperationsInput, {nullable:true})
    stock?: InstanceType<typeof IntFieldUpdateOperationsInput>;
    @Field(() => OrderItemUncheckedUpdateManyWithoutTicketNestedInput, {nullable:true})
    orderItems?: InstanceType<typeof OrderItemUncheckedUpdateManyWithoutTicketNestedInput>;
}

@InputType()
export class TicketUpdateManyMutationInput {
    @Field(() => StringFieldUpdateOperationsInput, {nullable:true})
    id?: InstanceType<typeof StringFieldUpdateOperationsInput>;
    @Field(() => DateTimeFieldUpdateOperationsInput, {nullable:true})
    createdAt?: InstanceType<typeof DateTimeFieldUpdateOperationsInput>;
    @Field(() => DateTimeFieldUpdateOperationsInput, {nullable:true})
    updatedAt?: InstanceType<typeof DateTimeFieldUpdateOperationsInput>;
    @Field(() => StringFieldUpdateOperationsInput, {nullable:true})
    name?: InstanceType<typeof StringFieldUpdateOperationsInput>;
    @Field(() => IntFieldUpdateOperationsInput, {nullable:true})
    price?: InstanceType<typeof IntFieldUpdateOperationsInput>;
    @Field(() => IntFieldUpdateOperationsInput, {nullable:true})
    stock?: InstanceType<typeof IntFieldUpdateOperationsInput>;
}

@InputType()
export class TicketUpdateManyWithWhereWithoutEventInput {
    @Field(() => TicketScalarWhereInput, {nullable:false})
    @Type(() => TicketScalarWhereInput)
    where!: InstanceType<typeof TicketScalarWhereInput>;
    @Field(() => TicketUpdateManyMutationInput, {nullable:false})
    @Type(() => TicketUpdateManyMutationInput)
    data!: InstanceType<typeof TicketUpdateManyMutationInput>;
}

@InputType()
export class TicketUpdateManyWithoutEventNestedInput {
    @Field(() => [TicketCreateWithoutEventInput], {nullable:true})
    @Type(() => TicketCreateWithoutEventInput)
    create?: Array<TicketCreateWithoutEventInput>;
    @Field(() => [TicketCreateOrConnectWithoutEventInput], {nullable:true})
    @Type(() => TicketCreateOrConnectWithoutEventInput)
    connectOrCreate?: Array<TicketCreateOrConnectWithoutEventInput>;
    @Field(() => [TicketUpsertWithWhereUniqueWithoutEventInput], {nullable:true})
    @Type(() => TicketUpsertWithWhereUniqueWithoutEventInput)
    upsert?: Array<TicketUpsertWithWhereUniqueWithoutEventInput>;
    @Field(() => TicketCreateManyEventInputEnvelope, {nullable:true})
    @Type(() => TicketCreateManyEventInputEnvelope)
    createMany?: InstanceType<typeof TicketCreateManyEventInputEnvelope>;
    @Field(() => [TicketWhereUniqueInput], {nullable:true})
    @Type(() => TicketWhereUniqueInput)
    set?: Array<Prisma.AtLeast<TicketWhereUniqueInput, 'id'>>;
    @Field(() => [TicketWhereUniqueInput], {nullable:true})
    @Type(() => TicketWhereUniqueInput)
    disconnect?: Array<Prisma.AtLeast<TicketWhereUniqueInput, 'id'>>;
    @Field(() => [TicketWhereUniqueInput], {nullable:true})
    @Type(() => TicketWhereUniqueInput)
    delete?: Array<Prisma.AtLeast<TicketWhereUniqueInput, 'id'>>;
    @Field(() => [TicketWhereUniqueInput], {nullable:true})
    @Type(() => TicketWhereUniqueInput)
    connect?: Array<Prisma.AtLeast<TicketWhereUniqueInput, 'id'>>;
    @Field(() => [TicketUpdateWithWhereUniqueWithoutEventInput], {nullable:true})
    @Type(() => TicketUpdateWithWhereUniqueWithoutEventInput)
    update?: Array<TicketUpdateWithWhereUniqueWithoutEventInput>;
    @Field(() => [TicketUpdateManyWithWhereWithoutEventInput], {nullable:true})
    @Type(() => TicketUpdateManyWithWhereWithoutEventInput)
    updateMany?: Array<TicketUpdateManyWithWhereWithoutEventInput>;
    @Field(() => [TicketScalarWhereInput], {nullable:true})
    @Type(() => TicketScalarWhereInput)
    deleteMany?: Array<TicketScalarWhereInput>;
}

@InputType()
export class TicketUpdateOneRequiredWithoutOrderItemsNestedInput {
    @Field(() => TicketCreateWithoutOrderItemsInput, {nullable:true})
    @Type(() => TicketCreateWithoutOrderItemsInput)
    create?: InstanceType<typeof TicketCreateWithoutOrderItemsInput>;
    @Field(() => TicketCreateOrConnectWithoutOrderItemsInput, {nullable:true})
    @Type(() => TicketCreateOrConnectWithoutOrderItemsInput)
    connectOrCreate?: InstanceType<typeof TicketCreateOrConnectWithoutOrderItemsInput>;
    @Field(() => TicketUpsertWithoutOrderItemsInput, {nullable:true})
    @Type(() => TicketUpsertWithoutOrderItemsInput)
    upsert?: InstanceType<typeof TicketUpsertWithoutOrderItemsInput>;
    @Field(() => TicketWhereUniqueInput, {nullable:true})
    @Type(() => TicketWhereUniqueInput)
    connect?: Prisma.AtLeast<TicketWhereUniqueInput, 'id'>;
    @Field(() => TicketUpdateToOneWithWhereWithoutOrderItemsInput, {nullable:true})
    @Type(() => TicketUpdateToOneWithWhereWithoutOrderItemsInput)
    update?: InstanceType<typeof TicketUpdateToOneWithWhereWithoutOrderItemsInput>;
}

@InputType()
export class TicketUpdateToOneWithWhereWithoutOrderItemsInput {
    @Field(() => TicketWhereInput, {nullable:true})
    @Type(() => TicketWhereInput)
    where?: InstanceType<typeof TicketWhereInput>;
    @Field(() => TicketUpdateWithoutOrderItemsInput, {nullable:false})
    @Type(() => TicketUpdateWithoutOrderItemsInput)
    data!: InstanceType<typeof TicketUpdateWithoutOrderItemsInput>;
}

@InputType()
export class TicketUpdateWithWhereUniqueWithoutEventInput {
    @Field(() => TicketWhereUniqueInput, {nullable:false})
    @Type(() => TicketWhereUniqueInput)
    where!: Prisma.AtLeast<TicketWhereUniqueInput, 'id'>;
    @Field(() => TicketUpdateWithoutEventInput, {nullable:false})
    @Type(() => TicketUpdateWithoutEventInput)
    data!: InstanceType<typeof TicketUpdateWithoutEventInput>;
}

@InputType()
export class TicketUpdateWithoutEventInput {
    @Field(() => StringFieldUpdateOperationsInput, {nullable:true})
    id?: InstanceType<typeof StringFieldUpdateOperationsInput>;
    @Field(() => DateTimeFieldUpdateOperationsInput, {nullable:true})
    createdAt?: InstanceType<typeof DateTimeFieldUpdateOperationsInput>;
    @Field(() => DateTimeFieldUpdateOperationsInput, {nullable:true})
    updatedAt?: InstanceType<typeof DateTimeFieldUpdateOperationsInput>;
    @Field(() => StringFieldUpdateOperationsInput, {nullable:true})
    name?: InstanceType<typeof StringFieldUpdateOperationsInput>;
    @Field(() => IntFieldUpdateOperationsInput, {nullable:true})
    price?: InstanceType<typeof IntFieldUpdateOperationsInput>;
    @Field(() => IntFieldUpdateOperationsInput, {nullable:true})
    stock?: InstanceType<typeof IntFieldUpdateOperationsInput>;
    @Field(() => OrderItemUpdateManyWithoutTicketNestedInput, {nullable:true})
    orderItems?: InstanceType<typeof OrderItemUpdateManyWithoutTicketNestedInput>;
}

@InputType()
export class TicketUpdateWithoutOrderItemsInput {
    @Field(() => StringFieldUpdateOperationsInput, {nullable:true})
    id?: InstanceType<typeof StringFieldUpdateOperationsInput>;
    @Field(() => DateTimeFieldUpdateOperationsInput, {nullable:true})
    createdAt?: InstanceType<typeof DateTimeFieldUpdateOperationsInput>;
    @Field(() => DateTimeFieldUpdateOperationsInput, {nullable:true})
    updatedAt?: InstanceType<typeof DateTimeFieldUpdateOperationsInput>;
    @Field(() => StringFieldUpdateOperationsInput, {nullable:true})
    name?: InstanceType<typeof StringFieldUpdateOperationsInput>;
    @Field(() => IntFieldUpdateOperationsInput, {nullable:true})
    price?: InstanceType<typeof IntFieldUpdateOperationsInput>;
    @Field(() => IntFieldUpdateOperationsInput, {nullable:true})
    stock?: InstanceType<typeof IntFieldUpdateOperationsInput>;
    @Field(() => EventUpdateOneRequiredWithoutTicketsNestedInput, {nullable:true})
    event?: InstanceType<typeof EventUpdateOneRequiredWithoutTicketsNestedInput>;
}

@InputType()
export class TicketUpdateInput {
    @Field(() => StringFieldUpdateOperationsInput, {nullable:true})
    id?: InstanceType<typeof StringFieldUpdateOperationsInput>;
    @Field(() => DateTimeFieldUpdateOperationsInput, {nullable:true})
    createdAt?: InstanceType<typeof DateTimeFieldUpdateOperationsInput>;
    @Field(() => DateTimeFieldUpdateOperationsInput, {nullable:true})
    updatedAt?: InstanceType<typeof DateTimeFieldUpdateOperationsInput>;
    @Field(() => StringFieldUpdateOperationsInput, {nullable:true})
    name?: InstanceType<typeof StringFieldUpdateOperationsInput>;
    @Field(() => IntFieldUpdateOperationsInput, {nullable:true})
    price?: InstanceType<typeof IntFieldUpdateOperationsInput>;
    @Field(() => IntFieldUpdateOperationsInput, {nullable:true})
    stock?: InstanceType<typeof IntFieldUpdateOperationsInput>;
    @Field(() => OrderItemUpdateManyWithoutTicketNestedInput, {nullable:true})
    orderItems?: InstanceType<typeof OrderItemUpdateManyWithoutTicketNestedInput>;
    @Field(() => EventUpdateOneRequiredWithoutTicketsNestedInput, {nullable:true})
    event?: InstanceType<typeof EventUpdateOneRequiredWithoutTicketsNestedInput>;
}

@InputType()
export class TicketUpsertWithWhereUniqueWithoutEventInput {
    @Field(() => TicketWhereUniqueInput, {nullable:false})
    @Type(() => TicketWhereUniqueInput)
    where!: Prisma.AtLeast<TicketWhereUniqueInput, 'id'>;
    @Field(() => TicketUpdateWithoutEventInput, {nullable:false})
    @Type(() => TicketUpdateWithoutEventInput)
    update!: InstanceType<typeof TicketUpdateWithoutEventInput>;
    @Field(() => TicketCreateWithoutEventInput, {nullable:false})
    @Type(() => TicketCreateWithoutEventInput)
    create!: InstanceType<typeof TicketCreateWithoutEventInput>;
}

@InputType()
export class TicketUpsertWithoutOrderItemsInput {
    @Field(() => TicketUpdateWithoutOrderItemsInput, {nullable:false})
    @Type(() => TicketUpdateWithoutOrderItemsInput)
    update!: InstanceType<typeof TicketUpdateWithoutOrderItemsInput>;
    @Field(() => TicketCreateWithoutOrderItemsInput, {nullable:false})
    @Type(() => TicketCreateWithoutOrderItemsInput)
    create!: InstanceType<typeof TicketCreateWithoutOrderItemsInput>;
    @Field(() => TicketWhereInput, {nullable:true})
    @Type(() => TicketWhereInput)
    where?: InstanceType<typeof TicketWhereInput>;
}

@InputType()
export class TicketWhereUniqueInput {
    @Field(() => String, {nullable:true})
    id?: string;
    @Field(() => [TicketWhereInput], {nullable:true})
    AND?: Array<TicketWhereInput>;
    @Field(() => [TicketWhereInput], {nullable:true})
    OR?: Array<TicketWhereInput>;
    @Field(() => [TicketWhereInput], {nullable:true})
    NOT?: Array<TicketWhereInput>;
    @Field(() => DateTimeFilter, {nullable:true})
    createdAt?: InstanceType<typeof DateTimeFilter>;
    @Field(() => DateTimeFilter, {nullable:true})
    updatedAt?: InstanceType<typeof DateTimeFilter>;
    @Field(() => StringFilter, {nullable:true})
    eventId?: InstanceType<typeof StringFilter>;
    @Field(() => StringFilter, {nullable:true})
    name?: InstanceType<typeof StringFilter>;
    @Field(() => IntFilter, {nullable:true})
    price?: InstanceType<typeof IntFilter>;
    @Field(() => IntFilter, {nullable:true})
    stock?: InstanceType<typeof IntFilter>;
    @Field(() => OrderItemListRelationFilter, {nullable:true})
    orderItems?: InstanceType<typeof OrderItemListRelationFilter>;
    @Field(() => EventScalarRelationFilter, {nullable:true})
    event?: InstanceType<typeof EventScalarRelationFilter>;
}

@InputType()
export class TicketWhereInput {
    @Field(() => [TicketWhereInput], {nullable:true})
    AND?: Array<TicketWhereInput>;
    @Field(() => [TicketWhereInput], {nullable:true})
    OR?: Array<TicketWhereInput>;
    @Field(() => [TicketWhereInput], {nullable:true})
    NOT?: Array<TicketWhereInput>;
    @Field(() => StringFilter, {nullable:true})
    id?: InstanceType<typeof StringFilter>;
    @Field(() => DateTimeFilter, {nullable:true})
    createdAt?: InstanceType<typeof DateTimeFilter>;
    @Field(() => DateTimeFilter, {nullable:true})
    updatedAt?: InstanceType<typeof DateTimeFilter>;
    @Field(() => StringFilter, {nullable:true})
    eventId?: InstanceType<typeof StringFilter>;
    @Field(() => StringFilter, {nullable:true})
    name?: InstanceType<typeof StringFilter>;
    @Field(() => IntFilter, {nullable:true})
    price?: InstanceType<typeof IntFilter>;
    @Field(() => IntFilter, {nullable:true})
    stock?: InstanceType<typeof IntFilter>;
    @Field(() => OrderItemListRelationFilter, {nullable:true})
    orderItems?: InstanceType<typeof OrderItemListRelationFilter>;
    @Field(() => EventScalarRelationFilter, {nullable:true})
    event?: InstanceType<typeof EventScalarRelationFilter>;
}

@ObjectType()
export class Ticket {
    @Field(() => ID, {nullable:false})
    id!: string;
    @Field(() => Date, {nullable:false})
    createdAt!: Date;
    @Field(() => Date, {nullable:false})
    updatedAt!: Date;
    @Field(() => String, {nullable:false})
    eventId!: string;
    @Field(() => String, {nullable:false})
    name!: string;
    @Field(() => Int, {nullable:false})
    price!: number;
    @Field(() => Int, {nullable:false})
    stock!: number;
    @Field(() => [OrderItem], {nullable:true})
    orderItems?: Array<OrderItem>;
    @Field(() => Event, {nullable:false})
    event?: InstanceType<typeof Event>;
}

@InputType()
export class UserCountOrderByAggregateInput {
    @Field(() => SortOrder, {nullable:true})
    id?: `${SortOrder}`;
    @Field(() => SortOrder, {nullable:true})
    createdAt?: `${SortOrder}`;
    @Field(() => SortOrder, {nullable:true})
    updatedAt?: `${SortOrder}`;
    @Field(() => SortOrder, {nullable:true})
    email?: `${SortOrder}`;
    @Field(() => SortOrder, {nullable:true})
    name?: `${SortOrder}`;
}

@InputType()
export class UserCreateManyInput {
    @Field(() => String, {nullable:true})
    id?: string;
    @Field(() => Date, {nullable:true})
    createdAt?: Date | string;
    @Field(() => Date, {nullable:true})
    updatedAt?: Date | string;
    @Field(() => String, {nullable:false})
    email!: string;
    @Field(() => String, {nullable:false})
    name!: string;
}

@InputType()
export class UserCreateNestedOneWithoutOrdersInput {
    @Field(() => UserCreateWithoutOrdersInput, {nullable:true})
    @Type(() => UserCreateWithoutOrdersInput)
    create?: InstanceType<typeof UserCreateWithoutOrdersInput>;
    @Field(() => UserCreateOrConnectWithoutOrdersInput, {nullable:true})
    @Type(() => UserCreateOrConnectWithoutOrdersInput)
    connectOrCreate?: InstanceType<typeof UserCreateOrConnectWithoutOrdersInput>;
    @Field(() => UserWhereUniqueInput, {nullable:true})
    @Type(() => UserWhereUniqueInput)
    connect?: Prisma.AtLeast<UserWhereUniqueInput, 'id' | 'email'>;
}

@InputType()
export class UserCreateOrConnectWithoutOrdersInput {
    @Field(() => UserWhereUniqueInput, {nullable:false})
    @Type(() => UserWhereUniqueInput)
    where!: Prisma.AtLeast<UserWhereUniqueInput, 'id' | 'email'>;
    @Field(() => UserCreateWithoutOrdersInput, {nullable:false})
    @Type(() => UserCreateWithoutOrdersInput)
    create!: InstanceType<typeof UserCreateWithoutOrdersInput>;
}

@InputType()
export class UserCreateWithoutOrdersInput {
    @Field(() => String, {nullable:true})
    id?: string;
    @Field(() => Date, {nullable:true})
    createdAt?: Date | string;
    @Field(() => Date, {nullable:true})
    updatedAt?: Date | string;
    @Field(() => String, {nullable:false})
    email!: string;
    @Field(() => String, {nullable:false})
    name!: string;
}

@InputType()
export class UserCreateInput {
    @Field(() => String, {nullable:true})
    id?: string;
    @Field(() => Date, {nullable:true})
    createdAt?: Date | string;
    @Field(() => Date, {nullable:true})
    updatedAt?: Date | string;
    @Field(() => String, {nullable:false})
    email!: string;
    @Field(() => String, {nullable:false})
    name!: string;
    @Field(() => OrderCreateNestedManyWithoutUserInput, {nullable:true})
    orders?: InstanceType<typeof OrderCreateNestedManyWithoutUserInput>;
}

@InputType()
export class UserMaxOrderByAggregateInput {
    @Field(() => SortOrder, {nullable:true})
    id?: `${SortOrder}`;
    @Field(() => SortOrder, {nullable:true})
    createdAt?: `${SortOrder}`;
    @Field(() => SortOrder, {nullable:true})
    updatedAt?: `${SortOrder}`;
    @Field(() => SortOrder, {nullable:true})
    email?: `${SortOrder}`;
    @Field(() => SortOrder, {nullable:true})
    name?: `${SortOrder}`;
}

@InputType()
export class UserMinOrderByAggregateInput {
    @Field(() => SortOrder, {nullable:true})
    id?: `${SortOrder}`;
    @Field(() => SortOrder, {nullable:true})
    createdAt?: `${SortOrder}`;
    @Field(() => SortOrder, {nullable:true})
    updatedAt?: `${SortOrder}`;
    @Field(() => SortOrder, {nullable:true})
    email?: `${SortOrder}`;
    @Field(() => SortOrder, {nullable:true})
    name?: `${SortOrder}`;
}

@InputType()
export class UserOrderByWithAggregationInput {
    @Field(() => SortOrder, {nullable:true})
    id?: `${SortOrder}`;
    @Field(() => SortOrder, {nullable:true})
    createdAt?: `${SortOrder}`;
    @Field(() => SortOrder, {nullable:true})
    updatedAt?: `${SortOrder}`;
    @Field(() => SortOrder, {nullable:true})
    email?: `${SortOrder}`;
    @Field(() => SortOrder, {nullable:true})
    name?: `${SortOrder}`;
    @Field(() => UserCountOrderByAggregateInput, {nullable:true})
    _count?: InstanceType<typeof UserCountOrderByAggregateInput>;
    @Field(() => UserMaxOrderByAggregateInput, {nullable:true})
    _max?: InstanceType<typeof UserMaxOrderByAggregateInput>;
    @Field(() => UserMinOrderByAggregateInput, {nullable:true})
    _min?: InstanceType<typeof UserMinOrderByAggregateInput>;
}

@InputType()
export class UserOrderByWithRelationInput {
    @Field(() => SortOrder, {nullable:true})
    id?: `${SortOrder}`;
    @Field(() => SortOrder, {nullable:true})
    createdAt?: `${SortOrder}`;
    @Field(() => SortOrder, {nullable:true})
    updatedAt?: `${SortOrder}`;
    @Field(() => SortOrder, {nullable:true})
    email?: `${SortOrder}`;
    @Field(() => SortOrder, {nullable:true})
    name?: `${SortOrder}`;
    @Field(() => OrderOrderByRelationAggregateInput, {nullable:true})
    orders?: InstanceType<typeof OrderOrderByRelationAggregateInput>;
}

@InputType()
export class UserScalarRelationFilter {
    @Field(() => UserWhereInput, {nullable:true})
    is?: InstanceType<typeof UserWhereInput>;
    @Field(() => UserWhereInput, {nullable:true})
    isNot?: InstanceType<typeof UserWhereInput>;
}

@InputType()
export class UserScalarWhereWithAggregatesInput {
    @Field(() => [UserScalarWhereWithAggregatesInput], {nullable:true})
    AND?: Array<UserScalarWhereWithAggregatesInput>;
    @Field(() => [UserScalarWhereWithAggregatesInput], {nullable:true})
    OR?: Array<UserScalarWhereWithAggregatesInput>;
    @Field(() => [UserScalarWhereWithAggregatesInput], {nullable:true})
    NOT?: Array<UserScalarWhereWithAggregatesInput>;
    @Field(() => StringWithAggregatesFilter, {nullable:true})
    id?: InstanceType<typeof StringWithAggregatesFilter>;
    @Field(() => DateTimeWithAggregatesFilter, {nullable:true})
    createdAt?: InstanceType<typeof DateTimeWithAggregatesFilter>;
    @Field(() => DateTimeWithAggregatesFilter, {nullable:true})
    updatedAt?: InstanceType<typeof DateTimeWithAggregatesFilter>;
    @Field(() => StringWithAggregatesFilter, {nullable:true})
    email?: InstanceType<typeof StringWithAggregatesFilter>;
    @Field(() => StringWithAggregatesFilter, {nullable:true})
    name?: InstanceType<typeof StringWithAggregatesFilter>;
}

@InputType()
export class UserUncheckedCreateWithoutOrdersInput {
    @Field(() => String, {nullable:true})
    id?: string;
    @Field(() => Date, {nullable:true})
    createdAt?: Date | string;
    @Field(() => Date, {nullable:true})
    updatedAt?: Date | string;
    @Field(() => String, {nullable:false})
    email!: string;
    @Field(() => String, {nullable:false})
    name!: string;
}

@InputType()
export class UserUncheckedCreateInput {
    @Field(() => String, {nullable:true})
    id?: string;
    @Field(() => Date, {nullable:true})
    createdAt?: Date | string;
    @Field(() => Date, {nullable:true})
    updatedAt?: Date | string;
    @Field(() => String, {nullable:false})
    email!: string;
    @Field(() => String, {nullable:false})
    name!: string;
    @Field(() => OrderUncheckedCreateNestedManyWithoutUserInput, {nullable:true})
    orders?: InstanceType<typeof OrderUncheckedCreateNestedManyWithoutUserInput>;
}

@InputType()
export class UserUncheckedUpdateManyInput {
    @Field(() => StringFieldUpdateOperationsInput, {nullable:true})
    id?: InstanceType<typeof StringFieldUpdateOperationsInput>;
    @Field(() => DateTimeFieldUpdateOperationsInput, {nullable:true})
    createdAt?: InstanceType<typeof DateTimeFieldUpdateOperationsInput>;
    @Field(() => DateTimeFieldUpdateOperationsInput, {nullable:true})
    updatedAt?: InstanceType<typeof DateTimeFieldUpdateOperationsInput>;
    @Field(() => StringFieldUpdateOperationsInput, {nullable:true})
    email?: InstanceType<typeof StringFieldUpdateOperationsInput>;
    @Field(() => StringFieldUpdateOperationsInput, {nullable:true})
    name?: InstanceType<typeof StringFieldUpdateOperationsInput>;
}

@InputType()
export class UserUncheckedUpdateWithoutOrdersInput {
    @Field(() => StringFieldUpdateOperationsInput, {nullable:true})
    id?: InstanceType<typeof StringFieldUpdateOperationsInput>;
    @Field(() => DateTimeFieldUpdateOperationsInput, {nullable:true})
    createdAt?: InstanceType<typeof DateTimeFieldUpdateOperationsInput>;
    @Field(() => DateTimeFieldUpdateOperationsInput, {nullable:true})
    updatedAt?: InstanceType<typeof DateTimeFieldUpdateOperationsInput>;
    @Field(() => StringFieldUpdateOperationsInput, {nullable:true})
    email?: InstanceType<typeof StringFieldUpdateOperationsInput>;
    @Field(() => StringFieldUpdateOperationsInput, {nullable:true})
    name?: InstanceType<typeof StringFieldUpdateOperationsInput>;
}

@InputType()
export class UserUncheckedUpdateInput {
    @Field(() => StringFieldUpdateOperationsInput, {nullable:true})
    id?: InstanceType<typeof StringFieldUpdateOperationsInput>;
    @Field(() => DateTimeFieldUpdateOperationsInput, {nullable:true})
    createdAt?: InstanceType<typeof DateTimeFieldUpdateOperationsInput>;
    @Field(() => DateTimeFieldUpdateOperationsInput, {nullable:true})
    updatedAt?: InstanceType<typeof DateTimeFieldUpdateOperationsInput>;
    @Field(() => StringFieldUpdateOperationsInput, {nullable:true})
    email?: InstanceType<typeof StringFieldUpdateOperationsInput>;
    @Field(() => StringFieldUpdateOperationsInput, {nullable:true})
    name?: InstanceType<typeof StringFieldUpdateOperationsInput>;
    @Field(() => OrderUncheckedUpdateManyWithoutUserNestedInput, {nullable:true})
    orders?: InstanceType<typeof OrderUncheckedUpdateManyWithoutUserNestedInput>;
}

@InputType()
export class UserUpdateManyMutationInput {
    @Field(() => StringFieldUpdateOperationsInput, {nullable:true})
    id?: InstanceType<typeof StringFieldUpdateOperationsInput>;
    @Field(() => DateTimeFieldUpdateOperationsInput, {nullable:true})
    createdAt?: InstanceType<typeof DateTimeFieldUpdateOperationsInput>;
    @Field(() => DateTimeFieldUpdateOperationsInput, {nullable:true})
    updatedAt?: InstanceType<typeof DateTimeFieldUpdateOperationsInput>;
    @Field(() => StringFieldUpdateOperationsInput, {nullable:true})
    email?: InstanceType<typeof StringFieldUpdateOperationsInput>;
    @Field(() => StringFieldUpdateOperationsInput, {nullable:true})
    name?: InstanceType<typeof StringFieldUpdateOperationsInput>;
}

@InputType()
export class UserUpdateOneRequiredWithoutOrdersNestedInput {
    @Field(() => UserCreateWithoutOrdersInput, {nullable:true})
    @Type(() => UserCreateWithoutOrdersInput)
    create?: InstanceType<typeof UserCreateWithoutOrdersInput>;
    @Field(() => UserCreateOrConnectWithoutOrdersInput, {nullable:true})
    @Type(() => UserCreateOrConnectWithoutOrdersInput)
    connectOrCreate?: InstanceType<typeof UserCreateOrConnectWithoutOrdersInput>;
    @Field(() => UserUpsertWithoutOrdersInput, {nullable:true})
    @Type(() => UserUpsertWithoutOrdersInput)
    upsert?: InstanceType<typeof UserUpsertWithoutOrdersInput>;
    @Field(() => UserWhereUniqueInput, {nullable:true})
    @Type(() => UserWhereUniqueInput)
    connect?: Prisma.AtLeast<UserWhereUniqueInput, 'id' | 'email'>;
    @Field(() => UserUpdateToOneWithWhereWithoutOrdersInput, {nullable:true})
    @Type(() => UserUpdateToOneWithWhereWithoutOrdersInput)
    update?: InstanceType<typeof UserUpdateToOneWithWhereWithoutOrdersInput>;
}

@InputType()
export class UserUpdateToOneWithWhereWithoutOrdersInput {
    @Field(() => UserWhereInput, {nullable:true})
    @Type(() => UserWhereInput)
    where?: InstanceType<typeof UserWhereInput>;
    @Field(() => UserUpdateWithoutOrdersInput, {nullable:false})
    @Type(() => UserUpdateWithoutOrdersInput)
    data!: InstanceType<typeof UserUpdateWithoutOrdersInput>;
}

@InputType()
export class UserUpdateWithoutOrdersInput {
    @Field(() => StringFieldUpdateOperationsInput, {nullable:true})
    id?: InstanceType<typeof StringFieldUpdateOperationsInput>;
    @Field(() => DateTimeFieldUpdateOperationsInput, {nullable:true})
    createdAt?: InstanceType<typeof DateTimeFieldUpdateOperationsInput>;
    @Field(() => DateTimeFieldUpdateOperationsInput, {nullable:true})
    updatedAt?: InstanceType<typeof DateTimeFieldUpdateOperationsInput>;
    @Field(() => StringFieldUpdateOperationsInput, {nullable:true})
    email?: InstanceType<typeof StringFieldUpdateOperationsInput>;
    @Field(() => StringFieldUpdateOperationsInput, {nullable:true})
    name?: InstanceType<typeof StringFieldUpdateOperationsInput>;
}

@InputType()
export class UserUpdateInput {
    @Field(() => StringFieldUpdateOperationsInput, {nullable:true})
    id?: InstanceType<typeof StringFieldUpdateOperationsInput>;
    @Field(() => DateTimeFieldUpdateOperationsInput, {nullable:true})
    createdAt?: InstanceType<typeof DateTimeFieldUpdateOperationsInput>;
    @Field(() => DateTimeFieldUpdateOperationsInput, {nullable:true})
    updatedAt?: InstanceType<typeof DateTimeFieldUpdateOperationsInput>;
    @Field(() => StringFieldUpdateOperationsInput, {nullable:true})
    email?: InstanceType<typeof StringFieldUpdateOperationsInput>;
    @Field(() => StringFieldUpdateOperationsInput, {nullable:true})
    name?: InstanceType<typeof StringFieldUpdateOperationsInput>;
    @Field(() => OrderUpdateManyWithoutUserNestedInput, {nullable:true})
    orders?: InstanceType<typeof OrderUpdateManyWithoutUserNestedInput>;
}

@InputType()
export class UserUpsertWithoutOrdersInput {
    @Field(() => UserUpdateWithoutOrdersInput, {nullable:false})
    @Type(() => UserUpdateWithoutOrdersInput)
    update!: InstanceType<typeof UserUpdateWithoutOrdersInput>;
    @Field(() => UserCreateWithoutOrdersInput, {nullable:false})
    @Type(() => UserCreateWithoutOrdersInput)
    create!: InstanceType<typeof UserCreateWithoutOrdersInput>;
    @Field(() => UserWhereInput, {nullable:true})
    @Type(() => UserWhereInput)
    where?: InstanceType<typeof UserWhereInput>;
}

@InputType()
export class UserWhereUniqueInput {
    @Field(() => String, {nullable:true})
    id?: string;
    @Field(() => String, {nullable:true})
    email?: string;
    @Field(() => [UserWhereInput], {nullable:true})
    AND?: Array<UserWhereInput>;
    @Field(() => [UserWhereInput], {nullable:true})
    OR?: Array<UserWhereInput>;
    @Field(() => [UserWhereInput], {nullable:true})
    NOT?: Array<UserWhereInput>;
    @Field(() => DateTimeFilter, {nullable:true})
    createdAt?: InstanceType<typeof DateTimeFilter>;
    @Field(() => DateTimeFilter, {nullable:true})
    updatedAt?: InstanceType<typeof DateTimeFilter>;
    @Field(() => StringFilter, {nullable:true})
    name?: InstanceType<typeof StringFilter>;
    @Field(() => OrderListRelationFilter, {nullable:true})
    orders?: InstanceType<typeof OrderListRelationFilter>;
}

@InputType()
export class UserWhereInput {
    @Field(() => [UserWhereInput], {nullable:true})
    AND?: Array<UserWhereInput>;
    @Field(() => [UserWhereInput], {nullable:true})
    OR?: Array<UserWhereInput>;
    @Field(() => [UserWhereInput], {nullable:true})
    NOT?: Array<UserWhereInput>;
    @Field(() => StringFilter, {nullable:true})
    id?: InstanceType<typeof StringFilter>;
    @Field(() => DateTimeFilter, {nullable:true})
    createdAt?: InstanceType<typeof DateTimeFilter>;
    @Field(() => DateTimeFilter, {nullable:true})
    updatedAt?: InstanceType<typeof DateTimeFilter>;
    @Field(() => StringFilter, {nullable:true})
    email?: InstanceType<typeof StringFilter>;
    @Field(() => StringFilter, {nullable:true})
    name?: InstanceType<typeof StringFilter>;
    @Field(() => OrderListRelationFilter, {nullable:true})
    orders?: InstanceType<typeof OrderListRelationFilter>;
}

@ObjectType()
export class User {
    @Field(() => ID, {nullable:false})
    id!: string;
    @Field(() => Date, {nullable:false})
    createdAt!: Date;
    @Field(() => Date, {nullable:false})
    updatedAt!: Date;
    @Field(() => String, {nullable:false})
    email!: string;
    @Field(() => String, {nullable:false})
    name!: string;
    @Field(() => [Order], {nullable:true})
    orders?: Array<Order>;
}
