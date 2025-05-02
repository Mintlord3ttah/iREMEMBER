import mongoose from "mongoose"

const userSchema = new mongoose.Schema({
    name: {
        type: String,
    },
    createdAt: {
        type: Date,
        default: Date.now()
    },
    password: {
        select: false,
        type: String,
        minlength: [6, "password legnth must be upto 6 chars"],
        required: [true, "password is a required field"],
    },
    email: {
        type: String,
        unique: true,
        required: [true, "email is a required field"],
        lowercase: true,
        match: [/^\S+@\S+\.\S+$/, 'Please enter a valid email address']
    },
    isAuthenticated: {
        type: Boolean,
        default: false
    },
})

// RETRIEVE PASSWORD
// User.findOne({ email: 'example@example.com' }).select('+password').exec((err, user) => {
//   console.log(user.password); // Only retrieved because we explicitly selected it
// });


export const User = mongoose.model("user", userSchema)

// new User({
//     name: "ettah",
//     password: "no password",
//     email: "mint@gmail.com"
// })
    // .save()
    // .then(doc=> console.log(doc))
    // .catch(err=> console.log(err, "error"))