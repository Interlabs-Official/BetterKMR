document.addEventListener('DOMContentLoaded', function() {
    // Get the button element
    const clearPopupDataButton = document.getElementById('clearPopupData');
    
    // Add an event listener to the button
    clearPopupDataButton.addEventListener('click', function() {
        // Remove the item from localStorage
        localStorage.setItem('hideAttendancePopup', false);
        alert('Attendance popup data cleared!');
    });
});
