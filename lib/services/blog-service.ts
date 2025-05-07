/**
 * Blog Service
 * 
 * This service provides functions to fetch blog data from the database.
 * It uses the database utility functions to interact with Supabase.
 */

import { fetchData, fetchBySlug, fetchBlogPosts } from '@/lib/database';
import { BlogPost } from '@/types/database';
import { fetchUnsplashImages } from '@/lib/utils/context7';

/**
 * Fetches blog posts from the database
 * @param page The page number to fetch
 * @param limit The number of posts per page
 * @returns Blog posts and pagination data
 */
export async function getBlogPosts(page: number = 1, limit: number = 9) {
  try {
    // Calculate the offset based on the page number and limit
    const offset = (page - 1) * limit;
    
    // Fetch blog posts from the database
    const posts = await fetchBlogPosts(limit);
    
    // Fetch total count of published blog posts
    const { data: countData, error: countError } = await fetch('/api/blog/count').then(res => res.json());
    
    if (countError) {
      throw new Error(countError.message);
    }
    
    const totalPosts = countData?.count || posts.length;
    const totalPages = Math.ceil(totalPosts / limit);
    
    // Fetch images from Unsplash for posts without featured images
    const postsWithImages = await Promise.all(posts.map(async (post, index) => {
      if (!post.featured_image_url) {
        const images = await fetchUnsplashImages(
          `${post.title} home improvement`,
          1
        );
        
        return {
          ...post,
          featured_image_url: images[0] || `/placeholder-blog-${index + 1}.jpg`
        };
      }
      
      return post;
    }));
    
    return {
      posts: postsWithImages,
      pagination: {
        currentPage: page,
        totalPages,
        totalPosts,
        hasNextPage: page < totalPages,
        hasPrevPage: page > 1
      }
    };
  } catch (error) {
    console.error('Error fetching blog posts:', error);
    
    // Return placeholder data in case of error
    return {
      posts: [
        {
          id: 1,
          title: 'How to Choose the Right Windows for Your Home',
          slug: 'how-to-choose-the-right-windows-for-your-home',
          excerpt: 'Learn about the different types of windows and how to choose the best ones for your home.',
          content: '<p>When it comes to choosing windows for your home, there are many factors to consider. From style and material to energy efficiency and budget, the right windows can enhance your home\'s appearance, comfort, and value.</p><p>In this guide, we\'ll walk you through the different types of windows available and help you determine which ones are best suited for your specific needs.</p>',
          featured_image_url: '/placeholder-blog-1.jpg',
          author: 'John Smith',
          published_date: new Date().toISOString(),
          is_published: true,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        },
        {
          id: 2,
          title: 'The Benefits of Energy-Efficient Windows',
          slug: 'the-benefits-of-energy-efficient-windows',
          excerpt: 'Discover how energy-efficient windows can save you money and improve your home\'s comfort.',
          content: '<p>Energy-efficient windows are designed to prevent heated or cooled air from escaping your home. They can significantly reduce your energy bills and make your home more comfortable year-round.</p><p>In this article, we\'ll explore the benefits of energy-efficient windows and how they can improve your home\'s energy performance.</p>',
          featured_image_url: '/placeholder-blog-2.jpg',
          author: 'Jane Doe',
          published_date: new Date().toISOString(),
          is_published: true,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        },
        {
          id: 3,
          title: 'Signs It\'s Time to Replace Your Windows',
          slug: 'signs-its-time-to-replace-your-windows',
          excerpt: 'Learn the warning signs that indicate your windows need to be replaced.',
          content: '<p>Windows don\'t last forever, and knowing when to replace them can save you money on energy bills and prevent damage to your home. In this article, we\'ll discuss the signs that indicate it\'s time to replace your windows.</p><p>From drafts and difficult operation to condensation and visible damage, we\'ll help you identify the warning signs that your windows need attention.</p>',
          featured_image_url: '/placeholder-blog-3.jpg',
          author: 'Michael Johnson',
          published_date: new Date().toISOString(),
          is_published: true,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        }
      ],
      pagination: {
        currentPage: page,
        totalPages: 1,
        totalPosts: 3,
        hasNextPage: false,
        hasPrevPage: false
      }
    };
  }
}

/**
 * Fetches a blog post by slug
 * @param slug The slug of the blog post to fetch
 * @returns The blog post
 */
export async function getBlogPostBySlug(slug: string) {
  try {
    const post = await fetchBySlug<BlogPost>('blog_posts', slug);
    
    if (!post) {
      throw new Error(`Blog post with slug ${slug} not found`);
    }
    
    // Fetch image from Unsplash if not available
    if (!post.featured_image_url) {
      const images = await fetchUnsplashImages(
        `${post.title} home improvement`,
        1
      );
      
      post.featured_image_url = images[0] || '/placeholder-blog-post.jpg';
    }
    
    // Fetch related posts
    const relatedPosts = await fetchData<BlogPost>('blog_posts', {
      eq: ['is_published', true],
      limit: 3
    });
    
    // Filter out the current post from related posts
    const filteredRelatedPosts = relatedPosts.filter(relatedPost => relatedPost.id !== post.id);
    
    // Fetch images for related posts if needed
    const relatedPostsWithImages = await Promise.all(filteredRelatedPosts.map(async (relatedPost, index) => {
      if (!relatedPost.featured_image_url) {
        const images = await fetchUnsplashImages(
          `${relatedPost.title} home improvement`,
          1
        );
        
        return {
          ...relatedPost,
          featured_image_url: images[0] || `/placeholder-related-${index + 1}.jpg`
        };
      }
      
      return relatedPost;
    }));
    
    return {
      post,
      relatedPosts: relatedPostsWithImages
    };
  } catch (error) {
    console.error(`Error fetching blog post with slug ${slug}:`, error);
    
    // Return placeholder data in case of error
    const placeholderPost = {
      id: 1,
      title: 'How to Choose the Right Windows for Your Home',
      slug,
      excerpt: 'Learn about the different types of windows and how to choose the best ones for your home.',
      content: '<p>When it comes to choosing windows for your home, there are many factors to consider. From style and material to energy efficiency and budget, the right windows can enhance your home\'s appearance, comfort, and value.</p><p>In this guide, we\'ll walk you through the different types of windows available and help you determine which ones are best suited for your specific needs.</p><h2>Window Styles</h2><p>There are several window styles to choose from, each with its own advantages and aesthetic appeal:</p><ul><li><strong>Double-Hung Windows:</strong> These windows have two sashes that slide up and down, allowing for ventilation from the top, bottom, or both. They\'re easy to clean and are a classic choice for many homes.</li><li><strong>Casement Windows:</strong> Hinged on one side, these windows open outward like a door when you turn a crank. They provide excellent ventilation and are very energy-efficient when closed.</li><li><strong>Sliding Windows:</strong> These windows slide horizontally along tracks, making them easy to operate and ideal for spaces where you don\'t want a window to protrude outward.</li><li><strong>Picture Windows:</strong> These fixed windows don\'t open but provide unobstructed views and allow maximum light into your home.</li><li><strong>Bay and Bow Windows:</strong> These windows project outward from your home, creating additional interior space and offering panoramic views.</li><li><strong>Awning Windows:</strong> Hinged at the top, these windows open outward from the bottom, allowing for ventilation even during light rain.</li></ul><h2>Window Materials</h2><p>The material you choose for your windows affects their appearance, durability, energy efficiency, and maintenance requirements:</p><ul><li><strong>Vinyl:</strong> Affordable, energy-efficient, and low-maintenance, vinyl windows are a popular choice for many homeowners.</li><li><strong>Wood:</strong> Classic and beautiful, wood windows offer excellent insulation but require regular maintenance to prevent rot and decay.</li><li><strong>Fiberglass:</strong> Extremely durable and energy-efficient, fiberglass windows can withstand extreme temperatures and won\'t warp or crack.</li><li><strong>Aluminum:</strong> Lightweight and strong, aluminum windows are ideal for modern homes but are less energy-efficient than other materials.</li><li><strong>Composite:</strong> Made from a combination of materials, composite windows offer the beauty of wood with enhanced durability and less maintenance.</li></ul><h2>Energy Efficiency</h2><p>Energy-efficient windows can significantly reduce your heating and cooling costs. Look for these features:</p><ul><li><strong>ENERGY STAR® Certification:</strong> Windows with this label meet strict energy efficiency guidelines set by the U.S. Environmental Protection Agency.</li><li><strong>Low-E Glass:</strong> This special coating reflects infrared light, keeping heat inside in winter and outside in summer.</li><li><strong>Double or Triple Glazing:</strong> Windows with two or three panes of glass with insulating air or gas in between provide better insulation.</li><li><strong>Gas Fills:</strong> Argon or krypton gas between glass panes improves insulation.</li><li><strong>Warm Edge Spacers:</strong> These non-metallic spacers reduce heat transfer and prevent condensation.</li></ul><h2>Conclusion</h2><p>Choosing the right windows for your home involves considering your climate, home\'s architectural style, budget, and personal preferences. By understanding the different options available, you can make an informed decision that enhances your home\'s beauty, comfort, and energy efficiency.</p><p>For personalized advice on selecting the perfect windows for your home, contact our team of window experts. We\'ll help you navigate the options and find the best solution for your specific needs.</p>',
      featured_image_url: '/placeholder-blog-post.jpg',
      author: 'John Smith',
      published_date: new Date().toISOString(),
      is_published: true,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };
    
    return {
      post: placeholderPost,
      relatedPosts: [
        {
          id: 2,
          title: 'The Benefits of Energy-Efficient Windows',
          slug: 'the-benefits-of-energy-efficient-windows',
          excerpt: 'Discover how energy-efficient windows can save you money and improve your home\'s comfort.',
          content: '<p>Energy-efficient windows are designed to prevent heated or cooled air from escaping your home. They can significantly reduce your energy bills and make your home more comfortable year-round.</p>',
          featured_image_url: '/placeholder-related-1.jpg',
          author: 'Jane Doe',
          published_date: new Date().toISOString(),
          is_published: true,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        },
        {
          id: 3,
          title: 'Signs It\'s Time to Replace Your Windows',
          slug: 'signs-its-time-to-replace-your-windows',
          excerpt: 'Learn the warning signs that indicate your windows need to be replaced.',
          content: '<p>Windows don\'t last forever, and knowing when to replace them can save you money on energy bills and prevent damage to your home.</p>',
          featured_image_url: '/placeholder-related-2.jpg',
          author: 'Michael Johnson',
          published_date: new Date().toISOString(),
          is_published: true,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        }
      ]
    };
  }
}
