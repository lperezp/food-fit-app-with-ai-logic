import { Injectable } from '@angular/core';
import { initializeApp } from "firebase/app";
import { initializeAppCheck, ReCaptchaEnterpriseProvider } from "firebase/app-check";
import { getAI, getGenerativeModel, getLiveGenerativeModel, GoogleAIBackend, InferenceMode, ResponseModality, startAudioConversation } from "firebase/ai";
import { environment } from '../../environments/environment';
import { GENERATE_IMAGE_FOOD_PROMPT, LIST_FOOD_BY_INGREDIENTS_PROMPT, LIST_FOOD_SUGGESTION_PROMPT } from '../core/constants/ai-prompts';
import { outputFoodItemSchema } from '../schemas/outputFoodItemSchema.schema';

declare global {
  var FIREBASE_APPCHECK_DEBUG_TOKEN: boolean | string | undefined;
}

// Activa el modo de depuración para App Check en entorno local
if (typeof window !== 'undefined' && (location.hostname === 'localhost' || location.hostname === '127.0.0.1')) {
  self.FIREBASE_APPCHECK_DEBUG_TOKEN = true;
}

const firebaseApp = initializeApp(environment.firebaseConfig);

if (typeof window !== 'undefined') {
  initializeAppCheck(firebaseApp, {
    provider: new ReCaptchaEnterpriseProvider(environment.recaptchaEnterpriseSiteKey),
    isTokenAutoRefreshEnabled: true
  });
}

const ai = getAI(firebaseApp, { backend: new GoogleAIBackend() });

const model = getGenerativeModel(ai, {
  mode: InferenceMode.PREFER_IN_CLOUD,
  inCloudParams: {
    model: environment.modelGemini,
    generationConfig: {
      responseMimeType: "application/json",
      responseSchema: outputFoodItemSchema
    }
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
  systemInstruction: "Eres un asistente de inteligencia artificial que ayuda a los usuarios a encontrar recetas de comida saludable en Perú. Responde a las preguntas de los usuarios sobre recetas, ingredientes y consejos de cocina de manera clara y amigable. No proporciones información que no esté relacionada con la comida saludable. Si el usuario hace una pregunta que no entiendes, responde con 'Lo siento, no tengo esa información en este momento.' Mantén tus respuestas breves y al punto."
});

const modelImage = getGenerativeModel(ai, {
  model: environment.modelImageGemini,
});

@Injectable({
  providedIn: 'root'
})
export class GenAiService {

  session: any = null;
  audioConversationController: any = null;

  async askGemini(query) {
    const result = await model.generateContent(query);
    const response = result.response;
    return response.text()
  }

  async talkGemini() {
    try {
      if (!this.session || this.session.isClosed) {
        this.session = await liveModel.connect();
      }
      this.audioConversationController = await startAudioConversation(this.session);
    } catch (error) {
      if (this.session) {
        try { await this.session.close(); } catch { }
        this.session = null;
      }
      this.audioConversationController = null;
      throw error;
    }
  }

  async stopTalkGemini() {
    if (this.audioConversationController) {
      await this.audioConversationController.stop();
      this.audioConversationController = null;
    }
    if (this.session) {
      try { await this.session.close(); } catch { }
      this.session = null;
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
    const result = await modelImage.generateContent(GENERATE_IMAGE_FOOD_PROMPT(payload.food));
    const response = result.response;
    const image = response.candidates?.[0]?.content?.parts?.find(
      (part) => part.inlineData
    );
    return image?.inlineData;
  }
}     