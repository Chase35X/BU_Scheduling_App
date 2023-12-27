document.addEventListener('DOMContentLoaded', function() {
    const checkboxes = document.querySelectorAll('input[name="reservation"]');
    checkboxes.forEach(function(checkbox) {
        checkbox.addEventListener('change', checkButtonState);
    });
});


function checkButtonState() {
    // Get all checkboxes
    const checkboxes = document.querySelectorAll('input[name="reservation"]');
    let isAtLeastOneChecked = false;

    checkboxes.forEach((checkbox) => {
        if (checkbox.checked) {
            isAtLeastOneChecked = true;
        }
    });

    // Enable or disable the delete button based on the checkbox state
    const deleteButton = document.getElementById('delete-btn');
    deleteButton.disabled = !isAtLeastOneChecked;
}

function deleteSelected() {
    // Logic to delete selected reservations goes here
    console.log("Deleting selected reservations...");
}





