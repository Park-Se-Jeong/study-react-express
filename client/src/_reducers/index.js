import { combineReducers } from "redux";
import user from "./user_reducer";

const rootReducer = combineReducers({
  user,
  
});

export default rootReducer;

// store가 있으면, reducer들이 여러가지 있을 수 있다. 왜? 리듀서 안에서 하는 일이, state가 변화하는 걸 보여준 다음 그 변한 값을 리턴해주는 것.
// 유저, 구독, 댓글, 글 쓰기 등 이런 state가 있을 수 있으니, reducer도 다 나눠져 있는데, combineReducers를 통해서
// rootReducer에서 하나로 합쳐주는 것이다.
// login, register, 인증 기능 만들건데, 그때 우리는 user_reducer를 만들거고, comment 기능을 만든다고 하면, comment_reducer를 만들겠지.
// 요것도 넣어줘서, rootReducer를 합쳐주겠지. 기능이 많아질수록, rootReducer 내부의 내용은 길어질거임.
