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
    return db("comments")
        .select("*")
        .orderBy("id");
}

function findBy(filter){
    return db("comments")
        .where(filter);
}

function findById(id){
    return db("comments")
        .where( { id })
        .first();
}

async function add(user) {
    const [id] = await db("comments").insert(user, "id");

    return findById(id);
}

function edit(id, changes){
    return db("comments")
        .where( { id: id })
        .update(changes);
}

function update(changes, id){
    return db("comments")
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