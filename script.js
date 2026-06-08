const header = document.querySelector(".site-header");
const recruitVideo = document.querySelector("#nakanoRecruitVideo");
const videoButtons = document.querySelectorAll(".video-gallery button");

const setHeaderState = () => {
  header.classList.toggle("is-scrolled", window.scrollY > 24);
};

setHeaderState();
window.addEventListener("scroll", setHeaderState, { passive: true });

videoButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const nextVideo = button.dataset.video;

    if (!recruitVideo || !nextVideo || recruitVideo.getAttribute("src") === nextVideo) {
      return;
    }

    videoButtons.forEach((item) => item.classList.remove("is-active"));
    button.classList.add("is-active");
    recruitVideo.setAttribute("src", nextVideo);
    recruitVideo.load();
    recruitVideo.play().catch(() => {});
  });
});
