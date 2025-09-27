// فتح الصور في المودال
document.querySelectorAll(".stacked-img").forEach(img => {
  img.addEventListener("click", () => {
    document.getElementById("modalImage").src = img.src;
    const modal = new bootstrap.Modal(document.getElementById("imageModal"));
    modal.show();
  });
});
