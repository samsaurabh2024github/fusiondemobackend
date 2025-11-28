import nodemailer from "nodemailer";

export const sendContactMessage = async (req, res) => {
  try {
    const { name, email, phone, category, message } = req.body;

    if (!name || !email || !message || !category) {
      return res.status(400).json({ error: "All required fields must be filled." });
    }

    // Nodemailer transporter
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // Email to ADMIN
    const adminMail = {
      from: `"FusionMain Contact" <${process.env.EMAIL_USER}>`,
      to: process.env.ADMIN_EMAIL,
      subject: `📩 New Contact Form Submission - ${name}`,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone || "Not provided"}</p>
        <p><strong>Category:</strong> ${category}</p>
        <p><strong>Message:</strong> ${message}</p>
      `,
    };

    // Auto reply to USER
    const userMail = {
      from: `"FusionMain Support" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "We received your message ✔️",
      html: `
        <h3>Hello ${name},</h3>
        <p>Thank you for contacting FusionMain! 👋</p>
        <p>We received your message and our team will reach out shortly.</p>
        <br />
        <p><strong>Your Submitted Details:</strong></p>
        <p><strong>Category:</strong> ${category}</p>
        <p><strong>Message:</strong> ${message}</p>
        <br />
        <p>Regards,<br />FusionMain Team</p>
      `,
    };

    await transporter.sendMail(adminMail);
    await transporter.sendMail(userMail);

    res.json({ success: true, message: "Message sent successfully!" });

  } catch (error) {
    console.error("Email Error:", error);
    res.status(500).json({ error: "Failed to send message." });
  }
};
