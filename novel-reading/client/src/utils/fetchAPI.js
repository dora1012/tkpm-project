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
