import { google } from "googleapis";
import nodemailer from "nodemailer";

const google_id: string =
  "24372524741-jn16e1i5tcijldtr4ipcn55rtje4am4j.apps.googleusercontent.com";
const google_secret: string = "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";
const google_refreshToken: string =
  "1//048T2gFxCs-wtCgYIARAAGAQSNwF-L9IrYQ8G9xc6uE_hhbYVrU8vLyTJX-19_Odlgwi_7mAYI2UtbBVz6Ypg8yf0mTlI0zJmc60";
const google_redirectToken: string =
  "https://developers.google.com/oauthplayground";

const oAuth = new google.auth.OAuth2(
  google_id,
  google_secret,
  google_redirectToken
);

export const verifyAccount = async (createUser: any) => {
  try {
    oAuth.setCredentials({
      access_token: google_refreshToken,
    });

    const getToken = await oAuth.getAccessToken();

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        type: "OAuth2",
        user: "sannifortune11@gmail.com",
        clientId: google_id,
        clientSecret: google_secret,
        refreshToken: google_refreshToken,
        // accessToken: getToken?.token!,
        accessToken:
          "ya29.a0Ael9sCM6y-54u37X6_wzhCYdjdxLdiWWYcRemkB0YnMgfD8trqajSF3-DrKSGK5wLqwO09A7HnK-u8Rcpn_BWMssnzB0Hejm4Aonp5gxRtQAd-7H3NfdowBPS2wJ8OiimP9Y5fUGC9L-2xlcCmsZn5kKp2YHaCgYKAVgSARMSFQF4udJh-FZe-B2AFYR-AF3Vslw1oQ0163",
      },
    });

    const mailerOptions = {
      from: "lyfCare <sannifortune11@gmail.com>", // sender address
      to: createUser?.email, // list of receivers
      subject: "Hello ✔", // Subject line
      text: "Verifiy Your Account", // plain text body
      html: `<b>Welcome ${createUser?.name} here is your OTP : ${createUser?.otp}
      <a href="http://localhost/2001/verified" >
      click to verified
      </a>
      </b>`, // html body
    };

    transporter
      .sendMail(mailerOptions)
      .then(() => {
        console.log("Email Sent");
      })
      .catch((err) => {
        console.log("Email Not sent", err);
      });
  } catch (error) {
    console.log("An Error occured In verifyAccount");
  }
};
