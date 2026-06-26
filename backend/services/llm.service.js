import OpenAI from "openai";
import { Mistral } from "@mistralai/mistralai";
import dotenv from "dotenv";

dotenv.config();

const openRouter = new OpenAI({
    baseURL: "https://openrouter.ai/api/v1",
    apiKey: process.env.OPENROUTER_API_KEY,
});

const mistral = new Mistral({
    apiKey: process.env.MISTRAL_API_KEY,
});


export async function askCareerCompass(messages) {

    // First attempt: OpenRouter Llama
    try {

        console.log("Trying OpenRouter Llama...");

        const response =
            await openRouter.chat.completions.create({
                model:
                    "meta-llama/llama-3.2-3b-instruct:free",
                messages,
            });

        return response.choices[0].message.content;


    } catch (error) {

        console.error(
            "OpenRouter Llama failed:",
            error.message
        );


        // Second attempt: OpenRouter Gemma
        try {

            console.log("Trying OpenRouter Gemma...");

            const response =
                await openRouter.chat.completions.create({
                    model:
                        "google/gemma-3-4b-it:free",
                    messages,
                });

            return response.choices[0].message.content;


        } catch (error) {


            console.error(
                "OpenRouter fallback failed:",
                error.message
            );


            // Third attempt: Direct Mistral API
            try {

                console.log("Trying Mistral API...");

                const response =
                    await mistral.chat.complete({
                        model:
                            "mistral-small-latest",
                        messages,
                    });

                return response.choices[0].message.content;


            } catch (mistralError) {

                console.error(
                    "Mistral failed:",
                    mistralError.message
                );


                throw new Error(
                    "All AI providers are unavailable."
                );
            }
        }
    }
}