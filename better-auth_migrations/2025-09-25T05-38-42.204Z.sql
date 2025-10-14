create table "user" ("id" text not null primary key, "name" text not null, "email" text not null unique, "emailVerified" boolean not null, "image" text, "createdAt" timestamptz default CURRENT_TIMESTAMP not null, "updatedAt" timestamptz default CURRENT_TIMESTAMP not null);

create table "session" ("id" text not null primary key, "expiresAt" timestamptz not null, "token" text not null unique, "createdAt" timestamptz default CURRENT_TIMESTAMP not null, "updatedAt" timestamptz not null, "ipAddress" text, "userAgent" text, "userId" text not null references "user" ("id") on delete cascade);

create table "account" ("id" text not null primary key, "accountId" text not null, "providerId" text not null, "userId" text not null references "user" ("id") on delete cascade, "accessToken" text, "refreshToken" text, "idToken" text, "accessTokenExpiresAt" timestamptz, "refreshTokenExpiresAt" timestamptz, "scope" text, "password" text, "createdAt" timestamptz default CURRENT_TIMESTAMP not null, "updatedAt" timestamptz not null);

create table "verification" ("id" text not null primary key, "identifier" text not null, "value" text not null, "expiresAt" timestamptz not null, "createdAt" timestamptz default CURRENT_TIMESTAMP not null, "updatedAt" timestamptz default CURRENT_TIMESTAMP not null);

-- Create comments table for blog posts
create table "comment" (
  "id" text not null primary key,
  "content" text not null,
  "blogSlug" text not null,
  "userId" text not null references "user" ("id"),
  "parentId" text references "comment" ("id"),
  "isApproved" boolean not null default false,
  "createdAt" timestamp not null,
  "updatedAt" timestamp not null
);

-- Create index for faster queries
create index "comment_blog_slug_idx" on "comment" ("blogSlug");
create index "comment_user_id_idx" on "comment" ("userId");
create index "comment_parent_id_idx" on "comment" ("parentId");
create index "comment_created_at_idx" on "comment" ("createdAt");