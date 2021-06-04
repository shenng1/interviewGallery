import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styled from 'styled-components';
import mockImagesJson from '../images.json';
import { removePic, addPic } from '../store/actions';

const Row = styled.div`
  display: flex;
  flex-direction: row; 
`;

const Side = styled.div`
  display: flex;
  align-items: center;
`;

const Gallery = styled.div`
  display: flex;
  flex-direction: column;
  width: 800px;
  margin: auto;

  img {
    cursor: pointer;
  }
`;

const Arrow = styled.div`
  font-size: 128px;
  font-weight: 600;
  cursor: pointer;
  user-select: none;
`;

const Preview = styled.div`
  display: flex;
  justify-content: center;
  height: 500px;
  margin-bottom: 28px;
`;

const ImageContained = styled.img`
  width: 100%;
  height: 100%;
  object-fit: contain;
`;

const GalleryItem = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  width: 100px;
  height: 60px;
  margin-right: 10px;

  ${({ selected }) => selected && `border: 2px solid #3c3b3a;`}
`;

const RemoveBtn = styled.div`
  position: absolute;
  top: 4px;
  right: 4px;
  display: none;
  align-items: center;
  justify-content: center;
  width: 16px;
  height: 16px;
  font-size: 10px;
  background-color: white;
  cursor: pointer;
  border-radius: 50%;
  box-shadow: 0px 2px 6px 1px rgb(51 68 80 / 20%);

  ${GalleryItem}:hover & {
    display: flex;
  }
`;

function GalleryComponent(props) {
  const { images } = props;
  const [previewID, setPreviewId] = useState('');
  const preview = previewID && images.find(i => i.id === previewID);

  const onPrev = () => {
    const newIndex = images.findIndex(i => i.id === previewID) - 1;
    setPreviewId(images[newIndex < 0 ? images.length - 1 : newIndex].id);
  };

  const onNext = () => {
    const newIndex = images.findIndex(i => i.id === previewID) + 1;
    setPreviewId(images[newIndex >= images.length ? 0 : newIndex].id);
  };

  const onRemove = (id) => {
    if (id === previewID) onNext();
    props.removePic(id);
  };

  useEffect(() => {
    if (!images.length) return;
    if (previewID) return;

    setPreviewId(images[0].id);
  }, [images, previewID]);

  useEffect(() => {
    mockImagesJson.forEach(item => props.addPic(item));
  }, []);

  return (
    <Row>
      <Side>
        <Arrow onClick={onPrev}> &lt; </Arrow>
      </Side>

      <Gallery>
        <Preview>
          { preview && 
            <ImageContained src={preview.base64} alt="" />
          }
        </Preview>
        <Row>
          { images.map((item) => (
            <GalleryItem selected={item.id === previewID} key={item.id}>
              <RemoveBtn onClick={() => onRemove(item.id)}>X</RemoveBtn>
              <ImageContained src={item.base64} alt="" onClick={() => setPreviewId(item.id)} />
            </GalleryItem>
          ))}
        </Row>
      </Gallery>

      <Side>
        <Arrow onClick={onNext}>&gt;</Arrow>
      </Side>
    </Row>
  );
}

GalleryComponent.propTypes = {
  images: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string,
    base64: PropTypes.string,
  })).isRequired,
  onRemove: PropTypes.func.isRequired,
};

const mapStateToProps = (state, ownProps) => ({
  images: state.images,
});

const mapDispatchToProps = (dispatch) => ({
  addPic: (params) => {dispatch(addPic(params))},
  removePic: (params) => {dispatch(removePic(params))},
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(GalleryComponent);