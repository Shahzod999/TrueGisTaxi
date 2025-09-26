import { fetchBaseQuery, createApi } from "@reduxjs/toolkit/query/react";
import { RootState } from "../store";

const baseQuery = fetchBaseQuery({
  baseUrl: "http://207.180.233.100",
  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as RootState).company.token;
    headers.set("Authorization", `Bearer ${token}`);
    return headers;
  },
});

export const apiSlice = createApi({
  baseQuery,
  tagTypes: [],
  endpoints: () => ({}),
});

// Экспорт хуков, автоматически генерируемых RTK Query
export const {
  // Здесь будут экспортироваться хуки, созданные для каждого эндпоинта
} = apiSlice;
