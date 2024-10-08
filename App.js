import { StatusBar } from 'expo-status-bar';
import { useState } from 'react'; 
import { Pressable, StyleSheet, Text, TextInput, View, FlatList, Image } from 'react-native';
import { searchMovie } from './api'; // Assure-toi que ce chemin est correct

export default function App() {
  const [query, setQuery] = useState('');
  const [movies, setMovies] = useState([]); // Nouvel état pour stocker les films

  const handleSearch = async () => {
    const results = await searchMovie(query);
    setMovies(results); // Met à jour l'état avec les résultats de la recherche
  };

  return (
    <View style={styles.container}>
      <View style={styles.form}>
        <TextInput 
          placeholder="Enter movie title" 
          value={query} 
          onChangeText={setQuery} // Corrige la casse ici
          style={styles.input}
        />
        <Pressable style={({ pressed }) => [
          styles.buttonContainer,
          { backgroundColor: pressed ? "#2a64e0" : "#7DDA58" }
        ]} onPress={handleSearch}>
          <Text style={styles.buttonText}>Search</Text>
        </Pressable>
      </View>

      <FlatList 
        data={movies} 
        keyExtractor={(item) => item.imdbID} 
        renderItem={({ item }) => (
          <View style={styles.movieContainer}>
            <Image source={{ uri: item.Poster }} style={styles.image} />
            <Text>{item.Title}</Text>
          </View>
        )}
      />
      
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'flex-start', // Change à flex-start pour aligner les éléments en haut
    padding: 20,
  },
  form: {
    marginBottom: 20,
    width: '100%',
  },
  input: {
    width: "100%",
    fontSize: 18,
    paddingLeft: 5,
    outlineStyle: "none",
  },
  buttonContainer: {
    width: "100%",
    marginTop: 10,
    padding: 10,
    borderRadius: 5,
    backgroundColor: "#2a64e0"
  },
  buttonText: {
    color: "white",
    textAlign: "center",
    fontSize: 18,
  },
  movieContainer: {
    marginVertical: 10,
    alignItems: 'center', // Center image and title
  },
  image: {
    width: 100, // Largeur de l'image
    height: 150, // Hauteur de l'image
    marginBottom: 5,
  }
});
