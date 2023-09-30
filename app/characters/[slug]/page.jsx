/**
Renders a Next.js page component that displays detailed information about a character, including their name, occupations, description, images, skills, and famous quotes.
@component
@param {Object} props - The component props.
@param {Object} props.params - The parameters passed to the page component.
@param {string} props.params.slug - The slug of the character.
@returns {JSX.Element} The rendered page component.
*/

import { Container } from '@/components'
import Image from 'next/image'
import { endpoint } from '@/utils/endpoint'
import { getAllCharacters } from '@/lib/characters'

export const dynamicparams = false

export async function generateStaticParams() {
  const { characters } = await getAllCharacters()
  return characters.map(character => ({ slug: character.slug }))
}

export async function getCharacterBySlug(slug) {
  const data = await fetch(`${endpoint}/characters/${slug}`)

  if (!data.ok) {
    throw new Error('Failed to fetch data')
  }

  return data.json()
}

export default async function Page({ params }) {
  const { chracter } = await getCharacterBySlug(params.slug)

  return (
    <Container className="flex flex-col gap-5 py-5">
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl font-semibold capitalize">{chracter.name}</h1>

        <ul className="flex gap-1 text-sm">
          {chracter.occupations.map((item, index) => {
            return (
              <li
                key={index}
                className="p-2 text-gray-300 bg-gray-800 rounded-md"
              >
                {item}
              </li>
            )
          })}
        </ul>
      </div>
      <p className="text-sm leading-6">{chracter.description}</p>
      <ul className="grid gap-2 sm:grid-cols-2">
        {chracter.images.map((image, index) => {
          return (
            <li
              key={index}
              className="relative flex overflow-hidden bg-gray-900 rounded-xl"
            >
              <Image
                src={image}
                alt=""
                width={760}
                height={435}
                className="transition-all duration-500 hover:scale-110 hover:rotate-2"
              />
            </li>
          )
        })}
      </ul>
      {chracter.skills && (
        <>
          <h2 className="text-xl font-bold">Power & Skills</h2>
          <ul className="flex flex-wrap gap-1">
            {chracter.skills.map((item, index) => {
              return (
                <li
                  key={index}
                  className="flex justify-center flex-grow px-2 py-1 text-orange-400 rounded-full bg-orange-950"
                >
                  {item}
                </li>
              )
            })}
          </ul>
        </>
      )}
      {/* {character_quote && (
        <>
          <h2>Famous Qoutes</h2>
          <ul>
            {character_quote.map((item, idx) => {
              return <li key={idx}>{item.qoute}</li>
            })}
          </ul>
        </>
      )} */}
    </Container>
  )
}
