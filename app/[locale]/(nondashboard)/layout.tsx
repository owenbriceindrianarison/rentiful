import { Navbar } from '@/components/Navbar'
import { NAVBAR_HEIGHT } from '@/lib/constants'

export default function NonDashboardLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <div className='h-full w-full'>
            <Navbar />
            <main
                className='flex h-full w-full flex-col'
                style={{
                    paddingTop: `${NAVBAR_HEIGHT}px`,
                }}
            >
                {children}{' '}
            </main>
        </div>
    )
}
