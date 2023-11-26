import { URL, KEY } from "@/constants/constants";

export const searchPageHandler = async (page = 1, keyWord = "a") => {
  const headers = new Headers();

  const token = KEY;
  if (token) {
    headers.set("Authorization", `Bearer ${token}`);
  }
  headers.set("Accept", "application/json");

  const pageNumber = page.toString();

  const finalUrl = `${URL}/search/movie?query=${keyWord}&include_adult=false&language=en-US&page=${pageNumber}`;

  const res = await fetch(finalUrl, { method: "GET", headers });

  const finalData = await res.json();

  return { ...finalData, results: finalData.results };
};

export const getDetailedMovie = async (id: number) => {
  const headers = new Headers();

  const token = KEY;
  if (token) {
    headers.set("Authorization", `Bearer ${token}`);
  }
  headers.set("Accept", "application/json");

  const finalUrl = `${URL}/movie/${id.toString()}?language=en-US`;

  const res = await fetch(finalUrl, { method: "GET", headers });

  const final = await res.json();



  return await final;
};
