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
if (window.location.href.includes("notices")) {
    chrome.storage.sync.get("better_notices_enabled", function (obj) {
        if (obj.better_notices_enabled == true || obj.better_notices_enabled == undefined || obj.better_notices_enabled == null) {
            document.addEventListener('DOMContentLoaded', setupNoticeCards, false);

            function getTodayDateString() {
                const today = new Date();
                return today.toISOString().split('T')[0]; 
            }
        
            function dismissCard(cardContainer, card) {
        
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
                    chrome.storage.sync.get(['deleted-today-notices'], function(result) {
                        const dismissedCards = result['deleted-today-notices'] || [];
                        const noticeCards = document.querySelectorAll('.col-12.mb-3');
        
                        noticeCards.forEach(cardContainer => {
        
                            const card = cardContainer.querySelector('.card');
                            if (!card || card.querySelector('.card-close-btn')) return; 
        
                            if (isCardDismissed(card, dismissedCards)) {
                                cardContainer.style.display = "none";
                                return;
                            }
        
                            card.style.position = 'relative';
        
                            const page_title_notices = document.querySelector(".page-title-buttons");
                            if (page_title_notices) {
                                var viewTodayButton = null;
                                for (const element of page_title_notices.querySelectorAll("a")) {
                                    if (element.textContent.includes("View Today")) {
                                        viewTodayButton = true;
                                    }
                                }
                            }
                            if (!viewTodayButton) {
                                const style = document.createElement('style');
                                style.textContent = `
                                    .card-close-btn {
                                        position: absolute;
                                        top: 8px;
                                        right: 8px;
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
                                        transition: all 0.2s;
                                        opacity: 0;
                                        box-shadow: 0 1px 3px rgba(0,0,0,0.1);
                                        font-size: 14px;
                                        color: #555;
                                    }
                                    .card:hover .card-close-btn {
                                        opacity: 1;
                                    }
                                    .card-close-btn:hover {
                                        background-color: #f8d7da;
                                        color: #721c24;
                                        transform: scale(1.1);
                                    }
                                    .card-swipe-out {
                                        animation: swipeRight 0.225s forwards;
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
                                    .fade-in-notice-tip {
                                        animation: fade 1s;
                                    }
                                    @keyframes fade {
                                        from {
                                            opacity: 1;
                                        }
                                        to {
                                            opacity: 0;
                                        }
                                    }
                                `;
                                document.head.appendChild(style);
        
                                const closeBtn = document.createElement('button');
                                closeBtn.className = 'card-close-btn';
                                closeBtn.innerHTML = '×';
                                closeBtn.title = 'Dismiss notice';
        
                                card.appendChild(closeBtn);
        
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
        
                                    if (diff > 0) {
                                        card.style.transform = `translateX(${diff}px)`;
                                    }
                                }, {passive: true});
        
                                card.addEventListener('touchend', (e) => {
                                    touchEndX = e.changedTouches[0].screenX;
                                    const swipeDistance = touchEndX - touchStartX;
        
                                    if (swipeDistance > 100) {
                                        dismissCard(cardContainer, card);
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
        
                                    if (diff > 5) {
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
                                        } else {
        
                                            card.style.transform = 'translateX(0)';
                                        }
                                    }
                                });
                            }
                        });
                    });
                });
            }
        
            const observer = new MutationObserver(setupNoticeCards);
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
                    var viewTodayButton = null;
                    for (const element of page_title_notices.querySelectorAll("a")) {
                        if (element.textContent.includes("View Today")) {
                            viewTodayButton = true;
                        }
                    }
                    if (!viewTodayButton) {
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
                                    noticeTip.style.display = "none";
                                }, 500);
                            }, 1000);
                        }, 5000);
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
                        dismissAllBtn.style.color = 'white';
                        dismissAllBtn.style.marginRight = '8px';
                        dismissAllBtn.setAttribute('style', 'background-color: #8B0000 !important');
            
                        dismissAllBtn.addEventListener('click', function(e) {
                            e.preventDefault();
            
                            const noticeCards = document.querySelectorAll('.col-12.mb-3');
                            const cardsToSave = [];
                            const today = getTodayDateString();
            
                            noticeCards.forEach(cardContainer => {
                                const card = cardContainer.querySelector('.card');
                                if (card && cardContainer.style.display !== 'none') {
            
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
            
                        page_title_notices.insertBefore(dismissAllBtn, page_title_notices.firstChild);
                        page_title_notices.insertBefore(restoreBtn, page_title_notices.firstChild);
                    }
                }
        });
            }
    });
}