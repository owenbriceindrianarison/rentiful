import Image from 'next/image'
import { useTranslations } from 'next-intl'
import { Link } from '@/i18n/navigation'
import { Button } from '@/components/ui/button'
import { NAVBAR_HEIGHT } from '@/lib/constants'

export function Navbar() {
    const t = useTranslations('landing.navbar')

    return (
        <div
            className='bg-primary-700 fixed top-0 left-0 z-50 w-full shadow-xl'
            style={{
                height: `${NAVBAR_HEIGHT}px`,
            }}
        >
            <div className='flex w-full items-center justify-between px-8 py-3 text-white'>
                <div className='flex items-center gap-4 md:gap-6'>
                    <Link
                        href='/'
                        className='hover:text-primary-300 cursor-pointer'
                        scroll={false}
                    >
                        <div className='flex items-center gap-3'>
                            <Image
                                src='/logo.svg'
                                alt='Rentiful Logo'
                                width={24}
                                height={24}
                                className='h-6 w-6'
                            />
                            <div className='text-xl font-bold'>
                                RENT
                                <span className='text-secondary-500 hover:text-secondary-300 font-light'>
                                    IFUL
                                </span>
                            </div>
                        </div>
                    </Link>
                </div>
                <p className='text-primary-200 hidden lg:block'>
                    {t('description')}
                    search
                </p>
                <div className='flex items-center gap-5'>
                    <Link href='/signin'>
                        <Button
                            variant='outline'
                            className='hover:text-primary-700 rounded-lg border-white bg-transparent text-white hover:bg-white'
                        >
                            {t('signIn')}
                        </Button>
                    </Link>
                    <Link href='/signup'>
                        <Button
                            variant='secondary'
                            className='hover:text-primary-700 bg-secondary-600 rounded-lg text-white hover:bg-white'
                        >
                            {t('signUp')}
                        </Button>
                    </Link>
                </div>
            </div>
        </div>
    )
}
