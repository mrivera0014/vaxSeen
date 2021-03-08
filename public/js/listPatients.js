$(document).ready(function () {
  const vaccinatedBtn = document.querySelectorAll('.change-vaccinated');

  // Set up the event listener for the create button
  if (vaccinatedBtn) {
    vaccinatedBtn.forEach((button) => {
      button.addEventListener('click', (e) => {
        // Grabs the id of the element that goes by the name, "id"
        const id = e.target.getAttribute('data-id');
        const newVaccinated = e.target.getAttribute('data-newvaccinated');

        const newVaccinatedState = {
          vaccinated: newVaccinated,
        };

        fetch(`/api/cats/${id}`, {
          method: 'PUT',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },

          // make sure to serialize the JSON body
          body: JSON.stringify(newVaccinatedState),
        }).then((response) => {
          // Check that the response is all good
          // Reload the page so the user can see the new quote
          if (response.ok) {
            console.log(`changed vaccinated to: ${newVaccinated}`);
            location.reload('/');
          } else {
            alert('something went wrong!');
          }
        });
      });
    });
  
  
})