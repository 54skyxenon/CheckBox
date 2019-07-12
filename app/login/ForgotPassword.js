// ForgotPassword.js

import React from 'react';
import {Text, TextInput, View, Button, StyleSheet} from 'react-native';
//import firebase from 'react-native-firebase';
import * as firebase from 'firebase';
import '@firebase/firestore';

export default class ForgotPassword extends React.Component
{
	constructor(props)
	{
		super(props);
		this.handleForgotPassword = this.handleForgotPassword.bind(this);
		this.validate = this.validate.bind(this);
		this.state = { email: '', errorMessage: null };
	}
	
	validate = (thisEmail) =>
	{
		const expression = /(?!.*\.{2})^([a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+(\.[a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+)*|"((([ \t]*\r\n)?[ \t]+)?([\x01-\x08\x0b\x0c\x0e-\x1f\x7f\x21\x23-\x5b\x5d-\x7e\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|\\[\x01-\x09\x0b\x0c\x0d-\x7f\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))*(([ \t]*\r\n)?[ \t]+)?")@(([a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.)+([a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.?$/i;

		return expression.test(String(thisEmail).toLowerCase());
	}

	handleForgotPassword()
	{
		const yourEmail = this.state.email;
		if (this.validate(yourEmail))
		{
			alert('If a user with that email exists, you will receive a link to reset your password.');
			firebase.auth().sendPasswordResetEmail(yourEmail)
			.then(user => {})
			.catch(error => {});
		}
		else
		{
			this.setState({errorMessage: "Please enter a valid email."});
		}
	}
	
	render()
	{
		return (
			<View style={styles.container}>
				<Text> Forgot Password </Text>
				
				{
					this.state.errorMessage &&
					<Text style={{ color: 'red' }}>
            			{this.state.errorMessage}
          			</Text>
				}
				
				<TextInput
					placeholder="Enter Email"
					onChangeText={email => this.setState({ email })}
					style={styles.textInput}
					autoCapitalize="none"
				/>
				
				<Button
					title="Submit"
					onPress={this.handleForgotPassword}
				/>
				
				<Button
					title="Back to Login"
					onPress={() => {this.props.navigation.navigate('Login')}}
				/>
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
