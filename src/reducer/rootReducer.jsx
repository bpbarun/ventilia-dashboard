export default (state, action) => {
    switch (action.type) {
      case "success_login":
        return {
          ...state,
          data: action.payload
        };
        case "failed_login":
          return{
            ...state,
            data:'',
            error:action.payload
          }
      default:
        return state;
    }
  };