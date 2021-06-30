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
    return db("tickets")
        .select("*")
        .orderBy("id");
}

function findBy(filter){
    return db("tickets")
        .where(filter);
}

function findById(id){
    return db("tickets")
        .where( { id })
        .first();
}

async function add(user) {
    const [id] = await db("tickets").insert(user, "id");

    return findById(id);
}

function edit(id, changes){
    return db("tickets")
        .where( { id: id })
        .update(changes);
}

function update(changes, id){
    return db("tickets")
        .where({ id })
        .update(changes, id)
        .then(() => {
            return findById(id)
        });
}

function remove(id){
    return db("tickets")
        .where({ id })
        .del();
}