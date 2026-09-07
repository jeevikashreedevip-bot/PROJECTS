(function () {
  "use strict";

  /* ---------- scroll progress + sticky header ---------- */
  var bar = document.querySelector('[class*="z-[60]"]');
  var header = document.querySelector("header");
  function onScroll() {
    var h = document.documentElement;
    var p = h.scrollTop / Math.max(1, h.scrollHeight - h.clientHeight);
    if (bar) bar.style.transform = "scaleX(" + p + ")";
    if (header) {
      var s = h.scrollTop > 24;
      header.classList.toggle("border-border", s);
      header.classList.toggle("bg-background/80", s);
      header.classList.toggle("backdrop-blur-xl", s);
      header.classList.toggle("py-3", s);
      header.classList.toggle("border-transparent", !s);
      header.classList.toggle("py-5", !s);
    }
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  /* ---------- mobile menu ---------- */
  var burger = document.querySelector('button[aria-label="Open menu"]');
  var panel = header && header.lastElementChild;
  if (burger && panel) {
    burger.addEventListener("click", function () {
      var open = panel.classList.contains("max-h-96");
      panel.classList.toggle("max-h-96", !open);
      panel.classList.toggle("opacity-100", !open);
      panel.classList.toggle("max-h-0", open);
      panel.classList.toggle("opacity-0", open);
    });
  }

  /* ---------- scroll reveal ---------- */
  var hidden = document.querySelectorAll(".reveal-hidden");
  if ("IntersectionObserver" in window) {
    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (e) {
          if (e.isIntersecting) {
            e.target.classList.remove("reveal-hidden");
            e.target.classList.add("reveal-shown");
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.14, rootMargin: "0px 0px -60px 0px" }
    );
    hidden.forEach(function (el) {
      io.observe(el);
    });
  } else {
    hidden.forEach(function (el) {
      el.classList.remove("reveal-hidden");
      el.classList.add("reveal-shown");
    });
  }

  /* ---------- hero slider ---------- */
  var hero = document.getElementById("hero");
  if (!hero) return;

  var SLIDES = [
    {
      kicker: "Custom Apparel, Printed On Register",
      title: "Premium Customized T-Shirt Printing",
      sub: "Creative designs · Premium fabrics · Long-lasting prints · Fast delivery.",
      href: "contact.html",
      label: "Order Now",
    },
    {
      kicker: "01 — Bulk & Durability",
      title: "Screen Printing Built To Survive The Wash",
      sub: "Bold, opaque colour with registration checked before every single run.",
      href: "services.html",
      label: "View Services",
    },
    {
      kicker: "02 — Detail & Flexibility",
      title: "DTF Prints With Photographic Detail",
      sub: "Smooth gradients on almost any fabric — with no minimum order size.",
      href: "services.html",
      label: "Explore DTF",
    },
    {
      kicker: "03 — Names, Numbers & Small Runs",
      title: "Heat Transfer For Personalised Pieces",
      sub: "Jersey names, numbers and one-off gifts, pressed at exactly the right heat.",
      href: "contact.html",
      label: "Get A Quote",
    },
  ];
  var DURATION = 6000;

  var slides = hero.querySelectorAll(".hero-slide");
  var dots = hero.querySelectorAll(".hero-dot");
  var copy = document.getElementById("hero-copy");
  var kickerEl = document.getElementById("hero-kicker");
  var titleEl = document.getElementById("hero-title");
  var subEl = document.getElementById("hero-sub");
  var ctaEl = document.getElementById("hero-cta");
  var countEl = document.getElementById("hero-count");
  var index = 0;
  var timer;

  function render(i) {
    index = i;
    var s = SLIDES[i];
    for (var k = 0; k < slides.length; k++) {
      var active = k === i;
      slides[k].classList.toggle("opacity-100", active);
      slides[k].classList.toggle("opacity-0", !active);
      slides[k].setAttribute("aria-hidden", active ? "false" : "true");
      var im = slides[k].querySelector("img");
      if (im) im.classList.toggle("ken-burns", active);
    }
    if (kickerEl && kickerEl.lastChild) kickerEl.lastChild.textContent = s.kicker;
    if (titleEl) titleEl.textContent = s.title;
    if (subEl) subEl.textContent = s.sub;
    if (ctaEl) {
      ctaEl.textContent = s.label;
      ctaEl.setAttribute("href", s.href);
    }
    if (countEl) countEl.textContent = "0" + (i + 1) + " / 0" + SLIDES.length;
    if (copy) {
      copy.querySelectorAll("[style*='slide-up-in']").forEach(function (el) {
        var a = el.style.animation;
        el.style.animation = "none";
        void el.offsetWidth;
        el.style.animation = a;
      });
    }
    for (var d = 0; d < dots.length; d++) {
      var fill = dots[d].firstElementChild;
      if (!fill) continue;
      if (d === i) {
        fill.style.transform = "";
        fill.style.animation = "none";
        void fill.offsetWidth;
        fill.style.animation = "progress-bar " + DURATION + "ms linear both";
      } else {
        fill.style.animation = "none";
        fill.style.transform = "scaleX(0)";
      }
    }
    clearTimeout(timer);
    timer = setTimeout(function () {
      render((index + 1) % SLIDES.length);
    }, DURATION);
  }

  for (var d = 0; d < dots.length; d++) {
    (function (n) {
      dots[n].addEventListener("click", function () {
        render(n);
      });
    })(d);
  }

  render(0);
})();
