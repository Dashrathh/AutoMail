import nodeMailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();

//  node mailer functionality

const sendMail = async (to, subject, message, pdfBuffer) => {
  try {
    const transporter = nodeMailer.createTransport({
      service: "gmail",

      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
      },
    });

    const mailOptions = {
      from: process.env.MAIL_USER,
      to: "sakurabausakura@gmail.com", // reciver mail
      subject: subject,
      text: message,
      html: `<p>${message}</p>`,
      attachments: [
        {
          filename: "report.pdf",
          content: pdfBuffer,
          contentType: "application/pdf",
        },
      ],
    };

    // send mail

    const info = await transporter.sendMail(mailOptions);
    console.log("Mail sent", info);
    return true;
  } catch (error) {
    console.error("error while sendig maik", error);
    return false;
  }
};
export default sendMail;
