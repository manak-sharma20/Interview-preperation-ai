const Session = require("../models/Session");
const Question = require("../models/Question");

// Create a new session

exports.createSession = async (req, res) => {
    try{
        const {role,experience,topicsToFocus,description,questions}=req.body;
        const userId=req.user.id;
        const session = await Session.create({
            user:userId,
            role,
            experience,
            topicsToFocus,
            description
           
        })
        const questionDocs= await Promise.all(
            questions.map(async(q)=>{
                const questions= await Questions.create({
                    session:session._id,
                    question:q.question,
                    answer:q.answer

                })
                return question._id
            })
        )

    }catch(error){
        res.status(500).json({success:false,message:"Server Error"});
    }
}
// GET all sessions for a user

exports.getMySession= async(req,res)=>{
    try{
        const sessions = await Session.find({user:req.user.id}).sort({createdAt:-1}).populate("questions");
        res.status(200).json({success:true,sessions})
    }catch(error){
        res.status(500).json({success:false,message:"Server Error"});
    }
}


//get a session with id by populated questions

exports.getSessionById = async(req,res)=>{ try{
    const session= await Session.findById(req.params.id).populate(
        {
            path:"questions",
            options:{sort:{isPinned:-1,createdAt:1}},
        }
    ).exec();
    if(!session){
        return res.status(404).json({success:false,message:"Server Error"});
    }
    res.status(200).json({success:true,session})
     

}catch(error){
    res.status(500).json({success:false,message:"Server Error"});
}}

//delete a session and its questions

exports.deleteSession= async(req,res)=>{ try{
    const session= await Session.findById(req.params.id);
    if(!session){
        res.status(404).json({message:"Server not Found"})    }
    await Question.deleteMany({session:session._id});
    await session.deleteOne();
    res.status(200).json({message:"Session deleted successfully"})

}catch(error){
    res.status(500).json({success:false,message:"Server Error"});
}}
