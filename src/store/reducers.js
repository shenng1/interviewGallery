import * as actions from './actions';

const reducers = (state = { images: [] }, { payload, type }) => {
    switch (type) {
        case actions.ADD_PIC:
            return { 
                ...state, 
                images: [ ...state.images, payload ],
            };

        case actions.REMOVE_PIC:
            return { 
                ...state, 
                images: state.images.filter(i => i.id !== payload),
            };

        default:
            return state;
    }
};
  
export default reducers;
  