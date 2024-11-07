document.addEventListener("DOMContentLoaded", function() {
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
