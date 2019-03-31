//Component/Search.js

import React from 'react'
import { StyleSheet, View, TextInput, Button, FlatList, Text, ActivityIndicator } from 'react-native'
import FilmItem from './FilmItem'
import { getFilmsFromApiWithSearchedText, getImagePathFromApi } from '../API/TMDBApi' // import { } from ... car c'est un export nommé dans TMDBApi.js


class Search extends React.Component {

    constructor(props){
        super(props)
        this.state = { 
            films: [],
            isLoading: false
        }

    }


    _loadFilms() {
        if (this.searchedText.length > 0) { // Seulement si le texte recherché n'est pas vide
            this.setState({isLoading:true})
            getFilmsFromApiWithSearchedText(this.searchedText).then(data => {
              this.setState({ 
                  films: data.results,
                  isLoading: false
             })
          })
        }
    }

    _searchTextInputChanged(text) {
        this.searchedText = text
    }

    _displayLoading(){
        if(this.state.isLoading) {
            return (
                <View style={styles.loading_container}>
                    <ActivityIndicator size='large'/>
                </View>
            )
        }
    }

    render(){
        console.log(this.state.isLoading)
        return(
            <View style={ styles.main_container}>
                <TextInput 
                    placeholder="Titre du film" 
                    style={styles.textinput} 
                    onChangeText={(text) => this._searchTextInputChanged(text)} 
                    onSubmitEditing={() => this._loadFilms()}
                />
                <Button title='Rechercher' onPress={() => this._loadFilms()} />
                <FlatList
                    data={this.state.films}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({item}) => <FilmItem film={item}/>}
                />
                {this._displayLoading()}
            </View>
        )
        
    }
    

}

const styles = StyleSheet.create({
    main_container: {
        flex: 1,
        marginTop: 40
    },
    textinput: {
        marginLeft: 5, 
        marginRight:5, 
        height:50, 
        borderColor:'#000000', 
        borderWidth: 1, 
        paddingLeft:5
    },
    loading_container: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 100,
        bottom: 0,
        alignItems: 'center',
        justifyContent: 'center'
      }
})

export default Search