import React from 'react'

const content = {
  hero: 'Meet your next assistant to a better learning experience.',
}

export default async function LandingPage() {
  return (
    <article>
      <section>
        <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">{content.hero}</h1>
      </section>
    </article >
  )
}
