import axios from 'axios'
import React, { useState, useEffect } from 'react'
import Swal from 'sweetalert2'
import './App.css'
import Preloader from './components/Preloader'

const API_KEY = ''

const App = () => {

    const [photos, setPhotos] = useState([])
    const [loading, setLoading] = useState(false)
    const [loadingMore, setLoadingMore] = useState(false)
    const [searchTerm, setSearchTerm] = useState('random');
    const [page, setPage] = useState(1);
    const [orientation, setOrientation] = useState('landscape');
    const cardArray = Array(10).fill();

    useEffect(() => {
        async function fetchData() {
            try {
                setLoading(true);
                const response = await axios.get(`https://api.unsplash.com/search/photos?page=${page}&query=${searchTerm}&orientation=${orientation}&client_id=${process.env.REACT_APP_SECRET_KEY}`);
                console.log(response)
                setPhotos(response.data.results);
            } catch (error) {
                console.error(error);
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Something went wrong!',
                });
            } finally {
                setLoading(false);
            }
        }

        fetchData();
    }, [])

    console.log(photos)

    const handleInputChange = (event) => {
        setSearchTerm(event.target.value);
    };

    const handleOrientationChange = async (value) => {
        try {
            setLoading(true);
            const response = await axios.get(`https://api.unsplash.com/search/photos?page=1&query=${searchTerm}&orientation=${value}&client_id=${process.env.REACT_APP_SECRET_KEY}`);
            setPhotos(response.data.results);
            setOrientation(value);
            setPage(1);
        } catch (error) {
            console.error(error);
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Something went wrong!',
            });
        } finally {
            setLoading(false);
        }
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        // Handle search

        try {
            setLoading(true);
            const response = await axios.get(`https://api.unsplash.com/search/photos?page=1&query=${searchTerm}&orientation=${orientation}&client_id=${process.env.REACT_APP_SECRET_KEY}`);
            setPhotos(response.data.results);
            setPage(1)
        } catch (error) {
            console.error(error);
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Something went wrong!',
            });
        } finally {
            setLoading(false);
        }
    };

    const handleSearchCat = async (cat) => {
        try {
            setLoading(true);
            const response = await axios.get(`https://api.unsplash.com/search/photos?page=1&query=${cat}&orientation=${orientation}&client_id=${process.env.REACT_APP_SECRET_KEY}`);
            setPhotos(response.data.results);
            setPage(1)
            setSearchTerm(cat)
        } catch (error) {
            console.error(error);
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Something went wrong!',
            });
        } finally {
            setLoading(false);
        }
    };

    const handleLoadMore = async () => {
        try {
            setLoadingMore(true);
            const response = await axios.get(`https://api.unsplash.com/search/photos?page=${page + 1}&query=${searchTerm}&orientation=${orientation}&client_id=${process.env.REACT_APP_SECRET_KEY}`);
            setPhotos(prevPhotos => [...prevPhotos, ...response.data.results]);
            setPage(page + 1);
        } catch (error) {
            console.error(error);
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Something went wrong!',
            });
        } finally {
            setLoadingMore(false);
        }
    }

    return (
        <>
            <nav className="navbar navbar-expand-lg bg-body-tertiary">
                <div className="container-fluid px-lg-5 px-lg-5">
                    <a className="navbar-brand fs-3 mr-lg-5" href="#">Gallery</a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item mr-lg-3">
                                <a className={`nav-link ${searchTerm === 'food' ? 'active' : ''}`} aria-current="page" onClick={() => handleSearchCat('food')}>Food</a>
                            </li>
                            <li className="nav-item">
                                <a className={`nav-link ${searchTerm === 'sport' ? 'active' : ''}`} onClick={() => handleSearchCat('sport')}>Sport</a>
                            </li>
                            <li className="nav-item">
                                <a className={`nav-link ${searchTerm === 'wallpapers' ? 'active' : ''}`} onClick={() => handleSearchCat('wallpapers')}>Wallpapers</a>
                            </li>
                            <li className="nav-item">
                                <a className={`nav-link ${searchTerm === 'nature' ? 'active' : ''}`} onClick={() => handleSearchCat('nature')}>Nature</a>
                            </li>
                            <li className="nav-item dropdown">
                                <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    Orientation {orientation}
                                </a>
                                <ul className="dropdown-menu">
                                    <li><a className={`nav-link ${orientation === 'landscape' ? 'active' : ''}`} href="#" onClick={() => handleOrientationChange("landscape")}>Landscape</a></li>
                                    <li><a className={`nav-link ${orientation === 'portrait' ? 'active' : ''}`} href="#" onClick={() => handleOrientationChange("portrait")}>Portrait</a></li>
                                    <li><a className={`nav-link ${orientation === 'squarish' ? 'active' : ''}`} href="#" onClick={() => handleOrientationChange("squarish")}>Squarish</a></li>
                                </ul>
                            </li>
                            {loading && (
                                <li className="nav-item p-2">
                                    <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Loading...
                                </li>
                            )}
                        </ul>
                        <form className="d-flex" role="search" onSubmit={handleSubmit}>
                            <input
                                className="form-control me-2"
                                type="search"
                                placeholder="Search"
                                aria-label="Search"
                                onChange={handleInputChange}
                            />
                            <button className="btn btn-primary" type="submit">
                                Search
                            </button>
                        </form>
                    </div>
                </div>
            </nav>
            <div class="container-fluid px-lg-5">
                <div class="row g-3">
                    {photos.map((photo, index) => (
                        <div class="col-sm-6 col-md-4 col-lg-3 d-flex justify-content-center">
                            <div class="card">
                                <a href={photo.links.html} target="_blank">
                                    <img class="card-img-top" src={photo.urls.small} alt={photo.alt_description} />
                                </a>
                                <div class="card-body">
                                    <p class="card-text">Photo by {photo.user.name}</p>
                                    <p class="card-text">{photo.description}</p>
                                    <a href={photo.links.html} target="_blank" class="btn btn-primary">View on Unsplash</a>
                                </div>
                            </div>
                        </div>

                    ))}
                </div>
            </div>
            <div className="container-fluid d-flex justify-content-center my-3">
                <button className="btn btn-primary" onClick={handleLoadMore}>
                    {loadingMore ? (
                        <>
                            <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                            Loading...
                        </>
                    ) : (
                        'Load More'
                    )}
                </button>

            </div>
        </>
    )
}

export default App