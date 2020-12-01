const User = require("../models/user");
// const auth = require("../models/loginData");

const getUsers = async (req, res) => {
  console.log(req.query)
    const page = parseInt(req.query.page);
    const limit = parseInt(req.query.limit);

    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    
    const results = {};
    results.totalCount = await User.countDocuments().exec() 


    if (endIndex < (await User.countDocuments().exec())) {
      results.next = {
        page: page + 1,
        limit: limit,
      };
    }

    if (startIndex > 0) {
      results.prev = {
        page: page - 1,
        limit: limit,
      };
    }

    try {
      results.current = await User.find().limit(limit).skip(startIndex).exec();
      res.json(results)
      
    } catch (e) {
      res.status(500).json({ message: e.message });
    }
};

const addUser = (req, res) => {
  const {Name,City, Blood_Group,  Gender, Email} = req.body;
  const  Image_Link = req.file.path
  const newUser = new User({Name,City, Blood_Group, Image_Link, Gender, Email});
  console.log(newUser)

  newUser
    .save()
    .then(() => res.json("User Added Successfully"))
    .catch((err) => res.status(400).json("Error is =>" + err));
};

const updateUser = (req, res) => {
    const id = req.params.id
    User.findOne({ _id : id })
        .then((editItem) => {
            editItem.Name = req.body.Name || editItem.Name
            editItem.City = req.body.City || editItem.City
            editItem.Image_Link = req.file.path|| editItem.Image_Link
            editItem.Gender = req.body.Gender || editItem.Gender
            editItem.Blood_Group = req.body.Blood_Group || editItem.Blood_Group,
            editItem.Email = req.body.Email || editItem.Email
            
            editItem.save()
                .then(() => res.json("Student updated"))
                .catch((err) => res.status(400).json("Error" + err))
        }).catch((err) => res.status(400).json("Error is =>" + err))
}

const deleteUser = (req,res) => {
    let id = req.params.id
    User.findByIdAndDelete(id)
        .then(() => res.json("User Deleted!"))
        .catch((err) => res.status(400).json("error" + err))
}

module.exports = {getUsers, addUser, updateUser,deleteUser};