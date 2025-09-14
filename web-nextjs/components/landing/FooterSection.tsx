import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
    faFacebook,
    faTwitter,
    faInstagram,
    faLinkedin,
    faYoutube,
} from '@fortawesome/free-brands-svg-icons'

import { Link } from '@/i18n/navigation'

export function FooterSection() {
    return (
        <footer className='border-t border-gray-200 py-20'>
            <div className='mx-auto max-w-4xl px-6 sm:px-8'>
                <div className='flex flex-col items-center justify-between md:flex-row'>
                    <div className='mb-4'>
                        <Link
                            href='/'
                            className='text-xl font-bold'
                            scroll={false}
                        >
                            RENTIFUL
                        </Link>
                    </div>
                    <nav className='mb-4'>
                        <ul className='flex space-x-6'>
                            <li>
                                <Link href='/about'>About Us</Link>
                            </li>
                            <li>
                                <Link href='/contact'>Contact Us</Link>
                            </li>
                            <li>
                                <Link href='/faq'>FAQ</Link>
                            </li>
                            <li>
                                <Link href='/privacy'>Privacy Policy</Link>
                            </li>
                            <li>
                                <Link href='/terms'>Terms of Service</Link>
                            </li>
                        </ul>
                    </nav>
                    <div className='mb-4 flex space-x-4'>
                        <a
                            href='https://www.facebook.com/rentiful'
                            aria-label='Facebook'
                            className='hover:text-primary-600'
                        >
                            <FontAwesomeIcon
                                icon={faFacebook}
                                className='h-6 w-6'
                            />
                        </a>

                        <a
                            href='https://www.twitter.com/rentiful'
                            aria-label='Twitter'
                            className='hover:text-primary-600'
                        >
                            <FontAwesomeIcon
                                icon={faTwitter}
                                className='h-6 w-6'
                            />
                        </a>

                        <a
                            href='https://www.instagram.com/rentiful'
                            aria-label='Instagram'
                            className='hover:text-primary-600'
                        >
                            <FontAwesomeIcon
                                icon={faInstagram}
                                className='h-6 w-6'
                            />
                        </a>

                        <a
                            href='https://www.linkedin.com/company/rentiful'
                            aria-label='LinkedIn'
                            className='hover:text-primary-600'
                        >
                            <FontAwesomeIcon
                                icon={faLinkedin}
                                className='h-6 w-6'
                            />
                        </a>
                        <a
                            href='https://www.youtube.com/channel/UC_X_Y_Z'
                            aria-label='YouTube'
                            className='hover:text-primary-600'
                        >
                            <FontAwesomeIcon
                                icon={faYoutube}
                                className='h-6 w-6'
                            />
                        </a>
                    </div>
                </div>
                <div className='mt-8 flex justify-center space-x-4 text-center text-sm text-gray-500 md:space-x-8'>
                    <span>
                        &copy; {new Date().getFullYear()} RENTiful. All rights
                        reserved.
                    </span>
                    <Link href='/privacy'>Privacy Policy</Link>
                    <Link href='/terms'>Terms of Service</Link>
                    <Link href='/cookies'>Cookie Policy</Link>
                </div>
            </div>
        </footer>
    )
}
