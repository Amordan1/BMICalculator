import * as React from 'react';
import { useState } from 'react';
import { Text, StyleSheet, View, Image, TextInput, TouchableOpacity } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import bruschetta from './assets/bruschetta.png';

function HomeScreen({ navigation }) {
  const [serving, setServing] = useState(0);
  const [show, setShow] = useState(false);


  function onChange(event) {
    if ((isNaN(event))){
      setShow(true);
    };
    if (!isNaN(event)){
      setShow(false);
      setServing((event));
    }
 };

  return (
    <View style={styles.container}>
      <Text style={styles.titleText}>Bruschetta Recipe</Text>
      <Image width={10} height={10} source={bruschetta}></Image>
      {
          show?
          <Text style={styles.warnText}>Serving size must be a number.</Text>
          :<Text style={styles.hide}></Text>
      }
      <TextInput style={styles.input} onChangeText={value => onChange(value)} placeholder='Enter the Number of Servings'></TextInput>
      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          navigation.navigate('Recipe', {
            servingSize: JSON.parse(serving),
            Desc: "Combine the ingredients add salt to taste. Top French bread slices with mixture"
          });
        }}
      >
        <Text style={styles.buttonText}>View Recipe</Text>
      </TouchableOpacity>
    </View>
  );
}

function RecipeScreen({ route }) {
  const { servingSize } = route.params;
  const tomatoes = servingSize * 4
  const basil = servingSize * 6 
  const garlic = servingSize * 3
  const oliveOil = servingSize * 3
  const { Desc } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.recipeTitle}>Bruschetta</Text>
      <View style={styles.subContainer}>
        <Text style={styles.subTitle}>Ingredients</Text>
        <Text style={styles.textItem}>{tomatoes} plum tomatoes</Text>
        <Text style={styles.textItem}>{basil} basil leaves</Text>
        <Text style={styles.textItem}>{garlic} garlic cloves, chopped</Text>
        <Text style={styles.textItem}>{oliveOil} TB olive oil</Text>
      </View>
      <View style={styles.subContainer}>
        <Text style={styles.subTitle}>Directions</Text>
        <Text style={styles.textItem}>{JSON.parse(JSON.stringify((Desc)))}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  subContainer: {
    margin: 15,
    width: 300
  },
  titleText: {
    fontSize: 40,
    fontWeight: 'bold',
    marginBottom: 15
  },
  input: {
    height: 40,
    paddingHorizontal: 10,
    fontSize: 20,
    textAlign: 'center',
    margin: 20
  },
  button: {
    backgroundColor: "#838384",
    height: 45,
    paddingHorizontal: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    fontSize: 20,
    color: "#FFFFFF"
  },
  recipeTitle: {
    fontSize: 40,
  },
  subTitle: {
    fontSize: 25,
    alignSelf: "flex-start"
  },
  textItem: {
    marginLeft: 25
  },
  warnText: {
    color: "#dc5d2d"
  },
  hide: {
    display: "none"
  }
})

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen}
        options={{ headerStyle: { backgroundColor: "#dc5d2d" },
        headerTintColor: "#fff",
        title: "Healthy Recipes"}} />
        <Stack.Screen name="Recipe" component={RecipeScreen}
        options={{ headerStyle: { backgroundColor: "#dc5d2d" },
        headerTintColor: "#fff",
        title: "Healthy Recipes"}} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
