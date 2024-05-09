const toastoptions = {
    position: 'top-right',
    autoClose: 3000, // milliseconds
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    // style: {
    //     color: 'violet' // Set text color to violet
    // }
   }

export default toastoptions;

export const isStrongPassword=(password)=> {
    
    const criteriaNotMet = [];
    
    if (!/(?=.*[a-z])/.test(password)) {
        criteriaNotMet.push("At least one lowercase letter (a-z)");
    }
    
    if (!/(?=.*[A-Z])/.test(password)) {
        criteriaNotMet.push("At least one uppercase letter (A-Z)");
    }
    
    if (!/(?=.*\d)/.test(password)) {
        criteriaNotMet.push("At least one digit (0-9)");
    }
    
    if (!/(?=.*[@$!%*?&])/.test(password)) {
        criteriaNotMet.push("At least one special character (@, $, !, %, *, ?, &)");
    }
    
    if (!/^[A-Za-z\d@$!%*?&]{8,}$/.test(password)) {
        criteriaNotMet.push("A minimum length of 8 characters");
    }

    if (criteriaNotMet.length === 0) {
        return true;
    } else {
        return criteriaNotMet;
    }
}

export const validateEmail = (email) => {
    const criteriaNotMet = []
    // Regular expression for validating email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // Check if email is empty
    if (!email.trim()) {
        criteriaNotMet.push("Email cannot be empty")
    }

    // Check if email format is valid
    if (!emailRegex.test(email)) {
        criteriaNotMet.push("Invalid email format")
    }

    // Check for specific errors
    const [localPart, domainPart] = email.split('@');

    // Check local part errors
    if (localPart.length === 0) {
        criteriaNotMet.push("Local part cannot be empty")
    }
    if (localPart.startsWith('.') || localPart.endsWith('.')) {
        criteriaNotMet.push("Local part cannot start or end with a period")
    }
    if (!/^[a-zA-Z0-9._-]+$/.test(localPart)) {
        criteriaNotMet.push("Invalid characters in local part")
    }

    // Check domain part errors
    if (domainPart.length === 0) {
        criteriaNotMet.push("Domain part cannot be empty")
    }
    if (!domainPart.includes('.')) {
        criteriaNotMet.push("Domain part must contain at least one period")
    }
    const domainSegments = domainPart.split('.');
    if (!domainSegments.every(segment => /^[a-zA-Z0-9-]+$/.test(segment))) {
        criteriaNotMet.push("Invalid characters in domain part")
    }

    // Check top-level domain (TLD)
    const tld = domainSegments[domainSegments.length - 1];
    const validTLDs = ['com', 'org', 'net', 'edu']; // Add more valid TLDs as needed
    if (!validTLDs.includes(tld)) {
        criteriaNotMet.push("Invalid top-level domain (TLD)")
    }

    // If no errors found, return "Email is valid"
    return true;
};