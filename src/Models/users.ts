import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  usename: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  authentication: {
    password: { type: String, required: true, select: false },
    salt: { type: String, select: false },
    sessiontoken: { type: String, select: false },
  },
});




const UserModel = mongoose.model('User',userSchema);


const getAllUsers = async()=> await UserModel.find()
const getUserByEmail = async(email:string)=>{
    const user= await UserModel.findOne({email})
    if(user.email){
        return {
            data:user
        }

    }else{
        return {
            message:'no user found with this mail'
        }
    }
}
const getUserBySessionToken = async(sessionToken:string)=>{
    const user= await UserModel.findOne({
        'authentication.sessiontoken':sessionToken
    })
    if(user.email){
         return {
            data:user
        }

    }else{
        return {
            message:'no user found with this Token'
        }
    }
}

const getUserById = async(id:string)=>{
    const user= await UserModel.findById(id)
    if(user.email){
        return {
            data:user
        }

    }else{
        return {
            message:'no user found with this Token'
        }
    }
}
const createUser = (values:Record<string,any>)=>{
 new UserModel(values).save().then((user)=>{
    return user.toObject();
 }).catch((err)=>{
    return {
        message:'something went wrong while creating new user',
        data:err
    }
 })
}

const deleteUserById = async(id:string)=>{

    const deletedUser= await UserModel.findOneAndDelete({_id:id})
    if(deletedUser.email){
        return {
            message:'deleted the user'
        }

    }else{
        return {
            message:'something went wrong while deleting user'
        }
    }

}
const updateUserById = async(id:string,values:Record<string,any>)=>{

    const updatedUser= await UserModel.findByIdAndUpdate(id,values)
    if(updatedUser.email){
        return {
            message:'updated the user',
            data:updatedUser

        }

    }else{
        return {
            message:'something went wrong while updateing user'
        }
    }

}



export {UserModel,getAllUsers,getUserByEmail}
