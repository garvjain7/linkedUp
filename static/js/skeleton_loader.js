/**
 * LinkedUp - Skeleton Loader Utility
 * Reusable functions to show/hide skeletons for different content types
 * 
 * ARCHITECTURE:
 * - Skeletons are UI placeholders only (no business logic)
 * - Data-driven visibility (not time-based)
 * - Clean separation between skeleton and real content
 */

const SkeletonLoader = (() => {
    
    // ==================== SKELETON TEMPLATES ====================
    
    const templates = {
        /**
         * Feed post skeleton (with image)
         */
        feedPost: `
            <div class="skeleton-post">
                <div class="skeleton-post-header">
                    <div class="skeleton skeleton-post-avatar"></div>
                    <div class="skeleton-post-user-info">
                        <div class="skeleton skeleton-post-username"></div>
                        <div class="skeleton skeleton-post-subtitle"></div>
                        <div class="skeleton skeleton-post-time"></div>
                    </div>
                </div>
                <div class="skeleton-post-content">
                    <div class="skeleton skeleton-post-text"></div>
                    <div class="skeleton skeleton-post-text"></div>
                    <div class="skeleton skeleton-post-text"></div>
                </div>
                <div class="skeleton skeleton-post-image"></div>
                <div class="skeleton-post-stats">
                    <div class="skeleton skeleton-post-stat"></div>
                    <div class="skeleton skeleton-post-stat"></div>
                </div>
                <div class="skeleton-post-actions">
                    <div class="skeleton skeleton-post-action"></div>
                    <div class="skeleton skeleton-post-action"></div>
                    <div class="skeleton skeleton-post-action"></div>
                    <div class="skeleton skeleton-post-action"></div>
                </div>
            </div>
        `,

        /**
         * Feed post skeleton (without image)
         */
        feedPostNoImage: `
            <div class="skeleton-post no-image">
                <div class="skeleton-post-header">
                    <div class="skeleton skeleton-post-avatar"></div>
                    <div class="skeleton-post-user-info">
                        <div class="skeleton skeleton-post-username"></div>
                        <div class="skeleton skeleton-post-subtitle"></div>
                        <div class="skeleton skeleton-post-time"></div>
                    </div>
                </div>
                <div class="skeleton-post-content">
                    <div class="skeleton skeleton-post-text"></div>
                    <div class="skeleton skeleton-post-text"></div>
                    <div class="skeleton skeleton-post-text"></div>
                    <div class="skeleton skeleton-post-text"></div>
                </div>
                <div class="skeleton-post-stats">
                    <div class="skeleton skeleton-post-stat"></div>
                    <div class="skeleton skeleton-post-stat"></div>
                </div>
                <div class="skeleton-post-actions">
                    <div class="skeleton skeleton-post-action"></div>
                    <div class="skeleton skeleton-post-action"></div>
                    <div class="skeleton skeleton-post-action"></div>
                    <div class="skeleton skeleton-post-action"></div>
                </div>
            </div>
        `,

        /**
         * Profile page skeleton
         */
        profile: `
            <div class="skeleton-profile-hero">
                <div class="skeleton skeleton-profile-cover"></div>
                <div class="skeleton skeleton-profile-avatar-large"></div>
            </div>
            <div class="skeleton-profile-content">
                <div class="skeleton skeleton-profile-name"></div>
                <div class="skeleton skeleton-profile-title"></div>
                <div class="skeleton skeleton-profile-location"></div>
                <div class="skeleton skeleton-profile-bio"></div>
                <div class="skeleton skeleton-profile-bio"></div>
                <div class="skeleton-profile-stats">
                    <div class="skeleton-profile-stat">
                        <div class="skeleton skeleton-profile-stat-value"></div>
                        <div class="skeleton skeleton-profile-stat-label"></div>
                    </div>
                    <div class="skeleton-profile-stat">
                        <div class="skeleton skeleton-profile-stat-value"></div>
                        <div class="skeleton skeleton-profile-stat-label"></div>
                    </div>
                    <div class="skeleton-profile-stat">
                        <div class="skeleton skeleton-profile-stat-value"></div>
                        <div class="skeleton skeleton-profile-stat-label"></div>
                    </div>
                </div>
            </div>
        `,

        /**
         * Notification item skeleton
         */
        notification: `
            <div class="skeleton-notification">
                <div class="skeleton skeleton-notification-avatar"></div>
                <div class="skeleton-notification-content">
                    <div class="skeleton skeleton-notification-text"></div>
                    <div class="skeleton skeleton-notification-text"></div>
                    <div class="skeleton skeleton-notification-time"></div>
                </div>
            </div>
        `
    };

    // ==================== PRIVATE HELPERS ====================

    /**
     * Get container element by ID
     * @private
     */
    function getContainer(containerId) {
        const container = document.getElementById(containerId);
        if (!container) {
            console.error(`[SkeletonLoader] Container not found: ${containerId}`);
            return null;
        }
        return container;
    }

    /**
     * Add accessibility attributes for screen readers
     * @private
     */
    function addA11yAttributes(container) {
        container.setAttribute('aria-busy', 'true');
        container.setAttribute('aria-live', 'polite');
        
        // Add screen reader only text
        const srText = document.createElement('span');
        srText.className = 'sr-only';
        srText.textContent = 'Loading content...';
        container.insertBefore(srText, container.firstChild);
    }

    /**
     * Remove accessibility attributes
     * @private
     */
    function removeA11yAttributes(container) {
        container.removeAttribute('aria-busy');
        
        // Remove screen reader text
        const srText = container.querySelector('.sr-only');
        if (srText) {
            srText.remove();
        }
    }

    // ==================== PUBLIC API ====================

    /**
     * Show feed skeleton (multiple posts)
     * @param {string} containerId - ID of container element
     * @param {number} count - Number of skeleton posts to show (default: 3)
     * @param {boolean} withImages - Include image skeletons (default: true)
     */
    function showFeedSkeleton(containerId, count = 3, withImages = true) {
        const container = getContainer(containerId);
        if (!container) return;

        const template = withImages ? templates.feedPost : templates.feedPostNoImage;
        
        // Clear existing content
        container.innerHTML = '';
        
        // Add accessibility
        addA11yAttributes(container);
        
        // Inject skeletons
        for (let i = 0; i < count; i++) {
            const skeletonDiv = document.createElement('div');
            skeletonDiv.innerHTML = template.trim();
            container.appendChild(skeletonDiv.firstChild);
        }

        console.log(`[SkeletonLoader] Showing ${count} feed skeletons in #${containerId}`);
    }

    /**
     * Show profile skeleton
     * @param {string} containerId - ID of container element
     */
    function showProfileSkeleton(containerId) {
        const container = getContainer(containerId);
        if (!container) return;

        // Clear existing content
        container.innerHTML = '';
        
        // Add accessibility
        addA11yAttributes(container);
        
        // Inject skeleton
        container.innerHTML = templates.profile;

        console.log(`[SkeletonLoader] Showing profile skeleton in #${containerId}`);
    }

    /**
     * Show notifications skeleton
     * @param {string} containerId - ID of container element
     * @param {number} count - Number of notification skeletons (default: 6)
     */
    function showNotificationsSkeleton(containerId, count = 6) {
        const container = getContainer(containerId);
        if (!container) return;

        // Clear existing content
        container.innerHTML = '';
        
        // Add accessibility
        addA11yAttributes(container);
        
        // Inject skeletons
        for (let i = 0; i < count; i++) {
            const skeletonDiv = document.createElement('div');
            skeletonDiv.innerHTML = templates.notification.trim();
            container.appendChild(skeletonDiv.firstChild);
        }

        console.log(`[SkeletonLoader] Showing ${count} notification skeletons in #${containerId}`);
    }

    /**
     * Hide skeleton and render real content
     * @param {string} containerId - ID of container element
     * @param {string|HTMLElement|null} content - HTML string, DOM element, or null for empty
     */
    function hideSkeleton(containerId, content = null) {
        const container = getContainer(containerId);
        if (!container) return;

        // Remove accessibility attributes
        removeA11yAttributes(container);

        // Clear skeletons
        container.innerHTML = '';

        // Render real content
        if (content) {
            if (typeof content === 'string') {
                container.innerHTML = content;
            } else if (content instanceof HTMLElement) {
                container.appendChild(content);
            }

            // Add fade-in animation to new content
            const children = container.children;
            for (let i = 0; i < children.length; i++) {
                children[i].classList.add('fade-in');
            }
        }

        console.log(`[SkeletonLoader] Hidden skeleton in #${containerId}, rendered real content`);
    }

    /**
     * Show empty state (no content available)
     * @param {string} containerId - ID of container element
     * @param {string} message - Message to display
     * @param {string} icon - Optional SVG icon HTML
     */
    function showEmptyState(containerId, message = 'No content available', icon = '') {
        const container = getContainer(containerId);
        if (!container) return;

        const emptyHTML = `
            <div class="empty-state">
                ${icon}
                <h3>Nothing to see here</h3>
                <p>${message}</p>
            </div>
        `;

        hideSkeleton(containerId, emptyHTML);
        console.log(`[SkeletonLoader] Showing empty state in #${containerId}`);
    }

    /**
     * Show error state
     * @param {string} containerId - ID of container element
     * @param {string} message - Error message
     * @param {Function} retryCallback - Function to call on retry
     */
    function showErrorState(containerId, message = 'Failed to load content', retryCallback = null) {
        const container = getContainer(containerId);
        if (!container) return;

        const errorHTML = `
            <div class="error-state">
                <h3>Oops! Something went wrong</h3>
                <p>${message}</p>
                ${retryCallback ? '<button class="retry-btn" onclick="window._skeletonRetry()">Try Again</button>' : ''}
            </div>
        `;

        // Store retry callback globally (temporary solution)
        if (retryCallback) {
            window._skeletonRetry = retryCallback;
        }

        hideSkeleton(containerId, errorHTML);
        console.log(`[SkeletonLoader] Showing error state in #${containerId}`);
    }

    /**
     * Check if skeleton is currently visible
     * @param {string} containerId - ID of container element
     * @returns {boolean}
     */
    function isSkeletonVisible(containerId) {
        const container = getContainer(containerId);
        if (!container) return false;

        return container.hasAttribute('aria-busy') && 
               container.getAttribute('aria-busy') === 'true';
    }

    // ==================== EXPORT PUBLIC API ====================

    return {
        // Main functions
        showFeedSkeleton,
        showProfileSkeleton,
        showNotificationsSkeleton,
        hideSkeleton,
        
        // State functions
        showEmptyState,
        showErrorState,
        isSkeletonVisible,
        
        // Access to templates (for custom usage)
        templates
    };

})();

// Export for module systems (if needed)
if (typeof module !== 'undefined' && module.exports) {
    module.exports = SkeletonLoader;
}

// Make available globally
if (typeof window !== 'undefined') {
    window.SkeletonLoader = SkeletonLoader;
}

console.log('[SkeletonLoader] Initialized and ready');