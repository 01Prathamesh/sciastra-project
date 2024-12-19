document.addEventListener("DOMContentLoaded", function() {
    const courseId = new URLSearchParams(window.location.search).get('course_id');  // Get course_id from URL
    if (courseId) {
        fetchCourseDetails(courseId);
    } else {
        showAlert("Course not found", "error");
    }

    const paymentForm = document.getElementById("paymentForm");

    paymentForm.addEventListener("submit", function(event) {
        event.preventDefault();  // Prevent form submission

        const cardNumber = document.getElementById("cardNumber").value;
        const expiryDate = document.getElementById("expiryDate").value;
        const cvv = document.getElementById("cvv").value;

        // Validate payment details
        if (isValidPaymentDetails(cardNumber, expiryDate, cvv)) {
            initiateTwoStepVerification(cardNumber, expiryDate, cvv);
        } else {
            showAlert("Please fill in all the payment details correctly.", "error");
        }
    });
});

// Fetch course details from the backend API
function fetchCourseDetails(courseId) {
    fetch(`http://localhost:5000/api/courses/${courseId}`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to fetch course details');
            }
            return response.json();
        })
        .then(course => {
            displayCourseDetails(course);
        })
        .catch(error => {
            console.error(error);
            showAlert("Error fetching course details.", "error");
        });
}

// Display course details (including price info)
function displayCourseDetails(course) {
    const courseDetails = document.getElementById('course-details');
    if (course) {
        let priceHTML = `
            <h3>${course.title}</h3>
            <p>${course.description}</p>
        `;

        if (course.discount_price) {
            priceHTML += `
                <div class="price">
                    <span class="original-price outdated-price">₹${course.price}</span><br>
                    <span class="discount-price">₹${course.discount_price}✅</span>
                </div>
            `;
        } else {
            priceHTML += `
                <div class="price">
                    <span class="discount-price">₹${course.price}</span>
                </div>
            `;
        }

        courseDetails.innerHTML = priceHTML;
    } else {
        showAlert("Course details not found.", "error");
    }
}

// Initiate two-step verification for the payment process
function initiateTwoStepVerification(cardNumber, expiryDate, cvv) {
    const verificationCode = generateVerificationCode();

    // Simulate sending the verification code (mock)
    const userCode = prompt(`A verification code has been sent to your email. Enter the code: ${verificationCode}`);

    // Validate the verification code entered by the user
    if (parseInt(userCode) === verificationCode) {
        simulatePaymentSuccess();
    } else {
        showAlert("Invalid verification code. Please try again.", "error");
    }
}

// Simulate a successful payment and redirect to the thank-you page
function simulatePaymentSuccess() {
    setTimeout(() => {
        showAlert("Payment successful! You will now be redirected.", "success");
        window.location.href = "/thank-you.html";  // Redirect to a thank-you page
    }, 2000);
}

// Generate a random 6-digit verification code (for mock purposes)
function generateVerificationCode() {
    return Math.floor(100000 + Math.random() * 900000);  // Random 6-digit code
}

// Validate the card number, expiry date, and CVV inputs
function isValidPaymentDetails(cardNumber, expiryDate, cvv) {
    return validateCardNumber(cardNumber) && validateExpiryDate(expiryDate) && validateCVV(cvv);
}

// Validate the credit card number format (simplified version)
function validateCardNumber(cardNumber) {
    const cardNumberRegex = /^\d{16}$/;  // Simple 16-digit card number validation
    if (!cardNumberRegex.test(cardNumber)) {
        showAlert("Invalid card number. Please enter a valid 16-digit card number.", "error");
        return false;
    }
    return true;
}

// Validate the expiration date format (MM/YY)
function validateExpiryDate(expiryDate) {
    const expiryDateRegex = /^(0[1-9]|1[0-2])\/([0-9]{2})$/;  // MM/YY format
    if (!expiryDateRegex.test(expiryDate)) {
        showAlert("Invalid expiration date. Please use the format MM/YY.", "error");
        return false;
    }
    return true;
}

// Validate the CVV (3 digits)
function validateCVV(cvv) {
    const cvvRegex = /^\d{3}$/;  // Simple 3-digit CVV validation
    if (!cvvRegex.test(cvv)) {
        showAlert("Invalid CVV. Please enter a valid 3-digit CVV.", "error");
        return false;
    }
    return true;
}

// Display an alert message
function showAlert(message, type = "info") {
    const alertBox = document.createElement("div");
    alertBox.classList.add("alert", type);
    alertBox.innerText = message;

    // Append the alert box to the body and remove it after a few seconds
    document.body.appendChild(alertBox);
    setTimeout(() => {
        alertBox.remove();
    }, 4000);
}
