// TaskCreate.js

import React from 'react';
import { StyleSheet, Switch, ScrollView, TextInput, Text, View, Button } from 'react-native';
import { Icon } from 'react-native-elements';

export default class TaskCreate extends React.Component
{
  render()
  {
    return (
		<ScrollView>
			<View style={styles.container}>
				<View style={styles.inline}>
					<Text style={styles.modalInput}> Title: </Text>
					<TextInput
						style={styles.modalInput}
						placeholder="What would you call this task?"
						/>
				</View>
		
				<View style={styles.inline}>
					<Text style={styles.modalInput}> Description: </Text>
					<TextInput
						style={styles.modalInput}
						placeholder="Elaborate"
					/>
				</View>
	
				<View style={styles.inline}>
					<Icon
					  name='eye-with-line'
					  type='entypo'
					  onPress={() => this.props.navigation.navigate('CreateInfo',
					  				{
					  					title: "Private Setting",
										description: "Private tasks will only be visible by direct participants of the task and cannot be shared or posted for the public to see. Private tasks can still be saved to your task archive and affect your statistics, but will not be visible to others."
									})}
					/>
					<Text style={styles.modalInput}> Private? </Text>
					<Switch />
				</View>
		
				<View style={styles.inline}>
					<Icon
					  name='user-secret'
					  type='font-awesome'
					  onPress={() => this.props.navigation.navigate('CreateInfo',
					  				{
					  					title: "Anonymous Setting",
										description: "Anonymous tasks will not display your name as the sender until the task is completed. If an anonymous task expires, your name will remain hidden."
									})}
					/>
					<Text style={styles.modalInput}> Anonymous? </Text>
					<Switch />
				</View>
		
				<View style={styles.inline}>
					<Text style={styles.modalInput}> Expiration time: </Text>
					<TextInput
						style={styles.modalInput}
						placeholder="Days"
						/>
					<TextInput
						style={styles.modalInput}
						placeholder="Hours"
						/>
					<TextInput
						style={styles.modalInput}
						placeholder="Minutes"
						/>
				</View>
		
				<Button
					title="Add Participants"
					/>
			
				<Button
					title="Submit"
					/>
			</View>
		</ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  	bottom: {
	  flex: 1,
	  justifyContent: 'flex-end',
	  marginBottom: 30
	},
	container: {
    	flex: 1,
    	justifyContent: 'center',
    	alignItems: 'center'
  	},
  	modalInput: {
  		margin: 10,
    	alignItems: 'center'
	},
	inline: {
		flexDirection:'row',
		flexWrap:'wrap'
	}
});
