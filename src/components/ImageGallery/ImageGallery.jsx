import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';
import { ImageGalleryList } from './ImageGallery.styled';

import PropTypes from 'prop-types';

export function ImageGallery({ images, openModal }) {
  return (
    <ImageGalleryList>
      {images.map(({ id, smallImage, largeImage }) => (
        <ImageGalleryItem
          key={id}
          smallImage={smallImage}
          largeImage={largeImage}
          openModal={openModal}
        />
      ))}
    </ImageGalleryList>
  );
}

ImageGallery.propTypes = {
  openModal: PropTypes.func.isRequired,
  images: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      smallImage: PropTypes.string.isRequired,
      largeImage: PropTypes.string.isRequired,
    })
  ),
};
