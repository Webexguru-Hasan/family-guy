/**
Renders a Next.js page component that displays a quiz introduction with an image and a link to start the quiz.
@component
@returns {JSX.Element} The rendered page component.
*/

import { Container } from '@/components'
import Image from 'next/image'
import Link from 'next/link'
import { endpoint } from '@/utils/endpoint'
import { TbArrowBigRightFilled } from 'react-icons/tb'

export async function getRandomQuizQuestion() {
  const data = await fetch(`${endpoint}/quiz/random`, { cache: 'no-store' })

  if (!data.ok) {
    throw new Error('failed to fetch data')
  }
  return data.json()
}
export default async function Page() {
  const data = await getRandomQuizQuestion()
  return (
    <main className="bg-black h-screen">
      <Container className="flex flex-col gap-5 py-5 md:flex-row-reverse md:justify-betwee">
        <div className="relative overflow-hidden rounded-2xl">
          <div className="md:w-[24rem]">
            <Image src="/wallpaper.jpg" alt="" width={700} height={500} />
          </div>
          <div></div>
        </div>

        <div className="md:w-[50%] flex flex-col gap-5">
          <h1 className="text-2xl font-semibold text-white">Family guy Quiz</h1>
          <p className="text-sm leading-6 text-gray-300">
            Take this quiz to find out how much you know about the hit animated
            sitcom Family Guy. Test your knowledge of the characters, the
            episodes, and the show&apos;s many pop culture references.
          </p>

          <Link
            href={`/quiz/${data.randomQuestion}`}
            className="flex items-center justify-center gap-1 px-5 py-4 font-semibold text-orange-500 transition-colors rounded-md outline duration-600 hover:bg-orange-950"
          >
            <TbArrowBigRightFilled className="text-lg" />
            Take a quiz now
          </Link>
        </div>
      </Container>
    </main>
  )
}
