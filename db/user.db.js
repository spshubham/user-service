
const User = require("../models/user.model");
const Response = require("../utils/response");
const bcrypt = require("bcrypt")
exports.create = async(body) =>{
    try {
        let pass = body.password;
        
        const hash = await bcrypt.hash(body.password, 10);
        // Store hash in the database
        body.password=hash;
        let user = new User(body);
        await user.save(user)
        return;
    } catch (error) {
        if(error.code == 11000)
            throw Response.UserAlreayExist;
        else throw Response.UnexpectedError;
    }
}
exports.findByEmailAndPassord = async(email, password) => {
    try {
        
        let user = await User.findOne({email : email});
        const result = await bcrypt.compare(password,user.password);
        if(!result) { throw Response.InvalidUserAndMail;}
        return user;
    } catch (error) {
        if(error.code)
            throw error;
        else
            throw Response.UnexpectedError;
    }
}

