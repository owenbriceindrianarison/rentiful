'use client'

import { Authenticator } from '@aws-amplify/ui-react'

export default function SignupPage() {
    return (
        <div className='my-auto h-screen'>
            <Authenticator initialState='signUp' />
        </div>
    )
}
