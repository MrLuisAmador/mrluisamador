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
