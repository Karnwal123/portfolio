// Typing Animation
const typingSpan = document.querySelector(".typing");
const words = [
  "Frontend Developer",
  "Backend Developer",
  "Full Stack Developer",
  "Problem Solver"
];
let wordIndex = 0, charIndex = 0, isDeleting = false;

function type() {
  const currentWord = words[wordIndex];
  const display = currentWord.substring(0, charIndex);
  typingSpan.textContent = display;

  if (!isDeleting && charIndex < currentWord.length) {
    charIndex++;
    setTimeout(type, 150); // Typing speed
  } else if (isDeleting && charIndex > 0) {
    charIndex--;
    setTimeout(type, 100); // Deleting speed
  } else {
    if (!isDeleting) {
      isDeleting = true;
      setTimeout(type, 1000); // Pause before deleting
    } else {
      isDeleting = false;
      wordIndex = (wordIndex + 1) % words.length; // Next word
      setTimeout(type, 500); // Pause before typing next word
    }
  }
}

document.addEventListener("DOMContentLoaded", type);

// Theme Toggle with LocalStorage
function toggleTheme() {
  document.body.classList.toggle("light-theme");
  const btn = document.getElementById("themeToggle");

  if (document.body.classList.contains("light-theme")) {
    localStorage.setItem("theme", "light");
    btn.innerHTML = '<i class="fas fa-sun"></i>';
  } else {
    localStorage.setItem("theme", "dark");
    btn.innerHTML = '<i class="fas fa-moon"></i>';
  }
}

// Apply saved theme on load
window.addEventListener("DOMContentLoaded", () => {
  const savedTheme = localStorage.getItem("theme");
  const btn = document.getElementById("themeToggle");
  if (savedTheme === "light") {
    document.body.classList.add("light-theme");
    if (btn) btn.innerHTML = '<i class="fas fa-sun"></i>';
  }
});
