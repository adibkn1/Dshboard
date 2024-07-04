// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyD6cqG4ZdQdHIUeCwCiADlAHhc0UC8GET4",
    authDomain: "tapcollect-2111a.firebaseapp.com",
    databaseURL: "https://tapcollect-2111a-default-rtdb.firebaseio.com",
    projectId: "tapcollect-2111a",
    storageBucket: "tapcollect-2111a.appspot.com",
    messagingSenderId: "1065511974583",
    appId: "1:1065511974583:web:589b9782702b1c7a573f32",
    measurementId: "G-EJNRCZKFQE"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Reference to your database
const database = firebase.database();

function fetchData() {
    const dataTable = document.getElementById('data-table').getElementsByTagName('tbody')[0];
    database.ref('/users').once('value', (snapshot) => {
        const data = snapshot.val();
        const entries = [];

        for (let email in data) {
            entries.push({
                name: data[email].name,
                score: data[email].oQ
            });
        }

        // Sort entries by score in descending order
        entries.sort((a, b) => b.score - a.score);

        // Clear existing table data
        dataTable.innerHTML = '';

        // Populate table with sorted data
        entries.forEach(entry => {
            const row = dataTable.insertRow();
            const nameCell = row.insertCell(0);
            const scoreCell = row.insertCell(1);
            nameCell.textContent = entry.name;
            scoreCell.textContent = entry.score;
        });
    });
}

// Fetch data on page load
window.onload = fetchData;
