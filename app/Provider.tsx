import { NextIntlClientProvider } from 'next-intl'

export default function Provider({ children }: { children: React.ReactNode }) {
    return <NextIntlClientProvider>{children}</NextIntlClientProvider>
}
