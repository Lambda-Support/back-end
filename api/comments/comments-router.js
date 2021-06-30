const router = require("express").Router();

const Comments = require('./comments-model');

router.get("/", (req, res) => {
    Comments.find()
        .then(comments => {
            res.status(201).json(comments);
        })
        .catch(err => {
            res.status(500).json({message: "failed to get comments"}, err)
        })
})

router.get("/:id", (req, res) => {
    Comments.findById(req.params.id)
        .then(comment => {
            res.status(201).json(comment)
        })
        .catch(err => {
            res.status(500).json({message: "Failed to get comment"}, err)
        })
})

router.post("/add", (req, res) => {
    let comment = req.body;

    Comments.add(comment)
        .then(success => {
            res.status(201).json({message: "commment post successful"})
        })
        .catch(err => {
            res.status(404).json({message: `comment did not post -- ${err}`})
        })
})

router.put("/change", (req, res) => {
    let changes = req.body
    let id = req.params.id

    Comments.edit(id, changes)
        .then(comment => {
            if(comment){
                res.status(200).json({message: "update successful"}, comment)
            } else {
                res.status(404).json({message: "ID not found"})
            }
        })
        .catch(err => {
            res.status(500).json({message: "Changes did not apply"}, err)
        })
})

router.delete("/remove", (req, res) => {
    Comments.remove(req.body.id)
        .then(deleted => {
            res.status(201).json({message: "Deleted successfully"})
        })
        .catch(err => {
            res.status(500).json({message: "Unable to delete this comment"}, err)
        })
})

module.exports = router;