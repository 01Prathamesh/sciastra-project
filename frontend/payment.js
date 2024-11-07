document.addEventListener("DOMContentLoaded", function() {
    const courseId = new URLSearchParams(window.location.search).get('course_id');  // Get course_id from URL
    if (courseId) {
        fetchCourseDetails(courseId);
    } else {
        alert("Course not found");
    }

    const paymentForm = document.getElementById("paymentForm");

    paymentForm.addEventListener("submit", function(event) {
        event.preventDefault();  // Prevent form submission

        // Get the form input values
        const cardNumber = document.getElementById("cardNumber").value;
        const expiryDate = document.getElementById("expiryDate").value;
        const cvv = document.getElementById("cvv").value;

        // Simulate basic validation (no real payment, just mock data)
        if (cardNumber && expiryDate && cvv) {
            // Trigger the two-step verification process
            initiateTwoStepVerification(cardNumber, expiryDate, cvv);
        } else {
            alert("Please fill in all the payment details.");
        }
    });
});

// Fetch course details from the backend API
function fetchCourseDetails(courseId) {
    fetch(`http://localhost:5000/api/courses/${courseId}`)
        .then(response => response.json())
        .then(course => {
            // Update the page with course details
            const courseDetails = document.getElementById('course-details');
            if (course) {
                let priceHTML = '';

                // If discount price exists, show original price crossed out and discounted price as the main price
                if (course.discount_price) {
                    priceHTML = `
                        <h3>${course.title}</h3>
                        <p>${course.description}</p>
                        <div class="price">
                            <span class="original-price">₹.${course.price}</span>
                            <span class="discount-price">₹.${course.discount_price}</span>  <!-- Discount Price -->
                        </div>
                    `;
                } else {
                    // If no discount price, just show the original price
                    priceHTML = `
                        <h3>${course.title}</h3>
                        <p>${course.description}</p>
                        <div class="price">
                            <span class="discount-price">₹.${course.price}</span>
                        </div>
                    `;
                }

                // Render the course details
                courseDetails.innerHTML = priceHTML;
            } else {
                alert("Course details not found.");
            }
        })
        .catch(error => console.error('Error fetching course details:', error));
}

function initiateTwoStepVerification(cardNumber, expiryDate, cvv) {
    // Step 1: Simulate sending a verification code
    const verificationCode = Math.floor(100000 + Math.random() * 900000);  // Generate a random 6-digit code

    // Simulate sending the verification code via a modal
    const userCode = prompt(`A verification code has been sent to your email. Enter the code: ${verificationCode}`);

    // Step 2: Validate the verification code
    if (parseInt(userCode) === verificationCode) {
        // Simulate a successful payment process
        setTimeout(() => {
            alert("Payment successful! You will now be redirected.");
            window.location.href = "/thank-you.html";  // Redirect to a thank-you page (or course confirmation page)
        }, 2000);
    } else {
        alert("Invalid verification code. Please try again.");
    }
}
