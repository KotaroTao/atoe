const header = document.querySelector(".site-header");
const videoButtons = document.querySelectorAll(".video-gallery button");
const previewVideoButton = document.querySelector(".video-open-button");
const videoModal = document.querySelector("#videoModal");
const modalVideo = document.querySelector("#modalRecruitVideo");
const modalTitle = document.querySelector("#videoModalTitle");
const closeVideoButtons = document.querySelectorAll("[data-close-video]");

const setHeaderState = () => {
  header.classList.toggle("is-scrolled", window.scrollY > 24);
};

setHeaderState();
window.addEventListener("scroll", setHeaderState, { passive: true });

const openVideoModal = (button) => {
  const nextVideo = button.dataset.video;
  const nextTitle = button.dataset.title || "求人動画";

  if (!videoModal || !modalVideo || !nextVideo) {
    return;
  }

  if (modalTitle) {
    modalTitle.textContent = nextTitle;
  }

  modalVideo.setAttribute("src", nextVideo);
  modalVideo.load();
  videoModal.classList.add("is-open");
  videoModal.setAttribute("aria-hidden", "false");
  document.body.classList.add("video-modal-open");
  modalVideo.play().catch(() => {});
};

const closeVideoModal = () => {
  if (!videoModal || !modalVideo) {
    return;
  }

  modalVideo.pause();
  modalVideo.removeAttribute("src");
  modalVideo.load();
  videoModal.classList.remove("is-open");
  videoModal.setAttribute("aria-hidden", "true");
  document.body.classList.remove("video-modal-open");
};

videoButtons.forEach((button) => {
  button.addEventListener("click", () => {
    videoButtons.forEach((item) => item.classList.remove("is-active"));
    button.classList.add("is-active");
    openVideoModal(button);
  });
});

previewVideoButton?.addEventListener("click", () => {
  openVideoModal(previewVideoButton);
});

closeVideoButtons.forEach((button) => {
  button.addEventListener("click", closeVideoModal);
});

window.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && videoModal?.classList.contains("is-open")) {
    closeVideoModal();
  }
});
