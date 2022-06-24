document.addEventListener("click", (e) => {
  let handle;
  if (e.target.matches(".handle")) handle = e.target;
  if (handle) {
    handleClick(handle);
  }
});
function handleClick(handle) {
  console.log(handle);
  const slider = handle.closest(".slider-container").querySelector(".slider");
  if (slider == null) return;
  const sliderIndex = parseInt(
    getComputedStyle(slider).getPropertyValue("--slider-index")
  );
  const maxIndex = parseInt(
    getComputedStyle(slider).getPropertyValue("--maxindex")
  );
  console.log(sliderIndex);
  if (handle.classList.contains("left-handle")) {
    if (sliderIndex)
      slider.style.setProperty("--slider-index", sliderIndex - 1);
  }
  if (handle.classList.contains("right-handle")) {
    if (sliderIndex < maxIndex)
      slider.style.setProperty("--slider-index", sliderIndex + 1);
  }
}
const interval = setInterval(() => {
  const homeSlider = document.querySelector(".HomeCarousel .slider");
  if (homeSlider == null) return;
  const sliderIndex = parseInt(
    getComputedStyle(homeSlider).getPropertyValue("--slider-index")
  );
  homeSlider.style.setProperty("--slider-index", (sliderIndex + 1) % 5);

  handleAnimation(sliderIndex);
}, 10000);

function handleAnimation(sliderIndex) {
  const Movies = document.querySelectorAll(".slider .Movie");
  Movies[sliderIndex].classList.remove("fade-in");
  Movies[(sliderIndex + 1) % 5].classList.add("fade-in");
}
