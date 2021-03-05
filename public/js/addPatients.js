$(document).ready(function () {
  // Getting references to our form and input
  const addPatientForm = $("#form.signup");
  const firstNameInput = $("#first-name-input");
  const ageInput = $("#age-input");
  const heightInput = $("#height-input");
  const weightInput = $("#weight-input");
  const emailInput = $("#email-input");

  // When the signup button is clicked, we validate the email and password are not blank
  addPatientForm.on("submit", function (event) {
    event.preventDefault();
    var patientData = {
      firstNameInput: firstNameInput.val().trim(),
      lastNameInput: lastNameInput.val().trim(),
      ageInput: ageInput.val().trim(),
      heightInput: heightInput.val().trim(),
      weightInput: weightInput.val().trim(),
      email: emailInput.val().trim(),
    };

    if (
      !patientData.firstNameInput ||
      !patientData.lastNameInput ||
      !patientData.ageInput ||
      !patientData.emailInput
    ) {
      return;
    }

    // If we have an email and password, run the signUpPatient function
    addPatient(
      patientData.firstNameInput,
      patientData.lastNameInput,
      patientData.ageInput,
      patientData.heightInput,
      patientData.weightInput,
      patientData.emailInput
    );
    firstNameInput.val("");
    lastNameInput.val("");
    ageInput.val("");
    heightInput.val("");
    weightInput.val("");
    emailInput.val("");
  });

  // Does a post to the signup route. If successful, we are redirected to the members page
  // Otherwise we log any errors
  function addPatient(firstName, lastName, age, height, weight, email) {
    $.post("/patients/create", {
      firstName: firstName,
      lastName: lastName,
      age: age,
      height: height,
      weight: weight,
      email: email,
    })
      .then(function (data) {
        window.location.replace("/patients");
        // If there's an error, handle it by throwing up a bootstrap alert
      })
      .catch(handleLoginErr);
  }

  function handleLoginErr(err) {
    $("#alert .msg").text(err.responseJSON);
    $("#alert").fadeIn(500);
  }
});
