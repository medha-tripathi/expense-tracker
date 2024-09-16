import passport from "passport";
import bcrypt from "bcryptjs";
import { GraphQLLocalStrategy } from "graphql-passport";
import User from "../models/user.model.js"

export const configurePassport = async () => {
    passport.serializeUser((user, done) => {
        console.log("serializing");
        done(null, user._id);
    });

    passport.deserializeUser(async (id, done) => {
        console.log("deserializing");
        try{
            const user = await User.findById(id);
            done(null, user);
        } catch (error) {
            done(error);
        }
    });

    passport.use(
        new GraphQLLocalStrategy( async (username, password, done) => {
            try{
                const user = await User.findOne({ username })
                if(!user){
                    throw new Error("Invalid Credentials");
                }
                const isPasswordValid = await bcrypt.compare(password, user.password);
                if(!isPasswordValid){
                    throw new Error("Invalid Credentials");
                }
            } catch(err){
                return done(err);
            }
        })
    )
}