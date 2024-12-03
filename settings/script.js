document.addEventListener('DOMContentLoaded', () => {
    const tabs = document.querySelectorAll('.tab');
    const tabContents = document.querySelectorAll('.tab-content');

    // Load the saved toggle state from storage
    chrome.storage.sync.get(['showAttendanceStreak'], (result) => {
        const isEnabled = result.showAttendanceStreak || false; // Default to false if not set
        const barcodeToggle = document.getElementById('student-barcode-toggle');
        barcodeToggle.checked = isEnabled;
        //toggleStudentBarcode(isEnabled);
    });

    tabs.forEach((tab) => {
        tab.addEventListener('click', () => {
            const targetTab = tab.getAttribute('data-tab');
            tabContents.forEach((content) => {
                content.style.display = content.id === targetTab ? 'block' : 'none';
            });
        });
    });

    const barcodeToggle = document.getElementById('student-barcode-toggle');
    barcodeToggle.addEventListener('change', (event) => {
        const isChecked = event.target.checked;
        toggleStudentBarcode(isChecked);
        
        chrome.storage.sync.set({ "showAttendanceStreak": isChecked }, () => {
        });
    });

    function toggleStudentBarcode(isEnabled) {
        //console.log(`showAttendanceStreak is now ${isEnabled ? 'enabled' : 'disabled'}.`);
    }
});