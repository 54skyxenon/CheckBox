// Search.js

import React from 'react';
import { StyleSheet, SafeAreaView, ActivityIndicator, Platform, Image, Text, View, Button, FlatList } from 'react-native';
import { List, ListItem, SearchBar } from 'react-native-elements';

export default class Search extends React.Component
{
	render()
	{
		return (<SafeAreaView style={{flex: 1}}>
					<SearchContent />
				</SafeAreaView>);
	}
}

export class SearchContent extends React.Component
{
	constructor(props)
	{
    	super(props);

    	this.state = { loading: false, data: [], error: null };

    	this.arrayholder = [];
  	}

  	componentDidMount()
  	{
    	this.makeRequest();
  	}

  	makeRequest = () =>
  	{
    	const url = 'https://randomuser.me/api/?&results=20';
    	this.setState({ loading: true });

    	fetch(url)
		.then(res => res.json())
		.then(res => {
        	this.setState({ data: res.results, error: res.error || null, loading: false });
        	this.arrayholder = res.results;
      	})
      	.catch(error => {
        	this.setState({ error, loading: false });
      	});
  	}

  	renderSeparator = () =>
  	{
    	return (
      		<View
        		style={{ height: 1, width: '86%', backgroundColor: '#CED0CE', marginLeft: '14%' }}
      		/>
    	);
  	}

  	searchFilterFunction = text =>
  	{
    	this.setState({ value: text });

    	const newData = this.arrayholder.filter(item => {
			const itemData = `${item.name.title.toUpperCase()} ${item.name.first.toUpperCase()} ${item.name.last.toUpperCase()}`;
			
      		const textData = text.toUpperCase();

      		return itemData.indexOf(textData) > -1;
    	});
		
    	this.setState({ data: newData });
  	}

  	renderHeader = () =>
  	{
    	return (
      		<SearchBar
				placeholder="Search for a name/username..."
				lightTheme
				round
				onChangeText={text => this.searchFilterFunction(text)}
				autoCorrect={false}
				value={this.state.value}
      		/>
    	);
  	}

  	render()
  	{
		if (this.state.loading)
		{
		  	return (
				<View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
			  		<ActivityIndicator />
				</View>
			);
		}
		
		return (
			<View style={{ flex: 1 }}>
				<FlatList
			  		data={this.state.data}
					renderItem={({ item }) => (
						<ListItem
				  			leftAvatar={{ source: { uri: item.picture.thumbnail } }}
				  			title={`${item.name.first} ${item.name.last}`}
				  			subtitle={item.email}
						/>
			  		)}
					keyExtractor={item => item.email}
					ItemSeparatorComponent={this.renderSeparator}
					ListHeaderComponent={this.renderHeader}
				/>
			</View>
		);
  	}
}


