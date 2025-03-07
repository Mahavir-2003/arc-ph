import { NextResponse } from "next/server";

const prodForm = "https://submit-form.com/hRJclpnkQ";
const devForm = "https://submit-form.com/j3aa0XiL4";

export async function POST(request) {
  try {
    const formData = await request.json();
    console.log("Form data:", formData);

    const formUrl = process.env.NODE_ENV === "production" ? prodForm : devForm;
    console.log("Form URL:", formUrl);

    const response = await fetch(formUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify(formData),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      console.error("Form submission error:", errorData);
      return NextResponse.json(
        { error: errorData.message || "Error submitting form" },
        { status: response.status }
      );
    }

    return NextResponse.json({ message: "Form submitted successfully" });
  } catch (error) {
    console.error("Error submitting form:", error);
    return NextResponse.json(
      { error: "Error submitting form. Please try again later." },
      { status: 500 }
    );
  }
}