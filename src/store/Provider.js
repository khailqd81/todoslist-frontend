import { useReducer } from "react";
import MyConText from "./Context";
import reducer, { initialState } from "./reducers";
function MyProvider({ children }) {
    const [state, dispatch] = useReducer(reducer, initialState);
    return (
        <MyConText.Provider value={[state, dispatch]}>
            {children}
        </MyConText.Provider>
    )
}

export default MyProvider;
