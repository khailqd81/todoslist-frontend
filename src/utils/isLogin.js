import axios from "axios";

async function isLogin() {
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken) {
        const response = await axios.get(`${process.env.REACT_APP_BACKEND_API}/account/is-signin`, {
            headers: {
                authorization: accessToken
            }
        })
        if (response.status === 200) {
            return {
                accessToken: accessToken,
                login_state: true
            }
        }
    }
    return {
        accessToken: "",
        login_state: false
    }
}

export default isLogin
