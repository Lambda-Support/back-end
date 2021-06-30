const router = require("express").Router();

const Tickets = require("./ticket-model")

router.get("/", (req, res) => {
    Tickets.find()
        .then(tickets => {
            res.status(200)
                .json(tickets);
        })
        .catch(error => {
            res.status(500)
                .json({ message: `failed to get tickets - ${error}`})
        })
});

router.get("/:id", (req, res) => {
    Tickets.findById(req.params.id)
        .then(tickets => {
            res.status(200)
                .json(tickets)
        })
        .catch(error => {
            res.status(500)
                .json({ message: `failed to get tickets - ${error}` })
        })
});

router.post("/", (req, res) => {
    let ticket = req.body;

    Tickets.add(ticket)
        .then(saved => {
            res.status(201)
                .json({ message: "ticket created" })
        })
        .catch(error => {
            res.status(500)
                .json({ error: error, errorMessage: error.message} )
        })
});

router.put("/:id", (req, res) => {
    Tickets.edit(req.params.id, req.body)
        .then(count => {
            if(count){
                res.status(200)
                    .json({ message: "update successful" , data: req.body})
            } else {
                res.status(404)
                    .json( { message: "ID not found" })
            }
        })
        .catch(error => {
            res.status(500)
                .json( { error: error.message} )
        })
});

// router.put('/makeAdmin', authenticate, (req, res) => {
//     Users.update({userRole: 'admin'}, req.decodedToken.user.id)
//       .then(user => {
//         res.status(200).json(user)
//       })
//       .catch(err => {
//         res.status(500).json({ message: `unable to update role - ${err}` })
//       })
//   })  

router.delete("/:id", (req, res) => {
    Tickets.remove(req.params.id)
        .then(deleted => {
            res.status(200)
                .json({ message: "delete successful" })
        })
        .catch( error => {
            res.status(500)
                .json({ message: `unable to delete ticket - ${error}`})
        })
});

module.exports = router;