$(document).ready(function () {
  $(".vaccinate-form").on("submit", function (event) {
    event.preventDefault();

    var patient_id = $(this).children(".patient_id").val();
    $.ajax({
      method: "PUT",
      url: "/patients/" + patient_id,
    }).then(function (data) {
      // reload page to display devoured burger in proper column
      location.reload();
    });
  });
});
