// Shared site behaviour for Nrityaswarupam.
document.addEventListener("DOMContentLoaded", function () {
  setupMobileMenu();
  setupEnquiryForm();
  setupScheduleFilters();
});

// --- Mobile navigation menu toggle -------------------------------------------
function setupMobileMenu() {
  var toggle = document.querySelector("[data-menu-toggle]");
  var menu = document.querySelector("[data-mobile-menu]");
  if (!toggle || !menu) return;

  var icon = toggle.querySelector(".material-symbols-outlined");

  function setOpen(open) {
    menu.classList.toggle("hidden", !open);
    if (icon) icon.textContent = open ? "close" : "menu";
    toggle.setAttribute("aria-expanded", open ? "true" : "false");
  }

  toggle.addEventListener("click", function () {
    setOpen(menu.classList.contains("hidden"));
  });

  menu.querySelectorAll("a").forEach(function (link) {
    link.addEventListener("click", function () {
      setOpen(false);
    });
  });
}

// --- Enquiry form submission (Web3Forms, no backend needed) ------------------
function setupEnquiryForm() {
  var form = document.querySelector("[data-enquiry-form]");
  if (!form) return;

  var status = form.querySelector("[data-form-status]");
  var button = form.querySelector("[data-submit-btn]");
  var label = form.querySelector("[data-submit-label]");
  var originalLabel = label ? label.textContent : "Send";

  function showStatus(message, ok) {
    if (!status) return;
    status.textContent = message;
    status.classList.remove("hidden");
    status.classList.toggle("text-secondary", ok === true);
    status.classList.toggle("text-error", ok === false);
  }

  form.addEventListener("submit", function (event) {
    event.preventDefault();

    var accessKey = form.querySelector('input[name="access_key"]');
    // Friendly guard while the form hasn't been configured yet.
    if (accessKey && accessKey.value.indexOf("YOUR_WEB3FORMS_ACCESS_KEY") !== -1) {
      showStatus(
        "This form isn't connected yet. Add your free Web3Forms access key (see EDITING_GUIDE.md) to start receiving enquiries.",
        false
      );
      return;
    }

    if (button) button.disabled = true;
    if (label) label.textContent = "Sending…";
    showStatus("Sending your enquiry…", true);

    fetch("https://api.web3forms.com/submit", {
      method: "POST",
      body: new FormData(form),
    })
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        if (data.success) {
          form.reset();
          showStatus("Thank you! Your enquiry has been sent. We'll be in touch soon.", true);
        } else {
          showStatus(
            "Sorry, something went wrong: " + (data.message || "please try again later.") ,
            false
          );
        }
      })
      .catch(function () {
        showStatus("Network error — please check your connection and try again.", false);
      })
      .finally(function () {
        if (button) button.disabled = false;
        if (label) label.textContent = originalLabel;
      });
  });
}

// --- Schedule filters (frontend only) ----------------------------------------
function setupScheduleFilters() {
  var formFilter = document.querySelector("[data-filter-form]");
  var levelFilter = document.querySelector("[data-filter-level]");
  var grid = document.querySelector("[data-schedule]");
  if (!grid || (!formFilter && !levelFilter)) return;

  var cards = Array.prototype.slice.call(grid.querySelectorAll("[data-class-card]"));
  var dayHeadings = Array.prototype.slice.call(grid.querySelectorAll("[data-day]"));
  var emptyMessage = document.querySelector("[data-schedule-empty]");

  function norm(value) {
    return (value || "all").toString().trim().toLowerCase();
  }

  function applyFilters() {
    var form = norm(formFilter && formFilter.value);
    var level = norm(levelFilter && levelFilter.value);
    var visibleCount = 0;

    cards.forEach(function (card) {
      var cardForm = norm(card.getAttribute("data-form"));
      var cardLevel = norm(card.getAttribute("data-level"));
      var matches =
        (form === "all" || cardForm === "all" || cardForm === form) &&
        (level === "all" || cardLevel === "all" || cardLevel === level);
      card.classList.toggle("hidden", !matches);
      if (matches) visibleCount++;
    });

    // Hide a day heading if none of the cards under it are visible.
    dayHeadings.forEach(function (heading) {
      var anyVisible = false;
      var node = heading.nextElementSibling;
      while (node && !node.hasAttribute("data-day")) {
        if (node.hasAttribute("data-class-card") && !node.classList.contains("hidden")) {
          anyVisible = true;
        }
        node = node.nextElementSibling;
      }
      heading.classList.toggle("hidden", !anyVisible);
    });

    if (emptyMessage) emptyMessage.classList.toggle("hidden", visibleCount !== 0);
  }

  if (formFilter) formFilter.addEventListener("change", applyFilters);
  if (levelFilter) levelFilter.addEventListener("change", applyFilters);
}
