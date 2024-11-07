document.addEventListener("DOMContentLoaded", function () {
    fetchCourses();
  });
  
  function fetchCourses() {
    fetch('http://localhost:5000/courses')  // Your backend API endpoint
      .then(response => response.json())
      .then(data => {
        const coursesList = document.getElementById('courses-list');
        data.forEach(course => {
          const courseCard = document.createElement('div');
          courseCard.classList.add('course-card');
          courseCard.innerHTML = `
            <h3>${course.title}</h3>
            <p>${course.description}</p>
            <p>Price: $${course.discount_price}</p>
            <button onclick="selectCourse(${course.id})">Select Course</button>
          `;
          coursesList.appendChild(courseCard);
        });
      })
      .catch(error => console.error('Error fetching courses:', error));
  }
  
  function selectCourse(courseId) {
    window.location.href = `/payment?course_id=${courseId}`; // Redirect to payment page
  }
  