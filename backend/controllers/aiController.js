const {GoogleGenerativeAI}= require("@google/generative-ai")
const {conceptExplainPrompt, questionAnswerPrompt}= require("../utils/prompts");


const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);


const generateInterviewQuestions= async(req,res)=>{
    try{
        const {role,experience,topicsToFocus,numberOfQuestions}=req.body;
        if(!role||!experience||!topicsToFocus||!numberOfQuestions){
            return res.status(400).json({
                message:"All fields are required: role, experience, topicsToFocus, numberOfQuestions",
            });
        }
        const prompt= questionAnswerPrompt(role,experience,topicsToFocus,numberOfQuestions);
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
        const result = await model.generateContent(prompt);
        const response = await result.response;
        let rawText = response.text();
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
        const prompt= conceptExplainPrompt(question);
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
        const result = await model.generateContent(prompt);
        const response = await result.response;
        let rawText = response.text();
        const cleanText=rawText.replace(/^```json\s*/,"").replace(/```$/,"")
        .trim();
        const data= JSON.parse(cleanText);
        res.status(200).json(data)

    }
    catch(error){res.status(500).json({
        message:"Failed to generate concept explanation",
        error:error.message,})

    }
}

module.exports={generateInterviewQuestions,generateConceptExplaination}
