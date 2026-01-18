/**
 * LinkedUp - Profile Page Logic
 * Handles profile data loading with skeleton states
 * 
 * FLOW:
 * 1. Show skeleton immediately on page load
 * 2. Fetch profile data asynchronously
 * 3. Hide skeleton and render real profile when data arrives
 * 4. Handle errors and not found states
 */

(function() {
    'use strict';

    const PROFILE_CONTAINER_ID = 'profile-container';

    // ==================== DATA FETCHING ====================

    /**
     * Get user ID from URL or current user
     * @returns {string} User ID
     */
    function getUserId() {
        // Extract from URL: /profile?user=123 or /profile/123
        const urlParams = new URLSearchParams(window.location.search);
        const userIdFromQuery = urlParams.get('user');
        
        if (userIdFromQuery) {
            return userIdFromQuery;
        }

        // If no user ID in URL, assume current user's profile
        return 'me'; // Backend should interpret 'me' as current user
    }

    /**
     * Fetch user profile data from API
     * @param {string} userId - User ID to fetch
     * @returns {Promise<Object>} User profile object
     * 
     * TODO: Replace with actual API endpoint
     * Example: return fetch(`/api/v1/users/${userId}/`).then(r => r.json());
     */
    async function fetchUserProfile(userId) {
        // ⚠️ PLACEHOLDER - Replace with your API call
        // return fetch(`/api/v1/users/${userId}/`)
        //     .then(response => {
        //         if (response.status === 404) {
        //             throw new Error('User not found');
        //         }
        //         if (!response.ok) {
        //             throw new Error('Failed to fetch profile');
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

    /**
     * Fetch user's posts
     * @param {string} userId - User ID
     * @returns {Promise<Array>} Array of post objects
     * 
     * TODO: Replace with actual API endpoint
     */
    async function fetchUserPosts(userId) {
        // ⚠️ PLACEHOLDER - Replace with your API call
        // return fetch(`/api/v1/users/${userId}/posts/`)
        //     .then(response => {
        //         if (!response.ok) {
        //             throw new Error('Failed to fetch posts');
        //         }
        //         return response.json();
        //     });

        // TEMPORARY: Return empty to keep skeleton visible
        return new Promise((resolve) => {
            // Skeleton will remain visible until this resolves
        });
    }

    // ==================== RENDERING ====================

    /**
     * Render profile data to HTML
     * @param {Object} profile - User profile object
     * @returns {string} HTML string
     */
    function renderProfile(profile) {
        return `
            <div class="profile-hero">
                <img src="${profile.cover_image || 'data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' viewBox=\'0 0 800 200\' fill=\'%23a0b5c8\'%3E%3Crect width=\'800\' height=\'200\'/%3E%3C/svg%3E'}" 
                     alt="Cover" class="profile-cover">
            </div>
            <div class="profile-main">
                <img src="${profile.avatar}" alt="${profile.name}" class="profile-avatar-large">
                <div class="profile-header-content">
                    <h1>${profile.name}</h1>
                    <p class="profile-bio">${profile.title || 'Professional'}</p>
                    <p class="profile-location">${profile.location || ''}</p>
                    ${profile.bio ? `<p class="profile-about">${profile.bio}</p>` : ''}
                </div>
                <div class="profile-meta">
                    <div class="profile-stat-large">
                        <strong>${profile.connections_count || 0}</strong>
                        <span>Connections</span>
                    </div>
                    <div class="profile-stat-large">
                        <strong>${profile.posts_count || 0}</strong>
                        <span>Posts</span>
                    </div>
                    <div class="profile-stat-large">
                        <strong>${profile.followers_count || 0}</strong>
                        <span>Followers</span>
                    </div>
                </div>
            </div>
        `;
    }

    /**
     * Render user posts section
     * @param {Array} posts - Array of post objects
     * @returns {string} HTML string
     */
    function renderUserPosts(posts) {
        if (!posts || posts.length === 0) {
            return `
                <div class="profile-section">
                    <h2>Activity</h2>
                    <div class="empty-state">
                        <p>No posts yet</p>
                    </div>
                </div>
            `;
        }

        const postsHTML = posts.map(post => `
            <div class="post-card">
                <div class="post-content">${post.content}</div>
                ${post.image ? `<img src="${post.image}" alt="Post" class="post-image">` : ''}
                <div class="post-stats">
                    <span>${post.likes_count} likes</span>
                    <span>${post.comments_count} comments</span>
                </div>
            </div>
        `).join('');

        return `
            <div class="profile-section">
                <h2>Activity</h2>
                ${postsHTML}
            </div>
        `;
    }

    // ==================== MAIN LOAD FUNCTION ====================

    /**
     * Load profile content with skeleton handling
     * This is the main entry point
     */
    async function loadProfile() {
        const userId = getUserId();
        console.log(`[Profile] Loading profile for user: ${userId}`);

        // STEP 1: Show skeleton immediately
        SkeletonLoader.showProfileSkeleton(PROFILE_CONTAINER_ID);

        try {
            // STEP 2: Fetch profile data
            const profile = await fetchUserProfile(userId);

            // STEP 3: Check if profile exists
            if (!profile) {
                SkeletonLoader.showEmptyState(
                    PROFILE_CONTAINER_ID,
                    'User not found'
                );
                console.log('[Profile] User not found');
                return;
            }

            // STEP 4: Render profile and hide skeleton
            const profileHTML = renderProfile(profile);
            SkeletonLoader.hideSkeleton(PROFILE_CONTAINER_ID, profileHTML);
            
            console.log('[Profile] Successfully loaded profile');

            // STEP 5: Optionally load user posts
            // loadUserPosts(userId);

        } catch (error) {
            // Handle errors
            console.error('[Profile] Error loading profile:', error);
            
            if (error.message === 'User not found') {
                SkeletonLoader.showEmptyState(
                    PROFILE_CONTAINER_ID,
                    'This profile does not exist'
                );
            } else {
                SkeletonLoader.showErrorState(
                    PROFILE_CONTAINER_ID,
                    'Failed to load profile. Please try again.',
                    loadProfile // Retry callback
                );
            }
        }
    }

    /**
     * Load user's posts (optional, can be loaded separately)
     * @param {string} userId - User ID
     */
    async function loadUserPosts(userId) {
        console.log(`[Profile] Loading posts for user: ${userId}`);

        try {
            const posts = await fetchUserPosts(userId);
            
            // Append posts to profile (you'll need a separate container for this)
            const postsHTML = renderUserPosts(posts);
            
            // TODO: Append to a posts container if you have one
            // const postsContainer = document.getElementById('profile-posts');
            // if (postsContainer) {
            //     postsContainer.innerHTML = postsHTML;
            // }

            console.log(`[Profile] Loaded ${posts.length} posts`);

        } catch (error) {
            console.error('[Profile] Error loading posts:', error);
        }
    }

    // ==================== EVENT HANDLERS ====================

    /**
     * Attach event listeners to profile actions
     */
    function attachEventListeners() {
        const container = document.getElementById(PROFILE_CONTAINER_ID);
        if (!container) return;

        // Example: Follow/Unfollow button
        container.addEventListener('click', (e) => {
            if (e.target.matches('.follow-btn')) {
                handleFollowAction(e.target);
            }
        });
    }

    /**
     * Handle follow/unfollow action
     * @param {HTMLElement} button - Follow button element
     */
    function handleFollowAction(button) {
        const userId = button.dataset.userId;
        const isFollowing = button.classList.contains('following');

        console.log(`[Profile] ${isFollowing ? 'Unfollow' : 'Follow'} user ${userId}`);

        // TODO: API call to follow/unfollow
        // fetch(`/api/v1/users/${userId}/${isFollowing ? 'unfollow' : 'follow'}/`, {
        //     method: 'POST'
        // })
        // .then(() => {
        //     button.classList.toggle('following');
        //     button.textContent = isFollowing ? 'Follow' : 'Following';
        // });
    }

    // ==================== INITIALIZATION ====================

    /**
     * Initialize profile page
     */
    function init() {
        console.log('[Profile] Initializing profile page...');
        
        // Load profile immediately
        loadProfile();
    }

    // Start when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

})();