document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll(".funder-logos").forEach(container => {
    const n = container.children.length;
    const columns = n <= 4 ? n : Math.ceil(n / 2);

    container.style.gridTemplateColumns =
      `repeat(${columns}, minmax(0, 1fr))`;
  });
});