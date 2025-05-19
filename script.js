document.addEventListener("DOMContentLoaded", function () {
  // Scroll to the target section
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const targetId = this.getAttribute("href");
      //if (targetId === "#projects") return; // not scroll down

      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        targetElement.scrollIntoView({
          behavior: "smooth",
        });
      }
    });
  });

  // some external links
  document.querySelectorAll(".to-github").forEach((ele) => {
    ele.href = "https://github.com/smallhand";
  });
  document.querySelectorAll(".to-linkedin").forEach((ele) => {
    ele.href = "https://www.linkedin.com/in/pei-yu-stella";
  });

  // Navbar highlight the current section
  const sections = document.querySelectorAll("section");
  const navLinks = document.querySelectorAll("nav a");

  window.addEventListener("scroll", () => {
    let current = "";
    sections.forEach((section) => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;
      if (pageYOffset >= sectionTop - 60) {
        current = section.getAttribute("id");
      }
    });

    navLinks.forEach((link) => {
      link.classList.remove("active");
      if (link.getAttribute("href") === `#${current}`) {
        link.classList.add("active");
      }
    });
  });
});
