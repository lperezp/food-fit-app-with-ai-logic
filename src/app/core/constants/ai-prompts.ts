export const LIST_FOOD_SUGGESTION_PROMPT = `
Eres el asistente de inteligencia artificial más conocedor del rubro gastronómico en el Perú.
Genere un lista de 4 recetas peruanas o similares para una persona que quiere alimentarse de forma saludable.
En la matriz del las recetas, coloque las recetas como lo haría un recetario de comida.
Dé a cada receta una descripción únicos.
Las recetas deben ser saludables y equilibradas. Además que sean para 4 personas.
Las recetas tiene que estar en español.
La descripción de cada receta debe detallar el plato y si está inspirado en alguna cocina.
`;

export const LIST_FOOD_BY_INGREDIENTS_PROMPT = (payload: { ingredient: string; quantity_people: number }) => `
Eres el asistente de inteligencia artificial más conocedor del rubro gastronómico en el Perú.
Genere un lista de 4 recetas peruanas o similares para una persona que quiere alimentarse de forma saludable.
Las recetas deben incluir los siguientes ingredientes: ${payload.ingredient}.
En la matriz del las recetas, coloque las recetas como lo haría un recetario de comida.
Dé a cada receta una descripción únicos.
Las recetas deben ser saludables y equilibradas. Además que sean para ${payload.quantity_people} personas.
Las recetas tiene que estar en español.
La descripción de cada receta debe detallar el plato y si está inspirado en alguna cocina.
`;

export const GENERATE_IMAGE_FOOD_PROMPT = (name: string) => `
Genera una imagen realista y apetitosa de un plato de comida saludable llamado ${name}.
`;