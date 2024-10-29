import { RefreshTokenResponse } from "../commons/types/responses";
import { httpClient } from ".";

export const refreshAuthToken = async (refreshToken: string): Promise<RefreshTokenResponse> => {
    try {
        const response = await httpClient.put<RefreshTokenResponse>(
            '/api/auth/refresh-token',
            {
                params: { token: refreshToken },
            },
        )

        return response.data
    } catch (e) {
        console.error('failed get refresh token ', e)
        // TODO: error handling
        throw e
    }
}