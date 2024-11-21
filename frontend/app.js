document.addEventListener("DOMContentLoaded", () => {
  // Initial setup: Fetch courses and blogs, then set up event listeners
  initializePage();

  // Add event listeners for the navigation buttons
  const navButtons = {
    courses: document.getElementById('courses-btn'),
    blog: document.getElementById('blog-btn'),
    home: document.getElementById('home-btn')
  };

  // Attach event listeners to each navigation button
  navButtons.courses.addEventListener('click', () => handleNavigation('courses-content', navButtons.courses));
  navButtons.blog.addEventListener('click', () => handleNavigation('blog-content', navButtons.blog));
  navButtons.home.addEventListener('click', () => handleNavigation('home-content', navButtons.home));
});

// Function to initialize the page (fetch courses and blogs)
function initializePage() {
  fetchCourses();
  fetchBlogs();
}

// Function to handle section navigation and set active button
function handleNavigation(sectionId, activeButton) {
  setActiveButton(activeButton);
  showSection(sectionId);
}

// Function to set the active class on the clicked button
function setActiveButton(activeButton) {
  const navLinks = document.querySelectorAll('nav ul li a');
  navLinks.forEach(link => link.classList.remove('active'));  // Remove 'active' from all buttons
  activeButton.classList.add('active');  // Add 'active' to the clicked button
}

// Function to show the relevant section and hide others
function showSection(sectionId) {
  const sections = document.querySelectorAll('.content-section');
  sections.forEach(section => section.style.display = 'none');  // Hide all sections

  const activeSection = document.getElementById(sectionId);
  activeSection.style.display = 'block';  // Show the selected section
}

// Fetch and display courses
function fetchCourses() {
  fetch('http://localhost:5000/api/courses')  // Replace with your API endpoint
    .then(response => response.json())
    .then(data => {
      displayCourses(data);
    })
    .catch(error => console.error('Error fetching courses:', error));
}

// Function to display the fetched courses
function displayCourses(courses) {
  const coursesList = document.getElementById('courses-list');
  courses.forEach(course => {
    const courseCard = createCourseCard(course);
    coursesList.appendChild(courseCard);
  });
}

// Function to create a single course card element
function createCourseCard(course) {
  const courseCard = document.createElement('div');
  courseCard.classList.add('course-card');

  const originalPrice = course.discount_price ? `<span class="original-price">₹${course.price}</span>` : '';
  const displayPrice = course.discount_price ? `₹${course.discount_price}` : `₹${course.price}`;

  courseCard.innerHTML = `
    <h3>${course.title}</h3>
    <p>${course.description}</p>
    <p>Price: ${originalPrice} ${displayPrice ? `<span class="discounted-price">(${displayPrice})</span>` : ''}</p>
    <button onclick="selectCourse(${course.id}, ${course.discount_price || course.price})">Buy Course</button>
  `;

  return courseCard;
}

// Redirect to the payment page for the selected course
function selectCourse(courseId) {
  window.location.href = `/payment.html?course_id=${courseId}`;  // Redirect to payment page
}

// Fetch and display blogs
function fetchBlogs() {
  fetch('http://localhost:5000/api/blogs')  // Replace with your API endpoint
    .then(response => response.json())
    .then(data => {
      displayBlogs(data);
    })
    .catch(error => console.error('Error fetching blogs:', error));
}

// Function to display the fetched blogs
function displayBlogs(blogs) {
  const blogList = document.getElementById('blog-list');
  blogs.forEach(blog => {
    const blogCard = createBlogCard(blog);
    blogList.appendChild(blogCard);
  });
}

// Function to create a single blog card element
function createBlogCard(blog) {
  const blogCard = document.createElement('div');
  blogCard.classList.add('blog-card');
  
  blogCard.innerHTML = `
    <h3>${blog.title || 'No title available'}</h3>
    <p>${blog.content || 'No content available'}</p>
    <p><small>Published on: ${blog.publish_time || 'N/A'}</small></p>
  `;
  
  return blogCard;
}
