// Login.js

import React from 'react'
import { StyleSheet, Text, TextInput, View, Button, Image, Linking } from 'react-native';
import * as firebase from 'firebase';

export default class Login extends React.Component
{
	constructor(props)
	{
		super(props);
		this.handleLogin = this.handleLogin.bind(this);
		this.state = { email: '', password: '', errorMessage: null };
	}

  	handleLogin = () => {
    	const {email, password} = this.state;
    	firebase.auth()
      	.signInWithEmailAndPassword(email, password)
      	.then(() => this.props.navigation.navigate('Main'))
      	.catch(error => this.setState({ errorMessage: error.message }));
  	}

  	render()
  	{
    	return (
			<View style={styles.container}>
				<Text style={{fontSize: 20}}> CheckBox </Text>
				
				<Image
					style={{width: 250, height: 250}}
          			source={require('../../assets/UI-Sketches/logo.png')}
        		/>
				
				{
					this.state.errorMessage &&
					<Text style={{ color: 'red' }}>
						{this.state.errorMessage}
					</Text>
				}
				
				<TextInput
					style={styles.textInput}
					autoCapitalize="none"
					placeholder="Email"
					onChangeText={email => this.setState({ email })}
					value={this.state.email}
				/>
				
				<TextInput
					secureTextEntry={true}
					style={styles.textInput}
					autoCapitalize="none"
					placeholder="Password"
					onChangeText={password => this.setState({ password })}
					value={this.state.password}
				/>
				
				<Button
					title="Log In"
					onPress={this.handleLogin}
				/>
				
				<Button
					title="Don't have an account? Sign Up"
					onPress={() => this.props.navigation.navigate('SignUp')}
				/>
				
				<Button
					title="Forgot Password?"
					style={{ fontSize: 5 }}
					onPress={() => this.props.navigation.navigate('ForgotPassword')}
				/>
				
				<Text> By clicking "Sign Up", you agree to the following: </Text>
				<Button title="Terms of Use" onPress={() => {Linking.openURL("https://google.com")}} />
				<Button title="Privacy Policy" onPress={() => {Linking.openURL("https://google.com")}} />
				<Button title="Data Policy" onPress={() => {Linking.openURL("https://google.com")}} />
			</View>
    	);
  	}
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  textInput: {
    height: 40,
    width: '90%',
    borderColor: 'gray',
    borderWidth: 1,
    marginTop: 8
  }
})
