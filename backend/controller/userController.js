import User from "../model/userModel.js"


//api to save data
export const create = async(req,res)=>{

    try{

        const userData = new User(req.body);

        if(!userData.fname.match(/^[A-Za-z]+$/)){

            return res.status(404).json({message: "Invalid"})
        }
    
       
        const saveData= await userData.save();

        res.status(200).json({message:"User created"});
    }catch (error) {

        res.status(500).json({error : error});

    }
}

export const get = async(req,res)=>{
    try{

        const userData = await User.find();

        if(!userData){
            return res.status(404).json({message : "User data not found"})
        }

        res.status(200).json(userData);

    }catch (error) {

        res.status(500).json({error : error});

    }
}

export const getOne = async(req,res)=>{
    try{

        const id = req.params.id;
        const userExist = await User.findById(id);

        if(!userExist){
            return res.status(404).json({message : "User not found"})
        }

        res.status(200).json(userExist);


    }catch (error) {

        res.status(500).json({error : error});

    }
}


export const update = async(req,res)=>{
    try{

        const id = req.params.id;
        const userExist = await User.findById(id);

        if(!userExist){
            return res.status(401).json({message :"User not found"})

        }
        

        const updatedData = await User.findByIdAndUpdate(id , req.body, {new:true});
        res.status(200).json({message:"User Updated successfully"});

    }catch (error) {

        res.status(500).json({error : error});

    }
}


export const deleteUser = async(req,res)=>{
    try{

        const id = req.params.id;
        const userExist = await User.findById(id);

        if(!userExist){
            return res.status(404).json({message:"User not exist"})
        }

        await User.findByIdAndDelete(id);
        res.status(200).json({message :"User Deleted Successfully"})
    }catch (error) {

        res.status(500).json({error : error});

    }
}