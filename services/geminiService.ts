
import { GoogleGenAI, Type } from "@google/genai";
import { MOCK_PRODUCTS } from "../constants";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

// Highly structured catalog to ensure AI understands the exact schema and available options
const PRODUCT_CATALOG_STRING = JSON.stringify(MOCK_PRODUCTS.map(p => ({
  id: p.id,
  name: p.name,
  category: p.category,
  price: p.price,
  description: p.description,
  ingredients: p.ingredients || [],
  specs: p.specs || {}
})));

export const getAIRecommendations = async (query: string) => {
  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: `User Query: "${query}"`,
    config: {
      systemInstruction: `You are the Zepto Plus Expert AI. Your goal is to provide 100% accurate product recommendations from the provided catalog.
      
      CRITICAL RULES:
      1. ONLY recommend products that exist in this catalog: ${PRODUCT_CATALOG_STRING}.
      2. NEVER hallucinate or invent product IDs. If no match is found, return an empty products array.
      3. COMPATIBILITY: Use the 'specs' field. If a user asks for an iPhone 15 cable, ONLY suggest USB-C cables (p22). If they ask for iPhone 14 or older, suggest Lightning cables (p22b, p22c).
      4. HEALTH/BEAUTY: Analyze 'ingredients' and 'specs'. For "dandruff", look for "Ketoconazole" (p28b). For "acne", look for "Salicylic Acid" (p6).
      5. QUANTITIES: Suggest realistic quantities (e.g., 1 for a cable, 2 for milk, etc.).
      
      Response Format:
      - summary: A punchy, expert headline.
      - explanation: A detailed reason WHY these specific products were chosen based on their specs or ingredients.
      - products: Array of {id, quantity}. IDs must be strings like "p1", "p22", etc.
      - type: Categorize the query.
      
      If the query is a recipe, list the steps in the explanation and include all necessary ingredients available in the catalog.`,
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          summary: { type: Type.STRING },
          explanation: { type: Type.STRING },
          type: { 
            type: Type.STRING,
            description: "The type of interaction",
            enum: ["recipe", "qa", "compatibility", "care"]
          },
          products: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                id: { type: Type.STRING, description: "Must exactly match an ID from the catalog" },
                quantity: { type: Type.NUMBER, description: "Suggested purchase quantity" }
              },
              required: ["id", "quantity"]
            }
          }
        },
        required: ["summary", "products", "type", "explanation"]
      }
    }
  });

  try {
    const data = JSON.parse(response.text);
    // Final verification: Ensure all returned IDs actually exist in our local mock
    const validIds = new Set(MOCK_PRODUCTS.map(p => p.id));
    data.products = data.products.filter((p: any) => validIds.has(p.id));
    return data;
  } catch (e) {
    console.error("AI parse/validation error:", e);
    return null;
  }
};

export const getCartReview = async (cartItems: any[]) => {
    const cartSummary = cartItems.map(i => `${i.name} (ID: ${i.id}, Category: ${i.category})`).join(', ');
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Current Cart: ${cartSummary}`,
      config: {
        systemInstruction: `You are a shopping expert. Analyze the current cart and suggest 3-5 complementary items from the catalog: ${PRODUCT_CATALOG_STRING}. 
        Focus on creating "complete" sets:
        - If they have veggies/paneer, suggest missing staples (onions, tomatoes, spices).
        - If they have a phone case, suggest the correct cable based on specs.
        - If they have a health issue (shampoo), suggest a related supplement.
        
        Return a list of product IDs and a short 3-word reason for each pairing.`,
        responseMimeType: "application/json",
        responseSchema: {
            type: Type.OBJECT,
            properties: {
                advice: { type: Type.STRING, description: "General summary of why these are suggested" },
                suggestions: {
                    type: Type.ARRAY,
                    items: {
                        type: Type.OBJECT,
                        properties: {
                            id: { type: Type.STRING },
                            reason: { type: Type.STRING, description: "Short pairing reason e.g. 'Essential for Pasta'" }
                        }
                    }
                }
            },
            required: ["advice", "suggestions"]
        }
      }
    });
    return JSON.parse(response.text);
}
