console.log("this is loading");

const toggleElementById = (id) => {
  const div = document.getElementById(id);
  if (div.style.display === "none") {
    div.style.display = "block";
  } else {
    div.style.display = "none";
  }
};

document.querySelectorAll(".commentsBtn").forEach((btn) => {
  btn.addEventListener("click", () => {
    toggleElementById(btn.value);
  });
});
