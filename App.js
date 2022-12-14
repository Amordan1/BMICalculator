import React, { Component } from 'react';
import {
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import * as SplashScreen from 'expo-splash-screen';
import AsyncStorage from '@react-native-async-storage/async-storage';

const heightKey = '@MyApp:key1';
const weightKey = '@MyApp:key2';

export default class App extends Component {
  state = {
    results: '',
    height: '',
    weight: '',
    danger: false,
  };

  constructor(props) {
    super(props)
    this.onLoad();
  }

  onLoad = async () => {
    try {
      const weight = await AsyncStorage.getItem(weightKey);
      const height = await AsyncStorage.getItem(heightKey);
      this.setState({ weight });
      this.setState({ height });
    } catch (error) {
      Alert.alert('Error', 'There was an error while loading the data');
    }
  }

  onSave = async () => {

    try {
      await AsyncStorage.setItem(weightKey, this.state.weight);
      await AsyncStorage.setItem(heightKey, this.state.height);
      Alert.alert('Saved', 'Successfully saved on device');
    } catch (error) {
      Alert.alert('Error', 'There was an error while saving the data');
      console.log(error)
    }
  }

  onWeightChange = (weight) => {
    this.setState({ weight });
  };
  onHeightChange = (height) => { 
    this.setState({ height });
  };
  onCalc = async () => {
    this.setState({ results: 'Loading, please wait...' });
    if (isNaN(this.state.weight)) {
      const results = 'Weight must be a number.';
      const danger = true;
      this.setState({ danger })
      this.setState({ results });
      this.weightText.focus();      
    } else if (('' === this.state.weight) ) {
      const results = 'Please enter weight.';
      const danger = true;
      this.setState({ danger })
      this.setState({ results });
      this.weightText.focus();
    } else if (isNaN(this.state.height)) {
      const results = 'Height must be a number.';
      const danger = true;
      this.setState({ danger })
      this.setState({ results });
      this.heightText.focus();      
    } else if (('' === this.state.height) ) {
      const results = 'Please enter height.';
      const danger = true;
      this.setState({ danger })
      this.setState({ results });
      this.heightText.focus();
    } else {
      this.onSave();
      const danger = false;
      this.setState({ danger })
      const results = 'Body Mass Index is ' + ((this.state.weight/(this.state.height*this.state.height))*703).toFixed(1);
      this.setState({ results });
    };
  }

  render() {

    SplashScreen.preventAutoHideAsync();
    setTimeout(SplashScreen.hideAsync, 2000)

    const { results, weight, height, danger } = this.state;

    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.toolbar}>BMI Calculator</Text>
        <ScrollView style={styles.content}>
          <TextInput
            ref={(input => { this.weightText = input;})}
            style={styles.input}
            onChangeText={this.onWeightChange}
            value={weight}
            placeholder="Weight in Pounds"
          />
          <TextInput
            ref={(input => { this.heightText = input;})}
            style={styles.input}
            onChangeText={this.onHeightChange}
            value={height}
            placeholder="Height in Inches"
          />
          <TouchableOpacity onPress={this.onCalc} style={styles.button}>
            <Text style={styles.buttonText}>Compute BMI</Text>
          </TouchableOpacity>
          {danger?<TextInput
            style={styles.previewDanger}
            value={results}
            placeholder=" "
            editable={false}
            multiline
          />:
          <TextInput
            style={styles.preview}
            value={results}
            placeholder=" "
            editable={false}
            multiline
          />
          }
          <Text style={styles.text}>
            Assessing Your BMI{"\n"}
            {"\t"}{"\t"}{"\t"}Underweight: less than 18.5{"\n"}
            {"\t"}{"\t"}{"\t"}Healthy: 18.5 to 24.9{"\n"}
            {"\t"}{"\t"}{"\t"}Overweight: 25.0 to 29.9{"\n"}
            {"\t"}{"\t"}{"\t"}Obese: 30.0 or higher{"\n"}
          </Text>
        </ScrollView>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  toolbar: {
    backgroundColor: '#f4511e',
    color: '#fff',
    textAlign: 'center',
    padding: 30,
    fontSize: 28,
    fontWeight: 'bold'
  },
  content: {
    flex: 1,
    padding: 10,
  },
  preview: {
    color: '#000',
    flex: 1,
    height: 80,
    fontSize: 30,
    marginVertical: 40,
    textAlign: 'center'
  },
  previewDanger: {
    color: '#FF0000',
    flex: 1,
    height: 80,
    fontSize: 30,
    marginVertical: 40,
    textAlign: 'center'
  },
  input: {
    backgroundColor: '#ecf0f1',
    borderRadius: 3,
    height: 45,
    padding: 5,
    marginBottom: 10,
    flex: 1,
    fontSize: 24
  },
  button: {
    backgroundColor: '#34495e',
    padding: 10,
    borderRadius: 3,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 24
  },
  text: {
    color: '#000',
    fontSize: 20
  }
});