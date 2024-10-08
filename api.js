export const searchMovie = async (query) => {

    const apiKey = 'http://www.omdbapi.com/?i=tt3896198&apikey=7a6c5e9d';  // Remplace par ta clé API OMDb
    const url = `https://www.omdbapi.com/?s=${query}&apikey=${'7a6c5e9d'}`;
  
    try {
      const response = await fetch(url);  // Envoie une requête GET à l'API
      const data = await response.json();  // Convertit la réponse en JSON
      return data.Search || [];  // Retourne les résultats de la recherche ou un tableau vide
    } catch (error) {
      console.error("Erreur lors de la recherche du film :", error);
      return [];  // En cas d'erreur, retourne un tableau vide
    }
};
  