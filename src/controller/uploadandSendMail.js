import Report from "../model/pdf.model.js";
import sendMail from "../utils/nodeMailer.js";

// upload report on mongdb atlas

const uploadReport = async (req, res) => {
  try {
    const { title } = req.body;
    const pdfBuffer = req.file.buffer;

    const newReport = new Report({
      title,
      pdf: pdfBuffer,
    });

    await newReport.save();

    console.log(newReport);

    if (!newReport) {
      return res.status(400).json({ message: "Failed to create report" });
    }

    return res
      .status(201)
      .json({ message: "PDF uploaded successfully", newReport });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error while uploading report", error });
  }
};

const sendReportByMail = async (req, res) => {
  try {
    const { id } = req.params;
    const { to, subject, message } = req.body;

    //  found report
    const report = await Report.findById(id);

    if (!report) {
      return res.status(404).json({ message: "report not found" });
    }

    //  send mail
    const mailSent = await sendMail(to, subject, message, report.pdf);

    console.log(mailSent);

    if (!mailSent) {
      return res.status(500).json({ message: "Failed to send mail" });
    }
    return res.status(200).json({ message: "Mail sent successfully" });
  } catch (error) {
    console.error("Mail sent error", error);

    return res.status(500).json({ message: "Internal server error ", error });
  }
};

export { sendReportByMail, uploadReport };
