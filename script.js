document.getElementById("studentForm").addEventListener("submit", async function (event) {
    event.preventDefault(); // Prevent default form submission

    const formData = {
        name: document.getElementById("name").value,
        mobile: document.getElementById("mobile").value,
        city: document.getElementById("city").value
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
