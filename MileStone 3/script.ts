document.getElementById("resume-form")?.addEventListener("submit", function (e) {
    e.preventDefault(); // Prevent the default form submission

    // Collect input values
    const name = (document.getElementById("name") as HTMLInputElement).value;
    const jobTitle = (document.getElementById("job-title") as HTMLInputElement).value;
    const phone = (document.getElementById("phone") as HTMLInputElement).value;
    const email = (document.getElementById("email") as HTMLInputElement).value;
    const linkedin = (document.getElementById("linkedin") as HTMLInputElement).value;
    const github = (document.getElementById("github") as HTMLInputElement).value;
    const address = (document.getElementById("address") as HTMLTextAreaElement).value;
    const objective = (document.getElementById("objective") as HTMLTextAreaElement).value;
    const education = (document.getElementById("education") as HTMLTextAreaElement).value;
    const experience = (document.getElementById("experience") as HTMLTextAreaElement).value;
    const skills = (document.getElementById("skills") as HTMLTextAreaElement).value;

    // Get the image file from the input
    const imageUpload = (document.getElementById("profile-image") as HTMLInputElement).files?.[0];

    // Create a FileReader to read the image if it's selected
    const reader = new FileReader();
    reader.onloadend = function () {
        // Generate the resume content dynamically with a polished format
        const resumeDisplay = document.getElementById("resume-display");
        if (resumeDisplay) {
            resumeDisplay.innerHTML = `
                <div class="container">
                    <div class="left_Side">
                        <div class="profileText">
                            <div class="imgBox">
                                <img src="${reader.result}" alt="Profile Image" class="profile-image">
                            </div>
                            <h2>${name}</h2>
                            <h2>${jobTitle}</h2>
                        </div>
                        <div class="PersonalInformation">
                            <h3 class="title">Personal Information</h3>
                            <ul>
                                <li>
                                    <span class="icon"><i class="fa fa-phone" aria-hidden="true"></i></span>
                                    <span class="text">${phone}</span>
                                </li>
                                <li>
                                    <span class="icon"><i class="fa fa-envelope" aria-hidden="true"></i></span>
                                    <span class="text">${email}</span>
                                </li>
                                ${linkedin ? `
                                <li>
                                    <span class="icon"><i class="fa fa-linkedin" aria-hidden="true"></i></span>
                                    <span class="text">${linkedin}</span>
                                </li>
                                ` : ''}
                                ${github ? `
                                <li>
                                    <span class="icon"><i class="fa fa-github" aria-hidden="true"></i></span>
                                    <span class="text">${github}</span>
                                </li>
                                ` : ''}
                                <li>
                                    <span class="icon"><i class="fa fa-address-book" aria-hidden="true"></i></span>
                                    <span class="text">${address}</span>
                                </li>
                            </ul>
                        </div>
                        <div class="PersonalInformation Education">
                            <h3 class="title">Education</h3>
                            <h4>${education}</h4>
                        </div>
                    </div>
                    <div class="right_Side">
                        <div class="Objective">
                            <h2 class="title2">Objective</h2>
                            <p>${objective}</p>
                        </div>
                        <div class="Objective">
                            <h2 class="title2">Work Experience</h2>
                            <div class="box">
                                <div class="text">
                                    <p>${experience}</p>
                                </div>
                            </div>
                        </div>
                        <div class="Objective Skills" id="skills-section">
                            <h2 class="title2">Skills</h2>
                            <div class="box">
                                <div class="text">
                                    <p>${skills}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            `;
        }
    };

    // If an image is uploaded, read it
    if (imageUpload) {
        reader.readAsDataURL(imageUpload);
    } else {
        alert("Please upload a profile image.");
    }
});
