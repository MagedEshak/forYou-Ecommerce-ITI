var profileToggle = 1;
var overview = document.getElementById("overview_id");
var wishlist = document.getElementById("wishlist_id");
var profileOverview = document.getElementById("porfielOverview_id");

if (overview && wishlist && profileOverview) {
  overview.addEventListener("click", () => {
    profileToggle = profileToggle === 1 ? 0 : 1;

    if (profileToggle === 1) {
      profileOverview.classList.remove("d-none");
      profileOverview.classList.add("d-block");

      wishlist.classList.remove("d-block");
      wishlist.classList.add("d-none");
    } else {
      profileOverview.classList.remove("d-block");
      profileOverview.classList.add("d-none");

      wishlist.classList.remove("d-none");
      wishlist.classList.add("d-block");
    }
  });
} else {
  console.error("One or more elements not found. Check your HTML IDs.");
}
