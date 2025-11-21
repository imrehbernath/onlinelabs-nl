'use client';

import Image from 'next/image';
import Link from 'next/link';

// Author data mapping
const authors = {
  'imre-bernath': {
    name: 'Imre Bernáth',
    slug: 'imre-bernath',
    title: 'SEO & AI Visibility Specialist',
    bio: 'Imre Bernáth is SEO & AI Visibility Specialist en oprichter van OnlineLabs. Sinds 2000 is hij actief in de online wereld en richtte in 2008 SEOlab op – een van de eerste gespecialiseerde SEO-bureaus in Nederland. Met meer dan 15 jaar ervaring helpt hij bedrijven groeien via strategische campagnes voor vindbaarheid, content en digitale innovatie. Imre combineert zijn SEO-expertise met een scherpe visie op de rol van AI in moderne marketing.',
    image: 'https://gravatar.com/avatar/35c26275319f1c247e76cd36518ee34a?size=256',
    linkedin: 'https://nl.linkedin.com/in/imrebernath',
  },
  'colin-dijkstra': {
    name: 'Colin Dijkstra',
    slug: 'colin-dijkstra',
    title: 'Allround Online Marketeer bij OnlineLabs',
    bio: 'Colin Dijkstra is online marketeer bij OnlineLabs, gespecialiseerd in SEO & AI visibility. Hij helpt bedrijven gevonden te worden in Google én door AI-assistenten. Hij creëert waardevolle, gestructureerde content die klanten zichtbaar maakt, nu én in de toekomst.',
    image: 'https://wordpress-988065-5984089.cloudwaysapps.com/wp-content/uploads/2025/11/Colin-Dijkstra-online-marketeer.webp',
    linkedin: 'https://nl.linkedin.com/in/colin-dijkstra-830b8823a',
  },
};

// Convert WordPress author name to slug
function getAuthorSlug(authorName) {
  if (!authorName) return 'imre-bernath';
  
  const nameMap = {
    'Imre Bernáth': 'imre-bernath',
    'Imre Bernath': 'imre-bernath',
    'Colin Dijkstra': 'colin-dijkstra',
  };
  
  return nameMap[authorName] || 'imre-bernath';
}

export default function AuthorBio({ authorName }) {
  const authorSlug = getAuthorSlug(authorName);
  const author = authors[authorSlug] || authors['imre-bernath'];

  return (
    <section className="bg-white rounded-xl p-6 lg:p-8 shadow-lg">
      {/* Header met Social Links */}
      <div className="flex items-center justify-between mb-6">
        <p className="font-serif text-xl font-bold text-gray-900">Over de auteur</p>
        <a
          href={author.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-100 hover:bg-[#376eb5] transition-all duration-200 group"
          aria-label={`LinkedIn profiel van ${author.name}`}
        >
          <svg className="w-5 h-5 text-gray-600 group-hover:text-white transition-colors" fill="currentColor" viewBox="0 0 24 24">
            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
          </svg>
        </a>
      </div>

      {/* Author Card */}
      <div className="flex flex-col sm:flex-row gap-5">
        {/* Avatar */}
        <Link href={`/auteur/${author.slug}`} className="flex-shrink-0 group">
          <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-xl overflow-hidden shadow-lg">
            <Image
              src={author.image}
              alt={author.name}
              fill
              className="object-cover"
              sizes="(max-width: 640px) 96px, 112px"
            />
          </div>
        </Link>

        {/* Bio Content */}
        <div className="flex-1">
          <Link href={`/auteur/${author.slug}`} className="group">
            <p className="text-lg font-bold text-gray-900 group-hover:text-[#376eb5] transition-colors">
              {author.name}
            </p>
          </Link>
          <p className="text-sm text-[#376eb5] font-medium mb-3">
            {author.title}
          </p>
          
          <p className="text-gray-600 text-sm leading-relaxed mb-4">
            {author.bio}
          </p>

          {/* CTA */}
          <Link 
            href={`/auteur/${author.slug}`}
            className="inline-flex items-center gap-2 text-[#376eb5] hover:text-[#2d5a94] font-semibold text-sm group"
          >
            Meer over {author.name.split(' ')[0]}
            <span className="group-hover:translate-x-1 transition-transform">→</span>
          </Link>
        </div>
      </div>
    </section>
  );
}