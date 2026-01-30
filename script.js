const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

const frameCount = 224;

// Canvas size
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Image path
const currentFrame = (index) =>
    `images/ezgif-frame-${String(index).padStart(3, "0")}.jpg`;

// Preload images
const images = [];
for (let i = 1; i <= frameCount; i++) {
    const img = new Image();
    img.src = currentFrame(i);
    images.push(img);
}

// Draw first frame
images[0].onload = () => {
    ctx.drawImage(images[0], 0, 0, canvas.width, canvas.height);
};

// Scroll-based animation
window.addEventListener("scroll", () => {
    const scrollTop = document.documentElement.scrollTop;
    const maxScroll =
        document.documentElement.scrollHeight - window.innerHeight;

    const scrollFraction = scrollTop / maxScroll;

    const frameIndex = Math.min(
        frameCount - 1,
        Math.floor(scrollFraction * frameCount)
    );

    requestAnimationFrame(() => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(
            images[frameIndex],
            0,
            0,
            canvas.width,
            canvas.height
        );
    });
});

// Resize support
window.addEventListener("resize", () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});
