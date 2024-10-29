import { create } from "zustand";
import { User } from "../commons/types";
import { removeHeaderToken, setHeaderToken } from "../api";
import { User as FirebaseUser } from "firebase/auth";

export enum AppStatus { authenticating, authenticated, unauthenticated }

interface AppState {
    status: AppStatus,
    user: User | null,
    update: (firebaseUser: FirebaseUser | null) => void
    logout: () => void
}

export const useApp = create<AppState>()(
    (set) => ({
        status: AppStatus.authenticating,
        user: null,
        update: async (firebaseUser: FirebaseUser | null) => {
            set({ status: AppStatus.authenticating })
            if (!firebaseUser) {
                return set({
                    status: AppStatus.unauthenticated,
                    user: null,
                });
            }

            // For access.
            const token = await firebaseUser.getIdToken()
            setHeaderToken(token)

            return set({
                status: AppStatus.authenticated,
                user: {
                    id: firebaseUser.uid,
                    name: firebaseUser.displayName ?? 'Unknown User',
                    photo: firebaseUser.photoURL,
                }
            });
        },
        logout: () => {
            removeHeaderToken()
            return set({ status: AppStatus.unauthenticated, user: null });
        },
    }),
)