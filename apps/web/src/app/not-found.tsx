import Image from 'next/image'
import { Button } from "@/components/ui/button";
import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Página não encontrada | Chuva & Safra',
  description: 'A página solicitada não foi encontrada.',
}
const Error = () => {
  return (
    <main className='flex min-h-dvh items-center justify-center bg-background px-4 py-8'>
        <div className='mx-auto max-w-xl text-center'>
          <Image
            src={'/images/backgrounds/errorimg.svg'}
            alt='Página não encontrada'
            className='mx-auto mb-4 h-auto max-w-full'
            width={400}
            height={300}
          />
          <h1 className='mb-6 text-3xl text-foreground md:text-4xl'>Opps!!!</h1>
          <h6 className='text-lg text-muted-foreground md:text-xl'>
            This page you are looking for could not be found.
          </h6>
          <Button
            asChild
            className="mt-6 mx-auto"
          >
            <Link href="/">
              Go Back to Home
            </Link>
          </Button>
        </div>
    </main>
  )
}

export default Error
