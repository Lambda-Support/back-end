
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        {id: 1, name:"lambda man", username: 'lambdagod', password: "password1", role: "owner"},
        {id: 2, name:"Alex Armadillo", username: 'armadillo', password: "rollypolly", role: "base"},
        {id: 3, name:"Bob Bobcat", username: 'lameow', password: "bobby", role: "admin"},
      ]);
    });
};
