require('dotenv').config();
let mongoose = require("mongoose")
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});
const Schema = mongoose.Schema;

const personSchema = new Schema({
  name: { type: String, required: true },
  age: Number,
  favoriteFoods: [String]
})
const Person = mongoose.model("Person", personSchema);

const createAndSavePerson = (done) => {
  let personData= new Person({
    name:"Abhishek",
    age: 25,
    favoriteFoods:["Apple","Mango"]
  })

  personData.save(function(err,data){
    if (err) return console.error(err);
    done(null, data);
  })
  
};

const createManyPeople = (arrayOfPeople, done) => {
  Person.insertMany(arrayOfPeople, (err, data) => {
    if (err) return console.error(err);
    done(null, data);
  })
};

const findPeopleByName = (personName, done) => {
  const query = { name: personName };
  Person.find(query,(err,data)=>{
    if(err)return console.error(err);
    done(null, data);
  })
};

const findOneByFood = (food, done) => {
  const query = { favoriteFoods:food };
  Person.findOne(query,(err,data)=>{
    if(err)return console.error(err);
    done(null, data);
  })
};

const findPersonById = (personId, done) => {
  const query = {_id: personId}
  Person.findById(query,(err,data)=>{
    if(err)return console.error(err);
    done(null, data);
  })
};

const findEditThenSave = (personId, done) => {
  const foodToAdd = 'hamburger';

  // .findById() method to find a person by _id with the parameter personId as search key. 
  Person.findById(personId, (err, person) => {
    if(err) return console.log(err); 
  
    // Array.push() method to add "hamburger" to the list of the person's favoriteFoods
    person.favoriteFoods.push(foodToAdd);

    // and inside the find callback - save() the updated Person.
    person.save((err, updatedPerson) => {
      if(err) return console.log(err);
      done(null, updatedPerson)
    })
  })
};

const findAndUpdate = (personName, done) => {
  const ageToSet = 20;
  const query = { name: personName };
  Person.findOneAndUpdate(query, { age: ageToSet }, { new: true },(err, updatedPerson) => { 
      if (err) {
        console.error(err);
        done(err); 
      } else {
        done(null, updatedPerson); 
      }
    }
  );
};

const removeById = (personId, done) => {
  const query = {_id:personId};
  Person.findByIdAndRemove(query, (err,data)=>{
    if(err) return console.error(err);
    done(null , data);
  })
 
};

const removeManyPeople = (done) => {
  const nameToRemove = "Mary";
  Person.deleteMany({ name: nameToRemove }, (err, data) => {
    if (err) return console.error(err);
    done(null, data);
  });
};

const queryChain = (done) => {
  const foodToSearch = "burrito";

  // Find people who like the specified food
  Person.find({ favoriteFoods: foodToSearch })
    .sort({ name: 1 }) // Sort the results by name in ascending order
    .limit(2) // Limit the results to two documents
    .select({ age: 0 }) // Hide the 'age' property from the result
    .exec((err, data) => { // Execute the query and pass the callback
      if (err) return console.error(err);
      done(err, data); // Pass the error and data to the callback
    });
};

/** **Well Done !!**
/* You completed these challenges, let's go celebrate !
 */

//----- **DO NOT EDIT BELOW THIS LINE** ----------------------------------

exports.PersonModel = Person;
exports.createAndSavePerson = createAndSavePerson;
exports.findPeopleByName = findPeopleByName;
exports.findOneByFood = findOneByFood;
exports.findPersonById = findPersonById;
exports.findEditThenSave = findEditThenSave;
exports.findAndUpdate = findAndUpdate;
exports.createManyPeople = createManyPeople;
exports.removeById = removeById;
exports.removeManyPeople = removeManyPeople;
exports.queryChain = queryChain;
