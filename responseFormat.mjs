export const responseObject = (response) => {
    const content = response.choices[0].message.content
    return {
        status: 'success',
        data: {
            content: content, //vysledna odpoved
            model: response.model,
            tokens: {
                prompt: response.usage.prompt_tokens, //input usage tokenov
                completion: response.usage.completion_tokens, //output usage tokenov
                total: response.usage.total_tokens, //sum usage tokenov
            },
            // mozno vhodne prepracovat nechutny js format
            timestamp: new Date().toISOString(), //timestamp vygenerovania promptu
        },
        /* metadata ?
          metadata: {
            source: "OpenAI API",
            requestType: "essay_generation",
          },
          */
    }
}
