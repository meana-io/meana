import { Migration } from '@mikro-orm/migrations';

export class Migration20220518192958 extends Migration {

  async up(): Promise<void> {
    this.addSql('alter table "node_disk_partition" drop constraint "node_disk_partition_node_disk_uuid_foreign";');

    this.addSql('alter table "node_disk" drop constraint "node_disk_node_uuid_foreign";');

    this.addSql('alter table "node_disk_partition" rename column "node_disk_uuid" to "node_disk";');

    this.addSql('alter table "node_disk" rename column "node_uuid" to "node";');
  }

  async down(): Promise<void> {
    this.addSql('alter table "node_disk" rename column "node" to "node_uuid";');
    this.addSql('alter table "node_disk" add constraint "node_disk_node_uuid_foreign" foreign key ("node_uuid") references "node" ("uuid") on update cascade on delete set null;');

    this.addSql('alter table "node_disk_partition" rename column "node_disk" to "node_disk_uuid";');
    this.addSql('alter table "node_disk_partition" add constraint "node_disk_partition_node_disk_uuid_foreign" foreign key ("node_disk_uuid") references "node_disk" ("uuid") on update cascade on delete set null;');
  }

}
