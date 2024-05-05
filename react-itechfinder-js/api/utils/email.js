import nodemailer from 'nodemailer';

const verifyEmail = async (email, link) => {
  try {
    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 465,
      secure: true,
      auth: {
        user: process.env.GMAIL_APP_EMAIL,
        pass: process.env.GMAIL_APP_PASS,
      },
    });

    const info = await transporter.sendMail({
      from: process.env.GMAIL_APP_EMAIL,
      to: email,
      subject: 'Account Verification',
      text: 'Welcome,',
      html: `
      <div>
      <h2>Welcome to iTechFinder!</h2> <br /><br />
      <p>Please click the link below to verify your account:</p><br />
      <p><a href=${link}>Click here to verify your e-mail.</a></p>

      <br /><br />
      <p>Thanks, </p><br />
      iTechFinder <br />
      <br />
      <img src='https://firebasestorage.googleapis.com/v0/b/itechfinder-4502f.appspot.com/o/page_photo%2Fitechfinder.svg?alt=media&token=2b8bcec1-9fdb-4370-813a-90778f6f8920' width="180" />
      </div>
      `,
    });
    console.log('mail sent successfully!');
  } catch (error) {
    console.log(error);
  }
};

export default verifyEmail;
