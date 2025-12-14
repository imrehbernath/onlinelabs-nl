'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';

const WP_URL = 'https://wordpress-988065-5984089.cloudwaysapps.com';

// Author avatar mapping
const authorAvatars = {
  'Colin Dijkstra': `${WP_URL}/wp-content/uploads/2025/11/Colin-Dijkstra-online-marketeer.webp`,
  'Adrian Enders': `${WP_URL}/wp-content/uploads/2025/11/Adrian-Enders-Online-marketeer.webp`,
  'Sanne Verschoor': `${WP_URL}/wp-content/uploads/2025/11/Sanne-Verschoor-Webdesigner.webp`,
  'Imre Bernáth': 'https://gravatar.com/avatar/35c26275319f1c247e76cd36518ee34a?size=128',
  'Imre Bernath': 'https://gravatar.com/avatar/35c26275319f1c247e76cd36518ee34a?size=128',
  'Zara Fung': `${WP_URL}/wp-content/uploads/2025/11/Zara-Fung.webp`,
  'Elsa Heijnen': `${WP_URL}/wp-content/uploads/2025/11/Elsa-Heijnen.webp`,
  'Nikky de Ridder': `${WP_URL}/wp-content/uploads/2025/11/Nikky-de-Ridder.webp`,
};

/**
 * BlogSection Component - 3 Equal Columns
 * 
 * Clean, symmetrical 3-column blog grid
 * All posts get equal visual weight
 */
export default function BlogSection({ posts = [], title = "Laatste Inzichten" }) {
  
  if (!posts || posts.length === 0) {
    return null;
  }

  const displayPosts = posts.slice(0, 3);

  // Calculate relative time
  const getRelativeTime = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInDays = Math.floor((now - date) / (1000 * 60 * 60 * 24));
    
    if (diffInDays === 0) return 'Vandaag';
    if (diffInDays === 1) return 'Gisteren';
    if (diffInDays < 7) return `${diffInDays} dagen geleden`;
    if (diffInDays < 30) return `${Math.floor(diffInDays / 7)} ${Math.floor(diffInDays / 7) === 1 ? 'week' : 'weken'} geleden`;
    return date.toLocaleDateString('nl-NL', { day: 'numeric', month: 'long', year: 'numeric' });
  };

  // Get initials from name
  const getInitials = (name) => {
    if (!name) return 'OL';
    return name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase();
  };

  // Avatar component with fallback
  const AuthorAvatar = ({ author }) => {
    const [imageError, setImageError] = useState(false);
    
    // Support both data structures: author.name OR author.node.name
    const authorName = author?.name || author?.node?.name;
    
    // Gebruik mapping als beschikbaar, anders fallback naar author.avatar
    const avatarUrl = authorAvatars[authorName] || author?.avatar || author?.node?.avatar?.url;
    const hasValidAvatar = avatarUrl && !imageError;

    if (hasValidAvatar) {
      return (
        <Image
          src={avatarUrl}
          alt={authorName || 'Auteur'}
          width={40}
          height={40}
          className="rounded-full ring-2 ring-gray-100 flex-shrink-0"
          onError={() => setImageError(true)}
        />
      );
    }

    // Fallback: initialen
    return (
      <div className="w-10 h-10 rounded-full ring-2 ring-gray-100 bg-primary/10 text-primary font-bold text-sm flex items-center justify-center flex-shrink-0">
        {getInitials(authorName)}
      </div>
    );
  };

  // Blog Card Component - Equal size for all
  const BlogCard = ({ post }) => (
    <Link 
      href={`/blog/${post.slug}`}
      className="group relative block overflow-hidden rounded-xl bg-white shadow-md hover:shadow-2xl transition-all duration-300 h-full flex flex-col"
    >
      {/* Image */}
      <div className="relative h-64 overflow-hidden bg-gray-100 flex-shrink-0">
        {post.featuredImage?.sourceUrl ? (
          <>
            <Image
              src={post.featuredImage.sourceUrl}
              alt={post.featuredImage.altText || post.title}
              fill
              className="object-cover group-hover:scale-110 transition-transform duration-500"
              sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-gray-900/70 to-transparent" />
          </>
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-primary/80 to-primary-dark" />
        )}
        
        {/* Category Badge */}
        {post.categories?.[0] && (
          <div className="absolute top-4 left-4 z-10">
            <span className="inline-block px-3 py-1.5 bg-white/95 backdrop-blur-sm text-primary text-xs font-bold rounded-lg shadow-md">
              {post.categories[0]}
            </span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-6 flex-1 flex flex-col">
        <h3 className="font-serif text-2xl font-bold text-gray-900 mb-3 line-clamp-2 leading-tight group-hover:text-primary transition-colors duration-200">
          {post.title}
        </h3>
        
        {post.excerpt && (
          <p className="text-sm text-gray-600 mb-6 line-clamp-3 leading-relaxed flex-1">
            {post.excerpt}
          </p>
        )}

        {/* Author + Meta */}
        <div className="flex items-center gap-3 pt-4 border-t border-gray-100 mt-auto">
          <AuthorAvatar author={post.author} />
          <div className="flex-1 min-w-0">
            <div className="text-sm font-semibold text-gray-900 truncate">
              {post.author?.name || post.author?.node?.name || 'OnlineLabs'}
            </div>
            <div className="text-xs text-gray-500">{getRelativeTime(post.date)} • {post.readingTime || 5} min leestijd</div>
          </div>
          
          {/* Arrow Icon */}
          <div className="text-primary opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-200">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </div>
        </div>
      </div>
    </Link>
  );

  return (
    <section className="py-20 lg:py-28" style={{ backgroundColor: '#F3F4F6' }}>
      <div className="container mx-auto px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between mb-12 lg:mb-16">
          <div className="mb-6 lg:mb-0">
            <h2 className="font-serif text-4xl lg:text-5xl font-bold text-gray-900 mb-3">
              {title}
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl">
              Praktische tips en inzichten over online marketing, SEO en GEO
            </p>
          </div>
          
          <Link 
            href="/blog"
            className="group inline-flex items-center gap-2 text-primary font-semibold text-lg hover:gap-3 transition-all duration-200"
          >
            <span>Alle artikelen</span>
            <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>

        {/* 3-Column Grid - Equal Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
          {displayPosts.map((post) => (
            <BlogCard key={post.id || post.slug} post={post} />
          ))}
        </div>

      </div>
    </section>
  );
}