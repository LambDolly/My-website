

/* ！Reference declaration! All mouse style code sources: https://codepen.io/fuzionix/pen/PoRWVRg
These codes are completely open-source materials, not from other websites, and can be used commercially without any copyright issues.
*/


// Define the mouse pointer class
class ArrowPointer {
	// Constructor, initialize the mouse pointer
	constructor() {
		// Get document body
		this.root = document.body
		// Get mouse pointer element
		this.cursor = document.querySelector(".curzr-arrow-pointer")

		// Set pointer size
		this.cursorSize = 20

		// Configuration for performance optimization
		this.position = {
			x: 0,
			y: 0
		}

		// Define the pointer style object
		this.cursorStyle = {
			boxSizing: 'border-box',          // Set box model
			position: 'fixed',                // Fixed positioning
			top: '0',                         // Top position
			left: '0',                        // Left position
			transform: 'translate3d(-50%, -50%, 0) rotate(-45deg)', // Center positioning and rotate 45 degrees
			zIndex: '2147483647',             // Highest layer
			width: `${this.cursorSize}px`,    // Pointer width
			height: `${this.cursorSize}px`,   // Pointer height
			willChange: 'transform',          // Optimize transform performance
			pointerEvents: 'none',            // Disable mouse events
			transition: 'none'  // Remove transition effect to reduce trailing
		}

		// Initialize pointer style and bind events
		this.init(this.cursor, this.cursorStyle)
		this.bind()
	}

	// Initialization method: apply styles and display the pointer
	init(el, style) {
		// Apply style object to element
		Object.assign(el.style, style)
		// Remove hidden attribute
		this.cursor.removeAttribute("hidden")
	}

	// Bind mouse move event
	bind() {
		// Use requestAnimationFrame to optimize rendering
		const render = () => {
			this.cursor.style.transform = `translate(${this.position.x}px, ${this.position.y}px) rotate(-45deg)`
			requestAnimationFrame(render)
		}
		requestAnimationFrame(render)

		// Use throttle function to handle mouse movement events
		let frame
		document.addEventListener('mousemove', (e) => {
			// Cancel the update of the previous frame
			if (frame) {
				cancelAnimationFrame(frame)
			}
			
			frame = requestAnimationFrame(() => {
				this.position.x = e.clientX
				this.position.y = e.clientY
			})
		}, { passive: true }) // Add passive flag to improve performance
	}
}

// Initialization function
function init() {
	// Create pointer element
	var div = document.createElement('div');
	// Set class name
	div.className = 'curzr-arrow-pointer';
	// Initially hidden
	div.hidden = true;
	// Set SVG icon
	div.innerHTML = `
	<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
		<path class="inner" d="M25,30a5.82,5.82,0,0,1-1.09-.17l-.2-.07-7.36-3.48a.72.72,0,0,0-.35-.08.78.78,0,0,0-.33.07L8.24,29.54a.66.66,0,0,1-.2.06,5.17,5.17,0,0,1-1,.15,3.6,3.6,0,0,1-3.29-5L12.68,4.2a3.59,3.59,0,0,1,6.58,0l9,20.74A3.6,3.6,0,0,1,25,30Z" fill="#F2F5F8" />
		<path class="outer" d="M16,3A2.59,2.59,0,0,1,18.34,4.6l9,20.74A2.59,2.59,0,0,1,25,29a5.42,5.42,0,0,1-.86-.15l-7.37-3.48a1.84,1.84,0,0,0-.77-.17,1.69,1.69,0,0,0-.73.16l-7.4,3.31a5.89,5.89,0,0,1-.79.12,2.59,2.59,0,0,1-2.37-3.62L13.6,4.6A2.58,2.58,0,0,1,16,3m0-2h0A4.58,4.58,0,0,0,11.76,3.8L2.84,24.33A4.58,4.58,0,0,0,7,30.75a6.08,6.08,0,0,0,1.21-.17,1.87,1.87,0,0,0,.4-.13L16,27.18l7.29,3.44a1.64,1.64,0,0,0,.39.14A6.37,6.37,0,0,0,25,31a4.59,4.59,0,0,0,4.21-6.41l-9-20.75A4.62,4.62,0,0,0,16,1Z" fill="#111920" />
	</svg>`;

	// Add pointer element to document
	document.body.appendChild(div);
	// Create and initialize pointer instance
	new ArrowPointer();
}

// Initialize after DOM is loaded
if (document.readyState === 'loading') {
	document.addEventListener('DOMContentLoaded', init);
} else {
	init(); // If DOM is already loaded, initialize directly
}

