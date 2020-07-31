const reducer = (state = {selected: []}, action) => {
    switch (action.type) {
      case 'UPDATE_SELECTED_BUTTONS': {
 return {selected: action.payload};
      }
      default: {
        return state;
      }
    }
  };
  
  export default reducer;