/*
    BetterKMR for Chrome
    Copyright (C) 2025 InterLabs

    This program is free software: you can redistribute it and/or modify
    it under the terms of the GNU Affero General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU Affero General Public License for more details.

    You should have received a copy of the GNU Affero General Public License
    along with this program.  If not, see <http://www.gnu.org/licenses/>.
*/

/* notices.js - src/modules/notices.js */
// lol i cannot guarantee this code is mine. it just works though thats what counts right?
if (window.location.href.includes("notices")) {
    chrome.storage.sync.get("better_notices_enabled", function (obj) {
        if (obj.better_notices_enabled == true || obj.better_notices_enabled == undefined || obj.better_notices_enabled == null) {
            document.addEventListener('DOMContentLoaded', setupNoticeCards, false);

                var total = 0;
                for (const item of document.querySelector('.row').children) {
                    if (item.classList.contains("col-12") && item.classList.contains("mb-3")) {
                        total += 1;
                    }
                }
                if (total > 0) {
                    const totalAmount = document.createElement('p');
                    totalAmount.style = "margin-top: 10px;text-align: center; color: #fff; text-shadow: 1px 1px rgb(0, 0, 0);";
                    totalAmount.textContent = `Total amount of notices: ${total}`;
                    const rowElement = document.querySelector('.row');
                    if (rowElement) {
                        rowElement.parentElement.appendChild(totalAmount);
                    }
                }

            function getTodayDateString() {
                const today = new Date();
                return today.toISOString().split('T')[0]; 
            }

            const style = document.createElement('style');
            style.textContent = `
                .card-close-btn, .card-pin-btn {
                    position: absolute;
                    top: 8px;
                    background-color: rgba(240, 240, 240, 0.8);
                    border: none;
                    border-radius: 50%;
                    width: 22px;
                    height: 22px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    cursor: pointer;
                    z-index: 10;
                    transition: opacity 0.2s;
                    opacity: 0;
                    box-shadow: 0 1px 3px rgba(0,0,0,0.1);
                    font-size: 14px;
                    color: #555;
                }
                .card-close-btn {
                    right: 8px;
                }
                .card-pin-btn {
                    right: 38px;
                }
                .card-pin-btn.pinned {
                    right: 8px; 
                }

                .card:hover .card-close-btn, 
                .card:hover .card-pin-btn, 
                .card-pinned .card-pin-btn {
                    opacity: 1;
                }

                .card-close-btn *, .card-pin-btn * {
                    pointer-events: none;
                }
                .card-close-btn:hover {
                    background-color: #f8d7da;
                    color: #721c24;
                    transform: scale(1.1);
                }
                .card-pin-btn:hover {
                    background-color: #fff3cd;
                    color: #856404;
                    transform: scale(1.1);
                }
                .card-swipe-out {
                    animation: swipeRight 0.225s forwards;
                }
                .card-pinned {
                    border-left: 3px solid #ffc107 !important;
                    box-shadow: 0 0 8px rgba(255, 193, 7, 0.3) !important;
                }
                .card-pin-btn.pinned {
                    background-color: #ffc107;
                    color: #fff;
                    opacity: 1 !important; 
                }
                .card {
                    transition: transform 0.25s ease;
                    position: relative;
                }
                .card-header, .card-title {
                    cursor: grab;
                }
                .card-header.dragging, .card-title.dragging {
                    cursor: grabbing;
                }
                @keyframes swipeRight {
                    to {
                        transform: translateX(100%);
                        opacity: 0;
                    }
                }
                @keyframes swipeLeft {
                    to {
                        transform: translateX(-10px);
                        opacity: 1;
                    }
                }
                #dismiss-all-btn {
                    color: #fff !important;
                }
            `;
            document.head.appendChild(style);

            var sortInProgress = false;
            function sortNoticesByPinned() {

                if (sortInProgress) return;
                sortInProgress = true;

                const noticesContainer = document.querySelector('.col-12.mb-3')?.parentElement;
                if (!noticesContainer) {
                    sortInProgress = false;
                    return;
                }

                const noticeCards = Array.from(noticesContainer.querySelectorAll('.col-12.mb-3'));
                if (noticeCards.length <= 1) {
                    sortInProgress = false;
                    return; 
                }

                if (window.noticeObserver) {
                    window.noticeObserver.disconnect();
                }

                noticeCards.sort((a, b) => {
                    const aIsPinned = a.querySelector('.card.card-pinned') !== null;
                    const bIsPinned = b.querySelector('.card.card-pinned') !== null;

                    if (aIsPinned && !bIsPinned) return -1; 
                    if (!aIsPinned && bIsPinned) return 1;  

                    return 0;
                });

                noticeCards.forEach(card => {
                    noticesContainer.appendChild(card);
                });

                if (window.noticeObserver) {
                    window.noticeObserver.observe(document.body, { childList: true, subtree: true });
                }

                setTimeout(() => {
                    sortInProgress = false;
                }, 100);
            }

            function pinCard(card, isPinned) {
                const cardContainer = card.closest('.col-12.mb-3');
                const pinBtn = card.querySelector('.card-pin-btn');
                const closeBtn = card.querySelector('.card-close-btn');

                const cardInfo = {
                    title: card.querySelector('.card-title')?.textContent?.trim() || '',
                    text: card.querySelector('.card-text')?.textContent?.trim() || '',
                    teacher: card.querySelector('.card-subtitle.text-muted')?.textContent?.trim() || '',
                    badge: card.querySelector('.badge')?.textContent?.trim() || ''
                };

                chrome.storage.sync.get(['pinned-notices'], function(result) {
                    let pinnedCards = result['pinned-notices'] || [];

                    if (isPinned) {
                        const alreadyPinned = pinnedCards.some(pinned => 
                            pinned.title === cardInfo.title && 
                            pinned.text === cardInfo.text &&
                            pinned.teacher === cardInfo.teacher
                        );

                        if (!alreadyPinned) {
                            pinnedCards.push(cardInfo);
                        }

                        card.classList.add('card-pinned');
                        pinBtn.classList.add('pinned');
                        pinBtn.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><!--!Font Awesome Free 6.7.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc.--><path d="M32 32C32 14.3 46.3 0 64 0L320 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-29.5 0 11.4 148.2c36.7 19.9 65.7 53.2 79.5 94.7l1 3c3.3 9.8 1.6 20.5-4.4 28.8s-15.7 13.3-26 13.3L32 352c-10.3 0-19.9-4.9-26-13.3s-7.7-19.1-4.4-28.8l1-3c13.8-41.5 42.8-74.8 79.5-94.7L93.5 64 64 64C46.3 64 32 49.7 32 32zM160 384l64 0 0 96c0 17.7-14.3 32-32 32s-32-14.3-32-32l0-96z"/></svg>';

                        if (closeBtn) closeBtn.style.display = 'none';
                    } else {
                        pinnedCards = pinnedCards.filter(pinned => 
                            pinned.title !== cardInfo.title || 
                            pinned.text !== cardInfo.text ||
                            pinned.teacher !== cardInfo.teacher
                        );

                        card.classList.remove('card-pinned');
                        pinBtn.classList.remove('pinned');
                        pinBtn.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><!--!Font Awesome Free 6.7.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc.--><path d="M32 32C32 14.3 46.3 0 64 0L320 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-29.5 0 11.4 148.2c36.7 19.9 65.7 53.2 79.5 94.7l1 3c3.3 9.8 1.6 20.5-4.4 28.8s-15.7 13.3-26 13.3L32 352c-10.3 0-19.9-4.9-26-13.3s-7.7-19.1-4.4-28.8l1-3c13.8-41.5 42.8-74.8 79.5-94.7L93.5 64 64 64C46.3 64 32 49.7 32 32zM160 384l64 0 0 96c0 17.7-14.3 32-32 32s-32-14.3-32-32l0-96z"/></svg>';

                        if (closeBtn) closeBtn.style.display = '';
                    }

                    chrome.storage.sync.set({'pinned-notices': pinnedCards}, function() {

                        setTimeout(() => sortNoticesByPinned(), 50);
                    });
                });
            }

            function isCardPinned(card, pinnedCards) {
                if (!pinnedCards || !pinnedCards.length) return false;

                const cardInfo = {
                    title: card.querySelector('.card-title')?.textContent?.trim() || '',
                    text: card.querySelector('.card-text')?.textContent?.trim() || '',
                    teacher: card.querySelector('.card-subtitle.text-muted')?.textContent?.trim() || ''
                };

                return pinnedCards.some(pinned => 
                    pinned.title === cardInfo.title && 
                    pinned.text === cardInfo.text &&
                    pinned.teacher === cardInfo.teacher
                );
            }

            function dismissCard(cardContainer, card) {
                chrome.storage.sync.get(['pinned-notices'], function(result) {
                    const pinnedCards = result['pinned-notices'] || [];

                    if (isCardPinned(card, pinnedCards)) {
                        card.style.transform = 'translateX(0)';
                        return;
                    }

                    const cardInfo = {
                        title: card.querySelector('.card-title')?.textContent?.trim() || '',
                        text: card.querySelector('.card-text')?.textContent?.trim() || '',
                        teacher: card.querySelector('.card-subtitle.text-muted')?.textContent?.trim() || '',
                        badge: card.querySelector('.badge')?.textContent?.trim() || '',
                        date: getTodayDateString()
                    };

                    chrome.storage.sync.get(['deleted-today-notices'], function(result) {
                        let dismissedCards = result['deleted-today-notices'] || [];
                        dismissedCards.push(cardInfo);
                        chrome.storage.sync.set({'deleted-today-notices': dismissedCards});
                    });

                    cardContainer.style.overflow = 'hidden';
                    card.classList.add('card-swipe-out');

                    setTimeout(() => {
                        cardContainer.style.display = "none";
                    }, 225);
                });
            }

            function isCardDismissed(card, dismissedCards) {
                if (!dismissedCards || !dismissedCards.length) return false;

                const cardInfo = {
                    title: card.querySelector('.card-title')?.textContent?.trim() || '',
                    text: card.querySelector('.card-text')?.textContent?.trim() || '',
                    teacher: card.querySelector('.card-subtitle.text-muted')?.textContent?.trim() || '',
                    badge: card.querySelector('.badge')?.textContent?.trim() || ''
                };

                return dismissedCards.some(dismissed => 
                    dismissed.title === cardInfo.title && 
                    dismissed.text === cardInfo.text &&
                    dismissed.teacher === cardInfo.teacher
                );
            }

            function cleanupExpiredNotices(callback) {
                const today = getTodayDateString();

                chrome.storage.sync.get(['deleted-today-notices'], function(result) {
                    let dismissedCards = result['deleted-today-notices'] || [];

                    const currentCards = dismissedCards.filter(card => card.date === today);

                    if (currentCards.length !== dismissedCards.length) {
                        chrome.storage.sync.set({'deleted-today-notices': currentCards}, callback);
                    } else if (callback) {
                        callback();
                    }
                });
            }

            function setupNoticeCards() {
                cleanupExpiredNotices(function() {
                    chrome.storage.sync.get(['deleted-today-notices', 'pinned-notices'], function(result) {
                        const dismissedCards = result['deleted-today-notices'] || [];
                        const pinnedCards = result['pinned-notices'] || [];
                        const noticeCards = document.querySelectorAll('.col-12.mb-3');

                        const page_title_notices = document.querySelector(".page-title-buttons");
                        let isViewingPastNotices = false;

                        if (page_title_notices) {
                            for (const element of page_title_notices.querySelectorAll("a")) {
                                if (element.textContent.includes("View Today")) {
                                    isViewingPastNotices = true;
                                    break;
                                }
                            }
                        }

                        noticeCards.forEach(cardContainer => {
                            const card = cardContainer.querySelector('.card');
                            if (!card || card.querySelector('.card-close-btn')) return; 

                            const isPinned = isCardPinned(card, pinnedCards);

                            if (isViewingPastNotices && !isPinned) {
                                return;
                            }

                            if (!isPinned && isCardDismissed(card, dismissedCards)) {
                                cardContainer.style.display = "none";
                                return;
                            }

                            card.style.position = 'relative';

                            const pinBtn = document.createElement('button');
                            pinBtn.className = 'card-pin-btn';
                            pinBtn.innerHTML = isPinned ? '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><!--!Font Awesome Free 6.7.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc.--><path d="M32 32C32 14.3 46.3 0 64 0L320 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-29.5 0 11.4 148.2c36.7 19.9 65.7 53.2 79.5 94.7l1 3c3.3 9.8 1.6 20.5-4.4 28.8s-15.7 13.3-26 13.3L32 352c-10.3 0-19.9-4.9-26-13.3s-7.7-19.1-4.4-28.8l1-3c13.8-41.5 42.8-74.8 79.5-94.7L93.5 64 64 64C46.3 64 32 49.7 32 32zM160 384l64 0 0 96c0 17.7-14.3 32-32 32s-32-14.3-32-32l0-96z"/></svg>' : '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><!--!Font Awesome Free 6.7.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc.--><path d="M32 32C32 14.3 46.3 0 64 0L320 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-29.5 0 11.4 148.2c36.7 19.9 65.7 53.2 79.5 94.7l1 3c3.3 9.8 1.6 20.5-4.4 28.8s-15.7 13.3-26 13.3L32 352c-10.3 0-19.9-4.9-26-13.3s-7.7-19.1-4.4-28.8l1-3c13.8-41.5 42.8-74.8 79.5-94.7L93.5 64 64 64C46.3 64 32 49.7 32 32zM160 384l64 0 0 96c0 17.7-14.3 32-32 32s-32-14.3-32-32l0-96z"/></svg>';
                            pinBtn.title = isPinned ? 'Unpin notice' : 'Pin notice';
                            if (isPinned) pinBtn.classList.add('pinned');

                            const closeBtn = document.createElement('button');
                            closeBtn.className = 'card-close-btn';
                            closeBtn.innerHTML = '×';
                            closeBtn.title = 'Dismiss notice';

                            if (isPinned) {
                                card.classList.add('card-pinned');
                                closeBtn.style.display = 'none';
                            }

                            card.appendChild(pinBtn);
                            card.appendChild(closeBtn);

                            if (!isViewingPastNotices || isPinned) {

                                pinBtn.addEventListener('click', (event) => {
                                    event.stopPropagation();
                                    const currentlyPinned = card.classList.contains('card-pinned');
                                    pinCard(card, !currentlyPinned);
                                });

                                closeBtn.addEventListener('click', (event) => {
                                    event.stopPropagation();
                                    dismissCard(cardContainer, card);
                                });

                                let touchStartX = 0;
                                let touchEndX = 0;

                                card.addEventListener('touchstart', (e) => {
                                    touchStartX = e.changedTouches[0].screenX;
                                }, {passive: true});

                                card.addEventListener('touchmove', (e) => {
                                    const currentX = e.changedTouches[0].screenX;
                                    const diff = currentX - touchStartX;

                                    card.style.transform = `translateX(${diff}px)`;
                                }, {passive: true});

                                card.addEventListener('touchend', (e) => {
                                    touchEndX = e.changedTouches[0].screenX;
                                    const swipeDistance = touchEndX - touchStartX;

                                    if (swipeDistance > 100) {
                                        dismissCard(cardContainer, card);
                                    } else if (swipeDistance < -100) {
                                        const currentlyPinned = card.classList.contains('card-pinned');
                                        pinCard(card, !currentlyPinned);
                                        card.style.transform = 'translateX(0)';
                                    } else {
                                        card.style.transform = 'translateX(0)';
                                    }
                                });

                                let isDragging = false;
                                let startX = 0;
                                let didMove = false;
                                let dragHandle = null;

                                const cardHeader = card.querySelector('.card-header');
                                const cardTitle = card.querySelector('.card-title');
                                const dragHandles = [cardHeader, cardTitle].filter(el => el);

                                if (dragHandles.length > 0) {
                                    dragHandles.forEach(handle => {
                                        handle.addEventListener('mousedown', (e) => {
                                            if (e.target.tagName === 'A' || e.target.closest('a') || 
                                                e.target.tagName === 'BUTTON' || e.target.closest('button')) {
                                                return; 
                                            }

                                            isDragging = true;
                                            startX = e.clientX;
                                            didMove = false;
                                            dragHandle = handle;
                                            dragHandle.classList.add('dragging');
                                            e.preventDefault();
                                        });
                                    });
                                } else {

                                    const dragArea = document.createElement('div');
                                    dragArea.style.position = 'absolute';
                                    dragArea.style.top = '0';
                                    dragArea.style.left = '0';
                                    dragArea.style.right = '0';
                                    dragArea.style.height = '40px';
                                    dragArea.style.cursor = 'grab';
                                    dragArea.style.zIndex = '1';
                                    card.appendChild(dragArea);

                                    dragArea.addEventListener('mousedown', (e) => {
                                        isDragging = true;
                                        startX = e.clientX;
                                        didMove = false;
                                        dragHandle = dragArea;
                                        dragHandle.style.cursor = 'grabbing';
                                        e.preventDefault();
                                    });
                                }

                                document.addEventListener('mousemove', (e) => {
                                    if (!isDragging) return;
                                    const diff = e.clientX - startX;

                                    if (Math.abs(diff) > 5) {
                                        didMove = true;
                                        card.style.transform = `translateX(${diff}px)`;
                                    }
                                });

                                document.addEventListener('mouseup', (e) => {
                                    if (!isDragging) return;

                                    isDragging = false;
                                    if (dragHandle) {
                                        dragHandle.classList.remove('dragging');
                                        if (dragHandle.style) dragHandle.style.cursor = 'grab';
                                    }

                                    if (didMove) {
                                        const swipeDistance = e.clientX - startX;

                                        if (swipeDistance > 100) {
                                            dismissCard(cardContainer, card);
                                        } else if (swipeDistance < -100) {
                                            const currentlyPinned = card.classList.contains('card-pinned');
                                            pinCard(card, !currentlyPinned);
                                            card.style.transform = 'translateX(0)';
                                        } else {
                                            card.style.transform = 'translateX(0)';
                                        }
                                    }
                                });
                            } else {

                                pinBtn.style.opacity = '0.3';
                                pinBtn.title = 'Cannot pin past notices';
                                pinBtn.style.cursor = 'not-allowed';
                                closeBtn.style.display = 'none';
                            }
                        });

                        setTimeout(() => sortNoticesByPinned(), 100);
                    });
                });
            }

            function addNoticeTip() {
                const container = document.querySelector(".page-title");
                container.insertAdjacentHTML("afterend", `<p style="text-align: center; color:rgb(218, 218, 218); text-shadow: 1px 1px rgb(0, 0, 0);" id="notice-tip">Tip: Drag the Title to the right or press the "X" button when hovering to close the notice.</p>`);

                setTimeout(() => {
                    const noticeTip = document.getElementById("notice-tip");

                    noticeTip.classList.add("fade-in-notice-tip");

                    setTimeout(() => {
                        noticeTip.style.transition = "opacity 0.5s ease-out, height 0.5s ease-out, margin 0.5s ease-out";
                        noticeTip.style.opacity = "0";
                        noticeTip.style.height = "0";
                        noticeTip.style.margin = "0";
                        setTimeout(() => {
                            noticeTip.remove();
                            chrome.storage.sync.set({"fade-in-notice-tip": true})
                        }, 500);
                    }, 1000);
                }, 5000);
            }

            chrome.storage.sync.get(["fade-in-notice-tip"]).then((result) => {
                if (!result["fade-in-notice-tip"]) {
                    addNoticeTip();
                }
            });

            const observer = new MutationObserver((mutations) => {

                const shouldProcess = mutations.some(mutation => {
                    return Array.from(mutation.addedNodes).some(node => {

                        return node.nodeType === 1 && 
                              (node.classList?.contains('card') || 
                               node.querySelector?.('.card:not(.card-pinned)'));
                    });
                });

                if (shouldProcess && !sortInProgress) {
                    setupNoticeCards();
                }
            });

            window.noticeObserver = observer;
            observer.observe(document.body, { childList: true, subtree: true });

            const calendarCard = document.querySelectorAll(".col-12:last-child")[0]?.parentElement?.parentElement;
            var rssLink = "";
            chrome.storage.sync.get("hide_rss_link_better_notices", function (rss_available) {
                if (!rss_available.hide_rss_link_better_notices == true) {
                    for (const element of calendarCard.querySelectorAll("p")) {
                        if (element.textContent.includes("RSS")) {
                        rssLink = `<a href="${element.querySelector("i").textContent}" target="_blank">Click here to subscribe to your school's RSS</a>`;
                        element.remove();
                        }
                    }
                }
                for (const element of calendarCard.querySelectorAll("p")) {
                    if (element.textContent.includes("RSS")) {
                    element.remove();
                    }
                }
                if (calendarCard) {
                    calendarCard.innerHTML += `
                    <p style="margin-top: 10px;text-align: center; color: #fff; text-shadow: 1px 1px rgb(0, 0, 0);"><img src="${/* webpackIgnore: true */ chrome.runtime.getURL("icon/icon_transparent_48.png")}" width="24px" height="24px"> Notices finished. You're all caught up!<br>${rssLink}</p>
                    `;
                }

                const page_title_notices = document.querySelector(".page-title-buttons");
                if (page_title_notices) {
                    let isViewingPastNotices = false;
                    for (const element of page_title_notices.querySelectorAll("a")) {
                        if (element.textContent.includes("View Today")) {
                            isViewingPastNotices = true;
                            break;
                        }
                    }

                    if (!isViewingPastNotices) {

                        const showTipBtn = document.createElement('a');
                        showTipBtn.href = 'javascript:void(0)';
                        showTipBtn.className = 'sk_btn btn active btn-sm';
                        showTipBtn.textContent = '🛈';
                        showTipBtn.setAttribute('style', 'background-color: #404040 !important; color: white !important; border-color: #ffffff !important;');
                        showTipBtn.addEventListener('click', function(e) {
                            e.preventDefault();
                            addNoticeTip();
                        });

                        const restoreBtn = document.createElement('a');
                        restoreBtn.href = 'javascript:void(0)';
                        restoreBtn.className = 'sk_btn btn active btn-sm';
                        restoreBtn.textContent = 'Restore';
                        restoreBtn.addEventListener('click', function(e) {
                            e.preventDefault();
                            chrome.storage.sync.set({'deleted-today-notices': []}, function() {
                                window.location.reload();
                            });
                        });

                        const dismissAllBtn = document.createElement('a');
                        dismissAllBtn.href = 'javascript:void(0)';
                        dismissAllBtn.className = 'sk_btn btn btn-sm';
                        dismissAllBtn.textContent = 'Dismiss All';
                        dismissAllBtn.setAttribute('id', "dismiss-all-btn");
                        dismissAllBtn.setAttribute('style', 'background-color: #8B0000 !important;');
                        dismissAllBtn.style.marginRight = '8px';

                        dismissAllBtn.addEventListener('click', function(e) {
                            e.preventDefault();

                            chrome.storage.sync.get(['pinned-notices'], function(result) {
                                const pinnedCards = result['pinned-notices'] || [];

                                const noticeCards = document.querySelectorAll('.col-12.mb-3');
                                const cardsToSave = [];
                                const today = getTodayDateString();

                                noticeCards.forEach(cardContainer => {
                                    const card = cardContainer.querySelector('.card');
                                    if (card && cardContainer.style.display !== 'none') {
                                        if (isCardPinned(card, pinnedCards)) {
                                            return;
                                        }

                                        const cardInfo = {
                                            title: card.querySelector('.card-title')?.textContent?.trim() || '',
                                            text: card.querySelector('.card-text')?.textContent?.trim() || '',
                                            teacher: card.querySelector('.card-subtitle.text-muted')?.textContent?.trim() || '',
                                            badge: card.querySelector('.badge')?.textContent?.trim() || '',
                                            date: today
                                        };
                                        cardsToSave.push(cardInfo);

                                        cardContainer.style.overflow = 'hidden';
                                        card.classList.add('card-swipe-out');

                                        setTimeout(() => {
                                            cardContainer.style.display = "none";
                                        }, 225);
                                    }
                                });

                                if (cardsToSave.length > 0) {
                                    chrome.storage.sync.get(['deleted-today-notices'], function(result) {
                                        let dismissedCards = result['deleted-today-notices'] || [];

                                        dismissedCards = dismissedCards.concat(cardsToSave);
                                        chrome.storage.sync.set({'deleted-today-notices': dismissedCards});
                                    });
                                }
                            });
                        });

                        page_title_notices.insertBefore(dismissAllBtn, page_title_notices.firstChild);
                        page_title_notices.insertBefore(restoreBtn, page_title_notices.firstChild);
                        page_title_notices.insertBefore(showTipBtn, page_title_notices.firstChild);
                    }
                }
        });
            }
    });
}