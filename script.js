const canvas = document.getElementById("canvas");
const context = canvas.getContext("2d");

const frameCount = 224;

// Set canvas size
function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener("resize", resizeCanvas);

// Generate image path
const currentFrame = (index) =>
  `images/ezgif-frame-${String(index).padStart(3, "0")}.jpg`;

const images = [];
const img = new Image();

// Preload images
for (let i = 1; i <= frameCount; i++) {
  const image = new Image();
  image.src = currentFrame(i);
  images.push(image);
}

// Draw first frame
img.src = currentFrame(1);
img.onload = () => {
  context.drawImage(img, 0, 0, canvas.width, canvas.height);
};

// Scroll animation
window.addEventListener("scroll", () => {
  const scrollTop = window.scrollY;
  const maxScrollTop = document.body.scrollHeight - window.innerHeight;
  const scrollFraction = scrollTop / maxScrollTop;

  const frameIndex = Math.min(
    frameCount - 1,
    Math.floor(scrollFraction * frameCount)
  );

  requestAnimationFrame(() => {
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.drawImage(images[frameIndex], 0, 0, canvas.width, canvas.height);
  });
});

