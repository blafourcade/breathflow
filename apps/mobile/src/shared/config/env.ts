const fallback = "https://breathflow-api.vercel.app";

export const env = {
  apiUrl: process.env.EXPO_PUBLIC_API_URL ?? fallback,
};
