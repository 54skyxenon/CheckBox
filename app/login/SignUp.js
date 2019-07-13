// SignUp.js

import React from 'react';
import { StyleSheet, Text, TextInput, View, Button, Image } from 'react-native';
import DatePicker from 'react-native-datepicker';
//import firebase from 'react-native-firebase';
import * as firebase from 'firebase';
import '@firebase/firestore';

export default class SignUp extends React.Component
{
	constructor(props)
	{
		super(props);
		
		this.state = {firstName: '', lastName: '', username: '', email: '', password: '', confirmPassword: '',  dob: '',  // state variables for fields
						namesFilled: true, usernameExists: false, strongPassword: true, passwordsMatch: true, // state variables for field validation
						 errorMessage: null};
		
		this.setStrongPassword = this.setStrongPassword.bind(this);
		this.setNamesFilled = this.setNamesFilled.bind(this);
		this.setUsernameFilled = this.setUsernameFilled.bind(this);
		this.setPasswordsMatch = this.setPasswordsMatch.bind(this);
		this.setUsernameAvailability = this.setUsernameAvailability.bind(this);
		
		this.validateRegistration = this.validateRegistration.bind(this);
		this.handleSignUp = this.handleSignUp.bind(this);
	}
	
	setStrongPassword = (password) =>
	{
		sufficientLength = (password.length >= 8);
		hasLowercase = (/[a-z]/.test(password));
		hasUppercase = (/[A-Z]/.test(password));
		hasDigit = (/[0-9]/.test(password));
		
		this.setState({strongPassword: sufficientLength && hasLowercase && hasUppercase && hasDigit});
	}
	
	setNamesFilled = () =>
	{
		this.setState({namesFilled: this.state.firstName !== '' && this.state.lastName !== ''});
	}
	
	setUsernameFilled = () =>
	{
		this.setState({namesFilled: this.state.username !== ''});
	}
	
	setPasswordsMatch = (password, confirmPassword) =>
	{
		this.setState({passwordsMatch: password === confirmPassword});
	}
	
	// TODO: Fix bug that crashes when the username becomes blank
	setUsernameAvailability = (username) =>
	{
		if (username !== '')
		{
			const usersRef = firebase.firestore().collection('usernames').doc(username);
			usersRef.get().then(docSnapshot => {
				this.setState({usernameExists: docSnapshot.exists});
			});
		}
	}
	
	usernameHasWhitespace = () =>
	{
		return this.state.username.indexOf(' ') >= 0;
	}
	
	// TODO: Add phone number input
	validateRegistration = () =>
	{
		allFieldsCorrect = this.state.namesFilled && !this.state.usernameExists && !this.usernameHasWhitespace() && this.state.strongPassword && this.state.passwordsMatch;
		allFieldsFilled = (this.state.dob !== '') && (this.state.email !== '') && (this.state.username !== '') && (this.state.password !== '') && (this.state.confirmPassword !== '');
		
		if (allFieldsCorrect && allFieldsFilled)
		{
			return true;
		}
		else
		{
			this.setState({errorMessage: 'Some fields are missing/incorrect.'})
			return false;
		}
	}
	
	// Register user and add his/her UID to Firestone
	handleSignUp = () =>
	{
		if (this.validateRegistration())
		{
			firebase.auth()
			.createUserWithEmailAndPassword(this.state.email, this.state.password)
			.then(res => {
				firebase.firestore().collection("users").doc(res.user.uid).set({
					email: this.state.email,
					username: this.state.username,
					first_name: this.state.firstName,
					last_name: this.state.lastName,
					dob: this.state.dob,
					created_at: new Date()
				});
				firebase.firestore().collection("usernames").doc(this.state.username).set({
					uid: res.user.uid
				});
			}).catch(error => this.setState({
					errorMessage: error.message
				}));
		}
	}
	
	render()
	{
		return (
			<View style={styles.container}>

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
				
				<View style={{ flexDirection: 'row' }}>
				
					{/* Text field to input first name */}
					<TextInput
					  placeholder="First Name"
					  autoCapitalize="words"
					  style={styles.miscTextInput}
					  onChangeText={firstName => {
					  	this.setState({ firstName });
						this.setNamesFilled();
					}}
					  value={this.state.firstName}
					/>
				
					{/* Text field to input last name */}
					<TextInput
					  placeholder="Last Name"
					  autoCapitalize="words"
					  style={styles.miscTextInput}
					  onChangeText={lastName => {
						this.setState({ lastName });
						this.setNamesFilled();
					}}
					  value={this.state.lastName}
					/>
					
				</View>
				
				{/* Text field to input email */}
				<TextInput
					placeholder="Email (use this to log in)"
					autoCapitalize="none"
					style={styles.mainTextInput}
					onChangeText={email => this.setState({ email })}
          			value={this.state.email}
				/>
				
				{/* Text field to input username */}
				<TextInput
					placeholder="Username (others will see this)"
					autoCapitalize="none"
					style={styles.mainTextInput}
					onChangeText={username =>
						{
							this.setState({ username })
							this.setUsernameAvailability(username);
						}}
          			value={this.state.username}
				/>
				
				{
					this.state.usernameExists &&
					<Text style={{color: 'red'}}> Username taken! </Text>
				}
				
				{
					this.usernameHasWhitespace() &&
					<Text style={{color: 'red'}}> Username cannot have spaces! </Text>
				}
				
				{/* Text field to input password */}
				<TextInput
				  secureTextEntry={true}
				  placeholder="Password"
				  autoCapitalize="none"
				  style={styles.mainTextInput}
				  onChangeText={password =>
				  	{
				  		this.setState({ password });
				  		this.setStrongPassword(password);
					}
				  }
				  value={this.state.password}
				/>
				
				{
					!this.state.strongPassword &&
					<Text style={{color: 'red'}}> Must have at least 8 characters, one uppercase letter, one lowercase letter, and one digit. </Text>
				}
				
				{/* Text field to confirm password */}
				<TextInput
				  secureTextEntry={true}
				  placeholder="Confirm Password"
				  autoCapitalize="none"
				  style={styles.mainTextInput}
				  onChangeText={confirmPassword =>
				  	{
				  		this.setState({ confirmPassword });
				  		this.setPasswordsMatch(this.state.password, confirmPassword);
					}
				}
				  value={this.state.confirmPassword}
				/>
				
				{
					!this.state.passwordsMatch &&
					<Text style={{color: 'red'}}> Passwords do not match. </Text>
				}
				
				{/* Date field to input DOB */}
				<DatePicker
					style={{width: 200}}
					date={this.state.dob}
					mode="date"
					placeholder="Birthday"
					format="YYYY-MM-DD"
					minDate="1900-01-01"
					maxDate="2019-01-01"
					confirmBtnText="Confirm"
					cancelBtnText="Cancel"
					customStyles={{
					  dateIcon: {
						position: 'absolute',
						left: 0,
						top: 4,
						marginLeft: 0
					  },
					  dateInput: {
						marginLeft: 36,
						borderRadius: 5
					  }
					  // ... You can check the source to find the other keys.
					}}
					onDateChange={date => this.setState({dob: date})}
				/>
				
				<Button title="Confirm" onPress={this.handleSignUp} />
				<Button
					title="Already have an account? Login"
					onPress={() => this.props.navigation.navigate('Login')}
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
	mainTextInput: {
		height: 40,
		borderRadius: 5,
		width: '90%',
		borderColor: 'gray',
		borderWidth: 1,
		marginTop: 8
	},
	miscTextInput: {
		height: 40,
		width: '40%',
		borderRadius: 5,
		borderColor: 'gray',
		borderWidth: 1,
		margin: 8
	}
});
