const scroll = new SmoothScroll('.navbar a[href*="#"]', { speed: 800 });

//--------------------------------FIREBASE-------------------------------------
// Initialize Firebase
var config = {
  apiKey: "AIzaSyAHfw1dgV-lETw6OLRkqK2SNX1FUO9NM1w",
  authDomain: "profilecontactform.firebaseapp.com",
  databaseURL: "https://profilecontactform.firebaseio.com",
  projectId: "profilecontactform",
  storageBucket: "",
  messagingSenderId: "349945662162"
};
firebase.initializeApp(config);

var messageRef = firebase.database().ref("messages");

// Listen for form submit
document.getElementById("contactForm").addEventListener("submit", submitForm);

function submitForm(event) {
  event.preventDefault();

  // Get values
  var name = getInputVal("name");
  var company = getInputVal("company");
  var email = getInputVal("email");
  var message = getInputVal("message");
  console.log(name);

  // Save the messages to firebase
  saveMessage(name, company, email, message);

  // Alert user that the message was sent
  document.querySelector(".alert").style.display = "block";

  //hide alert after a few seconds
  setTimeout(function() {
    document.querySelector(".alert").style.display = "none";
  }, 3000);

  // Clears the form
  document.getElementById("contactForm").reset();
}

// Function to get get form values
function getInputVal(id) {
  return document.getElementById(id).value;
}

function saveMessage(name, company, email, message) {
  var newMessageRef = messageRef.push();
  newMessageRef.set({
    name: name,
    company: company,
    email: email,
    message: message
  });
}
