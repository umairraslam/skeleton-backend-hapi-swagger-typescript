import * as Mongoose from "mongoose";
import * as Bcrypt from "bcryptjs";

export interface User extends Mongoose.Document {
  firstName: string;
  lastName: string;
  email: string;
  username: string;
  password: string;
  createdAt: Date;
  updateAt: Date;
}

export const UserSchema = new Mongoose.Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, unique: true, required: true },
    username: { type: String, unique: true, required: true },
    password: { type: String },
  },
  {
    timestamps: true
  }
);

const hashPassword = (password: string): string | null => {
  if (!password) {
    return null;
  }

  return Bcrypt.hashSync(password, Bcrypt.genSaltSync(8));
}

UserSchema.method('validatePassword', function(this:User, requestPassword: string):boolean {
  return Bcrypt.compareSync(requestPassword, this.password);
});

UserSchema.pre<User>("save", function (next: Function) {
  const user: User = this;

  if (!user.isModified("password")) {
    return next();
  }
  let hash = hashPassword(user["password"]);

  user["password"] = hash ? hash : '';

  return next();
});

UserSchema.pre("findOneAndUpdate", function () {
  const password = hashPassword(this.getUpdate().$set.password);

  if (!password) {
    return;
  }

  this.findOneAndUpdate({}, { password: password });
});

export const UserModel = Mongoose.model<User>("User", UserSchema);
