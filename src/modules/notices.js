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
                        pinBtn.innerHTML = '📌';

                        if (closeBtn) closeBtn.style.display = 'none';
                    } else {
                        pinnedCards = pinnedCards.filter(pinned => 
                            pinned.title !== cardInfo.title || 
                            pinned.text !== cardInfo.text ||
                            pinned.teacher !== cardInfo.teacher
                        );

                        card.classList.remove('card-pinned');
                        pinBtn.classList.remove('pinned');
                        pinBtn.innerHTML = '📍';

                        if (closeBtn) closeBtn.style.display = '';

                        const currentDate = getTodayDateString();
                        const dismissInfo = {...cardInfo, date: currentDate};

                        chrome.storage.sync.get(['deleted-today-notices'], function(result) {
                            let dismissedCards = result['deleted-today-notices'] || [];

                            const alreadyDismissed = dismissedCards.some(dismissed => 
                                dismissed.title === dismissInfo.title && 
                                dismissed.text === dismissInfo.text &&
                                dismissed.teacher === dismissInfo.teacher
                            );

                            if (!alreadyDismissed) {
                                dismissedCards.push(dismissInfo);
                                chrome.storage.sync.set({'deleted-today-notices': dismissedCards});
                            }
                        });
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
                            pinBtn.innerHTML = isPinned ? '📌' : '📍';
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

                        const restoreBtn = document.createElement('a');
                        restoreBtn.href = 'javascript:void(0)';
                        restoreBtn.className = 'sk_btn btn active btn-sm';
                        restoreBtn.textContent = 'Restore Today\'s Notices';

                        restoreBtn.addEventListener('click', function(e) {
                            e.preventDefault();
                            chrome.storage.sync.set({'deleted-today-notices': []}, function() {
                                window.location.reload();
                            });
                        });

                        const dismissAllBtn = document.createElement('a');
                        dismissAllBtn.href = 'javascript:void(0)';
                        dismissAllBtn.className = 'sk_btn btn btn-sm';
                        dismissAllBtn.textContent = 'Dismiss All Notices';
                        dismissAllBtn.setAttribute('style', 'background-color: #8B0000 !important');
                        dismissAllBtn.style.color = 'white';
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
                    }
                }
        });
            }
    });
}