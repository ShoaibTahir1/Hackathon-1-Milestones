var _a;
(_a = document.getElementById("resume-form")) === null || _a === void 0 ? void 0 : _a.addEventListener("submit", function (e) {
    var _a;
    e.preventDefault(); // Prevent the default form submission
    // Collect input values
    var name = document.getElementById("name").value;
    var jobTitle = document.getElementById("job-title").value;
    var phone = document.getElementById("phone").value;
    var email = document.getElementById("email").value;
    var linkedin = document.getElementById("linkedin").value;
    var github = document.getElementById("github").value;
    var address = document.getElementById("address").value;
    var objective = document.getElementById("objective").value;
    var education = document.getElementById("education").value;
    var experience = document.getElementById("experience").value;
    var skills = document.getElementById("skills").value;
    // Get the image file from the input
    var imageUpload = (_a = document.getElementById("profile-image").files) === null || _a === void 0 ? void 0 : _a[0];
    // Create a FileReader to read the image if it's selected
    var reader = new FileReader();
    reader.onloadend = function () {
        // Hide the form
        var form = document.getElementById("resume-form");
        if (form) {
            form.style.display = "none";
        }
        // Generate the resume content dynamically with a polished format
        var resumeDisplay = document.getElementById("resume-display");
        if (resumeDisplay) {
            resumeDisplay.innerHTML = "\n                <div class=\"edit-button-container\">\n                    <button onclick=\"editResume()\" class=\"edit-button\">\n                        <i class=\"fa fa-edit\"></i> Edit Resume\n                    </button>\n                </div>\n                <div class=\"container\">\n                    <div class=\"left_Side\">\n                        <div class=\"profileText\">\n                            <div class=\"imgBox\">\n                                <img src=\"".concat(reader.result, "\" alt=\"Profile Image\" class=\"profile-image\">\n                            </div>\n                            <h2>").concat(name, "</h2>\n                            <h2>").concat(jobTitle, "</h2>\n                        </div>\n                        <div class=\"PersonalInformation\">\n                            <h3 class=\"title\">Personal Information</h3>\n                            <ul>\n                                <li>\n                                    <span class=\"icon\"><i class=\"fa fa-phone\" aria-hidden=\"true\"></i></span>\n                                    <span class=\"text\">").concat(phone, "</span>\n                                </li>\n                                <li>\n                                    <span class=\"icon\"><i class=\"fa fa-envelope\" aria-hidden=\"true\"></i></span>\n                                    <span class=\"text\">").concat(email, "</span>\n                                </li>\n                                ").concat(linkedin ? "\n                                <li>\n                                    <span class=\"icon\"><i class=\"fa fa-linkedin\" aria-hidden=\"true\"></i></span>\n                                    <span class=\"text\">".concat(linkedin, "</span>\n                                </li>\n                                ") : '', "\n                                ").concat(github ? "\n                                <li>\n                                    <span class=\"icon\"><i class=\"fa fa-github\" aria-hidden=\"true\"></i></span>\n                                    <span class=\"text\">".concat(github, "</span>\n                                </li>\n                                ") : '', "\n                                <li>\n                                    <span class=\"icon\"><i class=\"fa fa-address-book\" aria-hidden=\"true\"></i></span>\n                                    <span class=\"text\">").concat(address, "</span>\n                                </li>\n                            </ul>\n                        </div>\n                        <div class=\"PersonalInformation Education\">\n                            <h3 class=\"title\">Education</h3>\n                            <h4>").concat(education, "</h4>\n                        </div>\n                    </div>\n                    <div class=\"right_Side\">\n                        <div class=\"Objective\">\n                            <h2 class=\"title2\">Objective</h2>\n                            <p>").concat(objective, "</p>\n                        </div>\n                        <div class=\"Objective\">\n                            <h2 class=\"title2\">Work Experience</h2>\n                            <div class=\"box\">\n                                <div class=\"text\">\n                                    <p>").concat(experience, "</p>\n                                </div>\n                            </div>\n                        </div>\n                        <div class=\"Objective Skills\" id=\"skills-section\">\n                            <h2 class=\"title2\">Skills</h2>\n                            <div class=\"box\">\n                                <div class=\"text\">\n                                    <p>").concat(skills, "</p>\n                                </div>\n                            </div>\n                        </div>\n                    </div>\n                </div>\n            ");
            // Show the resume display
            resumeDisplay.style.display = "block";
        }
    };
    // If an image is uploaded, read it
    if (imageUpload) {
        reader.readAsDataURL(imageUpload);
    }
    else {
        alert("Please upload a profile image.");
    }
});
// Function to handle editing the resume
function editResume() {
    // Show the form
    var form = document.getElementById("resume-form");
    if (form) {
        form.style.display = "block";
    }
    // Hide the resume display
    var resumeDisplay = document.getElementById("resume-display");
    if (resumeDisplay) {
        resumeDisplay.style.display = "none";
    }
    // Scroll to the top of the form
    window.scrollTo(0, 0);
}
