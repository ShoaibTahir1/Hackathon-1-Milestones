// Type definitions for better type safety
interface ResumeData {
    name: string;
    email: string;
    phone: string;
    education: string;
    experience: string;
    skills: string;
    jobTitle?: string;
    linkedin?: string;
    github?: string;
    address?: string;
    objective?: string;
}

// Utility functions
const getElement = <T extends HTMLElement>(id: string): T => {
    const element = document.getElementById(id) as T;
    if (!element) throw new Error(`Element with id '${id}' not found`);
    return element;
};

const getInputValue = (id: string): string => {
    return (getElement<HTMLInputElement | HTMLTextAreaElement>(id)).value.trim();
};

// Initialize DOM elements
const form = getElement<HTMLFormElement>('resume-form');
const resumeDisplay = getElement<HTMLDivElement>('resume-display');
const shareableLinkContainer = getElement<HTMLDivElement>('sharable-link-container');
const shareableLinkElement = getElement<HTMLAnchorElement>('sharable-link');
const downloadPdfButton = getElement<HTMLButtonElement>('download-pdf');

// Local Storage functions
const saveResumeData = (username: string, data: ResumeData): void => {
    try {
        localStorage.setItem(username, JSON.stringify(data));
    } catch (error) {
        console.error('Error saving data:', error);
        throw new Error('Failed to save resume data');
    }
};

const loadResumeData = (username: string): ResumeData | null => {
    try {
        const data = localStorage.getItem(username);
        return data ? JSON.parse(data) : null;
    } catch (error) {
        console.error('Error loading data:', error);
        return null;
    }
};

// Image handling
const handleImageUpload = async (file: File | undefined): Promise<string> => {
    if (!file) throw new Error('Please upload a profile image');
    
    const maxSize = 5 * 1024 * 1024; // 5MB
    if (file.size > maxSize) {
        throw new Error('Image size should be less than 5MB');
    }

    const allowedTypes = ['image/jpeg', 'image/png', 'image/gif'];
    if (!allowedTypes.includes(file.type)) {
        throw new Error('Please upload a valid image file (JPEG, PNG, or GIF)');
    }
    
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = () => reject(new Error('Failed to read image file'));
        reader.readAsDataURL(file);
    });
};

// Generate resume HTML
const generateResumeHTML = (data: ResumeData, imageUrl: string): string => {
    const sanitizeHtml = (str: string) => {
        return str.replace(/</g, '&lt;').replace(/>/g, '&gt;');
    };

    return `
        <div class="container">
            <div class="left_Side">
                <div class="profileText">
                    <div class="imgBox">
                        <img src="${imageUrl}" alt="Profile Image" class="profile-image">
                    </div>
                    <h2 contenteditable="true">${sanitizeHtml(data.name)}</h2>
                    <h2 contenteditable="true">${sanitizeHtml(data.jobTitle || '')}</h2>
                </div>
                <div class="PersonalInformation">
                    <h3 class="title">Personal Information</h3>
                    <ul>
                        <li>
                            <span class="icon"><i class="fa fa-phone"></i></span>
                            <span class="text" contenteditable="true">${sanitizeHtml(data.phone)}</span>
                        </li>
                        <li>
                            <span class="icon"><i class="fa fa-envelope"></i></span>
                            <span class="text" contenteditable="true">${sanitizeHtml(data.email)}</span>
                        </li>
                        ${data.linkedin ? `
                        <li>
                            <span class="icon"><i class="fa fa-linkedin"></i></span>
                            <span class="text" contenteditable="true">${sanitizeHtml(data.linkedin)}</span>
                        </li>
                        ` : ''}
                        ${data.github ? `
                        <li>
                            <span class="icon"><i class="fa fa-github"></i></span>
                            <span class="text" contenteditable="true">${sanitizeHtml(data.github)}</span>
                        </li>
                        ` : ''}
                        ${data.address ? `
                        <li>
                            <span class="icon"><i class="fa fa-address-book"></i></span>
                            <span class="text" contenteditable="true">${sanitizeHtml(data.address)}</span>
                        </li>
                        ` : ''}
                    </ul>
                </div>
                <div class="PersonalInformation Education">
                    <h3 class="title">Education</h3>
                    <h4 contenteditable="true">${sanitizeHtml(data.education)}</h4>
                </div>
            </div>
            <div class="right_Side">
                ${data.objective ? `
                <div class="Objective">
                    <h2 class="title2">Objective</h2>
                    <p contenteditable="true">${sanitizeHtml(data.objective)}</p>
                </div>
                ` : ''}
                <div class="Objective">
                    <h2 class="title2">Work Experience</h2>
                    <div class="box">
                        <div class="text">
                            <p contenteditable="true">${sanitizeHtml(data.experience)}</p>
                        </div>
                    </div>
                </div>
                <div class="Objective Skills">
                    <h2 class="title2">Skills</h2>
                    <div class="box">
                        <div class="text">
                            <p contenteditable="true">${sanitizeHtml(data.skills)}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
};

// Form submission handler
form.addEventListener('submit', async (e: Event) => {
    e.preventDefault();

    try {
        // Basic form validation
        const requiredFields = ['username', 'name', 'job-title', 'phone', 'email', 'education', 'experience', 'skills'];
        for (const field of requiredFields) {
            const value = getInputValue(field);
            if (!value) {
                throw new Error(`Please fill in the ${field.replace('-', ' ')} field`);
            }
        }

        const username = getInputValue('username');
        const resumeData: ResumeData = {
            name: getInputValue('name'),
            jobTitle: getInputValue('job-title'),
            phone: getInputValue('phone'),
            email: getInputValue('email'),
            linkedin: getInputValue('linkedin'),
            github: getInputValue('github'),
            address: getInputValue('address'),
            objective: getInputValue('objective'),
            education: getInputValue('education'),
            experience: getInputValue('experience'),
            skills: getInputValue('skills')
        };

        // Check for existing data
        if (loadResumeData(username)) {
            const overwrite = confirm("Data already exists for this username. Do you want to overwrite it?");
            if (!overwrite) return;
        }

        // Handle image upload
        const imageFile = (getElement<HTMLInputElement>('profile-image')).files?.[0];
        const imageUrl = await handleImageUpload(imageFile);

        // Save data and update UI
        saveResumeData(username, resumeData);
        form.style.display = 'none';
        resumeDisplay.innerHTML = generateResumeHTML(resumeData, imageUrl);
        resumeDisplay.style.display = 'block';

        // Generate shareable link
        const shareableURL = `${window.location.origin}${window.location.pathname}?username=${encodeURIComponent(username)}`;
        shareableLinkContainer.style.display = 'block';
        shareableLinkElement.href = shareableURL;
        shareableLinkElement.textContent = shareableURL;

    } catch (error) {
        console.error(error);
        alert(error instanceof Error ? error.message : 'An unknown error occurred');
    }
});

// PDF download handler
downloadPdfButton.addEventListener('click', () => {
    shareableLinkContainer.style.display = 'none';
    downloadPdfButton.style.display = 'none';
    window.print();
    setTimeout(() => {
        shareableLinkContainer.style.display = 'block';
        downloadPdfButton.style.display = 'block';
    }, 1000);
});

// Load saved data on page load
window.addEventListener('DOMContentLoaded', () => {
    try {
        const urlParams = new URLSearchParams(window.location.search);
        const username = urlParams.get('username');
        
        if (username) {
            const savedData = loadResumeData(username);
            if (savedData) {
                Object.entries(savedData).forEach(([key, value]) => {
                    const element = document.getElementById(key) as HTMLInputElement | HTMLTextAreaElement;
                    if (element) element.value = value;
                });
            } else {
                console.log('No saved data found for username:', username);
            }
        }
    } catch (error) {
        console.error('Error loading saved data:', error);
    }
});
