import React, { Component } from 'react';
import styles from './AllMovies.module.css';
import axios from 'axios';
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';

class AllMovies extends Component {

    state = {
        allMovieList: [],
        totalPages: null,
        page: 1,
        genre: '',
        currentGenre: 'Genre'
    }

    componentDidMount() {
        this.changePage();
    }

    async changePage() {
        try {
            const response = await axios.get(`https://api.themoviedb.org/4/discover/movie?api_key=4279c0bf7fc9803dfda201662c10705f&page=${this.state.page}${this.state.genre}`);
            const movieList = response.data.results.slice(0, 10);
            const movies = movieList.map(movie => movie);
            const totalPages = response.data.total_pages;
            this.setState({
                ...this.state,
                allMovieList: movies,
                totalPages: totalPages
            })
        } catch (event) {
            console.log(event);
        }
    }

    onNextPage = () => {
        this.setState((previousState, currentProps) => {
            return { page: previousState.page + 1 };
        }, this.changePage);
    }

    onPrevPage = () => {
        if (this.state.page === 1) {
            this.setState({
                page: this.state.totalPages
            }, this.changePage);

        } else {
            this.setState((previousState, currentProps) => {
                return { page: previousState.page - 1 };
            }, this.changePage);
        }
    }

    onSelect = (value) => {
        console.log(value.value);
        switch (value.value) {
            case 'Tous':
                this.setState({
                    ...this.state,
                    genre: '',
                    currentGenre: 'Tous'
                }, this.changePage)
                break;
            case 'Action':
                this.setState({
                    ...this.state,
                    genre: '&with_genres=28',
                    currentGenre: 'Action'
                }, this.changePage)
                break;
            case 'Thriller':
                this.setState({
                    ...this.state,
                    genre: '&with_genres=53',
                    currentGenre: 'Thriller'
                }, this.changePage)
                break;
            case 'Comédie':
                this.setState({
                    ...this.state,
                    genre: '&with_genres=35',
                    currentGenre: 'Comédie'
                }, this.changePage)
                break;
            default:
                return this.state
        }
        
    }

    render() {

        const options = [
            'Tous', 'Action', 'Thriller', 'Comédie'
        ]

        return (
            <div className={styles.AllMovies}>
                <h1>Tous les films</h1>
                <div className={styles.sort}>
                    <Dropdown className={styles.genres} options={options} onChange={this.onSelect} value={this.state.currentGenre} placeholder="Select an option" />
                </div>
                <div className={styles.movieList}>
                    {this.state.allMovieList.length > 9 &&
                        this.state.allMovieList.map(movie => {
                            return (
                                <div key={movie.id} className={styles.allMovie}>
                                    <img src={`https://image.tmdb.org/t/p/w154/${movie.poster_path}`} alt={`${movie.title} poster`} />
                                    <div className={styles.allTitle}>{movie.title}</div>
                                    <div className={styles.allYear}>{movie.release_date.slice(0, 4)}</div>
                                </div>
                            )
                        })
                    }
                </div>
                <div className={styles.pagination}>
                    <button onClick={this.onPrevPage} className={styles.prevPage}></button>
                    <button onClick={this.onNextPage} className={styles.nextPage}></button>
                </div>
            </div>
        );
    }
}

export default AllMovies;





















