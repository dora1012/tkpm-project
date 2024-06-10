import axios from "axios";
const API_URL = "http://localhost:8081/api";

export const createEbook = async (
  type,
  chapterContent,
  author,
  novelTitle,
  chapterTitle
) => {
  try {
    const response = await axios.post(`${API_URL}/generate-ebook`, {
      type,
      novelTitle,
      chapterTitle,
      chapterContent,
      author,
    });
    const filename = response.data.filename;
    console.log(filename);

    if (!filename) {
      throw new Error("Filename is missing from the server response");
    }

    const downloadUrl = `${API_URL}/download-ebook/${encodeURIComponent(filename)}`;
    console.log(downloadUrl);
    return downloadUrl;
  } catch (error) {
    console.error("Filename is undefined (fetch API): ", error);
    throw error;
  }
};


export const fetchNovelInfo = async (
  slug
) => {
  try {
      const response = await axios.get(`${import.meta.env.VITE_SERVER_DOMAIN}/api/${slug}`);
      return response;
  } catch (error) {
      console.error('Error fetching novel info:', error);
      throw error;
  }
};

export const fetchListResult = async (
  type, 
  subitem
) => {
  try {
      const response = await axios.get(`${import.meta.env.VITE_SERVER_DOMAIN}/api/${type}/${subitem}`);
      return response;
  } catch (error) {
      console.error('Error fetching list result:', error);
      throw error;
  }
};

export const fetchSearchResult = async (
  query
) => {
  try {
    const response = await axios.get(`${import.meta.env.VITE_SERVER_DOMAIN}/api/tim-kiem/?tukhoa=${query}`);
      return response;
  } catch (error) {
      console.error('Error fetching search result:', error);
      throw error;
  }
};

export const fetchFinishedNovel = async () => {
  try {
    const response = await axios.get(
      import.meta.env.VITE_SERVER_DOMAIN + "/api/truyen-da-hoan-thanh"
    );
    const data = response.data;
    return data;
  } catch (error) {
    console.error("Error fetching finished novel:", error);
  }
};