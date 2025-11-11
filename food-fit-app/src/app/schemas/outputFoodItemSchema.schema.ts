import { Schema } from '@firebase/ai';

export const outputFoodItemSchema = Schema.object({
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