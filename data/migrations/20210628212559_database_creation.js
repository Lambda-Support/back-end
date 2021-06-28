exports.up = function(knex) {
  return knex.schema
    .createTable("users", (tbl) => {
        tbl.increments();
        tbl.string("name", 36)
            .notNullable();
        tbl.string("username", 25)
            .notNullable()
            .unique();
        tbl.string("password", 36)
            .notNullable();
        tbl.string("role")
            .notNullable()
            .defaultTo("base");
    })
    .createTable("tickets", (tbl) => {
        tbl.increments();
        tbl.integer("user_id")
            .unsigned()
            .notNullable()
            .references("id")
            .inTable("users")
            .onUpdate('CASCADE')
            .onDelete("CASCADE");
        tbl.string("title")
            .notNullable();
        tbl.string("ticket_description")
            .notNullable();
        tbl.string("status")
            .notNullable()
            .defaultTo("New");
        tbl.timestamp("date_created")
            .defaultTo(knex.fn.now());
    })
    .createTable("comments", (tbl) => {
        tbl.increments();
        tbl.integer("user_id")
            .unsigned()
            .notNullable()
            .references("id")
            .inTable("users")
            .onUpdate("CASCADE")
            .onDelete("CASCADE");
        tbl.integer("ticket_id")
            .unsigned()
            .notNullable()
            .references("id")
            .inTable("tickets")
            .onUpdate("CASCADE")
            .onDelete("CASCADE");
        tbl.string("comment")
            .notNullable()
        tbl.timestamp("timestamp")
            .defaultTo(knex.fn.now());
    })
};

exports.down = function(knex) {
  return knex.schema
    .dropTableIfExists("comments")
    .dropTableIfExists("tickets")
    .dropTableIfExists("users")
};
