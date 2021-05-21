import { Component } from 'react';
import './PoemPage.css';
import { getFavorites, addFavorites, deleteFavorites } from '../utils.js';

export default class PoemPage extends Component {
  state = {
    poems: [],
    favorites: []
  }

  async componentDidMount() {
    try {
      const favorites = await getFavorites();
      this.setState({ favorites: favorites })
    }
    catch (err) {
      console.log(err.message);
    }
  }

  handleSearch = async search => {
    try {
      const { favorites } = this.state;

      const poems = await getFavorites(search);

      const upgradedPoems = poems.map(poem => {
        const found = favorites.find(favorite => favorite.stories === poem.stories);
        return found ? found : poem;
      });

      this.setState({ poems: upgradedPoems });
    }

    catch (err) {
      console.log(err.message);
    }

    handleFavorited = async poem => {
      try {

        const favoriteId = poem.id;//this is not right just a place holder

        if (favoriteId) {
          await deleteFavorites(favoriteId);

          const updatedPoems = poems.map(p => {
            return p.id === favoriteId
              ? {
                hectare: poem.hectare,
                shift: poem.shift,
                date: poem.date,
                stories: poem.stories,
                experience: poem.experience,
                poem: poem.poem
              }
              : p;
          });
          this.setState({ poems: updatedPoems });
        }
        else {
          const addedFavorite = await addFavorites(poem);

          const updatedPoems = poems.map(p => {
            return p.poemId === addFavorites.poemId ? addFavorites : p;
          });

          this.setState({ poems: updatedPoems });
        }

      }
      catch (err) {
        console.log(err.message);
      }
    }

    // finsih render
    render() {
      const { poems } = this.state;

      return (
        <div className="PoemPage">

        </div>
      );
    }
  }