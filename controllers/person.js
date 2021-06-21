const Person = require('../models/Person');

module.exports.index = async (req, res) => {
  const people = await Person.find();
  if (!people) { throw Error('No Details Found') };
  res.status(200).json(people);
};

module.exports.createPerson = async (req, res) => {
  if (!req.is('application/json' || 'json')) {
    throw Error("Expects 'application/json'");
  }
  else {
    const { name, email, subscription } = req.body;
    const person = new Person({ name, email, subscription });
    const newPerson = await person.save();
    if (!newPerson) { throw Error('Something went wrong while registering new person') };
    res.status(201).json(newPerson);
  }
};

module.exports.showPerson = async (req, res) => {
  const person = await Person.findById(req.params.id);
  if (!person) { res.status(404).send('User do not Exist!') };
  res.json(person);
};

module.exports.updatePerson = async (req, res) => {
  if (!req.is('application/json' || 'json')) {
    throw new Error("Expects 'application/json'");
  }
  else {
    const { name, email, subscription } = req.body;
    const updatedPerson = await Person.findByIdAndUpdate(
      req.params.id,
      { name, email, subscription }
      // , { new: true }
    );
    if (!updatedPerson) throw Error("Something went wrong while updating");;
    res.status(200).json({ success: true });
  }
};

module.exports.deletePerson = async (req, res) => {
  const deletedPerson = await Person.findByIdAndDelete(req.params.id);
  if (!deletedPerson) throw Error("No user found!");
  res.status(200).json({ success: true });
};