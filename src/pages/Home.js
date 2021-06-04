import React from 'react';
import styled from 'styled-components';

import Uploader from '../componets/Uploader.js';
import Gallery from '../componets/Gallery.js';

const Container = styled.main`
  display: flex;
  flex-direction: column;
  width: 1000px;
  margin: auto;
`;

function Home() {
  return (
    <Container>
      <Uploader />
      <Gallery />
    </Container>
  );
}

export default Home;
