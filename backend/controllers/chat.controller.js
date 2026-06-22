import { askCareerCompass } from "../services/llm.service.js";


export async function chat(req, res) {

    try {

        const { message } = req.body;


        if (!message) {
            return res.status(400).json({
                error: "Message is required"
            });
        }


        const messages = [
            {
                role: "system",
                content:
                `
                You are EPITA Career Compass.

                Help EPITA students choose
                specializations and career paths.

                Analyze:
                - interests
                - technologies they like
                - technologies they dislike

                Recommend:
                - EPITA specializations
                - internship ideas
                - skills to improve

                Keep answers concise.
                `
            },
            {
                role: "user",
                content: message
            }
        ];


        const answer =
            await askCareerCompass(messages);


        res.json({
            answer
        });


    } catch(error) {

        console.error(error);

        res.status(500).json({
            error: "AI request failed"
        });
    }
}