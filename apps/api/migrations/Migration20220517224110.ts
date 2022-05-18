import { Migration } from '@mikro-orm/migrations';

export class Migration20220517224110 extends Migration {

  async up(): Promise<void> {
    this.addSql('create table "node_disk_partition" ("uuid" varchar(255) not null, "node_disk_uuid" varchar(255) null, "path" varchar(255) null, "used_space" varchar(255) null, "capacity" varchar(255) null, "file_system" varchar(255) null, "created_at" timestamptz(0) not null, "updated_at" timestamptz(0) not null);');
    this.addSql('alter table "node_disk_partition" add constraint "node_disk_partition_pkey" primary key ("uuid");');

    this.addSql('alter table "node_disk_partition" add constraint "node_disk_partition_node_disk_uuid_foreign" foreign key ("node_disk_uuid") references "node_disk" ("uuid") on update cascade on delete set null;');
  }

  async down(): Promise<void> {
    this.addSql('drop table if exists "node_disk_partition" cascade;');
  }

}
