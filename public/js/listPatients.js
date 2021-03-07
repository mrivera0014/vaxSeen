$(document).ready(function () {
  $(".btn").on("click", function (event) {
    event.preventDefault()
    $.get("/patients/create", {

    }).then(function () {
      window.location.assign("/patients/create");
      //   console.log("changed vaccinated to", newVaccinated);
      // Reload the page to get the updated list

    })
      .catch(function (err) {
        console.log(err);
      });

  });
});


