// AI Tool Usage Declaration:
// 1. Layout and Design:
//    - Color scheme optimization from Copilot
// 2. Animations and Effects:
//    - Scroll animations from Claude AI
// 3. Code Integration:
//    - Code structure optimized with AI assistance
//    - All content and core functionality written by myself

/* Page color gradient animation from AI tools and CSS3D library

 * Color gradient function:
 * - Based on Claude AI's suggestions

 * Theme color change:
 * - Reference from CSS3D Material Library and AI tools
 * - https://threejs.org/examples/#css3d_periodictable

 * Back to top button:
 * - Based on common web implementation patterns

 * Code integration and optimization:!!!important notice!!!
 * - Assisted by Claude AI and co-pilot

 * License: MIT
 * Last Modified: [9/11/2024]
 */


// Get the theme-color meta tag in HTML for controlling the browser tab color(form AI tools and CSS3D library)
const themeColorMeta = document.querySelector('meta[name="theme-color"]');
let currentColor = themeColorMeta.getAttribute('content');

// Easing function - Make the color change appear to slow down first, then speed up, and then slow down again
// t is the time progress (between 0 and 1)
function easeInOutCubic(t) {
    return t < 0.5
        ? 4 * t * t * t // First half uses cubic acceleration
        : 1 - Math.pow(-2 * t + 2, 3) / 2; // Second half uses cubic deceleration
}

// Convert hex color to RGB object
// For example: #ff0000 -> {r: 255, g: 0, b: 0}
function hexToRgb(hex) {
    // Handle shorthand hex colors like #fff -> #ffffff
    const shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
    hex = hex.replace(shorthandRegex, (m, r, g, b) => r + r + g + g + b + b);

    // Parse full hex color
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
    } : null;
}

// Convert RGB color to hex format
// For example: (255, 0, 0) -> #ff0000
function rgbToHex(r, g, b) {
    return `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)}`;
}

// Color gradient animation function
function smoothColorTransition(fromColor, toColor) {
    const from = hexToRgb(fromColor); // Start color
    const to = hexToRgb(toColor);     // Target color
    const duration = 6; // Animation duration (milliseconds)
    const startTime = performance.now(); // Record animation start time

    // Animation update function
    function update(currentTime) {
        const elapsed = currentTime - startTime; // Elapsed time
        const rawProgress = Math.min(elapsed / duration, 1); // Raw progress (0-1)

        // Apply easing function to make the animation smoother
        const progress = easeInOutCubic(rawProgress);

        // Calculate current color value
        const r = Math.round(from.r + (to.r - from.r) * progress);
        const g = Math.round(from.g + (to.g - from.g) * progress);
        const b = Math.round(from.b + (to.b - from.b) * progress);

        // Set new color value
        const currentColor = rgbToHex(r, g, b);
        themeColorMeta.setAttribute('content', currentColor);

        // If animation is not completed, continue to the next frame
        if (rawProgress < 1) {
            requestAnimationFrame(update);
        }
    }

    requestAnimationFrame(update);
}

// Define throttle function
function throttle(func, limit) {
    let inThrottle;
    return function(...args) {
        if (!inThrottle) {
            func.apply(this, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    }
}

// Simplified color definition to only two parts
const sections = [
    { selector: '.header-section', color: '#ffec1c' },
    { selector: '.main-text-section', color: '#000000' }
];

// Update Color Function
const updateThemeColor = throttle(() => {
    const scrollPosition = window.scrollY + 51;
    const headerSection = document.querySelector('.header-section');
    const mainSection = document.querySelector('.main-text-section');

    if (!headerSection || !mainSection) return;

    const headerRect = headerSection.getBoundingClientRect();
    const headerBottom = window.scrollY + headerRect.bottom;

// Simplify judgment logic: Switch between the header area and the main area only
    if (scrollPosition <= headerBottom) {
        if (currentColor !== sections[0].color) {
            smoothColorTransition(currentColor, sections[0].color);
            currentColor = sections[0].color;
        }
    } else {
        if (currentColor !== sections[1].color) {
            smoothColorTransition(currentColor, sections[1].color);
            currentColor = sections[1].color;
        }
    }
}, 150);

// Add scroll event listener
window.addEventListener('scroll', updateThemeColor);



// Initialize when the page loads
document.addEventListener('DOMContentLoaded', () => {
    themeColorMeta.setAttribute('content', sections[0].color);
    currentColor = sections[0].color;
});



// Back to top button function
document.addEventListener('DOMContentLoaded', function() {
    const backToTopButton = document.getElementById('backToTop');

    // Listen to scroll events
    window.addEventListener('scroll', function() {
        // When the page scrolls over 300px, show the button
        if (window.pageYOffset > 300) {
            backToTopButton.classList.add('show');
        } else {
            backToTopButton.classList.remove('show');
        }
    });

    // Click button to scroll to top
    backToTopButton.addEventListener('click', function() {
        // Use smooth scrolling effect
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
});

// Footer BU website link click event
document.getElementById('buLink').addEventListener('click', function() {
    this.classList.add('visited');
});
