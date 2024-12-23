document.addEventListener("DOMContentLoaded", () => {
  // Initial setup: Fetch courses and blogs, then set up event listeners
  initializePage();

  // Event listeners for navigation buttons
  const navButtons = {
    courses: document.getElementById('courses-btn'),
    blog: document.getElementById('blog-btn'),
    home: document.getElementById('home-btn')
  };

  // Attach event listeners to each navigation button
  navButtons.courses.addEventListener('click', () => handleNavigation('courses-content', navButtons.courses));
  navButtons.blog.addEventListener('click', () => handleNavigation('blog-content', navButtons.blog));
  navButtons.home.addEventListener('click', () => handleNavigation('home-content', navButtons.home));

  // Event listener for Explore button
  document.getElementById('explore-btn').addEventListener('click', () => handleNavigation('courses-content', navButtons.courses));

  // Search functionality for courses
  document.getElementById('course-search').addEventListener('input', event => searchCourses(event.target.value));

  // Search functionality for blogs
  document.getElementById('blog-search').addEventListener('input', event => searchBlogs(event.target.value));

  // Modal close button
  document.querySelector('.close-btn').addEventListener('click', () => closeModal());
});

// Initialize the page
function initializePage() {
  fetchCourses();
  fetchBlogs();
}

// Handle section navigation and set active button
function handleNavigation(sectionId, activeButton) {
  setActiveButton(activeButton);
  showSection(sectionId);
}

// Set active class on navigation button
function setActiveButton(activeButton) {
  const navLinks = document.querySelectorAll('nav ul li a');
  navLinks.forEach(link => link.classList.remove('active'));
  activeButton.classList.add('active');
}

// Show the selected section and hide others
function showSection(sectionId) {
  const sections = document.querySelectorAll('.content-section');
  sections.forEach(section => section.style.display = 'none');
  const activeSection = document.getElementById(sectionId);
  activeSection.style.display = 'block';
}

// Fetch and display courses
function fetchCourses() {
  fetch('http://localhost:5000/api/courses')
    .then(response => response.json())
    .then(data => {
      displayCourses(data);
    })
    .catch(error => console.error('Error fetching courses:', error));
}

// Display the fetched courses
function displayCourses(courses) {
  const coursesList = document.getElementById('courses-list');
  coursesList.innerHTML = ''; // Clear previous list

  courses.forEach(course => {
    const courseCard = createCourseCard(course);
    coursesList.appendChild(courseCard);
  });
}

// Create a single course card
function createCourseCard(course) {
  const courseCard = document.createElement('div');
  courseCard.classList.add('course-card');
  const originalPrice = course.discount_price ? `<span class="original-price">₹${course.price}</span>` : '';
  const displayPrice = course.discount_price ? `₹${course.discount_price}` : `₹${course.price}`;

  courseCard.innerHTML = `
    <h3>${course.title}</h3>
    <p>${course.description}</p>
    <p>Price: ${originalPrice} <span class="discounted-price">${displayPrice}</span></p>
    <button onclick="showCourseDetails(${course.id})">View Details</button>
  `;

  return courseCard;
}

// Display course details in a modal
function showCourseDetails(courseId) {
  fetch(`http://localhost:5000/api/courses/${courseId}`)
    .then(response => response.json())
    .then(course => {
      document.getElementById('course-title').textContent = course.title;
      document.getElementById('course-description').textContent = course.description;
      document.getElementById('modal-buy-btn').onclick = () => selectCourse(course.id, course.price);
      document.getElementById('course-modal').style.display = 'block';
    })
    .catch(error => console.error('Error fetching course details:', error));
}

// Select course for payment
function selectCourse(courseId, price) {
  window.location.href = `/payment.html?course_id=${courseId}&price=${price}`;
}

// Close course modal
function closeModal() {
  document.getElementById('course-modal').style.display = 'none';
}

// Search courses based on user input
function searchCourses(query) {
  fetch(`http://localhost:5000/api/courses?search=${query}`)
    .then(response => response.json())
    .then(data => {
      displayCourses(data);
    })
    .catch(error => console.error('Error searching courses:', error));
}

// Fetch and display blogs
function fetchBlogs() {
  fetch('http://localhost:5000/api/blogs')
    .then(response => response.json())
    .then(data => {
      displayBlogs(data);
    })
    .catch(error => console.error('Error fetching blogs:', error));
}

// Display the fetched blogs
function displayBlogs(blogs) {
  const blogList = document.getElementById('blog-list');
  blogList.innerHTML = ''; // Clear previous list

  blogs.forEach(blog => {
    const blogCard = createBlogCard(blog);
    blogList.appendChild(blogCard);
  });
}

// Create a single blog card
function createBlogCard(blog) {
  const blogCard = document.createElement('div');
  blogCard.classList.add('blog-card');
  blogCard.innerHTML = `
    <h3>${blog.title}</h3>
    <p>${blog.content.substring(0, 100)}...</p>
    <p><small>Published on: ${new Date(blog.publish_time).toLocaleDateString()}</small></p>
    <button onclick="viewBlog(${blog.id})">Read More</button>
  `;
  return blogCard;
}

// View full blog content
function viewBlog(blogId) {
  window.location.href = `/blog.html?id=${blogId}`;
}

// Search blogs based on user input
function searchBlogs(query) {
  fetch(`http://localhost:5000/api/blogs?search=${query}`)
    .then(response => response.json())
    .then(data => {
      displayBlogs(data);
    })
    .catch(error => console.error('Error searching blogs:', error));
}
