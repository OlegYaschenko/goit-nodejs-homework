const { Contact } = require("../../models/contact");

const removeById = async (req, res, next) => {
  const { contactId } = req.params;
  const result = await Contact.findByIdAndRemove(contactId);
  if (!result) {
    res.status(404).json({ message: "Not found" });
    return;
  }
  res.json({ message: "contact deleted" });
};

module.exports = removeById;
