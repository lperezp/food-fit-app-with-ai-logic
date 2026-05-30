import { Injectable } from '@angular/core';
import { initializeApp } from "firebase/app";
import { initializeAppCheck, ReCaptchaEnterpriseProvider } from "firebase/app-check";
import { getAI, getGenerativeModel, getImagenModel, ImagenAspectRatio, ImagenImageFormat, InferenceMode, VertexAIBackend } from "firebase/ai";
import { environment } from '../../environments/environment';
import { GENERATE_IMAGE_FOOD_PROMPT, LIST_FOOD_BY_INGREDIENTS_PROMPT, LIST_FOOD_SUGGESTION_PROMPT } from '../core/constants/ai-prompts';
import { outputFoodItemSchema } from '../schemas/outputFoodItemSchema.schema';

const firebaseApp = initializeApp(environment.firebaseConfig);

const ai = getAI(firebaseApp, { backend: new VertexAIBackend() });

const model = getGenerativeModel(ai, {
    model: environment.modelGemini,
    generationConfig: {
      responseMimeType: "application/json",
      responseSchema: outputFoodItemSchema 
}});

const modelImage = getImagenModel(ai, {
  model: environment.modelImageGemini,
  generationConfig: {
    aspectRatio: ImagenAspectRatio.SQUARE,
    imageFormat: ImagenImageFormat.jpeg(100),
    numberOfImages: 1
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
    const recipesData = JSON.parse(response.text());
    return recipesData;
  }

  async getRecipesByIngredients(payload: { ingredient: string; quantity_people: number }) {
    const result = await model.generateContent(LIST_FOOD_BY_INGREDIENTS_PROMPT(payload));
    const response = result.response;
    const recipesData = JSON.parse(response.text());
    return recipesData;
  }

  async generatedImageFood(payload: { food: string }) {
    const result = await modelImage.generateImages(GENERATE_IMAGE_FOOD_PROMPT(payload.food));
    const image = result.images[0];
    return image;
  }
}