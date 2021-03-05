$(document).ready(function() {
    $(".btn").on("click",function(event) {
          $.get("/patients/create", {
            
          }).then( function() {
            window.location.assign("/patients");
            //   console.log("changed vaccinated to", newVaccinated);
              // Reload the page to get the updated list
            
            })
          .catch(function(err) {
            console.log(err);
          });
        
        });
});


