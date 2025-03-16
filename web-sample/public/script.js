document.addEventListener('DOMContentLoaded', function() {
    const userForm = document.getElementById('userForm');
    const successMessage = document.getElementById('successMessage');
    const tableBody = document.getElementById('tableBody');
    
    // Load existing users when page loads
    fetchUsers();
    
    // Handle form submission
    userForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const formData = {
            name: document.getElementById('name').value,
            email: document.getElementById('email').value,
            country: document.getElementById('country').value
        };
        
        // Send data to API
        fetch('/api/users', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            // Show success message
            successMessage.classList.remove('hidden');
            
            // Reset form
            userForm.reset();
            
            // Hide success message after 3 seconds
            setTimeout(() => {
                successMessage.classList.add('hidden');
            }, 3000);
            
            // Refresh user table
            fetchUsers();
        })
        .catch(error => {
            console.error('Error:', error);
            alert('There was a problem with your submission. Please try again.');
        });
    });
    
    // Function to fetch and display users
    function fetchUsers() {
        fetch('/api/users')
        .then(response => response.json())
        .then(users => {
            // Clear table
            tableBody.innerHTML = '';
            
            // Add users to table
            users.forEach(user => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${user.name}</td>
                    <td>${user.email}</td>
                    <td>${user.country}</td>
                `;
                tableBody.appendChild(row);
            });
        })
        .catch(error => {
            console.error('Error fetching users:', error);
        });
    }
});
