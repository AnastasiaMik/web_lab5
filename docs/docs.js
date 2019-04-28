const { Docs } = require("../database.js");

module.exports.getDoc = async function(req, res, next) {
    const docs = await Docs.find();

    res.json({ docs });
};

module.exports.createDocs = async function(req, res, next) {
    const { title, markup } = req.body;
    if (!title || !markup) {
        return res.json({ error: "Not provided title or markup field" });
    }
    const newDocs = new Docs({
        title,
        markup
    });

    const savedDocs = await newDocs.save();

    res.json({ docs: savedDocs });
};

module.exports.updateDocs = async function(req, res, next) {
    const id = req.params.id;
    const { title, markup } = req.body;

    if (!title || !markup) {
        return res.json({ error: "Not provided title or markup field" });
    }
    const updatedDocs = {
        title,
        markup
    };

    const docs = await Docs.findByIdAndUpdate(id, updatedDocs, { new: true });

    res.json({ result: "success", docs });
};

module.exports.deleteDocs = async function(req, res, next) {
    const id = req.params.id;
    const deletedDocs = await Docs.findByIdAndDelete(id);

    res.json({ result: "success", deleted: deletedDocs });
};
