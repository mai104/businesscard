/**
 * Modern Success Popup for Business Card
 */
document.addEventListener('DOMContentLoaded', function() {
    // Add popup HTML to the document
    addPopupHTML();
    
    // Add styles for popup
    addPopupStyles();
    
    // Override alert for contact saving
    const originalAlert = window.alert;
    window.alert = function(message) {
        if (message.includes("Contact") || message.includes("تم حفظ")) {
            showSuccessPopup();
        } else {
            originalAlert(message);
        }
    };
    
    /**
     * Add popup HTML structure
     */
    function addPopupHTML() {
        const popupHTML = `
            <div class="popup-overlay" id="successPopup">
                <div class="popup-content">
                    <div class="popup-wave"></div>
                    <div class="popup-close">&times;</div>
                    <div class="popup-icon-container">
                        <i class="fas fa-check popup-icon"></i>
                    </div>
                    <h3 class="popup-title">Contact saved successfully</h3>
                    <p class="popup-message">The contact card has been downloaded. Please check your Downloads folder</p>
                    <button class="popup-button">Done</button>
                </div>
            </div>
        `;
        
        // Add popup HTML to body
        const popupContainer = document.createElement('div');
        popupContainer.innerHTML = popupHTML;
        document.body.appendChild(popupContainer);
        
        // Setup event handlers
        const popup = document.getElementById('successPopup');
        const closeBtn = popup.querySelector('.popup-button');
        const closeX = popup.querySelector('.popup-close');
        
        closeBtn.addEventListener('click', closePopup);
        closeX.addEventListener('click', closePopup);
        popup.addEventListener('click', function(e) {
            if (e.target === popup) {
                closePopup();
            }
        });
        
        function closePopup() {
            popup.classList.remove('active');
        }
    }
    
    /**
     * Add popup styles
     */
    function addPopupStyles() {
        const styleElement = document.createElement('style');
        styleElement.textContent = `
            .popup-overlay {
                position: fixed;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                background-color: rgba(0, 0, 0, 0.7);
                display: flex;
                justify-content: center;
                align-items: center;
                z-index: 9999;
                opacity: 0;
                visibility: hidden;
                transition: all 0.3s ease;
            }
            
            .popup-overlay.active {
                opacity: 1;
                visibility: visible;
            }
            
            .popup-content {
                background: #fff;
                border-radius: 24px;
                box-shadow: 0 20px 40px rgba(0, 0, 0, 0.2);
                width: 300px;
                max-width: 90%;
                padding: 30px;
                text-align: center;
                position: relative;
                transform: translateY(30px) scale(0.95);
                opacity: 0;
                transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
            }
            
            .popup-overlay.active .popup-content {
                transform: translateY(0) scale(1);
                opacity: 1;
            }
            
            .popup-icon-container {
                width: 80px;
                height: 80px;
                margin: 0 auto 25px;
                border-radius: 50%;
                background: #ffe6e6;
                display: flex;
                justify-content: center;
                align-items: center;
            }
            
            .popup-icon {
                font-size: 35px;
                color: #8B0000;
                animation: popupIconAnim 1s cubic-bezier(0.175, 0.885, 0.32, 1.275);
            }
            
            @keyframes popupIconAnim {
                0% { transform: scale(0); }
                45% { transform: scale(1.25); }
                80% { transform: scale(0.95); }
                100% { transform: scale(1); }
            }
            
            .popup-title {
                font-size: 1.5rem;
                color: #333;
                font-weight: 700;
                margin-bottom: 12px;
            }
            
            .popup-message {
                color: #666;
                font-size: 1rem;
                line-height: 1.5;
                margin-bottom: 25px;
            }
            
            .popup-button {
                background: #8B0000;
                color: white;
                border: none;
                border-radius: 50px;
                padding: 12px 30px;
                font-size: 1rem;
                font-weight: 600;
                cursor: pointer;
                transition: all 0.3s ease;
                box-shadow: 0 4px 10px rgba(0, 64, 139, 0.3);
            }
            
            .popup-button:hover {
                background: #8B0000;
                transform: translateY(-2px);
                box-shadow: 0 6px 15px 8B0000;
            }
            
            .popup-close {
                position: absolute;
                top: 15px;
                right: 15px;
                width: 30px;
                height: 30px;
                background: #f5f5f5;
                border-radius: 50%;
                display: flex;
                justify-content: center;
                align-items: center;
                cursor: pointer;
                font-size: 18px;
                font-weight: bold;
                color: #999;
                transition: all 0.3s ease;
            }
            
            .popup-close:hover {
                background: #8B0000;
                color: white;
                transform: rotate(90deg);
            }
            
            .popup-wave {
                position: absolute;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                border-radius: 24px;
                overflow: hidden;
                pointer-events: none;
            }
            
            .popup-wave:before {
                content: "";
                position: absolute;
                top: 50%;
                left: 50%;
                width: 5px;
                height: 5px;
                opacity: 0;
                background: rgba(0, 64, 139, 0.3);
                border-radius: 50%;
                transform: translate(-50%, -50%);
            }
            
            .popup-overlay.active .popup-wave:before {
                animation: popup-ripple 1s ease-out;
            }
            
            @keyframes popup-ripple {
                0% { transform: translate(-50%, -50%) scale(1); opacity: 0.3; }
                100% { transform: translate(-50%, -50%) scale(100); opacity: 0; }
            }
        `;
        document.head.appendChild(styleElement);
    }
});

/**
 * Show success popup
 * This function can be called directly from other scripts
 */
function showSuccessPopup() {
    const popup = document.getElementById('successPopup');
    if (!popup) return;
    
    popup.classList.add('active');
    
    // Set content opacity after a small delay for animation
    setTimeout(() => {
        const content = popup.querySelector('.popup-content');
        if (content) content.style.opacity = 1;
    }, 10);
}