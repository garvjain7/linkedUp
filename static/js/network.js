/**
 * LinkedUp - Network Page Logic
 * Handles My Network page - invitations, connections, etc.
 */

(function() {
    'use strict';

    const INVITATIONS_CONTAINER_ID = 'invitations-container';
    const MAX_PREVIEW_INVITATIONS = 5; // Show max 5 on main network page

    // ==================== DATA FETCHING ====================

    /**
     * Fetch network statistics (connections, followers, etc.)
     * Updates sidebar counts
     * 
     * TODO: Replace with actual API endpoint
     * GET /api/v1/network/stats/
     */
    async function fetchNetworkStats() {
        // ⚠️ PLACEHOLDER - Keep empty for now
        // return fetch('/api/v1/network/stats/')
        //     .then(response => response.json());

        return new Promise((resolve) => {
            // Will be implemented when backend is ready
            // Expected response format:
            // {
            //     connections_count: 1434,
            //     followers_count: 256,
            //     groups_count: 8,
            //     events_count: 5,
            //     pages_count: 24,
            //     newsletters_count: 12
            // }
        });
    }

    /**
     * Fetch connection invitations (received)
     * 
     * TODO: Replace with actual API endpoint
     * GET /api/v1/network/invitations/received/
     */
    async function fetchInvitations(limit = null) {
        // ⚠️ PLACEHOLDER - Keep empty for now
        // const url = limit ? `/api/v1/network/invitations/received/?limit=${limit}` : '/api/v1/network/invitations/received/';
        // return fetch(url).then(response => response.json());

        return new Promise((resolve) => {
            // Will be implemented when backend is ready
            // Expected response format:
            // [
            //     {
            //         id: "inv_1",
            //         sender: {
            //             id: "user_123",
            //             name: "Raghav Arora",
            //             avatar: "https://...",
            //             title: "Newsletter",
            //             has_verification: true
            //         },
            //         message: "invited you to subscribe to Webpeaker",
            //         type: "newsletter", // or "connection"
            //         created_at: "2024-01-15T10:30:00Z"
            //     }
            // ]
        });
    }

    /**
     * Accept an invitation
     * 
     * TODO: Replace with actual API endpoint
     * POST /api/v1/network/invitations/{id}/accept/
     */
    async function acceptInvitation(invitationId) {
        // ⚠️ PLACEHOLDER - Keep empty for now
        // return fetch(`/api/v1/network/invitations/${invitationId}/accept/`, {
        //     method: 'POST',
        //     headers: { 'Content-Type': 'application/json' },
        //     credentials: 'same-origin'
        // }).then(response => response.json());

        console.log(`[Network] Accept invitation: ${invitationId}`);
        return new Promise((resolve) => {
            // Will be implemented when backend is ready
        });
    }

    /**
     * Ignore/decline an invitation
     * 
     * TODO: Replace with actual API endpoint
     * POST /api/v1/network/invitations/{id}/ignore/
     */
    async function ignoreInvitation(invitationId) {
        // ⚠️ PLACEHOLDER - Keep empty for now
        // return fetch(`/api/v1/network/invitations/${invitationId}/ignore/`, {
        //     method: 'POST',
        //     headers: { 'Content-Type': 'application/json' },
        //     credentials: 'same-origin'
        // }).then(response => response.json());

        console.log(`[Network] Ignore invitation: ${invitationId}`);
        return new Promise((resolve) => {
            // Will be implemented when backend is ready
        });
    }

    // ==================== RENDERING ====================

    /**
     * Render a single invitation card
     * @param {Object} invitation - Invitation object
     * @returns {string} HTML string
     */
    function renderInvitationCard(invitation) {
        const timeAgo = Utils.formatTimeAgo(invitation.created_at);
        const verificationBadge = invitation.sender.has_verification ? `
            <span class="verification-badge">
                <svg viewBox="0 0 16 16" fill="currentColor">
                    <path d="M8 0L6.17 2.83L3 3.17L3.17 6.34L0 8L3.17 9.66L3 12.83L6.17 13.17L8 16L9.83 13.17L13 12.83L12.83 9.66L16 8L12.83 6.34L13 3.17L9.83 2.83L8 0Z"/>
                    <path d="M7 10L5 8L5.7 7.3L7 8.6L10.3 5.3L11 6L7 10Z" fill="white"/>
                </svg>
            </span>
        ` : '';

        return `
            <div class="invitation-card" data-invitation-id="${invitation.id}">
                <img src="${invitation.sender.avatar}" 
                     alt="${Utils.escapeHtml(invitation.sender.name)}" 
                     class="invitation-avatar">
                <div class="invitation-content">
                    ${invitation.sender.title ? `
                        <div class="invitation-meta">
                            <span class="invitation-badge">${Utils.escapeHtml(invitation.sender.title)}</span>
                            ${invitation.type === 'newsletter' ? '• Daily' : ''}
                        </div>
                    ` : ''}
                    <div class="invitation-name-row">
                        <span class="invitation-name">${Utils.escapeHtml(invitation.sender.name)}</span>
                        ${verificationBadge}
                    </div>
                    <div class="invitation-message">${Utils.escapeHtml(invitation.message)}</div>
                    <div class="invitation-time">${timeAgo}</div>
                </div>
                <div class="invitation-actions">
                    <button class="invitation-btn ignore-btn" 
                            data-action="ignore" 
                            data-invitation-id="${invitation.id}">
                        Ignore
                    </button>
                    <button class="invitation-btn accept-btn" 
                            data-action="accept" 
                            data-invitation-id="${invitation.id}">
                        Accept
                    </button>
                </div>
            </div>
        `;
    }

    /**
     * Render all invitations
     * @param {Array} invitations - Array of invitation objects
     * @returns {string} HTML string
     */
    function renderInvitations(invitations) {
        if (!invitations || invitations.length === 0) {
            return null; // Will show empty state
        }

        return invitations.map(renderInvitationCard).join('');
    }

    /**
     * Update sidebar counts from network stats
     * @param {Object} stats - Network statistics object
     */
    function updateSidebarCounts(stats) {
        const countElements = {
            'connections-count': stats.connections_count || 0,
            'followers-count': stats.followers_count || 0,
            'groups-count': stats.groups_count || 0,
            'events-count': stats.events_count || 0,
            'pages-count': stats.pages_count || 0,
            'newsletters-count': stats.newsletters_count || 0
        };

        Object.entries(countElements).forEach(([id, count]) => {
            const element = document.getElementById(id);
            if (element) {
                element.textContent = Utils.formatNumber(count);
            }
        });
    }

    /**
     * Update invitations count in header
     * @param {number} count - Number of invitations
     */
    function updateInvitationsCount(count) {
        const countElement = document.getElementById('invitations-count');
        if (countElement) {
            countElement.textContent = `(${count})`;
        }
    }

    // ==================== MAIN LOAD FUNCTIONS ====================

    /**
     * Load network statistics
     */
    async function loadNetworkStats() {
        console.log('[Network] Loading network statistics...');

        try {
            const stats = await fetchNetworkStats();
            
            if (stats) {
                updateSidebarCounts(stats);
                console.log('[Network] Stats loaded successfully');
            }
        } catch (error) {
            console.error('[Network] Error loading stats:', error);
            // Don't show error to user - stats are optional
        }
    }

    /**
     * Load invitations (limited to preview on main page)
     */
    async function loadInvitations() {
        console.log('[Network] Loading invitations...');

        // Show skeleton
        showInvitationsSkeleton(MAX_PREVIEW_INVITATIONS);

        try {
            // Fetch invitations (limited to 5 for preview)
            const invitations = await fetchInvitations(MAX_PREVIEW_INVITATIONS);

            // Update count
            const totalCount = invitations?.length || 0;
            updateInvitationsCount(totalCount);

            // Check if we have invitations
            if (!invitations || invitations.length === 0) {
                SkeletonLoader.showEmptyState(
                    INVITATIONS_CONTAINER_ID,
                    'No pending invitations',
                    `<svg viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                    </svg>`
                );
                console.log('[Network] No invitations found');
                return;
            }

            // Render invitations
            const invitationsHTML = renderInvitations(invitations);
            SkeletonLoader.hideSkeleton(INVITATIONS_CONTAINER_ID, invitationsHTML);
            
            console.log(`[Network] Loaded ${invitations.length} invitations`);

            // Attach event listeners
            attachInvitationListeners();

        } catch (error) {
            console.error('[Network] Error loading invitations:', error);
            
            SkeletonLoader.showErrorState(
                INVITATIONS_CONTAINER_ID,
                'Failed to load invitations. Please try again.',
                loadInvitations
            );
        }
    }

    /**
     * Show invitation skeletons
     * @param {number} count - Number of skeletons to show
     */
    function showInvitationsSkeleton(count = 5) {
        const container = document.getElementById(INVITATIONS_CONTAINER_ID);
        if (!container) return;

        const skeletonHTML = `
            <div class="skeleton-invitation-card">
                <div class="skeleton skeleton-invitation-avatar"></div>
                <div class="skeleton-invitation-content">
                    <div class="skeleton skeleton-invitation-meta"></div>
                    <div class="skeleton skeleton-invitation-name"></div>
                    <div class="skeleton skeleton-invitation-message"></div>
                    <div class="skeleton skeleton-invitation-time"></div>
                </div>
                <div class="skeleton-invitation-actions">
                    <div class="skeleton skeleton-invitation-btn"></div>
                    <div class="skeleton skeleton-invitation-btn"></div>
                </div>
            </div>
        `;

        container.innerHTML = skeletonHTML.repeat(count);
    }

    // ==================== EVENT HANDLERS ====================

    /**
     * Attach event listeners to invitation cards
     */
    function attachInvitationListeners() {
        const container = document.getElementById(INVITATIONS_CONTAINER_ID);
        if (!container) return;

        // Event delegation for invitation actions
        container.addEventListener('click', async (e) => {
            const button = e.target.closest('.invitation-btn');
            if (!button) return;

            const action = button.dataset.action;
            const invitationId = button.dataset.invitationId;

            if (!invitationId) return;

            // Disable buttons during processing
            const card = button.closest('.invitation-card');
            const buttons = card.querySelectorAll('.invitation-btn');
            buttons.forEach(btn => btn.disabled = true);

            try {
                if (action === 'accept') {
                    await handleAcceptInvitation(invitationId, card);
                } else if (action === 'ignore') {
                    await handleIgnoreInvitation(invitationId, card);
                }
            } catch (error) {
                console.error(`[Network] Error ${action}ing invitation:`, error);
                Utils.showToast(`Failed to ${action} invitation`, 'error');
                // Re-enable buttons on error
                buttons.forEach(btn => btn.disabled = false);
            }
        });
    }

    /**
     * Handle accept invitation
     * @param {string} invitationId - Invitation ID
     * @param {HTMLElement} card - Card element
     */
    async function handleAcceptInvitation(invitationId, card) {
        console.log(`[Network] Accepting invitation: ${invitationId}`);

        await acceptInvitation(invitationId);
        
        // Show success feedback
        Utils.showToast('Invitation accepted!', 'success');
        
        // Remove card with animation
        card.style.opacity = '0';
        card.style.transform = 'translateX(100px)';
        card.style.transition = 'all 0.3s ease-out';
        
        setTimeout(() => {
            card.remove();
            
            // Update count
            const remaining = document.querySelectorAll('.invitation-card').length;
            updateInvitationsCount(remaining);
            
            // Show empty state if no more invitations
            if (remaining === 0) {
                SkeletonLoader.showEmptyState(
                    INVITATIONS_CONTAINER_ID,
                    'No more pending invitations'
                );
            }
        }, 300);
    }

    /**
     * Handle ignore invitation
     * @param {string} invitationId - Invitation ID
     * @param {HTMLElement} card - Card element
     */
    async function handleIgnoreInvitation(invitationId, card) {
        console.log(`[Network] Ignoring invitation: ${invitationId}`);

        await ignoreInvitation(invitationId);
        
        // Remove card with animation
        card.style.opacity = '0';
        card.style.transform = 'translateX(-100px)';
        card.style.transition = 'all 0.3s ease-out';
        
        setTimeout(() => {
            card.remove();
            
            // Update count
            const remaining = document.querySelectorAll('.invitation-card').length;
            updateInvitationsCount(remaining);
            
            // Show empty state if no more invitations
            if (remaining === 0) {
                SkeletonLoader.showEmptyState(
                    INVITATIONS_CONTAINER_ID,
                    'No more pending invitations'
                );
            }
        }, 300);
    }

    // ==================== INITIALIZATION ====================

    /**
     * Initialize network page
     */
    function init() {
        console.log('[Network] Initializing network page...');
        
        // Load both stats and invitations in parallel
        Promise.all([
            loadNetworkStats(),
            loadInvitations()
        ]).then(() => {
            console.log('[Network] Page fully loaded');
        });
    }

    // Start when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

})();