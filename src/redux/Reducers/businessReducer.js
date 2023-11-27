const BusinessReducer = (
  state = { businessData: null, loading: false, error: false },
  action
) => {
  switch (action.type) {
    case "GET_PBUSINESS_STARTED":
      return {
        ...state,
        loading: true,
        error: false,
      };
      break;
    case "GET_BUSINESS_SUCCESS":
      return {
        ...state,
        businessData: action.payload,
        loading: false,
        error: false,
      };
      break;
    case "GET_BUSINESS_FAILED":
      return {
        ...state,
        loading: false,
        error: true,
      };
      break;
    default:
      return state;
      break;
  }
};

export default BusinessReducer;
