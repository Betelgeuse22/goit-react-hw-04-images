import {
  ImageGalleryIt,
  ImageGalleryItemImage,
} from './ImageGalleryItem.styled';

export function ImageGalleryItem({
  description,
  smallImage,
  largeImage,
  openModal,
}) {
  return (
    <ImageGalleryIt onClick={openModal}>
      <ImageGalleryItemImage
        src={smallImage}
        alt={description}
        data-large={largeImage}
      />
    </ImageGalleryIt>
  );
}
