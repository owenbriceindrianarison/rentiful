import { Link } from '@/i18n/navigation'
import Image from 'next/image'

interface Props {
    imageSrc: string
    title: string
    description: string
    linkText: string
    linkHref: string
}

export function FeaturedCard({
    imageSrc,
    title,
    description,
    linkText,
    linkHref,
}: Props) {
    return (
        <div className='text-center'>
            <div className='mb-4 flex h-48 items-center justify-center rounded-lg p-4'>
                <Image
                    src={imageSrc}
                    alt={title}
                    width={400}
                    height={400}
                    className='h-full w-full object-contain'
                />
            </div>
            <h3 className='mb-2 text-xl font-semibold'>{title}</h3>
            <p className='mb-4'>{description}</p>
            <Link
                href={linkHref}
                className='inline-block rounded border border-gray-300 px-4 py-2 hover:bg-gray-100'
                scroll={false}
            >
                {linkText}
            </Link>
        </div>
    )
}
