import { GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";
import { auth, googleAuthProvider } from "../../../firebase_options";
import { useApp } from "../../../stores/useApp";

export const LoginPage = () => {
    const appState = useApp()

    return (
        <>
            <h1>Firebase Auth</h1>
            <button
                onClick={async () => {
                    await signInWithPopup(auth, googleAuthProvider)
                        .then().catch((error) => {
                            // Handle Errors here.
                            const errorCode = error.code;
                            const errorMessage = error.message;
                            // The email of the user's account used.
                            const email = error.customData?.email;
                            // The AuthCredential type that was used.
                            const credential = GoogleAuthProvider.credentialFromError(error);
                            console.log(errorCode, errorMessage, email, credential)
                        });
                }}
            >
                Sign In
            </button>
            <button
                onClick={async () => {
                    await signOut(auth)
                    appState.logout()
                }}
            >
                Sign Out
            </button>
        </>
    )
}