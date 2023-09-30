/**
 * Retrieves a character and their associated quotes based on the provided slug.
 *
 * @param {Object} req - The request object.
 * @param {Object} params - The route parameters.
 * @param {string} params.slug - The slug of the character.
 *
 * @returns {Promise<Object>} A promise that resolves to an object containing the character and their quotes, or an error response.
 */

import characters from '@/data/characters.json'
import qoutes from '@/data/qoutes.json'

import { NextResponse } from 'next/server'

export async function GET(req, { params }) {
  try {
    const chracter = characters.data.find(item => item.slug === params.slug)

    if (!chracter) {
      return new NextResponse('not found', { status: 404 })
    }

    const character_quote = qoutes.data.filter(
      item => item.chracter_id === chracter.id,
    )

    return NextResponse.json({
      chracter,
      character_quote: character_quote.length > 0 ? character_quote : null,
    })
  } catch (error) {
    return new NextResponse('internal server error', { status: 500 })
  }
}
