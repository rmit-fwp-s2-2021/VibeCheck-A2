const db = require("../database");

exports.all = async (req, res) => {
    const follows = await db.userFollows.findAll();

    res.json(follows);
}