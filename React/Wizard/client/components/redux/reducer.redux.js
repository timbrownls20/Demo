
export default (state = [], action) => {

    debugger;

    switch (action.type){
      case 'SHOW_MESSAGE':

      var newState = Object.assign({}, state, {
        message: action.message
      });

      return newState;
   
      default:
            return state;
    }
  };