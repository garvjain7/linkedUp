/**
 * LinkedUp - Notifications Page Logic
 * Handles notifications loading with skeleton states
 * 
 * FLOW:
 * 1. Show skeleton immediately on page load
 * 2. Fetch notifications asynchronously
 * 3. Hide skeleton and render real notifications when data arrives
 * 4. Handle errors and empty states
 * 5. Support real-time updates (WebSocket optional)
 */

(function() {
    'use strict';

    const NOTIFICATIONS_CONTAINER_ID = 'notifications-container';

    // ==================== DATA FETCHING ====================

    /**
     * Fetch notifications from API
     * @returns {Promise<Array>} Array of notification objects
     * 
     * TODO: Replace with actual API endpoint
     * Example: return fetch('/api/v1/notifications/').then(r => r.json());
     */
    async function fetchNotifications() {
        // ⚠️ PLACEHOLDER - Replace with your API call
        // return fetch('/api/v1/notifications/')
        //     .then(response => {
        //         if (!response.ok) {
        //             throw new Error('Failed to fetch notifications');
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
     * Mark notification as read
     * @param {string} notificationId - Notification ID
     * @returns {Promise<void>}
     */
    async function markAsRead(notificationId) {
        // TODO: Implement API call
        // return fetch(`/api/v1/notifications/${notificationId}/read/`, {
        //     method: 'POST'
        // });
        
        console.log(`[Notifications] Marking notification ${notificationId} as read`);
    }

    /**
     * Mark all notifications as read
     * @returns {Promise<void>}
     */
    async function markAllAsRead() {
        // TODO: Implement API call
        // return fetch('/api/v1/notifications/mark-all-read/', {
        //     method: 'POST'
        // });
        
        console.log('[Notifications] Marking all as read');
    }

    // ==================== RENDERING ====================

    /**
     * Render a single notification to HTML
     * @param {Object} notification - Notification object
     * @returns {string} HTML string
     */
    function renderNotification(notification) {
        const unreadClass = notification.read ? '' : 'unread';
        const actionText = getNotificationActionText(notification);

        return `
            <div class="notification-item ${unreadClass}" 
                 data-notification-id="${notification.id}"
                 data-read="${notification.read}">
                <img src="${notification.actor.avatar}" 
                     alt="${notification.actor.name}" 
                     class="notification-avatar">
                <div class="notification-content">
                    <p class="notification-text">
                        <strong>${notification.actor.name}</strong>
                        ${actionText}
                    </p>
                    <span class="notification-time">${formatTime(notification.created_at)}</span>
                </div>
            </div>
        `;
    }

    /**
     * Get human-readable action text for notification type
     * @param {Object} notification - Notification object
     * @returns {string} Action text
     */
    function getNotificationActionText(notification) {
        const type = notification.type;
        
        switch (type) {
            case 'like':
                return 'liked your post';
            case 'comment':
                return 'commented on your post';
            case 'follow':
                return 'started following you';
            case 'mention':
                return 'mentioned you in a post';
            case 'share':
                return 'shared your post';
            case 'connection':
                return 'accepted your connection request';
            case 'birthday':
                return 'has a birthday today';
            case 'job_alert':
                return 'posted a new job that matches your profile';
            default:
                return 'interacted with your content';
        }
    }

    /**
     * Format timestamp to human-readable format
     * @param {string} timestamp - ISO timestamp
     * @returns {string} Formatted time (e.g., "2h ago", "1d ago")
     */
    function formatTime(timestamp) {
        const date = new Date(timestamp);
        const now = new Date();
        const diffMs = now - date;
        const diffSeconds = Math.floor(diffMs / 1000);
        const diffMinutes = Math.floor(diffSeconds / 60);
        const diffHours = Math.floor(diffMinutes / 60);
        const diffDays = Math.floor(diffHours / 24);

        if (diffSeconds < 60) {
            return 'Just now';
        } else if (diffMinutes < 60) {
            return `${diffMinutes}m ago`;
        } else if (diffHours < 24) {
            return `${diffHours}h ago`;
        } else if (diffDays < 7) {
            return `${diffDays}d ago`;
        } else {
            return date.toLocaleDateString();
        }
    }

    /**
     * Render all notifications
     * @param {Array} notifications - Array of notification objects
     * @returns {string} HTML string of all notifications
     */
    function renderNotifications(notifications) {
        if (!notifications || notifications.length === 0) {
            return null; // Will show empty state
        }

        return notifications.map(renderNotification).join('');
    }

    // ==================== MAIN LOAD FUNCTION ====================

    /**
     * Load notifications with skeleton handling
     * This is the main entry point
     */
    async function loadNotifications() {
        console.log('[Notifications] Starting notifications load...');

        // STEP 1: Show skeleton immediately
        SkeletonLoader.showNotificationsSkeleton(NOTIFICATIONS_CONTAINER_ID, 6);

        try {
            // STEP 2: Fetch data asynchronously
            const notifications = await fetchNotifications();

            // STEP 3: Check if we have data
            if (!notifications || notifications.length === 0) {
                // Show empty state
                SkeletonLoader.showEmptyState(
                    NOTIFICATIONS_CONTAINER_ID,
                    'No notifications yet. We\'ll notify you when something happens!',
                    `<svg viewBox="0 0 24 24" fill="currentColor">
                        <path d="M22 19h-8.28a2 2 0 11-3.44 0H2v-1a4.52 4.52 0 011.17-2.83l1-1.17h15.7l1 1.17A4.42 4.42 0 0122 18zM18.21 7.44A6.27 6.27 0 0012 2a6.27 6.27 0 00-6.21 5.44L5 13h14z"/>
                    </svg>`
                );
                console.log('[Notifications] No notifications available');
                return;
            }

            // STEP 4: Render real content and hide skeleton
            const notificationsHTML = renderNotifications(notifications);
            SkeletonLoader.hideSkeleton(NOTIFICATIONS_CONTAINER_ID, notificationsHTML);
            
            console.log(`[Notifications] Successfully loaded ${notifications.length} notifications`);

            // STEP 5: Attach event listeners
            attachEventListeners();

            // STEP 6: Setup real-time updates (optional)
            // setupWebSocket();

        } catch (error) {
            // Handle errors
            console.error('[Notifications] Error loading notifications:', error);
            
            SkeletonLoader.showErrorState(
                NOTIFICATIONS_CONTAINER_ID,
                'Failed to load notifications. Please try again.',
                loadNotifications // Retry callback
            );
        }
    }

    // ==================== EVENT HANDLERS ====================

    /**
     * Attach event listeners to notifications
     */
    function attachEventListeners() {
        const container = document.getElementById(NOTIFICATIONS_CONTAINER_ID);
        if (!container) return;

        // Click on notification
        container.addEventListener('click', (e) => {
            const notificationItem = e.target.closest('.notification-item');
            if (!notificationItem) return;

            handleNotificationClick(notificationItem);
        });
    }

    /**
     * Handle notification click
     * @param {HTMLElement} notificationItem - Notification element
     */
    function handleNotificationClick(notificationItem) {
        const notificationId = notificationItem.dataset.notificationId;
        const isRead = notificationItem.dataset.read === 'true';

        console.log(`[Notifications] Clicked notification ${notificationId}`);

        // Mark as read if unread
        if (!isRead) {
            markAsRead(notificationId).then(() => {
                notificationItem.classList.remove('unread');
                notificationItem.dataset.read = 'true';
            });
        }

        // TODO: Navigate to related content
        // For example, if it's a post like notification, go to that post
        // window.location.href = `/posts/${notification.post_id}`;
    }

    // ==================== REAL-TIME UPDATES (Optional) ====================

    /**
     * Setup WebSocket connection for real-time notifications
     * Uncomment when implementing real-time features
     */
    /*
    let ws = null;

    function setupWebSocket() {
        const wsUrl = `ws://${window.location.host}/ws/notifications/`;
        
        ws = new WebSocket(wsUrl);

        ws.onopen = () => {
            console.log('[Notifications] WebSocket connected');
        };

        ws.onmessage = (event) => {
            const notification = JSON.parse(event.data);
            console.log('[Notifications] New notification received', notification);
            
            prependNotification(notification);
        };

        ws.onerror = (error) => {
            console.error('[Notifications] WebSocket error:', error);
        };

        ws.onclose = () => {
            console.log('[Notifications] WebSocket disconnected, reconnecting...');
            setTimeout(setupWebSocket, 5000); // Reconnect after 5 seconds
        };
    }

    function prependNotification(notification) {
        const container = document.getElementById(NOTIFICATIONS_CONTAINER_ID);
        if (!container) return;

        const notificationHTML = renderNotification(notification);
        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = notificationHTML;
        
        const newNotification = tempDiv.firstElementChild;
        newNotification.classList.add('fade-in');
        
        container.insertBefore(newNotification, container.firstChild);
    }
    */

    // ==================== POLLING (Alternative to WebSocket) ====================

    /**
     * Setup polling for new notifications
     * Alternative to WebSocket for simpler implementation
     */
    function setupPolling(intervalMs = 30000) {
        setInterval(async () => {
            console.log('[Notifications] Polling for new notifications...');
            
            try {
                const notifications = await fetchNotifications();
                
                // TODO: Compare with existing and only add new ones
                // This is a simple implementation that replaces all
                const notificationsHTML = renderNotifications(notifications);
                if (notificationsHTML) {
                    document.getElementById(NOTIFICATIONS_CONTAINER_ID).innerHTML = notificationsHTML;
                    attachEventListeners();
                }
            } catch (error) {
                console.error('[Notifications] Polling error:', error);
            }
        }, intervalMs);
    }

    // ==================== INITIALIZATION ====================

    /**
     * Initialize notifications page
     */
    function init() {
        console.log('[Notifications] Initializing notifications page...');
        
        // Load notifications immediately
        loadNotifications();

        // Optional: Setup polling for updates
        // setupPolling(30000); // Poll every 30 seconds
    }

    // Start when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

})();