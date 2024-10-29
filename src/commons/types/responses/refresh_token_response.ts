import { z } from 'zod'

export const refreshTokenResponseSchema = z.object({
    token: z.string(),
})

export type RefreshTokenResponse = z.infer<typeof refreshTokenResponseSchema>