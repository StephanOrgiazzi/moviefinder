import React, { Component } from 'react';
import styles from './BestMovies.module.css';
import axios from 'axios';
import Slider from "react-slick";

class BestMovies extends Component {

    state = {
        bestMovieList: []
    }

    async componentDidMount() {
        try {
            const response = await axios.get('https://api.themoviedb.org/4/discover/movie?api_key=4279c0bf7fc9803dfda201662c10705f&sort_by=vote_average.desc&vote_count.gte=3000&page=1');
            const movieList = response.data.results.slice(0, 10);
            const movies = movieList.map(movie => movie);
            this.setState({
                bestMovieList: movies
            })

        } catch (event) {
            console.log(event);
        }
    }

    render() {

        const settings = {
            dots: false,
            infinite: true,
            speed: 500,
            slidesToShow: 4,
            slidesToScroll: 4,
            touchThreshold: 10,
            responsive: [
                {
                    breakpoint: 2024,
                    settings: {
                        dots: false,
                        slidesToShow: 4,
                        slidesToScroll: 4,
                        infinite: true,
                        centerPadding: '100px',
                    }
                },
                {
                    breakpoint: 900,
                    settings: {
                        dots: false,
                        slidesToShow: 3,
                        slidesToScroll: 3,
                    }
                },
                {
                    breakpoint: 700,
                    settings: {
                        dots: false,
                        arrows: true,
                        slidesToShow: 3,
                        centerMode: false,
                        slidesToScroll: 3,
                    }
                },
                {
                    breakpoint: 580,
                    settings: {
                        dots: false,
                        arrows: false,
                        slidesToShow: 3,
                        centerMode: false,
                        slidesToScroll: 3,
                    }
                }
            ]
        };

        return (
            <div className={styles.BestMovies}>
                <h1>Les 10 meilleurs films</h1>
                {this.state.bestMovieList.length > 1 &&
                    <Slider {...settings}>
                        {
                            this.state.bestMovieList.map(movie => {
                                return (
                                    <div key={movie.id} className={styles.bestMovie}>
                                        <img src={`https://image.tmdb.org/t/p/w154/${movie.poster_path}`} alt={`${movie.title} poster`} />
                                        <div className={styles.bestTitle}>{movie.title}</div>
                                        <div className={styles.bestYear}>{movie.release_date.slice(0, 4)}</div>
                                    </div>
                                )
                            })
                        }
                    </Slider>
                }
            </div>
        );
    }
}

export default BestMovies;