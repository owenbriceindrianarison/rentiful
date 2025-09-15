import React, { useEffect } from 'react'
import { Amplify } from 'aws-amplify'
import {
    Authenticator,
    Heading,
    Radio,
    RadioGroupField,
    useAuthenticator,
    View,
} from '@aws-amplify/ui-react'
import '@aws-amplify/ui-react/styles.css'
import { usePathname, useRouter } from '@/i18n/navigation'

// https://docs.amplify.aws/gen1/javascript/tools/libraries/configure-categories/
Amplify.configure({
    Auth: {
        Cognito: {
            userPoolId: process.env.NEXT_PUBLIC_AWS_COGNITO_USER_POOL_ID!,
            userPoolClientId:
                process.env.NEXT_PUBLIC_AWS_COGNITO_USER_POOL_CLIENT_ID!,
        },
    },
})

const components = {
    Header() {
        return (
            <View className='mt-4 mb-7'>
                <Heading level={3} className='!text-2xl !font-bold'>
                    RENT
                    <span className='text-secondary-500 hover:text-primary-300 font-light'>
                        IFUL
                    </span>
                </Heading>
                <p className='text-muted-foreground mt-2'>
                    <span className='font-bold'>Welcome!</span> Please sign in
                    to continue
                </p>
            </View>
        )
    },

    SignIn: {
        Footer() {
            const { toSignUp } = useAuthenticator()

            return (
                <View className='mt-4 text-center'>
                    <p className='text-muted-foreground'>
                        Don't have an account?{' '}
                        <button
                            onClick={toSignUp}
                            className='text-primary bg-ytransparent hover:underline'
                        >
                            Sign up here
                        </button>
                    </p>
                </View>
            )
        },
    },

    SignUp: {
        FormFields() {
            const { validationErrors } = useAuthenticator()

            return (
                <>
                    <Authenticator.SignUp.FormFields />
                    <RadioGroupField
                        legend='Role'
                        name='custom:role'
                        errorMessage={validationErrors?.['custom:role']}
                        hasError={!!validationErrors?.['custom:role']}
                        isRequired
                    >
                        <Radio value='tenant'>Tenant</Radio>
                        <Radio value='manager'>Manager</Radio>
                    </RadioGroupField>
                </>
            )
        },

        Footer() {
            const { toSignIn } = useAuthenticator()

            return (
                <View className='mt-4 text-center'>
                    <p className='text-muted-foreground'>
                        Already have an account?{' '}
                        <button
                            onClick={toSignIn}
                            className='text-primary bg-ytransparent hover:underline'
                        >
                            Sign in
                        </button>
                    </p>
                </View>
            )
        },
    },
}

const formFields = {
    signIn: {
        username: {
            placeholder: 'Enter your email',
            label: 'Email',
            isRequired: true,
        },
        password: {
            placeholder: 'Enter your password',
            label: 'Password',
            isRequired: true,
        },
    },
    signUp: {
        username: {
            order: 1,
            placeholder: 'Choose your username',
            label: 'Username',
            isRequired: true,
        },
        email: {
            order: 2,
            placeholder: 'Enter your email',
            label: 'Email',
            isRequired: true,
        },
        password: {
            order: 3,
            placeholder: 'Create a password',
            label: 'Password',
            isRequired: true,
        },
        confirm_password: {
            order: 4,
            placeholder: 'Confirm your password',
            label: 'Confirm Password',
            isRequired: true,
        },
    },
}

export function Auth({ children }: { children: React.ReactNode }) {
    const {
        user,
        route: routeAws,
        authStatus,
    } = useAuthenticator((context) => [
        context.user,
        context.route,
        context.authStatus,
    ])
    const router = useRouter()
    const pathname = usePathname()

    // const isAuthPage = pathname.match(new RegExp(`^/(signin|signup)`))
    const isAuthPage = routeAws === 'signIn' || 'signUp'

    const isDashboardPage =
        pathname.startsWith(`/manager`) || pathname.startsWith(`/tenants`)

    // Redirect authenticated users away from auth pages
    useEffect(() => {
        if (isAuthPage && authStatus === 'authenticated') {
            router.push('/')
        }
    }, [authStatus, isAuthPage, routeAws])

    // Allow access to public page without authentication
    if (authStatus === 'unauthenticated' && !isDashboardPage) {
        return <>{children}</>
    }

    return (
        <div className='my-auto h-screen'>
            <Authenticator
                initialState={routeAws === 'signUp' ? 'signUp' : 'signIn'}
                components={components}
                formFields={formFields}
            >
                {() => <>{children}</>}
            </Authenticator>
        </div>
    )
}
