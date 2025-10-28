const {GoogleGenAI}= require("@google/genai")
const {conceptExplainPrompt, questionAnswerPrompt}= require("../utils/prompts");


const ai = new GoogleGenAI({apiKey:process.env.GEMINI_API_KEY})


const generateInterviewQuestions= async(req,res)=>{
    try{
        const {role,experience,topicsToFocus,numberOfQuestions}=req.body;
        if(!role||!experience||!topicsToFocus||!numberOfQuestions){
            return res.status(400).json({
                message:"All fields are required: role, experience, topicsToFocus, numberOfQuestions",
            });
        }
        const Prompt= questionAnswerPrompt(role,experience,topicsToFocus,numberOfQuestions);
        const response= await ai.models.generateContent({
            model:"gemini-2.0-flash-lite",
            prompt:Prompt,

        });
        let rawText=response.response.text();
        const cleanText=rawText.replace(/^```json\s*/,"").replace(/```$/,"")
        .trim();

        const data = JSON.parse(cleanText);
        res.status(200).json(data);



    }
    catch(error){
        res.status(500).json({
            message:"Failed to generate interview questions",
            error:error.message,
        })
    }
}



const generateConceptExplaination = async(req,res)=>{
    try{
        const {question}= req.body;
        if(!question){
            return res.status(400).json({
                message:"Question field is required",
            });
        }
        const Prompt= conceptExplainPrompt(question);
        const response= await ai.models.generateContent({
            model:"gemini-2.0-flash-lite",
            prompt:Prompt,
            
        });
        let rawText=response.text;
        const cleanText=rawText.replace(/^```json\s*/,"").replace(/```$/,"")
        .trim();
        const data= JSON.parse(cleanText);
        res.status(200).json(data)

    }
    catch(error){res.status(500).json({
        message:"Failed to generate interview questions",
        error:error.message,})

    }
}

module.exports={generateInterviewQuestions,generateConceptExplaination}