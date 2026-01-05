
import { GoogleGenAI, Type } from "@google/genai";
import { MOCK_PRODUCTS } from "../constants";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const PRODUCT_CATALOG_STRING = JSON.stringify(MOCK_PRODUCTS.map(p => ({
  id: p.id,
  name: p.name,
  category: p.category,
  price: p.price,
  unit: p.unit,
  description: p.description,
  isVeg: p.isVeg,
  ingredients: p.ingredients,
  specs: p.specs
})));

export const getAIRecommendations = async (query: string) => {
  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: query,
    config: {
      systemInstruction: `You are the Zepto Plus AI Expert. You help users with shopping, meal planning, and health/beauty advice.
      Here is our product catalog: ${PRODUCT_CATALOG_STRING}.
      
      Your Expertise:
      1. HAIR CARE: Analyze hair types (oily, dry, curly, frizzy) and scalp conditions (dandruff, itchiness). Match them with the ingredients and 'specs' of our shampoos/conditioners.
      2. SKIN CARE: Analyze skin types (sensitive, oily, dry) and ailments (acne, rashes, prickly heat). Recommend creams/washes based on active ingredients like Salicylic Acid, Calamine, etc.
      3. RECIPES: For cooking queries, calculate precise ingredients and map to our IDs.
      4. COMPATIBILITY: For tech queries, check if accessories work with specific devices using 'specs'.
      5. WELLNESS: Recommend supplements or medicine alternatives (Vaporub, antacids) for common minor ailments.
      
      Always return a JSON response. Provide clear explanations for your recommendations.
      
      Schema:
      {
        "summary": "Short professional headline",
        "explanation": "Expert advice, usage instructions, or recipe steps. If suggesting a shampoo/cream, explain WHY it fits the hair/skin type or ailment.",
        "products": [{"id": "p1", "quantity": 1}],
        "type": "recipe" | "qa" | "compatibility" | "care"
      }`,
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          summary: { type: Type.STRING },
          explanation: { type: Type.STRING },
          type: { type: Type.STRING },
          products: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                id: { type: Type.STRING },
                quantity: { type: Type.NUMBER }
              },
              required: ["id", "quantity"]
            }
          }
        },
        required: ["summary", "products", "type"]
      }
    }
  });

  try {
    return JSON.parse(response.text) as any;
  } catch (e) {
    console.error("Failed to parse AI response", e);
    return null;
  }
};

export const getCartReview = async (cartItems: any[]) => {
    const cartSummary = cartItems.map(i => `${i.name} (${i.quantity} x ${i.unit})`).join(', ');
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Review this shopping cart: ${cartSummary}. Check for missing ingredients if they seem to be cooking a dish, or complementary items.`,
      config: {
        systemInstruction: "You are an expert shopping assistant. Identify if the user is missing something obvious for their purchase (e.g., milk for cereal, oil for frying, compatible charger). Keep it brief and helpful.",
        responseMimeType: "application/json",
        responseSchema: {
            type: Type.OBJECT,
            properties: {
                advice: { type: Type.STRING },
                suggestions: {
                    type: Type.ARRAY,
                    items: {
                        type: Type.OBJECT,
                        properties: {
                            id: { type: Type.STRING },
                            reason: { type: Type.STRING }
                        }
                    }
                }
            }
        }
      }
    });
    return JSON.parse(response.text);
}
