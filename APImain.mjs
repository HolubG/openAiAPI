import express from "express";
import { MAX_PROMPT_LENGHT } from "./helpers.mjs";
import { handleAPIerror } from "./errorHandling.mjs";
import { createAPIResponse } from "./APIResponse.mjs";
import { responseObject } from "./responseFormat.mjs";

const app = express();
app.use(express.json());

export const APItest = (client) => {
  return async (req, res) => {
    //prompt od pouzivatela
    const userPrompt = req.body.userPrompt;

    if (!userPrompt || typeof userPrompt !== "string") {
      res.status(400).json({
        status: "error",
        message: "Neplatny vstup od pouzivatela",
        data: null,
      });
    }

    // upravit podla potreby zatial je tam staticky 1000 znakov
    // TODO: spravit nastavenie dlzky vstupu nastavitelne (moze sa stat ze kod na skontrolovanie bude dlhzky ako 1000 znakovv)
    if (userPrompt.lenght > MAX_PROMPT_LENGHT) {
      res.status(400).json({
        status: "error",
        message: `Vstup je príliš dlhý. Maximum je ${MAX_PROMPT_LENGHT} znakov.`,
        data: null,
      });
    }

    try {
      // generovanie odpovede
      const response = await createAPIResponse(client, userPrompt);
      // formatovanie odpovede
      const responseFormating = responseObject(response);

      //odoslanie http odpovede
      res.json(responseFormating);
    } catch (error) {
      handleAPIerror(error, res);
    }
  };
};
