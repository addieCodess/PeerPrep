const Module = require("../models/Module");

exports.createModule = async (req, res) => {
  try {
    const mod = new Module({ ...req.body, creator: req.user.id });
    await mod.save();
    res.json(mod);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.listModules = async (req, res) => {
  const modules = await Module.find().populate("creator", "name");
  res.json(modules);
};

exports.getModule = async (req, res) => {
  const mod = await Module.findById(req.params.id).populate("creator", "name");
  res.json(mod);
};

exports.updateModule = async (req, res) => {
  const mod = await Module.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  res.json(mod);
};

exports.deleteModule = async (req, res) => {
  await Module.findByIdAndDelete(req.params.id);
  res.json({ ok: true });
};
