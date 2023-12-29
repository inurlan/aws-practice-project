/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function (knex) {
  await knex.schema.createTable("post", (table) => {
    table.increments("id").primary();
    table.string("imageName").notNullable();
    table.string("caption").notNullable();
    table.string("totalComments");
    table.string("totalLikes");
    table.timestamp("created").notNullable().defaultTo(knex.fn.now());
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.raw(`DROP TABLE post CASCADE`);
};
