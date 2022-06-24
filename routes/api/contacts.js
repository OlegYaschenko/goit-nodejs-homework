const express = require("express");
const contactsOperation = require("../../models/contacts");
const { addSchema, updateSchema } = require("../../schema/contacts");

const router = express.Router();

router.get("/", async (req, res, next) => {
  const contacts = await contactsOperation.listContacts();
  console.log(contacts);
  res.json(contacts);
});

router.get("/:contactId", async (req, res, next) => {
  const { contactId } = req.params;
  const result = await contactsOperation.getContactById(contactId);

  if (!result) {
    res.status(404).json({ message: "Not found" });
    return;
  }
  res.json(result);
});

router.post("/", async (req, res, next) => {
  const { error } = addSchema.validate(req.body);
  console.log(error);
  console.log(req.body);
  if (error) {
    res.status(400).json({ message: "missing fields" });
    return;
  }
  const result = await contactsOperation.addContact(req.body);
  res.status(201).json(result);
});

router.delete("/:contactId", async (req, res, next) => {
  const { contactId } = req.params;
  const result = await contactsOperation.removeContact(contactId);
  if (!result) {
    res.status(404).json({ message: "Not found" });
    return;
  }
  res.json({ message: "contact deleted" });
});

router.put("/:contactId", async (req, res, next) => {
  const { contactId } = req.params;
  const { error } = updateSchema.validate(req.body);
  const isEmpty = Object.keys(req.body).length === 0;
  console.log(isEmpty);
  if (isEmpty || error) {
    res.status(400).json({ message: "missing fields" });
    return;
  }
  const result = await contactsOperation.updateContact(contactId, req.body);
  if (!result) {
    res.status(400).json({ message: "Not found" });
    return;
  }
  res.json(result);
});

module.exports = router;
