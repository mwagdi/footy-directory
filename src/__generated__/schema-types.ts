import { GraphQLResolveInfo } from 'graphql';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
export type RequireFields<T, K extends keyof T> = Omit<T, K> & { [P in K]-?: NonNullable<T[P]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
};

export type AuthPayload = {
  __typename?: 'AuthPayload';
  token: Scalars['String']['output'];
  user: User;
};

export type Club = {
  __typename?: 'Club';
  id: Scalars['ID']['output'];
  logo?: Maybe<Scalars['String']['output']>;
  name: Scalars['String']['output'];
  nation: Nation;
  nation_id: Scalars['Int']['output'];
  players: Array<Maybe<Player>>;
};

export type CreateClubInput = {
  logo?: InputMaybe<Scalars['String']['input']>;
  name: Scalars['String']['input'];
  nation_id: Scalars['Int']['input'];
};

export type CreateNationInput = {
  flag?: InputMaybe<Scalars['String']['input']>;
  name: Scalars['String']['input'];
  population: Scalars['Int']['input'];
};

export type CreatePlayerInput = {
  avatar?: InputMaybe<Scalars['String']['input']>;
  birthdate: Scalars['String']['input'];
  club_id?: InputMaybe<Scalars['Int']['input']>;
  name: Scalars['String']['input'];
  nationality_ids: Array<InputMaybe<Scalars['Int']['input']>>;
  position: Scalars['String']['input'];
};

export type LoginInput = {
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createClub?: Maybe<Club>;
  createNation?: Maybe<Nation>;
  createPlayer?: Maybe<Player>;
  login?: Maybe<AuthPayload>;
  signup?: Maybe<AuthPayload>;
};


export type MutationCreateClubArgs = {
  input: CreateClubInput;
};


export type MutationCreateNationArgs = {
  input: CreateNationInput;
};


export type MutationCreatePlayerArgs = {
  input?: InputMaybe<CreatePlayerInput>;
};


export type MutationLoginArgs = {
  input: LoginInput;
};


export type MutationSignupArgs = {
  input: SignupInput;
};

export type Nation = {
  __typename?: 'Nation';
  clubs: Array<Maybe<Club>>;
  flag?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  players: Array<Maybe<Player>>;
  population: Scalars['Int']['output'];
};

export type Player = {
  __typename?: 'Player';
  avatar?: Maybe<Scalars['String']['output']>;
  birthdate: Scalars['String']['output'];
  club?: Maybe<Club>;
  club_id?: Maybe<Scalars['Int']['output']>;
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  nationalities: Array<Maybe<Nation>>;
  position: Scalars['String']['output'];
};

export type Query = {
  __typename?: 'Query';
  clubs: Array<Maybe<Club>>;
  nations: Array<Maybe<Nation>>;
  players: Array<Maybe<Player>>;
  search: Search;
};


export type QuerySearchArgs = {
  input: Scalars['String']['input'];
};

export type Search = {
  __typename?: 'Search';
  clubs: Array<Maybe<Club>>;
  nations: Array<Maybe<Nation>>;
  players: Array<Maybe<Player>>;
};

export type SignupInput = {
  avatar?: InputMaybe<Scalars['String']['input']>;
  email: Scalars['String']['input'];
  first_name: Scalars['String']['input'];
  last_name: Scalars['String']['input'];
  password: Scalars['String']['input'];
};

export type User = {
  __typename?: 'User';
  avatar?: Maybe<Scalars['String']['output']>;
  email: Scalars['String']['output'];
  first_name: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  last_name: Scalars['String']['output'];
  password: Scalars['String']['output'];
};

export type WithIndex<TObject> = TObject & Record<string, any>;
export type ResolversObject<TObject> = WithIndex<TObject>;

export type ResolverTypeWrapper<T> = Promise<T> | T;


export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> = ResolverFn<TResult, TParent, TContext, TArgs> | ResolverWithResolve<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterable<TResult> | Promise<AsyncIterable<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (obj: T, context: TContext, info: GraphQLResolveInfo) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;



/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = ResolversObject<{
  AuthPayload: ResolverTypeWrapper<AuthPayload>;
  Boolean: ResolverTypeWrapper<Scalars['Boolean']['output']>;
  Club: ResolverTypeWrapper<Club>;
  CreateClubInput: CreateClubInput;
  CreateNationInput: CreateNationInput;
  CreatePlayerInput: CreatePlayerInput;
  ID: ResolverTypeWrapper<Scalars['ID']['output']>;
  Int: ResolverTypeWrapper<Scalars['Int']['output']>;
  LoginInput: LoginInput;
  Mutation: ResolverTypeWrapper<{}>;
  Nation: ResolverTypeWrapper<Nation>;
  Player: ResolverTypeWrapper<Player>;
  Query: ResolverTypeWrapper<{}>;
  Search: ResolverTypeWrapper<Search>;
  SignupInput: SignupInput;
  String: ResolverTypeWrapper<Scalars['String']['output']>;
  User: ResolverTypeWrapper<User>;
}>;

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = ResolversObject<{
  AuthPayload: AuthPayload;
  Boolean: Scalars['Boolean']['output'];
  Club: Club;
  CreateClubInput: CreateClubInput;
  CreateNationInput: CreateNationInput;
  CreatePlayerInput: CreatePlayerInput;
  ID: Scalars['ID']['output'];
  Int: Scalars['Int']['output'];
  LoginInput: LoginInput;
  Mutation: {};
  Nation: Nation;
  Player: Player;
  Query: {};
  Search: Search;
  SignupInput: SignupInput;
  String: Scalars['String']['output'];
  User: User;
}>;

export type AuthPayloadResolvers<ContextType = any, ParentType extends ResolversParentTypes['AuthPayload'] = ResolversParentTypes['AuthPayload']> = ResolversObject<{
  token?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  user?: Resolver<ResolversTypes['User'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type ClubResolvers<ContextType = any, ParentType extends ResolversParentTypes['Club'] = ResolversParentTypes['Club']> = ResolversObject<{
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  logo?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  nation?: Resolver<ResolversTypes['Nation'], ParentType, ContextType>;
  nation_id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  players?: Resolver<Array<Maybe<ResolversTypes['Player']>>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type MutationResolvers<ContextType = any, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = ResolversObject<{
  createClub?: Resolver<Maybe<ResolversTypes['Club']>, ParentType, ContextType, RequireFields<MutationCreateClubArgs, 'input'>>;
  createNation?: Resolver<Maybe<ResolversTypes['Nation']>, ParentType, ContextType, RequireFields<MutationCreateNationArgs, 'input'>>;
  createPlayer?: Resolver<Maybe<ResolversTypes['Player']>, ParentType, ContextType, Partial<MutationCreatePlayerArgs>>;
  login?: Resolver<Maybe<ResolversTypes['AuthPayload']>, ParentType, ContextType, RequireFields<MutationLoginArgs, 'input'>>;
  signup?: Resolver<Maybe<ResolversTypes['AuthPayload']>, ParentType, ContextType, RequireFields<MutationSignupArgs, 'input'>>;
}>;

export type NationResolvers<ContextType = any, ParentType extends ResolversParentTypes['Nation'] = ResolversParentTypes['Nation']> = ResolversObject<{
  clubs?: Resolver<Array<Maybe<ResolversTypes['Club']>>, ParentType, ContextType>;
  flag?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  players?: Resolver<Array<Maybe<ResolversTypes['Player']>>, ParentType, ContextType>;
  population?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type PlayerResolvers<ContextType = any, ParentType extends ResolversParentTypes['Player'] = ResolversParentTypes['Player']> = ResolversObject<{
  avatar?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  birthdate?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  club?: Resolver<Maybe<ResolversTypes['Club']>, ParentType, ContextType>;
  club_id?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  nationalities?: Resolver<Array<Maybe<ResolversTypes['Nation']>>, ParentType, ContextType>;
  position?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type QueryResolvers<ContextType = any, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = ResolversObject<{
  clubs?: Resolver<Array<Maybe<ResolversTypes['Club']>>, ParentType, ContextType>;
  nations?: Resolver<Array<Maybe<ResolversTypes['Nation']>>, ParentType, ContextType>;
  players?: Resolver<Array<Maybe<ResolversTypes['Player']>>, ParentType, ContextType>;
  search?: Resolver<ResolversTypes['Search'], ParentType, ContextType, RequireFields<QuerySearchArgs, 'input'>>;
}>;

export type SearchResolvers<ContextType = any, ParentType extends ResolversParentTypes['Search'] = ResolversParentTypes['Search']> = ResolversObject<{
  clubs?: Resolver<Array<Maybe<ResolversTypes['Club']>>, ParentType, ContextType>;
  nations?: Resolver<Array<Maybe<ResolversTypes['Nation']>>, ParentType, ContextType>;
  players?: Resolver<Array<Maybe<ResolversTypes['Player']>>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type UserResolvers<ContextType = any, ParentType extends ResolversParentTypes['User'] = ResolversParentTypes['User']> = ResolversObject<{
  avatar?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  email?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  first_name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  last_name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  password?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type Resolvers<ContextType = any> = ResolversObject<{
  AuthPayload?: AuthPayloadResolvers<ContextType>;
  Club?: ClubResolvers<ContextType>;
  Mutation?: MutationResolvers<ContextType>;
  Nation?: NationResolvers<ContextType>;
  Player?: PlayerResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  Search?: SearchResolvers<ContextType>;
  User?: UserResolvers<ContextType>;
}>;

