import React, { createRef } from 'react';
import { connect } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';

import { addPic } from '../store/actions';

function Uploader(props) {
  // const file] = useState();
  const inputRef = createRef();

  const onClick = () => {
    if (!inputRef.current) return;
    if (!inputRef.current.files[0]) return;

    const reader = new FileReader();
    reader.readAsDataURL(inputRef.current.files[0]); 
    reader.onloadend = () => {
      props.addPic({
        id: uuidv4(),
        base64: reader.result,
      });
        // save to LS
    };
    inputRef.current.value = '';
  };
  
  return (
    <div>
        <input type="file" ref={inputRef} accept=".jpg, .jpeg, .png" />
        <button onClick={onClick}>Upload</button>
    </div>
  );
}

const mapStateToProps = () => ({});

const mapDispatchToProps = (dispatch) => ({
  addPic: (params) => {dispatch(addPic(params))},
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Uploader);
