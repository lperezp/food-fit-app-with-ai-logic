import { Injectable } from '@angular/core';
import { initializeApp } from "firebase/app";
import { getAI, getGenerativeModel, Schema, VertexAIBackend } from "firebase/ai";
import { environment } from '../../environments/environment';
import { LIST_FOOD_SUGGESTION_PROMPT } from '../core/constants/ai-prompts';

const firebaseApp = initializeApp(environment.firebaseConfig);
const ai = getAI(firebaseApp, { backend: new VertexAIBackend() });

const outputFoodItemSchema = Schema.object({
  properties: {
    recipes: Schema.array({
      items: Schema.object({
        properties: {
          name: Schema.string(),
          description: Schema.string(),
          ingredients: Schema.array({
            items: Schema.string()
          }),
          nutritional_information: Schema.object({
            properties: {
              cal: Schema.number(),
              carbohydrates: Schema.number(),
              fats: Schema.number(),
              sodium: Schema.number(),
              cholesterol: Schema.number(),
              proteins: Schema.number()
            }
          }),
          preparation_time: Schema.string(),
          level: Schema.string(),
          preparation: Schema.array({
            items: Schema.string()
          })
        }
      })
    })
  }
});

const model = getGenerativeModel(ai, {
  model: environment.modelGemini,
  generationConfig: {
    responseMimeType: "application/json",
    responseSchema: outputFoodItemSchema
  }
});

@Injectable({
  providedIn: 'root'
})
export class GenAiService {

  constructor() { }

  async generatedRecipes() {
    const result = await model.generateContent(LIST_FOOD_SUGGESTION_PROMPT);
    const response = result.response;
    const text = response.text();
    const recipesData = JSON.parse(text);
    return recipesData;
  }
}