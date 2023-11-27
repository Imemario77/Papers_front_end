const OtpReducer = (
  state = { email: null, started: false, failed: false, change: false },
  action
) => {
  switch (action.type) {
    case "OTP_STARTED":
      return {
        ...state,
        started: true,
        failed: false,
        email: action.email,
        change: false,
      };
      break;
    case "OTP_SUCCESS":
      return {
        ...state,
        started: false,
        change: true,
        failed: false,
      };
      break;
    case "OTP_COMPLETED":
      return {
        ...state,
        started: false,
        failed: false,
        email: null,
        change: false,
      };
      break;
    case "OTP_FAILED":
      return { ...state, started: false, failed: true, change: false };
      break;
    default:
      return state;
      break;
  }
};

export default OtpReducer;
