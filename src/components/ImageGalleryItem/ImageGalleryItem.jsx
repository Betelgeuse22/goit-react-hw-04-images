import {
  ImageGalleryIt,
  ImageGalleryItemImage,
} from './ImageGalleryItem.styled';
import PropTypes from 'prop-types';

export function ImageGalleryItem({ smallImage, largeImage, openModal }) {
  return (
    <ImageGalleryIt onClick={openModal}>
      <ImageGalleryItemImage src={smallImage} alt="" data-large={largeImage} />
    </ImageGalleryIt>
  );
}

ImageGalleryItem.propTypes = {
  openModal: PropTypes.func.isRequired,
  smallImage: PropTypes.string.isRequired,
  largeImage: PropTypes.string.isRequired,
};
