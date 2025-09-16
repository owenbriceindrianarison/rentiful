import { Manager, Tenant } from '@/types/prismaTypes'
import {
    createApi,
    fetchBaseQuery,
    FetchArgs,
} from '@reduxjs/toolkit/query/react'
import type {
    BaseQueryApi,
    FetchBaseQueryError,
    FetchBaseQueryMeta,
    QueryReturnValue,
} from '@reduxjs/toolkit/query'
import { fetchAuthSession, getCurrentUser } from 'aws-amplify/auth'

type AmplifyUser = Awaited<ReturnType<typeof getCurrentUser>>

export type GetAuthUserResult = {
    cognitoInfo: AmplifyUser
    userInfo: Tenant | Manager
    userRole: 'manager' | 'tenant' | string
}

export const api = createApi({
    baseQuery: fetchBaseQuery({
        baseUrl: process.env.NEXT_PUBLIC_API_BASE_URL,
        prepareHeaders: async (headers) => {
            const session = await fetchAuthSession()
            const { idToken } = session.tokens ?? {}
            if (idToken)
                headers.set('Authorization', `Bearer ${idToken.toString()}`)

            return headers
        },
    }),
    reducerPath: 'api',
    tagTypes: [],
    endpoints: (build) => ({
        getAuthUser: build.query<GetAuthUserResult, void>({
            // NOTE: respecter la signature et le type de retour
            queryFn: async (
                _arg: void,
                _api: BaseQueryApi,
                _extra: {},
                fetchWithBQ: (
                    arg: string | FetchArgs,
                ) => Promise<
                    QueryReturnValue<
                        unknown,
                        FetchBaseQueryError,
                        FetchBaseQueryMeta
                    >
                >,
            ): Promise<
                QueryReturnValue<
                    GetAuthUserResult,
                    FetchBaseQueryError,
                    FetchBaseQueryMeta
                >
            > => {
                try {
                    const session = await fetchAuthSession()
                    const { idToken } = session.tokens ?? {}
                    const user = await getCurrentUser()
                    const userRole =
                        (idToken?.payload['custom:role'] as string) ?? 'tenant'

                    const endpoint =
                        userRole === 'manager'
                            ? `/managers/${user.userId}`
                            : `/tenants/${user.userId}`

                    const res = await fetchWithBQ(endpoint)

                    if (res.error) {
                        // retourner l’erreur telle quelle, typée correctement
                        return { error: res.error }
                    }

                    return {
                        data: {
                            cognitoInfo: user,
                            userInfo: res.data as Tenant | Manager,
                            userRole,
                        },
                    }
                } catch (e: unknown) {
                    // Construire un FetchBaseQueryError valide
                    const fbqe: FetchBaseQueryError =
                        e instanceof Error
                            ? { status: 'CUSTOM_ERROR', error: e.message }
                            : {
                                  status: 'CUSTOM_ERROR',
                                  error: 'Could not fetch user data',
                              }

                    return { error: fbqe }
                }
            },
        }),
    }),
})

export const {} = api
