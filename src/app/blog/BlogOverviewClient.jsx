'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function BlogOverviewClient({ posts, categories }) {
  const [activeFilter, setActiveFilter] = useState('all');

  // Main categories - clean labels
  const mainCategories = [
    { name: 'Alle', slug: 'all' },
    { name: 'SEO', slug: 'seo' },
    { name: 'Webdesign', slug: 'webdesign' },
    { name: 'WordPress', slug: 'wordpress' },
    { name: 'AI', slug: 'ai' },
    { name: 'Marketing', slug: 'online-marketing' },
    { name: 'Conversie', slug: 'conversie' },
  ];

  // Filter posts based on active category with keyword matching
  const filteredPosts = activeFilter === 'all' 
    ? posts 
    : posts.filter(post => {
        const postCategories = post.categories?.nodes?.map(cat => cat.slug.toLowerCase()) || [];
        const postTitle = post.title?.toLowerCase() || '';
        
        if (activeFilter === 'seo') {
          return postCategories.includes('seo') || 
                 postTitle.includes('seo') || 
                 postTitle.includes('zoekwoord') ||
                 postTitle.includes('linkbuilding') ||
                 postTitle.includes('vindbaarheid');
        }
        if (activeFilter === 'webdesign') {
          return postCategories.includes('webdesign') || 
                 postTitle.includes('webdesign') || 
                 postTitle.includes('website') ||
                 postTitle.includes('user experience') ||
                 postTitle.includes('ux');
        }
        if (activeFilter === 'wordpress') {
          return postCategories.includes('wordpress') || 
                 postTitle.includes('wordpress');
        }
        if (activeFilter === 'ai') {
          return postCategories.includes('ai') || 
                 postTitle.includes('chatgpt') || 
                 postTitle.includes('ai') ||
                 postTitle.includes('kunstmatige intelligentie');
        }
        if (activeFilter === 'online-marketing') {
          return postCategories.includes('online-marketing') || 
                 postTitle.includes('marketing');
        }
        if (activeFilter === 'conversie') {
          return postCategories.includes('conversie') || 
                 postTitle.includes('conversie') ||
                 postTitle.includes('converterende');
        }
        
        return postCategories.includes(activeFilter);
      });

  // Get featured post (most recent)
  const featuredPost = filteredPosts[0];
  const remainingPosts = filteredPosts.slice(1);

  return (
    <>
      {/* Filter Navigation - White background */}
      <section className="bg-white py-8">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex flex-wrap gap-2 justify-center">
            {mainCategories.map((category) => (
              <button
                key={category.slug}
                onClick={() => setActiveFilter(category.slug)}
                className={`px-4 py-2 text-sm font-medium transition-all duration-300 rounded-full ${
                  activeFilter === category.slug
                    ? 'bg-[#376eb5] text-white shadow-md'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {category.name}
              </button>
            ))}
          </nav>
        </div>
      </section>

      {/* Featured Article - Gray background */}
      {featuredPost && (
        <section className="py-16 lg:py-20" style={{ backgroundColor: '#F9FAFB' }}>
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <Link href={`/blog/${featuredPost.slug}`} className="group block">
              <article className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
                {/* Image */}
                <div className="relative aspect-[16/10] rounded-xl overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.15)]">
                  {featuredPost.featuredImage?.node?.sourceUrl ? (
                    <Image
                      src={featuredPost.featuredImage.node.sourceUrl}
                      alt={featuredPost.featuredImage.node.altText || featuredPost.title}
                      fill
                      priority
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                      sizes="(max-width: 1024px) 100vw, 50vw"
                    />
                  ) : (
                    <div className="w-full h-full bg-white flex items-center justify-center">
                      <span className="text-gray-400 text-sm">Geen afbeelding</span>
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="lg:py-4">
                  {/* Label */}
                  <p className="text-sm font-medium tracking-wider text-[#376eb5] uppercase mb-4">
                    Uitgelicht
                  </p>

                  {/* Title */}
                  <h2 className="font-serif text-3xl lg:text-4xl font-bold text-gray-900 mb-4 group-hover:text-[#376eb5] transition-colors duration-300 leading-tight">
                    {featuredPost.title}
                  </h2>

                  {/* Excerpt */}
                  <div 
                    className="text-gray-600 text-lg leading-relaxed mb-6 line-clamp-3"
                    dangerouslySetInnerHTML={{ 
                      __html: featuredPost.excerpt?.replace(/<[^>]*>/g, '') || '' 
                    }}
                  />

                  {/* Meta */}
                  <div className="flex items-center gap-3 mb-6">
                    {featuredPost.categories?.nodes?.[0] && (
                      <span className="text-gray-500 text-sm">
                        {featuredPost.categories.nodes[0].name}
                      </span>
                    )}
                    <span className="text-gray-300">•</span>
                    <time className="text-gray-500 text-sm">
                      {new Date(featuredPost.date).toLocaleDateString('nl-NL', {
                        day: 'numeric',
                        month: 'long',
                        year: 'numeric'
                      })}
                    </time>
                  </div>

                  {/* Read More */}
                  <span className="inline-flex items-center gap-2 text-[#376eb5] font-semibold group-hover:gap-3 transition-all">
                    Lees artikel
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </span>
                </div>
              </article>
            </Link>
          </div>
        </section>
      )}

      {/* Articles Grid - Beige background */}
      {remainingPosts.length > 0 && (
        <section className="py-16 lg:py-20" style={{ backgroundColor: '#FAFAF8' }}>
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            
            {/* Section Header */}
            <div className="mb-10 lg:mb-12">
              <p className="text-sm font-medium tracking-wider text-[#376eb5] uppercase mb-3">
                Artikelen
              </p>
              <h2 className="font-serif text-3xl lg:text-4xl xl:text-5xl font-bold text-gray-900 leading-tight">
                {activeFilter === 'all' ? 'Recente artikelen' : mainCategories.find(c => c.slug === activeFilter)?.name}
              </h2>
            </div>

            {/* Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
              {remainingPosts.map((post, index) => {
                const isAboveFold = index < 3;
                
                return (
                  <Link
                    key={post.id}
                    href={`/blog/${post.slug}`}
                    className="group block"
                  >
                    <article className="h-full">
                      {/* Image */}
                      <div className="relative aspect-[16/10] rounded-xl overflow-hidden mb-5 shadow-lg group-hover:shadow-xl transition-shadow duration-300">
                        {post.featuredImage?.node?.sourceUrl ? (
                          <Image
                            src={post.featuredImage.node.sourceUrl}
                            alt={post.featuredImage.node.altText || post.title}
                            fill
                            className="object-cover transition-transform duration-500 group-hover:scale-105"
                            loading={isAboveFold ? 'eager' : 'lazy'}
                            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                          />
                        ) : (
                          <div className="w-full h-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
                            <span className="text-gray-400 text-sm">Geen afbeelding</span>
                          </div>
                        )}
                      </div>

                      {/* Content */}
                      <div className="space-y-3">
                        {/* Title */}
                        <h3 className="font-serif text-xl lg:text-2xl font-bold text-gray-900 group-hover:text-[#376eb5] transition-colors duration-300 leading-tight">
                          {post.title}
                        </h3>
                        
                        {/* Client name / Category */}
                        {post.categories?.nodes?.[0] && (
                          <p className="text-gray-500 text-sm">
                            {post.categories.nodes[0].name}
                          </p>
                        )}

                        {/* Result highlight / Date */}
                        <p className="text-[#376eb5] font-medium text-sm">
                          {new Date(post.date).toLocaleDateString('nl-NL', {
                            day: 'numeric',
                            month: 'long',
                            year: 'numeric'
                          })}
                        </p>
                      </div>
                    </article>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* Empty State - Beige background */}
      {filteredPosts.length === 0 && (
        <section className="py-20" style={{ backgroundColor: '#FAFAF8' }}>
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="max-w-md mx-auto">
              <p className="text-gray-900 text-lg font-medium mb-2">
                Geen artikelen gevonden
              </p>
              <p className="text-gray-500 mb-6">
                Er zijn nog geen artikelen in deze categorie.
              </p>
              <button
                onClick={() => setActiveFilter('all')}
                className="inline-flex items-center justify-center px-8 py-4 text-lg text-white font-semibold rounded-lg shadow-lg transition-all duration-300 hover:shadow-xl hover:-translate-y-0.5 bg-[#376eb5] hover:bg-[#2d5a94]"
              >
                Bekijk alle artikelen
              </button>
            </div>
          </div>
        </section>
      )}
    </>
  );
}