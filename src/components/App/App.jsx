import { Component } from 'react';
import { fetchImages } from '../../api';

import { Searchbar } from '../Searchbar/Searchbar';
import { ImageGallery } from '../ImageGallery/ImageGallery';
import { Button } from '../Button/Button';
import { Loader } from '../Loader/Loader';
import { Modal } from '../Modal/Modal';
import { GlobalStyle } from '../GlobalStyle';
import { AppStyle } from './App.styled';

import { Toaster } from 'react-hot-toast';

export class App extends Component {
  state = {
    query: '',
    page: 1,
    imagesOnPage: 0,
    totalImages: 0,
    isLoading: false,
    showModal: false,
    images: null,
    error: null,
    currentImageUrl: null,
    currentImageDescription: null,
  };

  componentDidUpdate(_, prevState) {
    const { query, page } = this.state;

    if (prevState.query !== query) {
      this.setState(({ isLoading }) => ({ isLoading: !isLoading }));

      fetchImages(query)
        .then(({ hits, totalHits }) => {
          const imagesArray = hits.map(hit => ({
            id: hit.id,
            smallImage: hit.webformatURL,
            largeImage: hit.largeImageURL,
          }));

          return this.setState({
            page: 1,
            images: imagesArray,
            imagesOnPage: imagesArray.length,
            totalImages: totalHits,
          });
        })
        .catch(error => this.setState({ error }))
        .finally(() =>
          this.setState(({ isLoading }) => ({ isLoading: !isLoading }))
        );
    }

    if (prevState.page !== page && page !== 1) {
      this.setState(({ isLoading }) => ({ isLoading: !isLoading }));

      fetchImages(query, page)
        .then(({ hits }) => {
          const imagesArray = hits.map(hit => ({
            id: hit.id,
            smallImage: hit.webformatURL,
            largeImage: hit.largeImageURL,
          }));

          return this.setState(({ images, imagesOnPage }) => {
            return {
              images: [...images, ...imagesArray],
              imagesOnPage: imagesOnPage + imagesArray.length,
            };
          });
        })
        .catch(error => this.setState({ error }))
        .finally(() =>
          this.setState(({ isLoading }) => ({ isLoading: !isLoading }))
        );
    }
  }

  getSearchRequest = query => {
    this.setState({ query });
  };

  onNextFetch = () => {
    this.setState(({ page }) => ({ page: page + 1 }));
  };

  toggleModal = () => {
    this.setState(({ showModal }) => ({ showModal: !showModal }));
  };

  openModal = e => {
    const currentImageUrl = e.target.dataset.large;
    const currentImageDescription = e.target.alt;

    if (e.target.nodeName === 'IMG') {
      this.setState(({ showModal }) => ({
        showModal: !showModal,
        currentImageUrl: currentImageUrl,
        currentImageDescription: currentImageDescription,
      }));
    }
  };

  render() {
    const {
      images,
      imagesOnPage,
      totalImages,
      isLoading,
      showModal,
      currentImageUrl,
      currentImageDescription,
    } = this.state;

    return (
      <AppStyle>
        <Searchbar onSubmit={this.getSearchRequest} />

        {images && <ImageGallery images={images} openModal={this.openModal} />}

        {isLoading && <Loader />}

        {imagesOnPage >= 12 && imagesOnPage < totalImages && (
          <Button onNextFetch={this.onNextFetch} />
        )}

        {showModal && (
          <Modal
            onClose={this.toggleModal}
            currentImageUrl={currentImageUrl}
            currentImageDescription={currentImageDescription}
          />
        )}
        <GlobalStyle />
        <Toaster />
      </AppStyle>
    );
  }
}
