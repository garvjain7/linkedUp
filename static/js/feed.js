/**
 * LinkedUp - Feed Page Logic
 * Handles feed loading with skeleton states
 * 
 * FLOW:
 * 1. Show skeleton immediately on page load
 * 2. Fetch feed data asynchronously
 * 3. Hide skeleton and render real posts when data arrives
 * 4. Handle errors and empty states
 */

(function() {
    'use strict';

    const FEED_CONTAINER_ID = 'feed-container';

    // ==================== DATA FETCHING ====================

    /**
     * Fetch feed posts from API
     * @returns {Promise<Array>} Array of post objects
     * 
     * TODO: Replace with actual API endpoint
     * Example: return fetch('/api/v1/feed/').then(r => r.json());
     */
    async function fetchFeedPosts() {
        // ⚠️ PLACEHOLDER - Replace with your API call
        // return fetch('/api/v1/feed/')
        //     .then(response => {
        //         if (!response.ok) {
        //             throw new Error('Failed to fetch feed');
        //         }
        //         return response.json();
        //     });

        // TEMPORARY: Return empty to keep skeleton visible
        // Once you implement the API, remove this and uncomment above
        return new Promise((resolve) => {
            // Skeleton will remain visible until this resolves
            // When you add the API call, the skeleton will hide automatically
        });
    }

    // ==================== RENDERING ====================

    /**
     * Render a single post to HTML
     * @param {Object} post - Post data object
     * @returns {string} HTML string
     */
    function renderPost(post) {
        return `
            <div class="post-card">
                <div class="post-header">
                    <img src="${post.author.avatar}" alt="${post.author.name}" class="post-avatar">
                    <div class="post-user-info">
                        <div class="post-username">${post.author.name}</div>
                        <div class="post-subtitle">${post.author.title}</div>
                        <div class="post-time">${post.created_at}</div>
                    </div>
                </div>
                <div class="post-content">
                    ${post.content}
                </div>
                ${post.image ? `<img src="${post.image}" alt="Post image" class="post-image">` : ''}
                <div class="post-stats">
                    <span>${post.likes_count} likes</span>
                    <span>${post.comments_count} comments</span>
                </div>
                <div class="post-actions">
                    <button class="post-action" data-action="like" data-post-id="${post.id}">
                        <svg viewBox="0 0 24 24" fill="currentColor">
                            <path d="M19.46 11l-3.91-3.91a7 7 0 01-1.69-2.74l-.49-1.47A2.76 2.76 0 0010.76 1 2.75 2.75 0 008 3.74v1.12a9.19 9.19 0 00.46 2.85L8.89 9H4.12A2.12 2.12 0 002 11.12a2.16 2.16 0 00.92 1.76A2.11 2.11 0 002 14.62a2.14 2.14 0 001.28 2 2 2 0 00-.28 1 2.12 2.12 0 002 2.12v.14A2.12 2.12 0 007.12 22h7.49a8.08 8.08 0 003.58-.84l.31-.16H21V11zM19 19h-1l-.73.37a6.14 6.14 0 01-2.69.63H7.72a1 1 0 01-1-.72l-.25-.87-.85-.41A1 1 0 015 17l.17-1-.76-.74A1 1 0 014.27 14l.66-1.09-.73-1.1a.49.49 0 01.08-.7.48.48 0 01.34-.11h7.05l-1.31-3.92A7 7 0 0110 4.86V3.75a.77.77 0 01.75-.75.75.75 0 01.71.51L12 5a9 9 0 002.13 3.5l4.5 4.5H19z"/>
                        </svg>
                        <span>Like</span>
                    </button>
                    <button class="post-action" data-action="comment" data-post-id="${post.id}">
                        <svg viewBox="0 0 24 24" fill="currentColor">
                            <path d="M7 9h10v1H7zm0 4h7v-1H7zm16-2a6.78 6.78 0 01-2.84 5.61L12 22v-4H8A7 7 0 018 4h8a7 7 0 017 7zm-2 0a5 5 0 00-5-5H8a5 5 0 000 10h6v2.28L19 15a4.79 4.79 0 002-4z"/>
                        </svg>
                        <span>Comment</span>
                    </button>
                    <button class="post-action" data-action="share" data-post-id="${post.id}">
                        <svg viewBox="0 0 24 24" fill="currentColor">
                            <path d="M23 12l-4.61 7H16l4-6H8a3.92 3.92 0 00-4 3.84V17a4 4 0 00.19 1.24L5.12 21H3l-.73-2.22A6.4 6.4 0 012 16.94 6 6 0 018 11h12l-4-6h2.39z"/>
                        </svg>
                        <span>Share</span>
                    </button>
                    <button class="post-action" data-action="send" data-post-id="${post.id}">
                        <svg viewBox="0 0 24 24" fill="currentColor">
                            <path d="M21 3L0 10l7.66 4.26L16 8l-6.26 8.34L14 24z"/>
                        </svg>
                        <span>Send</span>
                    </button>
                </div>
            </div>
        `;
    }

    /**
     * Render all posts
     * @param {Array} posts - Array of post objects
     * @returns {string} HTML string of all posts
     */
    function renderFeed(posts) {
        if (!posts || posts.length === 0) {
            return null; // Will show empty state
        }

        return posts.map(renderPost).join('');
    }

    // ==================== MAIN LOAD FUNCTION ====================

    /**
     * Load feed content with skeleton handling
     * This is the main entry point
     */
    async function loadFeed() {
        console.log('[Feed] Starting feed load...');

        // STEP 1: Show skeleton immediately
        SkeletonLoader.showFeedSkeleton(FEED_CONTAINER_ID, 3, true);

        try {
            // STEP 2: Fetch data asynchronously
            const posts = await fetchFeedPosts();

            // STEP 3: Check if we have data
            if (!posts || posts.length === 0) {
                // Show empty state
                SkeletonLoader.showEmptyState(
                    FEED_CONTAINER_ID,
                    'No posts in your feed yet. Start following people to see their posts here!',
                    `<svg viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                    </svg>`
                );
                console.log('[Feed] No posts available, showing empty state');
                return;
            }

            // STEP 4: Render real content and hide skeleton
            const feedHTML = renderFeed(posts);
            SkeletonLoader.hideSkeleton(FEED_CONTAINER_ID, feedHTML);
            
            console.log(`[Feed] Successfully loaded ${posts.length} posts`);

            // STEP 5: Attach event listeners to rendered content
            attachPostEventListeners();

        } catch (error) {
            // Handle errors
            console.error('[Feed] Error loading feed:', error);
            
            SkeletonLoader.showErrorState(
                FEED_CONTAINER_ID,
                'Failed to load your feed. Please check your connection and try again.',
                loadFeed // Retry callback
            );
        }
    }

    // ==================== EVENT HANDLERS ====================

    /**
     * Attach event listeners to post actions
     */
    function attachPostEventListeners() {
        const container = document.getElementById(FEED_CONTAINER_ID);
        if (!container) return;

        // Event delegation for post actions
        container.addEventListener('click', (e) => {
            const actionButton = e.target.closest('.post-action');
            if (!actionButton) return;

            const action = actionButton.dataset.action;
            const postId = actionButton.dataset.postId;

            handlePostAction(action, postId);
        });
    }

    /**
     * Handle post actions (like, comment, share, send)
     * @param {string} action - Action type
     * @param {string} postId - Post ID
     */
    function handlePostAction(action, postId) {
        console.log(`[Feed] Action: ${action} on post ${postId}`);

        // TODO: Implement action handlers
        switch (action) {
            case 'like':
                // TODO: API call to like post
                // fetch(`/api/v1/posts/${postId}/like/`, { method: 'POST' })
                break;
            case 'comment':
                // TODO: Open comment dialog
                break;
            case 'share':
                // TODO: Open share dialog
                break;
            case 'send':
                // TODO: Open send dialog
                break;
        }
    }

    // ==================== INFINITE SCROLL (Optional) ====================

    /**
     * Setup infinite scroll for feed
     * Uncomment when implementing pagination
     */
    /*
    function setupInfiniteScroll() {
        const container = document.getElementById(FEED_CONTAINER_ID);
        if (!container) return;

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    loadMorePosts();
                }
            });
        }, {
            rootMargin: '100px'
        });

        // Observe the last post
        const lastPost = container.lastElementChild;
        if (lastPost) {
            observer.observe(lastPost);
        }
    }

    async function loadMorePosts() {
        // TODO: Fetch next page of posts
        console.log('[Feed] Loading more posts...');
    }
    */

    // ==================== INITIALIZATION ====================

    /**
     * Initialize feed page
     */
    function init() {
        console.log('[Feed] Initializing feed page...');
        
        // Load feed immediately on page load
        loadFeed();

        // Optional: Setup auto-refresh
        // setInterval(loadFeed, 60000); // Refresh every minute
    }

    // Start when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

})();