import { useState, useEffect } from 'react';
import { fetchImages } from '../../api';

import { Searchbar } from '../Searchbar/Searchbar';
import { ImageGallery } from '../ImageGallery/ImageGallery';
import { Button } from '../Button/Button';
import { Loader } from '../Loader/Loader';
import { Modal } from '../Modal/Modal';

import { GlobalStyle } from '../GlobalStyle';
import { AppStyle } from './App.styled';

import { Toaster } from 'react-hot-toast';

export function App() {
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const [imagesOnPage, setImagesOnPage] = useState(0);
  const [totalImages, setTotalImages] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [images, setImages] = useState(null);
  const [error, setError] = useState(null);
  const [currentImageUrl, setCurrentImageUrl] = useState(null);

  useEffect(() => {
    setIsLoading(!isLoading);

    fetchImages(query, page)
      .then(({ hits, totalHits }) => {
        const imagesArray = hits.map(hit => ({
          id: hit.id,
          smallImage: hit.webformatURL,
          largeImage: hit.largeImageURL,
        }));

        setPage(1);
        setImages(imagesArray);
        setImagesOnPage(imagesArray.length);
        setTotalImages(totalHits);
        setImages(prevImages =>[...prevImages, ...imagesArray]);
        setImagesOnPage(imagesOnPage + imagesArray.length);
      })
      .catch(setError(error))
      .finally(() => setIsLoading(!isLoading));
  }, [error, images, imagesOnPage, isLoading, page, query]);

  const getSearchRequest = query => {
    setQuery(query);
  };

  const onNextFetch = () => {
    setPage(page + 1);
  };

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  const openModal = e => {
    const currentImageUrl = e.target.dataset.large;

    if (e.target.nodeName === 'IMG') {
      setShowModal(!showModal);
      setCurrentImageUrl(currentImageUrl);
    }
  };

  return (
    <AppStyle>
      <Searchbar onSubmit={getSearchRequest} />

      {images && <ImageGallery images={images} openModal={openModal} />}

      {isLoading && <Loader />}

      {imagesOnPage >= 12 && imagesOnPage < totalImages && (
        <Button onNextFetch={onNextFetch} />
      )}

      {showModal && (
        <Modal onClose={toggleModal} currentImageUrl={currentImageUrl} />
      )}
      <GlobalStyle />
      <Toaster />
    </AppStyle>
  );
}
