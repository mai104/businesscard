/**
 * Bcaitech Digital Business Card
 * Interactive functions and animations
 */
document.addEventListener('DOMContentLoaded', function() {
    // Initialize interactive elements and animations
    setupCardInteractions();
    
    /**
     * Set up interactive elements on the card
     */
    function setupCardInteractions() {
        // Save contact button
        const saveContactBtn = document.querySelector('.save-contact');
        if (saveContactBtn) {
            saveContactBtn.addEventListener('click', saveContact);
            
            // Add ripple effect to save button
            saveContactBtn.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-2px)';
                this.style.boxShadow = '0 6px 20px rgba(0,0,0,0.2)';
            });
            
            saveContactBtn.addEventListener('mouseleave', function() {
                this.style.transform = '';
                this.style.boxShadow = '';
            });
        }
        
        // Contact items hover effects
        const contactItems = document.querySelectorAll('.contact-item');
        contactItems.forEach(item => {
            item.addEventListener('mouseenter', function() {
                this.style.transform = 'translateX(5px)';
                this.style.backgroundColor = 'rgba(0,0,0,0.02)';
                this.style.borderRadius = '8px';
                
                // Change icon color and background
                const icon = this.querySelector('.icon');
                if (icon) {
                    icon.style.backgroundColor = '#8B0000';
                    icon.style.color = 'white';
                    icon.style.transform = 'scale(1.1)';
                }
            });
            
            item.addEventListener('mouseleave', function() {
                this.style.transform = '';
                this.style.backgroundColor = '';
                this.style.borderRadius = '';
                
                // Reset icon styles
                const icon = this.querySelector('.icon');
                if (icon) {
                    icon.style.backgroundColor = '';
                    icon.style.color = '';
                    icon.style.transform = '';
                }
            });
        });
        
        // WhatsApp link
        const whatsappElements = document.querySelectorAll('.whatsapp-item, .whatsapp-block');
        whatsappElements.forEach(el => {
            el.addEventListener('click', openWhatsApp);
        });
        
        // Website link
        const websiteElements = document.querySelectorAll('.website-item, .website-block');
        websiteElements.forEach(el => {
            el.addEventListener('click', openWebsite);
        });
        
        // Email elements
        const emailElements = document.querySelectorAll('.email-item, .email-block, .elegant-contact-item:nth-child(1)');
        emailElements.forEach(el => {
            el.addEventListener('click', sendEmail);
        });
        
        // Phone elements
        const phoneElements = document.querySelectorAll('.phone-item, .phone-block, .elegant-contact-item:nth-child(2)');
        phoneElements.forEach(el => {
            el.addEventListener('click', callPhone);
        });
        
        // Profile picture and logo hover effects for classic template
        const classicCard = document.querySelector('.classic-card');
        if (classicCard) {
            const profileCircle = classicCard.querySelector('.profile-circle');
            if (profileCircle) {
                profileCircle.addEventListener('mouseenter', function() {
                    this.style.transform = 'scale(1.05)';
                    this.style.borderColor = '#b10000';
                });
                
                profileCircle.addEventListener('mouseleave', function() {
                    this.style.transform = '';
                    this.style.borderColor = '';
                });
            }
            
            const logoContainer = classicCard.querySelector('.company-logo-container');
            if (logoContainer) {
                logoContainer.addEventListener('mouseenter', function() {
                    this.style.transform = 'translateY(-5px)';
                    this.style.boxShadow = '0 6px 12px rgba(0,0,0,0.15)';
                });
                
                logoContainer.addEventListener('mouseleave', function() {
                    this.style.transform = '';
                    this.style.boxShadow = '';
                });
            }
            
            const name = classicCard.querySelector('.name');
            if (name) {
                name.addEventListener('mouseenter', function() {
                    this.style.color = '#8B0000';
                });
                
                name.addEventListener('mouseleave', function() {
                    this.style.color = '';
                });
            }
        }
    }
    
    function saveContact() {
    // Get the closest business card parent element
    var card = this.closest('.business-card');
    
    // Extract data from card
    var name = '';
    var positionFull = '';
    var position = '';
    var company = '';
    var email = '';
    var phone = '';
    var description = '';
    
    // Get name
    if (card.querySelector('.name')) {
      name = card.querySelector('.name').textContent;
    }
    
    // Get position and company
    if (card.querySelector('.position')) {
      positionFull = card.querySelector('.position').textContent;
      if (positionFull.includes(' - ')) {
        position = positionFull.split(' - ')[0];
        company = positionFull.split(' - ')[1];
      } else {
        position = positionFull;
        company = '';
      }
    }
    
    // Get email
    if (card.querySelector('.email')) {
      email = card.querySelector('.email').textContent;
    }
    
    // Get phone
    if (card.querySelector('.phone')) {
      phone = card.querySelector('.phone').textContent;
    }
    
    // Get description
    if (card.querySelector('.description')) {
      description = card.querySelector('.description').textContent;
    }
    
    // Check for WhatsApp and Website
    var hasWhatsapp = false;
    var hasWebsite = false;
    
    // Check WhatsApp
    var whatsappItem = card.querySelector('.whatsapp-item');
    if (whatsappItem && whatsappItem.style.display !== 'none') {
      hasWhatsapp = true;
    }
    
    // Check Website
    var websiteItem = card.querySelector('.website-item');
    if (websiteItem && websiteItem.style.display !== 'none') {
      hasWebsite = true;
    }
    
    // Create vCard content array
    var vCardContent = [];
    
    // Add mandatory fields
    vCardContent.push("BEGIN:VCARD");
    vCardContent.push("VERSION:3.0");
    vCardContent.push("FN:" + name);
    
    // Add company if available
    if (company) {
      vCardContent.push("ORG:" + company);
    }
    
    // Add position if available
    if (position) {
      vCardContent.push("TITLE:" + position);
    }
    
    // Add email if available
    if (email) {
      vCardContent.push("EMAIL:" + email);
    }
    
    // Add phone if available
    if (phone) {
      vCardContent.push("TEL;TYPE=WORK,VOICE:" + phone);
    }
    
    // Add WhatsApp if available
    if (hasWhatsapp && phone) {
      vCardContent.push("TEL;TYPE=CELL,VOICE:" + phone);
    }
    
    // Add website if available
    if (hasWebsite) {
      vCardContent.push("URL:https://www.example.com");
    }
    
    // Add description if available
    if (description) {
      vCardContent.push("NOTE:" + description);
    }
    
    // Add end of vCard
    vCardContent.push("END:VCARD");
    
    // Using String.fromCharCode for newline character
    var newline = String.fromCharCode(10);
    var finalVCard = vCardContent.join(newline);
    
    // Create a downloadable file
    var blob = new Blob([finalVCard], { type: "text/vcard" });
    var url = window.URL.createObjectURL(blob);
    
    // Create download link
    var a = document.createElement("a");
    a.href = url;
    a.download = name.replace(/s+/g, "_") + "_contact.vcf";
    
    // Append to body, click and remove
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    
    // Release URL object
    window.URL.revokeObjectURL(url);
    
    // Show success alert in Arabic
    alert("تم حفظ جهة الاتصال بنجاح! تحقق من مجلد التنزيلات الخاص بك.");
  }
    
    /**
     * Open WhatsApp with the contact number
     */
    function openWhatsApp() {
        window.open('https://wa.me/+201025542665');
    }
    
    /**
     * Open website URL
     */
    function openWebsite() {
        window.open('https://example.com');
    }
    
    /**
     * Send email to contact
     */
    function sendEmail() {
        window.location.href = 'mailto:john.doe@example.com';
    }
    
    /**
     * Call phone number
     */
    function callPhone() {
        window.location.href = 'tel:+1234567890';
    }
    
    // Add animation when page loads
    const card = document.querySelector('.business-card');
    if (card) {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        
        setTimeout(() => {
            card.style.transition = 'all 0.5s ease';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, 100);
    }
});