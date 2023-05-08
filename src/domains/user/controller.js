const User = require("./model");
const {hashData, checkPassword} = require("./../../util/hashData");
const createToken = require("../../util/createToken");

const createNewUser = async(data) => {
    try {
        const {name, email, password} = data;

        const existingUser = await User.findOne({email});

        if(existingUser) {
            throw Error("User with the provided email already exists");
        }

        const hashedPassword = await hashData(password);
        const newUser = new User({
            name, email, password: hashedPassword
        })
        const createdUser = await newUser.save();
        return createdUser;
    } catch (error) {
        throw error;
    }
}

const authenticateUser = async(data) => {
    try {
        const {email, password} = data;

        const fetchedUser = await User.findOne({email});

        if(!fetchedUser) {
            throw Error("There is no user with this email!");
        }

        const hashedPassword = fetchedUser.password;
        const passwordMatch = checkPassword(hashedPassword, password);

        if(!passwordMatch) {
            throw Error("Invalid password entered!");
        }

        const tokenData = {userId: fetchedUser._id, email};
        const token = await createToken(tokenData);

        fetchedUser.token = token;
        return fetchedUser;
    } catch (error) {
        throw error;
    }
}

module.exports = { createNewUser, authenticateUser };