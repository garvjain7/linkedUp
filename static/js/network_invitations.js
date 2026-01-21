/**
 * LinkedUp - Network Invitations Page Logic
 * Handles "Show All" invitations page with Received/Sent tabs
 */

(function() {
    'use strict';

    const RECEIVED_CONTAINER_ID = 'received-invitations-container';
    const SENT_CONTAINER_ID = 'sent-invitations-container';

    let currentTab = 'received'; // Track active tab

    // ==================== DATA FETCHING ====================

    /**
     * Fetch all received invitations
     * 
     * TODO: Replace with actual API endpoint
     * GET /api/v1/network/invitations/received/
     */
    async function fetchReceivedInvitations() {
        // ⚠️ PLACEHOLDER - Keep empty for now
        return new Promise((resolve) => {
            // Same format as network.js fetchInvitations()
        });
    }

    /**
     * Fetch sent invitations
     * 
     * TODO: Replace with actual API endpoint
     * GET /api/v1/network/invitations/sent/
     */
    async function fetchSentInvitations() {
        // ⚠️ PLACEHOLDER - Keep empty for now
        return new Promise((resolve) => {
            // Expected response format:
            // [
            //     {
            //         id: "inv_sent_1",
            //         recipient: {
            //             id: "user_456",
            //             name: "John Doe",
            //             avatar: "https://...",
            //             title: "Software Engineer"
            //         },
            //         status: "pending", // or "accepted", "ignored"
            //         created_at: "2024-01-14T15:00:00Z"
            //     }
            // ]
        });
    }

    /**
     * Withdraw sent invitation
     * 
     * TODO: Replace with actual API endpoint
     * DELETE /api/v1/network/invitations/{id}/withdraw/
     */
    async function withdrawInvitation(invitationId) {
        // ⚠️ PLACEHOLDER - Keep empty for now
        console.log(`[Invitations] Withdraw invitation: ${invitationId}`);
        return new Promise((resolve) => {});
    }

    // Use same accept/ignore functions from network.js via shared module pattern
    // Or re-import/redefine here if needed

    /**
     * Accept invitation (same as network.js)
     */
    async function acceptInvitation(invitationId) {
        console.log(`[Invitations] Accept invitation: ${invitationId}`);
        return new Promise((resolve) => {});
    }

    /**
     * Ignore invitation (same as network.js)
     */
    async function ignoreInvitation(invitationId) {
        console.log(`[Invitations] Ignore invitation: ${invitationId}`);
        return new Promise((resolve) => {});
    }

    // ==================== RENDERING ====================

    /**
     * Render received invitation card
     * @param {Object} invitation - Invitation object
     * @returns {string} HTML string
     */
    function renderReceivedInvitationCard(invitation) {
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
     * Render sent invitation card
     * @param {Object} invitation - Sent invitation object
     * @returns {string} HTML string
     */
    function renderSentInvitationCard(invitation) {
        const timeAgo = Utils.formatTimeAgo(invitation.created_at);
        const statusText = invitation.status === 'pending' ? 'Pending' : 
                          invitation.status === 'accepted' ? 'Accepted' : 'Declined';
        const statusClass = invitation.status === 'accepted' ? 'status-accepted' : 
                           invitation.status === 'ignored' ? 'status-declined' : '';

        return `
            <div class="invitation-card" data-invitation-id="${invitation.id}">
                <img src="${invitation.recipient.avatar}" 
                     alt="${Utils.escapeHtml(invitation.recipient.name)}" 
                     class="invitation-avatar">
                <div class="invitation-content">
                    <div class="invitation-name-row">
                        <span class="invitation-name">${Utils.escapeHtml(invitation.recipient.name)}</span>
                    </div>
                    ${invitation.recipient.title ? `
                        <div class="invitation-message">${Utils.escapeHtml(invitation.recipient.title)}</div>
                    ` : ''}
                    <div class="invitation-time">
                        Sent ${timeAgo} • <span class="${statusClass}">${statusText}</span>
                    </div>
                </div>
                ${invitation.status === 'pending' ? `
                    <div class="invitation-actions">
                        <button class="invitation-btn ignore-btn" 
                                data-action="withdraw" 
                                data-invitation-id="${invitation.id}">
                            Withdraw
                        </button>
                    </div>
                ` : ''}
            </div>
        `;
    }

    /**
     * Show invitation skeleton
     * @param {string} containerId - Container ID
     * @param {number} count - Number of skeletons
     */
    function showInvitationsSkeleton(containerId, count = 10) {
        const container = document.getElementById(containerId);
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
            </div>
        `;

        container.innerHTML = skeletonHTML.repeat(count);
    }

    // ==================== MAIN LOAD FUNCTIONS ====================

    /**
     * Load received invitations
     */
    async function loadReceivedInvitations() {
        console.log('[Invitations] Loading received invitations...');

        showInvitationsSkeleton(RECEIVED_CONTAINER_ID, 10);

        try {
            const invitations = await fetchReceivedInvitations();

            // Update count
            updateCount('all-count', invitations?.length || 0);

            if (!invitations || invitations.length === 0) {
                SkeletonLoader.showEmptyState(
                    RECEIVED_CONTAINER_ID,
                    'No pending invitations',
                    `<svg viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                    </svg>`
                );
                return;
            }

            const html = invitations.map(renderReceivedInvitationCard).join('');
            document.getElementById(RECEIVED_CONTAINER_ID).innerHTML = html;

            attachEventListeners();

            console.log(`[Invitations] Loaded ${invitations.length} received invitations`);

        } catch (error) {
            console.error('[Invitations] Error loading received:', error);
            SkeletonLoader.showErrorState(
                RECEIVED_CONTAINER_ID,
                'Failed to load invitations',
                loadReceivedInvitations
            );
        }
    }

    /**
     * Load sent invitations
     */
    async function loadSentInvitations() {
        console.log('[Invitations] Loading sent invitations...');

        showInvitationsSkeleton(SENT_CONTAINER_ID, 10);

        try {
            const invitations = await fetchSentInvitations();

            if (!invitations || invitations.length === 0) {
                SkeletonLoader.showEmptyState(
                    SENT_CONTAINER_ID,
                    'No sent invitations',
                    `<svg viewBox="0 0 24 24" fill="currentColor">
                        <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/>
                    </svg>`
                );
                return;
            }

            const html = invitations.map(renderSentInvitationCard).join('');
            document.getElementById(SENT_CONTAINER_ID).innerHTML = html;

            attachEventListeners();

            console.log(`[Invitations] Loaded ${invitations.length} sent invitations`);

        } catch (error) {
            console.error('[Invitations] Error loading sent:', error);
            SkeletonLoader.showErrorState(
                SENT_CONTAINER_ID,
                'Failed to load sent invitations',
                loadSentInvitations
            );
        }
    }

    /**
     * Update count display
     * @param {string} elementId - Element ID
     * @param {number} count - Count value
     */
    function updateCount(elementId, count) {
        const element = document.getElementById(elementId);
        if (element) {
            element.textContent = `(${count})`;
        }
    }

    // ==================== TAB SWITCHING ====================

    /**
     * Setup tab switching
     */
    function setupTabs() {
        const tabs = document.querySelectorAll('.invitation-tab');
        
        tabs.forEach(tab => {
            tab.addEventListener('click', () => {
                const tabName = tab.dataset.tab;
                switchTab(tabName);
            });
        });
    }

    /**
     * Switch between Received/Sent tabs
     * @param {string} tabName - 'received' or 'sent'
     */
    function switchTab(tabName) {
        currentTab = tabName;

        // Update tab buttons
        document.querySelectorAll('.invitation-tab').forEach(tab => {
            if (tab.dataset.tab === tabName) {
                tab.classList.add('active');
            } else {
                tab.classList.remove('active');
            }
        });

        // Update content visibility
        document.querySelectorAll('.tab-content').forEach(content => {
            content.classList.remove('active');
        });

        const activeContent = document.getElementById(`${tabName}-tab-content`);
        if (activeContent) {
            activeContent.classList.add('active');
        }

        // Load data if not already loaded
        if (tabName === 'sent') {
            const sentContainer = document.getElementById(SENT_CONTAINER_ID);
            if (sentContainer && sentContainer.children.length === 0) {
                loadSentInvitations();
            }
        }
    }

    // ==================== EVENT HANDLERS ====================

    /**
     * Attach event listeners to invitation cards
     */
    function attachEventListeners() {
        const containers = [RECEIVED_CONTAINER_ID, SENT_CONTAINER_ID];

        containers.forEach(containerId => {
            const container = document.getElementById(containerId);
            if (!container) return;

            container.addEventListener('click', async (e) => {
                const button = e.target.closest('.invitation-btn');
                if (!button) return;

                const action = button.dataset.action;
                const invitationId = button.dataset.invitationId;
                const card = button.closest('.invitation-card');

                if (!invitationId) return;

                // Disable buttons
                const buttons = card.querySelectorAll('.invitation-btn');
                buttons.forEach(btn => btn.disabled = true);

                try {
                    if (action === 'accept') {
                        await handleAccept(invitationId, card);
                    } else if (action === 'ignore') {
                        await handleIgnore(invitationId, card);
                    } else if (action === 'withdraw') {
                        await handleWithdraw(invitationId, card);
                    }
                } catch (error) {
                    console.error(`[Invitations] Error ${action}:`, error);
                    Utils.showToast(`Failed to ${action} invitation`, 'error');
                    buttons.forEach(btn => btn.disabled = false);
                }
            });
        });
    }

    /**
     * Handle accept invitation
     */
    async function handleAccept(invitationId, card) {
        await acceptInvitation(invitationId);
        Utils.showToast('Invitation accepted!', 'success');
        removeCard(card);
    }

    /**
     * Handle ignore invitation
     */
    async function handleIgnore(invitationId, card) {
        await ignoreInvitation(invitationId);
        removeCard(card);
    }

    /**
     * Handle withdraw invitation
     */
    async function handleWithdraw(invitationId, card) {
        await withdrawInvitation(invitationId);
        Utils.showToast('Invitation withdrawn', 'info');
        removeCard(card);
    }

    /**
     * Remove card with animation
     * @param {HTMLElement} card - Card element
     */
    function removeCard(card) {
        card.style.opacity = '0';
        card.style.transform = 'translateX(100px)';
        card.style.transition = 'all 0.3s ease-out';
        
        setTimeout(() => {
            card.remove();
            
            // Update count and check for empty state
            const containerId = currentTab === 'received' ? RECEIVED_CONTAINER_ID : SENT_CONTAINER_ID;
            const container = document.getElementById(containerId);
            const remaining = container.querySelectorAll('.invitation-card').length;
            
            updateCount('all-count', remaining);
            
            if (remaining === 0) {
                SkeletonLoader.showEmptyState(
                    containerId,
                    currentTab === 'received' ? 'No more pending invitations' : 'No sent invitations'
                );
            }
        }, 300);
    }

    // ==================== INITIALIZATION ====================

    /**
     * Initialize invitations page
     */
    function init() {
        console.log('[Invitations] Initializing invitations page...');
        
        setupTabs();
        loadReceivedInvitations();
    }

    // Start when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

})();