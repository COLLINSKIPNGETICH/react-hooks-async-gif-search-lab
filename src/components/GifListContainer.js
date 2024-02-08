import React, { Component } from 'react';
import GifList from './GifList';
import GifSearch from './GifSearch';

class GifListContainer extends Component {
  state = {
    gifs: [],
    loading: false,
    error: null,
  };

  fetchGifs = (query) => {
    this.setState({ loading: true, error: null });

    // Replace 'YOUR_API_KEY' with your actual Giphy API key
    const apiKey = 'YOUR_API_KEY';
    const apiUrl = `https://api.giphy.com/v1/gifs/search?q=${query}&api_key=${apiKey}&rating=g`;

    fetch(apiUrl)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        this.setState({
          gifs: data.data.slice(0, 3), // Store the first 3 gifs
          loading: false,
        });
      })
      .catch((error) => {
        this.setState({
          loading: false,
          error: 'Error fetching gifs. Please try again.',
        });
      });
  };

  componentDidMount() {
    // Fetch default gifs when the component mounts
    this.fetchGifs('default');
  }

  render() {
    const { gifs, loading, error } = this.state;

    return (
      <div>
        <GifSearch fetchGifs={this.fetchGifs} />
        {loading && <p>Loading...</p>}
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <GifList gifs={gifs} />
      </div>
    );
  }
}

export default GifListContainer;
