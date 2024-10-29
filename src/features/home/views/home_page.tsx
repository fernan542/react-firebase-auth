import { signOut } from "firebase/auth"
import { useApp } from "../../../stores/useApp"
import { auth } from "../../../firebase_options"
import { httpClient } from "../../../api"

export const HomePage = () => {
    const user = useApp((state) => state.user)
    const logout = useApp((state) => state.logout)
    const accessToken = httpClient.defaults.headers.common.Authorization;

    return <>
        <h1>{user?.id}</h1>
        <h3>{user?.name}</h3>
        {user?.photo && <img src={user.photo} alt="My Photo" />}
        <p>Token: {accessToken}</p>
        
        <br />
        <button
            onClick={async () => {
                await signOut(auth)
                logout()
            }}
        >
            Sign Out
        </button></>
}