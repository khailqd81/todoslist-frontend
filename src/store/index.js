import { useContext } from "react";
import MyConText from "./Context"
export * as actions from "./actions"
export const useStore = () => {
    const [state, dispatch] = useContext(MyConText)
    return [state, dispatch]
}