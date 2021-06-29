const db = require('../../data/dbConfig');

module.exports = {
    add,
    edit,
    find,
    findBy,
    findById,
    remove,
    update
};

function find(){
    return db("users")
        .select("*")
        .orderBy("id");
}

function findBy(filter){
    return db("users")
        .where(filter);
}

function findById(id){
    return db("users")
        .where( { id })
        .first();
}

async function add(user) {
    const [id] = await db("users").insert(user, "id");

    return findById(id);
}

function edit(id, changes){
    return db("users")
        .where( { id: id })
        .update(changes);
}

function update(changes, id){
    return db("users")
        .where({ id })
        .update(changes, id)
        .then(() => {
            return findById(id)
        });
}

function remove(id){
    return db("users")
        .where({ id })
        .del();
}