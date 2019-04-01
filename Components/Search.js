//Component/Search.js

import React from 'react'
import { StyleSheet, View, TextInput, Button, FlatList, Text, ActivityIndicator } from 'react-native'
import FilmItem from './FilmItem'
import { getFilmsFromApiWithSearchedText, getImagePathFromApi } from '../API/TMDBApi' // import { } from ... car c'est un export nommé dans TMDBApi.js


class Search extends React.Component {

    constructor(props){
        super(props)
        this.page = 0
        this.totalPages = 0
        this.state = { 
            films: [],
            isLoading: false
        }

    }

    _displayDetailForFilm = (idFilm) => {
        console.log("Display film with id " + idFilm)
        this.props.navigation.navigate("FilmDetail", {idFilm: idFilm})
      }

    _searchFilms() {
        this.page = 0
        this.totalPages = 0
        this.setState({
          films: []
        }, () => {
            console.log("Page : " + this.page + " / TotalPages : " + this.totalPages + " / Nombre de films : " + this.state.films.length)
            this._loadFilms()
        })
        
      }

    _loadFilms() {
        if (this.searchedText.length > 0) { // Seulement si le texte recherché n'est pas vide
            this.setState({isLoading:true})
            getFilmsFromApiWithSearchedText(this.searchedText, this.page+1).then(data => {
              this.page = data.page
              this.totalPages = data.total_pages
              this.setState({ 
                films: this.state.films.concat(data.results), // on concatene les nouvelles entrées aux anciennes pour ne pas les perdres
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
                    onSubmitEditing={() => this._searchFilms()}
                />
                <Button style={ styles.search_button} title='Rechercher' onPress={() => this._searchFilms()} />
                <FlatList
                    data={this.state.films}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({item}) => <FilmItem film={item} displayDetailForFilm={this._displayDetailForFilm} />}
                    onEndReachedThreshold={0.5}
                    onEndReached={() => {
                        if(this.page<this.totalPages) {
                            this._loadFilms()
                        }
                    }}
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
    search_button: {
        marginTop: 5,
        marginLeft: 5,
        marginRight: 5
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