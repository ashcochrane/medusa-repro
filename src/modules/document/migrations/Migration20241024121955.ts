import { Migration } from '@mikro-orm/migrations';

export class Migration20241024121955 extends Migration {

  async up(): Promise<void> {
    this.addSql('create table if not exists "document" ("id" text not null, "url" text not null, "created_at" timestamptz not null default now(), "updated_at" timestamptz not null default now(), "deleted_at" timestamptz null, constraint "document_pkey" primary key ("id"));');
  }

  async down(): Promise<void> {
    this.addSql('drop table if exists "document" cascade;');
  }

}
