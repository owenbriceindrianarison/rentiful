'use client'

import { Authenticator } from '@aws-amplify/ui-react'

export default function SigninPage() {
    return (
        <div className='my-auto h-screen'>
            <Authenticator initialState='signIn' />
        </div>
    )
}
