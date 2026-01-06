
import { GoogleGenAI, Type } from "@google/genai";
import { MOCK_PRODUCTS } from "../constants";
import { Product } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const PRODUCT_CATALOG_STRING = JSON.stringify(MOCK_PRODUCTS.map(p => ({
  id: p.id,
  name: p.name,
  category: p.category,
  price: p.price,
  description: p.description,
  ingredients: p.ingredients || [],
  specs: p.specs || {},
  highlights: p.highlights || [],
  shelfLife: p.shelfLife || ""
})));

export interface UnifiedAIResponse {
  answer: string;
  summary: string;
  type: 'product_info' | 'search' | 'recipe' | 'general' | 'compatibility';
  products?: { id: string; quantity: number }[];
  followUps: string[];
  action?: { label: string; quantity: number; productId?: string };
}

export const getUnifiedAIResponse = async (query: string, activeProduct?: Product | null) => {
  const contextProductStr = activeProduct ? `ACTIVE PRODUCT CONTEXT: ${JSON.stringify(activeProduct)}` : "No specific product selected.";

  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: `User Query: "${query}"\n${contextProductStr}`,
    config: {
      systemInstruction: `You are the Zepto Plus Expert AI. You assist users with their shopping, recipes, and general queries.
      
      BEHAVIOR RULES:
      1. PRODUCT CONTEXT: If a user is viewing an "Active Product" and asks a question like "is it fresh?" or "how much for 4 people?", answer using that product's metadata.
      2. GENERAL SEARCH: If the user asks for something else (e.g. "show me milk"), search the catalog: ${PRODUCT_CATALOG_STRING}.
      3. ACTIONS: 
         - To add the ACTIVE product, set action.productId to its ID.
         - To suggest new products from the catalog, list them in the 'products' array.
      4. RECIPES: If they ask for a recipe, list steps in 'answer' and suggested ingredients from the catalog in 'products'.
      5. FORMAT: Always be concise, expert, and helpful.
      
      Response Schema:
      - answer: The main text response.
      - summary: A short 5-word headline.
      - type: Categorize the interaction.
      - products: Array of {id, quantity} from the catalog.
      - action: A primary CTA (e.g. "Add 2 packs", "Buy Case").
      - followUps: 2-3 relevant next questions.`,
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          answer: { type: Type.STRING },
          summary: { type: Type.STRING },
          type: { type: Type.STRING, enum: ["product_info", "search", "recipe", "general", "compatibility"] },
          products: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                id: { type: Type.STRING },
                quantity: { type: Type.NUMBER }
              }
            }
          },
          action: {
            type: Type.OBJECT,
            properties: {
              label: { type: Type.STRING },
              quantity: { type: Type.NUMBER },
              productId: { type: Type.STRING }
            }
          },
          followUps: { type: Type.ARRAY, items: { type: Type.STRING } }
        },
        required: ["answer", "summary", "type", "followUps"]
      }
    }
  });

  try {
    const data = JSON.parse(response.text) as UnifiedAIResponse;
    // Validate IDs if present
    if (data.products) {
      const validIds = new Set(MOCK_PRODUCTS.map(p => p.id));
      data.products = data.products.filter(p => validIds.has(p.id));
    }
    return data;
  } catch (e) {
    console.error("AI Parse Error:", e);
    return null;
  }
};

export const getCartReview = async (cartItems: any[]) => {
    const cartSummary = cartItems.map(i => `${i.name} (ID: ${i.id}, Category: ${i.category})`).join(', ');
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Current Cart: ${cartSummary}`,
      config: {
        systemInstruction: `Analyze the cart and suggest 3-5 complementary items from the catalog: ${PRODUCT_CATALOG_STRING}. Return JSON with advice and suggestions list.`,
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
            },
            required: ["advice", "suggestions"]
        }
      }
    });
    return JSON.parse(response.text);
};

// Deprecated in favor of unified service but kept for backward compatibility if needed internally
export const getAIRecommendations = getUnifiedAIResponse as any;
export const getProductSpecificAdvice = getUnifiedAIResponse as any;
