const Person = require('../models/Person');

module.exports.index = async (req, res) => {
  const people = await Person.find();
  res.json(people);
};

module.exports.createPerson = async (req, res) => {
  if (!req.is('application/json' || 'json')) {
    throw new Error("Expects 'application/json'");
  }
  else {
    const { name, email, subscription } = req.body;
    const person = new Person({ name, email, subscription });
    person.user_id = person.email;
    const newPerson = await person.save();
    res.status(201).json(newPerson);
  }
};

module.exports.showPerson = async (req, res) => {
  const person = await Person.find({ email: req.params.user_id });
  if (!person) { res.status(404).send('User do not Exist!') };
  res.json(person);
};

module.exports.updatePerson = async (req, res) => {
  if (!req.is('application/json' || 'json')) {
    throw new Error("Expects 'application/json'");
  }
  else {
    const { name, email, subscription } = req.body;
    const person = await person.findOneAndUpdate(
      { email: req.params.user_id },
      { name, email, subscription }
    );
    person.user_id = person.email;
    const updatedPerson = await person.save();
    res.send(200).json(updatedPerson);
  }
};


module.exports.deletePerson = async (req, res) => {
  const deletedPerson = await Person.findOneAndDelete({ email: req.params.user_id });
  res.status(204).send(deletedPerson);
};