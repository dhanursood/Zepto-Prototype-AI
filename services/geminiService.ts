
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
  isVeg: p.isVeg
})));

export const getAIRecommendations = async (query: string) => {
  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: query,
    config: {
      systemInstruction: `You are the Zepto Plus AI assistant. You help users shop.
      Here is our product catalog: ${PRODUCT_CATALOG_STRING}.
      
      Tasks:
      1. If the user wants a recipe (e.g., "Make Paneer butter masala for 2"), calculate ingredients and map them to our IDs.
      2. If asking about a product (e.g., "Is this face wash good for acne?"), explain active ingredients using your knowledge and our description.
      3. If asking about compatibility (e.g., "Will this case work with iPhone 15?"), check against specs.
      
      Always return a JSON response.
      
      Schema:
      {
        "summary": "Short headline",
        "explanation": "Detailed explanation or recipe steps",
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
