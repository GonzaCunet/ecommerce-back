import { User } from "../models/user";
import { Auth } from "models/auth";
import { addMinutes } from "date-fns/addMinutes";
import gen from "random-seed";
import { sendMail } from "controllers/mail";

var seed = "unapruebita";
var random = gen.create(seed);
export async function findOrCreateAuth(email: string): Promise<Auth> {
  const cleanEmail = email.trim().toLowerCase();
  const auth = await Auth.findByEmail(cleanEmail);
  if (auth) {
    return auth;
  } else {
    const newUser = await User.createNewUser({ email: cleanEmail });
    const newAuth = await Auth.createNewAuth({
      email: cleanEmail,
      userId: newUser.ref.id,
      // code: "",
      // expires: new Date(),
    });
    return newAuth;
  }
}
export async function sendCode(email: string) {
  const auth = await findOrCreateAuth(email);
  const code = random.intBetween(10000, 99999);
  const now = new Date();
  const twentyMinutesFromNow = addMinutes(now, 20);
  auth.data.code = code;
  auth.data.expires = twentyMinutesFromNow;
  await auth.push();
  await sendMail(email, auth.data.code);

  return true;
}
