document.addEventListener("DOMContentLoaded", () => {
    // Create the container for the rain
    const rainContainer = document.createElement("div");
    rainContainer.id = "golden-rain";
    document.body.appendChild(rainContainer);

    // Generate at least 100 particles as requested
    const dropCount = 120;

    for (let i = 0; i < dropCount; i++) {
        createDrop(rainContainer);
    }
});

function createDrop(container) {
    const drop = document.createElement("div");
    drop.classList.add("golden-drop");
    
    // Randomize properties for a dynamic, organic feel
    const left = Math.random() * 100;
    const width = Math.random() * 1.5 + 1; // 1px to 2.5px width
    const height = Math.random() * 80 + 40; // 40px to 120px height
    const duration = Math.random() * 2.5 + 1.5; // 1.5s to 4s falling speed
    const delay = Math.random() * 5; // 0s to 5s initial delay
    const opacity = Math.random() * 0.6 + 0.2; // 0.2 to 0.8 opacity
    
    // Setting styles safely
    drop.style.left = `${left}vw`;
    drop.style.width = `${width}px`;
    drop.style.height = `${height}px`;
    drop.style.animationDuration = `${duration}s`;
    drop.style.animationDelay = `${delay}s`;
    drop.style.setProperty('--drop-opacity', opacity);
    
    container.appendChild(drop);
}