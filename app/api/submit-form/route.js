import { NextResponse } from "next/server";

const prodForm = "https://submit-form.com/hRJclpnkQ";
const devForm = "https://submit-form.com/j3aa0XiL4";

export async function POST(request) {
  try {
    const formData = await request.json();
    console.log("Form data:", formData);

    const response = await fetch(devForm, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    if (response.ok) {
      return NextResponse.json({ message: "Form submitted successfully" });
    } else {
      return NextResponse.json(
        { error: "Error submitting form" },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error("Error submitting form:", error);
    return NextResponse.json(
      { error: "Error submitting form" },
      { status: 500 }
    );
  }
}
