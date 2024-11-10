
/* AI Tool Usage Declaration:
 * 1. Layout and Design:
 *    - Grid layout suggestions from Claude AI
 *    - Color scheme optimization from Copilot
 * 2. Animations and Effects:
 *    - Image mask effect from Copilot
 * 3. Code Integration:
 *    - Code structure optimized with AI assistance
 *    - All content and core functionality written by myself
 */


// The implementation of this feature refers to and learns from the code in the following links:
// https://www.w3schools.com/howto/howto_css_image_modal.asp



document.addEventListener('DOMContentLoaded', function() {
    const modal = document.getElementById('imageModal');
    const modalImg = document.getElementById('modalImage');
    const closeBtn = document.getElementsByClassName('close')[0];
    
    // Add click event to all images
    document.querySelectorAll('.gallery-grid img').forEach(img => {
        img.addEventListener('click', function() {
            modal.classList.add('active');
            modalImg.src = this.src;
        });
    });
    
// Click the close button to close the modal box
    closeBtn.addEventListener('click', function() {
        modal.classList.remove('active');
    });
    
    // Click the background of the modal box to close
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            modal.classList.remove('active');
        }
    });
    
    // ESC key to close the modal box
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            modal.classList.remove('active');
        }
    });
});
