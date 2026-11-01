"use strict";

const contactForm = document.querySelector("#contact-form");
const contactStatus = document.querySelector("#contact-status");

if (contactForm && contactStatus) {
    const nameInput = document.querySelector("#name");
    const emailInput = document.querySelector("#email");
    const phoneInput = document.querySelector("#phone");
    const messageInput = document.querySelector("#message");
    const fields = [nameInput, emailInput, phoneInput, messageInput];

    function validateField(field) {
        const value = field.value.trim();

        if (!value) {
            field.setCustomValidity("This field is required.");
        } else if (field === emailInput && field.validity.typeMismatch) {
            field.setCustomValidity("Enter a valid email address.");
        } else if (field === phoneInput && !/^[0-9]+$/.test(value)) {
            field.setCustomValidity("Phone number must contain digits only.");
        } else {
            field.setCustomValidity("");
        }

        return field.validity.valid;
    }

    fields.forEach((field) => {
        field.addEventListener("input", () => {
            validateField(field);
            contactStatus.textContent = "";
        });
    });

    contactForm.addEventListener("submit", (event) => {
        event.preventDefault();

        fields.forEach((field) => {
            field.value = field.value.trim();
        });

        const firstInvalidField = fields.find((field) => !validateField(field));
        if (firstInvalidField) {
            contactStatus.textContent = "Please correct the first invalid field before submitting.";
            firstInvalidField.reportValidity();
            return;
        }

        contactStatus.textContent = "Your form passed validation, but it is not connected to a service, so no message was sent.";
    });
}
