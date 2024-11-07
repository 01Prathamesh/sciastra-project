document.addEventListener("DOMContentLoaded", function () {
  // Initial page setup
  fetchCourses();
  fetchBlogs();

  // Add event listeners to navigation buttons
  const coursesBtn = document.getElementById('courses-btn');
  const blogBtn = document.getElementById('blog-btn');
  const homeBtn = document.getElementById('home-btn');

  coursesBtn.addEventListener('click', function() {
    setActiveButton(coursesBtn);
    showSection('courses-content');
  });

  blogBtn.addEventListener('click', function() {
    setActiveButton(blogBtn);
    showSection('blog-content');
  });

  homeBtn.addEventListener('click', function() {
    setActiveButton(homeBtn);
    showSection('home-content');
  });
});

// Function to make the clicked button active
function setActiveButton(activeBtn) {
  const navButtons = document.querySelectorAll('nav ul li a');
  navButtons.forEach(btn => btn.classList.remove('active'));  // Remove active class from all
  activeBtn.classList.add('active');  // Add active class to the clicked button
}

// Function to show the relevant section and hide others
function showSection(sectionId) {
  const sections = document.querySelectorAll('.content-section');
  sections.forEach(section => {
    section.style.display = 'none';  // Hide all sections
  });

  const activeSection = document.getElementById(sectionId);
  activeSection.style.display = 'block';  // Show the selected section
}

// Fetch courses from the backend and display them
function fetchCourses() {
  fetch('http://localhost:5000/api/courses')  // Your backend API endpoint
    .then(response => response.json())
    .then(data => {
      const coursesList = document.getElementById('courses-list');
      data.forEach(course => {
        const courseCard = document.createElement('div');
        courseCard.classList.add('course-card');

         // Check if there is a discount price
         const displayPrice = course.discount_price ? `₹.${course.discount_price}` : `₹${course.price}`;
         const originalPrice = course.discount_price ? `<span class="original-price">₹${course.price}</span>` : '';
 
        courseCard.innerHTML = `
          <h3>${course.title}</h3>
          <p>${course.description}</p>
          <p>Price: ${originalPrice} ${displayPrice ? `<span class="discounted-price">(${displayPrice})</span>` : ''}</p>
          <button onclick="selectCourse(${course.id}, ${course.discount_price || course.price})">Buy Course</button>
        `;
        coursesList.appendChild(courseCard);
      });
    })
    .catch(error => console.error('Error fetching courses:', error));
}

function selectCourse(courseId) {
  // Redirect to payment page with courseId as query parameter
  window.location.href = `/payment.html?course_id=${courseId}`;
}


// Fetch blogs from the backend and display them
function fetchBlogs() {
  fetch('http://localhost:5000/api/blogs')
    .then(response => response.json())
    .then(data => {
      console.log(data);  // Log the API response for debugging

      const blogList = document.getElementById('blog-list');
      data.forEach(blog => {
        const blogCard = document.createElement('div');
        blogCard.classList.add('blog-card');
        blogCard.innerHTML = `
          <h3>${blog.title || 'No title available'}</h3>
          <p>${blog.content || 'No content available'}</p>
          <p><small>Published on: ${blog.publish_time || 'N/A'}</small></p>
        `;
        blogList.appendChild(blogCard);
      });
    })
    .catch(error => console.error('Error fetching blogs:', error));
}

// Function to handle course selection and redirect to payment
function selectCourse(courseId) {
  window.location.href = `/payment.html?course_id=${courseId}`;  // Redirect to payment page
}
