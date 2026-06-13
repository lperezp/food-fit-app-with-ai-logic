import { Injectable } from '@angular/core';
import { initializeApp } from "firebase/app";
import { getAI, getGenerativeModel, getImagenModel, getLiveGenerativeModel, ImagenAspectRatio, ImagenImageFormat, InferenceMode, ResponseModality, startAudioConversation, VertexAIBackend } from "firebase/ai";
import { environment } from '../../environments/environment';
import { GENERATE_IMAGE_FOOD_PROMPT, LIST_FOOD_BY_INGREDIENTS_PROMPT, LIST_FOOD_SUGGESTION_PROMPT } from '../core/constants/ai-prompts';
import { outputFoodItemSchema } from '../schemas/outputFoodItemSchema.schema';

const firebaseApp = initializeApp(environment.firebaseConfig);

const ai = getAI(firebaseApp, { backend: new VertexAIBackend() });

const model = getGenerativeModel(ai, {
  mode: InferenceMode.PREFER_ON_DEVICE,
  inCloudParams: {
    model: environment.modelGemini,
  },
  generationConfig: {
    responseMimeType: "application/json",
    responseSchema: outputFoodItemSchema
  }
});

model.initializeDeviceModel((val) =>
  console.log(`Download progress: ${Math.round(val * 10000) / 100}%`)
);

const liveModel = getLiveGenerativeModel(ai, {
  model: environment.modelGeminiLive,
  generationConfig: {
    responseModalities: [ResponseModality.AUDIO],
  },
});

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

  session = null;
  audioConversationController = null;

  async askGemini(query) {
    const result = await model.generateContent(query);
    const response = result.response;
    return response.text()
  }

  async talkGemini() {
    if (!this.session) {
      this.session = await liveModel.connect();
    }
    this.audioConversationController = await startAudioConversation(this.session);
  }

  async stopTalkGemini() {
    if (this.audioConversationController) {
      await this.audioConversationController.stop();
      this.audioConversationController = null;
    }
  }



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