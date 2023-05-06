import { MigrationInterface, QueryRunner,Table } from 'typeorm';

export class CinemaSystem1663877813247 implements MigrationInterface {
  /**
   # ToDo: Create a migration that creates all tables for the following user stories

   For an example on how a UI for an api using this might look like, please try to book a show at https://in.bookmyshow.com/.
   To not introduce additional complexity, please consider only one cinema.

   Please list the tables that you would create including keys, foreign keys and attributes that are required by the user stories.

   ## User Stories

   **Movie exploration**
   * As a user I want to see which films can be watched and at what times
   * As a user I want to only see the shows which are not booked out

   **Show administration**
   * As a cinema owner I want to run different films at different times
   * As a cinema owner I want to run multiple films at the same time in different showrooms

   **Pricing**
   * As a cinema owner I want to get paid differently per show
   * As a cinema owner I want to give different seat types a percentage premium, for example 50 % more for vip seat

   **Seating**
   * As a user I want to book a seat
   * As a user I want to book a vip seat/couple seat/super vip/whatever
   * As a user I want to see which seats are still available
   * As a user I want to know where I'm sitting on my ticket
   * As a cinema owner I dont want to configure the seating for every show
   */
  public async up(queryRunner: QueryRunner): Promise<void> {
   // Movies table
   // create table: Movie
   await queryRunner.createTable(
    new Table({
      name: 'Movie',
      columns: [
        {
          name: 'id',
          type: 'int',
          isPrimary: true,
          isGenerated: true,
          generationStrategy: 'increment',
        },
        {
          name: 'name',
          type: 'varchar',
          length: '255',
        },
        {
          name: 'description',
          type: 'text',
        },
      ],
    }),
  );

  // create table: Showroom
  await queryRunner.createTable(
    new Table({
      name: 'Showroom',
      columns: [
        {
          name: 'id',
          type: 'int',
          isPrimary: true,
          isGenerated: true,
          generationStrategy: 'increment',
        },
        {
          name: 'name',
          type: 'varchar',
          length: '255',
        },
      ],
    }),
  );

  // create table: Show
  await queryRunner.createTable(
    new Table({
      name: 'Show',
      columns: [
        {
          name: 'id',
          type: 'int',
          isPrimary: true,
          isGenerated: true,
          generationStrategy: 'increment',
        },
        {
          name: 'startTime',
          type: 'timestamp',
          default: 'CURRENT_TIMESTAMP',
        },
        {
          name: 'endTime',
          type: 'timestamp',
        },
        {
          name: 'price',
          type: 'decimal',
          precision: 8,
          scale: 2,
        },
        {
          name: 'movieId',
          type: 'int',
        },
        {
          name: 'showroomId',
          type: 'int',
        },
      ],
      foreignKeys: [
        {
          columnNames: ['movieId'],
          referencedColumnNames: ['id'],
          referencedTableName: 'Movie',
          onDelete: 'CASCADE',
        },
        {
          columnNames: ['showroomId'],
          referencedColumnNames: ['id'],
          referencedTableName: 'Showroom',
          onDelete: 'CASCADE',
        },
      ],
    }),
  );

  // create table: Seat
  await queryRunner.createTable(
    new Table({
      name: 'Seat',
      columns: [
        {
          name: 'id',
          type: 'int',
          isPrimary: true,
          isGenerated: true,
          generationStrategy: 'increment',
        },
        {
          name: 'number',
          type: 'int',
        },
        {
          name: 'type',
          type: 'enum',
          enum: ['standard', 'vip', 'couple', 'super-vip'],
          default: "'standard'",
        },
        {
          name: 'showId',
          type: 'int',
        },
      ],
      foreignKeys: [
        {
          columnNames: ['showId'],
          referencedColumnNames: ['id'],
          referencedTableName: 'Show',
          onDelete: 'CASCADE',
        },
      ],
    }),
  );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('Seat');
    await queryRunner.dropTable('Show');
    await queryRunner.dropTable('Showroom');
    await queryRunner.dropTable('Movie');
  }
}
