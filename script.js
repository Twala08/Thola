function navigate(section) {
    document.querySelectorAll('.content-section').forEach(sec => {
        sec.style.display = 'none';
    });
    document.getElementById(section).style.display = 'block';
}

document.addEventListener('DOMContentLoaded', () => {
    navigate('home'); // Show home section by default

    document.getElementById('contact-form').addEventListener('submit', function(event) {
        event.preventDefault();
        alert('Form submitted!');
    });
});

// Background carousel
const backgroundImages = [
    'background1.jpg',
    'background2.jpg',
    'background3.jpg'
];

let currentImageIndex = 0;
const carousel = document.getElementById('carousel');

function changeBackground() {
    carousel.style.backgroundImage = `url(${backgroundImages[currentImageIndex]})`;
    currentImageIndex = (currentImageIndex + 1) % backgroundImages.length;
}

// Change background every 5 seconds (5000 milliseconds)
setInterval(changeBackground, 5000);

// Initial background image
changeBackground();


function confirmOrder() {
    // Collect form data
    const fullName = document.getElementById('full-name').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;
    const selectedPackage = document.getElementById('package').value;
    const subject = document.getElementById('subject').value;
    const message = document.getElementById('message').value;

    // Prepare data for the payment
    const orderData = {
        fullName,
        email,
        phone,
        package: selectedPackage,
        subject,
        message
    };

    // Simulate payment initiation with Ozow (Replace this with actual Ozow integration)
    initiateOzowPayment(orderData);
}

function initiateOzowPayment(orderData) {
    // Replace 'YOUR_MERCHANT_ID' and 'YOUR_MERCHANT_KEY' with your actual Ozow credentials
    const merchantId = 'YOUR_MERCHANT_ID';
    const merchantKey = 'YOUR_MERCHANT_KEY';

    const data = {
        merchantCode: merchantId,
        amount: calculateAmount(orderData.package), // Calculate amount based on selected package
        currency: 'ZAR', // Currency (South African Rand)
        optional1: orderData.fullName, // Optional parameters
        optional2: orderData.email,
        optional3: orderData.phone,
        siteCode: 'SITECODE123', // Your site code provided by Ozow
        returnUrl: 'https://yourwebsite.com/payment/success', // URL to redirect after successful payment
        cancelUrl: 'https://yourwebsite.com/payment/cancel', // URL to redirect if payment is canceled
        notifyUrl: 'https://yourwebsite.com/payment/notification', // URL for Ozow to send payment status notification
        user: {
            cell: orderData.phone,
            email: orderData.email,
            name: orderData.fullName
        }
    };

    // Send data to Ozow for payment initiation
    fetch('https://pay.ozow.com/initiatePayment', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'MerchantKey': merchantKey
        },
        body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(response => {
        // Redirect user to Ozow payment page
        window.location.href = response.data.checkoutUrl;
    })
    .catch(error => {
        console.error('Error initiating payment:', error);
        alert('Failed to initiate payment. Please try again later.');
    });
}

// Function to calculate amount based on selected package 
function calculateAmount(package) {
    let amount = 0;
    switch (package) {
        case '30GB':
            amount = 199.00;
            break;
        case '20GB':
            amount = 150.00;
            break;
        case '200GB':
            amount = 500.00;
            break;
        default:
            amount = 0;
    }
    return amount;
}


