// script.js

// Get references to form and student list container
const form = document.getElementById("registrationForm");
const studentList = document.getElementById("studentList");

// Load students from localStorage when the page loads
window.onload = () => {
  loadStudents();
};

// Handle form submission
form.addEventListener("submit", function (e) {
  e.preventDefault();

  // Get input values
  const name = document.getElementById("name").value.trim();
  const studentId = document.getElementById("studentId").value.trim();
  const email = document.getElementById("email").value.trim();
  const contact = document.getElementById("contact").value.trim();

  // --- Validation ---

  // Only letters in name
  if (!/^[A-Za-z ]+$/.test(name)) {
    alert("Name should contain only letters.");
    return;
  }

  // Only numbers in student ID
  if (!/^[0-9]+$/.test(studentId)) {
    alert("Student ID must be numeric.");
    return;
  }

  // Contact should be exactly 10 digits
  if (!/^[0-9]{10}$/.test(contact)) {
    alert("Contact must be a 10-digit number.");
    return;
  }

  // Email pattern validation
  if (!/^\S+@\S+\.\S+$/.test(email)) {
    alert("Enter a valid email.");
    return;
  }

  // Create a student object with unique ID
  const student = {
    id: Date.now(), // Unique identifier
    name,
    studentId,
    email,
    contact,
  };

  // --- Save student to localStorage ---
  let students = JSON.parse(localStorage.getItem("students")) || [];
  students.push(student);
  localStorage.setItem("students", JSON.stringify(students));

  form.reset();      // Clear form
  loadStudents();    // Reload the list
});

// Load and display all students from localStorage
function loadStudents() {
  studentList.innerHTML = ""; // Clear the list

  const students = JSON.parse(localStorage.getItem("students")) || [];

  // Loop through students and render them
  students.forEach((student) => {
    const card = document.createElement("div");
    card.className = "student-card";

    // Card HTML structure
    card.innerHTML = `
      <span><strong>Name:</strong> ${student.name}</span>
      <span><strong>ID:</strong> ${student.studentId}</span>
      <span><strong>Email:</strong> ${student.email}</span>
      <span><strong>Contact:</strong> ${student.contact}</span>
      <div>
        <button class="edit-btn" onclick="editStudent(${student.id})">Edit</button>
        <button onclick="deleteStudent(${student.id})">Delete</button>
      </div>
    `;

    studentList.appendChild(card);
  });
}

// Delete a student by ID
function deleteStudent(id) {
  let students = JSON.parse(localStorage.getItem("students")) || [];
  students = students.filter((s) => s.id !== id); // Keep everyone except the one with this ID
  localStorage.setItem("students", JSON.stringify(students));
  loadStudents();
}

// Edit a student by loading their data into the form
function editStudent(id) {
  let students = JSON.parse(localStorage.getItem("students")) || [];
  const student = students.find((s) => s.id === id);

  if (student) {
    // Fill form with existing data
    document.getElementById("name").value = student.name;
    document.getElementById("studentId").value = student.studentId;
    document.getElementById("email").value = student.email;
    document.getElementById("contact").value = student.contact;

    // Delete original record — new updated one will be saved on next submit
    deleteStudent(id);
  }
}
