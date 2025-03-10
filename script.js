document.getElementById("studentForm").addEventListener("submit", async function (event) {
    event.preventDefault(); // Prevent default form submission

    const formData = {
        name: document.getElementById("name").value,
        standard: document.getElementById("standard").value,
        mobile: document.getElementById("mobile").value,
        vehicle: document.getElementById("vehicle").value,
        hostel: document.getElementById("hostel").value
    };

    try {
        const response = await fetch("https://mcischool.onrender.com/submit", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(formData)
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        alert("✅ Form submitted successfully!");

        // ✅ Open PDF from the main folder in a new tab
        window.open("https://mcischool.onrender.com/sample.pdf", "_blank");

    } catch (error) {
        console.error("🚨 Server Error:", error);
        alert("❌ Something went wrong. Please try again.");
    }
});
