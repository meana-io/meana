import { Migration } from '@mikro-orm/migrations';

export class Migration20220517222649 extends Migration {

  async up(): Promise<void> {
    this.addSql('create table "node" ("uuid" varchar(255) not null, "name" varchar(255) not null, "created_at" timestamptz(0) not null, "updated_at" timestamptz(0) not null);');
    this.addSql('alter table "node" add constraint "node_pkey" primary key ("uuid");');

    this.addSql('create table "node_disk" ("uuid" varchar(255) not null, "node_uuid" varchar(255) null, "path" varchar(255) null, "manufacture" varchar(255) null, "model" varchar(255) null, "serial_number" varchar(255) null, "capacity" varchar(255) null, "firmware_version" varchar(255) null, "created_at" timestamptz(0) not null, "updated_at" timestamptz(0) not null);');
    this.addSql('alter table "node_disk" add constraint "node_disk_pkey" primary key ("uuid");');

    this.addSql('alter table "node_disk" add constraint "node_disk_node_uuid_foreign" foreign key ("node_uuid") references "node" ("uuid") on update cascade on delete set null;');
  }

  async down(): Promise<void> {
    this.addSql('alter table "node_disk" drop constraint "node_disk_node_uuid_foreign";');

    this.addSql('drop table if exists "node" cascade;');

    this.addSql('drop table if exists "node_disk" cascade;');
  }

}
