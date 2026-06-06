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
  if (!typingSpan) {
    return;
  }

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

const contactForm = document.getElementById("contactForm");

if (contactForm) {
  const contactName = document.getElementById("contactName");
  const contactEmail = document.getElementById("contactEmail");
  const contactMessage = document.getElementById("contactMessage");
  const formStatus = document.getElementById("formStatus");
  const submitButton = contactForm.querySelector('button[type="submit"]');
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

  const fieldRules = [
    {
      input: contactName,
      validate: (value) => value ? "" : "Please enter your name."
    },
    {
      input: contactEmail,
      validate: (value) => {
        if (!value) {
          return "Please enter your email address.";
        }

        return emailPattern.test(value)
          ? ""
          : "Please enter a valid email address.";
      }
    },
    {
      input: contactMessage,
      validate: (value) => value ? "" : "Please enter your message."
    }
  ];

  const updateFieldError = (input, message) => {
    const field = input.closest(".form-field");
    const errorNode = field ? field.querySelector(".field-error") : null;

    input.setCustomValidity(message);

    if (field) {
      field.classList.toggle("has-error", Boolean(message));
    }

    if (errorNode) {
      errorNode.textContent = message;
    }
  };

  const validateField = ({ input, validate }) => {
    const message = validate(input.value.trim());
    updateFieldError(input, message);
    return !message;
  };

  fieldRules.forEach(({ input, validate }) => {
    input.addEventListener("input", () => {
      const message = validate(input.value.trim());
      updateFieldError(input, message);

      if (formStatus) {
        formStatus.textContent = "";
      }
    });
  });

  contactForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    console.log("[contact-form] submit triggered");

    const isValid = fieldRules.every(validateField);
    console.log("[contact-form] validation result:", isValid);

    if (!isValid) {
      const firstInvalidField = fieldRules.find(({ input }) => !input.checkValidity());
      console.warn("[contact-form] validation failed for:", firstInvalidField && firstInvalidField.input.name);

      if (formStatus) {
        formStatus.textContent = "Please fix the highlighted fields before sending.";
      }

      if (firstInvalidField) {
        firstInvalidField.input.focus();
      }

      return;
    }

    const name = contactName.value.trim();
    const email = contactEmail.value.trim();
    const message = contactMessage.value.trim();
    const formData = new FormData(contactForm);

    formData.set("name", name);
    formData.set("email", email);
    formData.set("message", message);
    formData.set("_subject", `Portfolio enquiry from ${name}`);

    console.log("[contact-form] payload:", { name, email, message });
    console.log("[contact-form] FormData entries:");
    for (const [key, value] of formData.entries()) {
      console.log(`  ${key} =`, value);
    }

    if (formStatus) {
      formStatus.textContent = "Sending your message...";
    }

    if (submitButton) {
      submitButton.disabled = true;
      submitButton.textContent = "Sending...";
    }

    const endpoint = "https://formsubmit.co/ajax/karnwalkanishka@gmail.com";
    console.log("[contact-form] POST ->", endpoint);

    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          Accept: "application/json"
        },
        body: formData
      });

      console.log("[contact-form] response status:", response.status, response.statusText);
      console.log("[contact-form] response ok:", response.ok);

      let result = null;
      try {
        result = await response.json();
        console.log("[contact-form] response body:", result);
      } catch (parseError) {
        console.error("[contact-form] failed to parse JSON response:", parseError);
      }

      if (!response.ok) {
        throw new Error((result && result.message) || `Request failed with status ${response.status}`);
      }

      if (result && result.success === "false") {
        throw new Error(result.message || "FormSubmit reported the request was not successful.");
      }

      console.log("[contact-form] message sent successfully");
      contactForm.reset();
      fieldRules.forEach(({ input }) => updateFieldError(input, ""));

      if (formStatus) {
        formStatus.textContent = "Message sent successfully. It should reach karnwalkanishka@gmail.com.";
      }
    } catch (error) {
      console.error("[contact-form] send error:", error);

      if (formStatus) {
        formStatus.textContent = error.message || "Something went wrong while sending your message.";
      }
    } finally {
      if (submitButton) {
        submitButton.disabled = false;
        submitButton.textContent = "Send Message";
      }
      console.log("[contact-form] submit handler finished");
    }
  });
}

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
