export const getBookmark = (slug) => {
    return localStorage.getItem(`${slug}-bookmark`);
  };
  
  export const setBookmark = (slug, lineIndex) => {
    localStorage.setItem(`${slug}-bookmark`, lineIndex);
  };
  
  export const clearBookmark = (slug) => {
    localStorage.removeItem(`${slug}-bookmark`);
  };