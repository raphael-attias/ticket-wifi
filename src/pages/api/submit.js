// pages/api/submit.js
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { networkInterface, incidentNature, incidentTime, additionalInfo, userEmail } = req.body;

    const transporter = nodemailer.createTransport({
      host: 'mail.infomaniak.com',
      port: 587,
      secure: false,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: "forms@littlestorm.eu",
      to: 'wifi@littlestorm.eu',
      subject: `Incident Reported at ${new Date().toISOString()}`,
      text: `
        Sur quel interface réseau: ${networkInterface}
        Nature de l'incident: ${incidentNature}
        Heure de l'incident: ${incidentTime}
        Quelque chose en plus à rapporter: ${additionalInfo || 'non'}
        Email pour être recontacté: ${userEmail}
      `,
      replyTo: userEmail,
    };

    try {
      await transporter.sendMail(mailOptions);
      res.status(200).json({ message: 'Email sent successfully' });
    } catch (error) {
      res.status(500).json({ message: 'Failed to send email', error });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
