const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const crypto = require("crypto");

const employerSchema = new mongoose.Schema(
  {
    companyName: {
      type: String,
      // required: [true, "must type company name"],
    },
    companyDescription: {
      type: String,
      // required: [true, "must type company description"],
    },
    password: {
      type: String,
      required: [true, "must type password"],
      minLength: [8, "the password must be longer than 8 chars"],
      select: false,
    },
    confirmPassword: {
      type: String,
      validate: {
        validator: function (el) {
          return !this.isModified("password") || this.password === el;
        },
        message: "the password doesn't match",
      },
    },
    companyEmail: {
      type: String,
      required: [true, "type email"],
      validate: {
        validator: (val) => validator.isEmail(val),
        message: "email is not valid",
      },
      unique: true,
    },
    companyLogo: {
      type: String,
      // required: [true, "company logo is required"],
    },
    companySize: {
      type: Number,
      // required: [true, "company size is required"],
      min: [1, "company size must be a positive integer"],
      max: [1000, "company size must be less than or equal to 1000"],
    },
    companyContact: {
      type: String,
      // required: [true, "company contact is required"],
    },
    companyJobsAvailable: {
      type: Number,
      // required: [true, "company jobs available is required"],
      min: [1, "company jobs available must be a positive integer"],
      max: [1000, "company jobs available must be less than or equal to 1000"],
    },
    role: {
      type: String,
      enum: ["employer", "jobSeeker"],
      default: "employer",
    },
    newAccount: {
      type: Boolean,
      default: true,
    },
    companyAdress: {
      type: String,
    },
    companyCity: {
      type: String,
    },
    reviesAvg: {
      type: Number,
    },
    reviews: [
      {
        userId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
        },
        dueDate: {
          type: Date,
          default: Date.now,
        },

        ratings: {
          process: {
            type: Number,
          },
          responseTime: {
            type: Number,
          },
          attitude: {
            type: Number,
          },
        },
        notes: {
          type: String,
        },
      },
    ],
    newNotifications: {
      type: Number,
      default: 0,
    },
    notifications: [
      {
        userId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
        },
        message: {
          type: String,
        },
        read: {
          type: Boolean,
          default: false,
        },
        dueDate: {
          type: Date,
          default: Date.now,
        },
      },
    ],
    passwordResetToken: String,
    passwordResetExpires: Date,
    passwordChangedAt: Date,
    otp: String, // The OTP code
    otpExpires: Date,
  },

  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// Virtual population for jobs
employerSchema.virtual("jobs", {
  ref: "Job",
  localField: "_id",
  foreignField: "author",
});
employerSchema.methods.createOtp = function () {
  const otp = Math.floor(100000 + Math.random() * 900000).toString(); // Generate 6-digit OTP
  this.otp = otp;
  this.otpExpires = Date.now() + 10 * 60 * 1000; // OTP valid for 10 minutes
  return otp; // Return the OTP so it can be sent to the user
};

employerSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    const salt = await bcrypt.genSalt(8);
    this.password = await bcrypt.hash(this.password, salt);
    this.confirmPassword = undefined;
  }
  next();
});

employerSchema.pre("save", function (next) {
  if (this.isModified("password") || this.isNew)
    this.passwordChangedAt = Date.now() - 1000;
  next();
});
employerSchema.pre("save", function (next) {
  // If notifications are modified, adjust the newNotifications count
  const readNotificationsCount = this.notifications.filter(
    (n) => n.read
  ).length;

  // Update newNotifications based on read notifications
  this.newNotifications = this.notifications.length - readNotificationsCount;

  next();
});

employerSchema.pre("save", function (next) {
  // Calculate the average of all review ratings (process, responseTime, attitude)
  if (this.reviews && this.reviews.length > 0) {
    const totalReviews = this.reviews.length;

    // Sum up the ratings for each review
    const totalRating = this.reviews.reduce((acc, review) => {
      const processRating = review.ratings?.process || 0;
      const responseTimeRating = review.ratings?.responseTime || 0;
      const attitudeRating = review.ratings?.attitude || 0;

      // Sum up the ratings for each review
      return acc + processRating + responseTimeRating + attitudeRating;
    }, 0);

    // Calculate the average
    const totalRatingsCount = totalReviews * 3; // 3 ratings per review (process, responseTime, attitude)
    this.reviesAvg = totalRating / totalRatingsCount;
  } else {
    this.reviesAvg = 0; // If no reviews, set reviesSum to 0
  }

  next();
});

employerSchema.methods.createPasswordResetToken = function () {
  const resetToken = crypto.randomBytes(32).toString("hex");

  this.passwordResetToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

  this.passwordResetExpires = Date.now() + 10 * 60 * 1000; // Token expires in 10 minutes

  return resetToken;
};

employerSchema.methods.checkPassword = async function (
  password,
  hashedPassword
) {
  return await bcrypt.compare(password, hashedPassword);
};

const Employer = mongoose.model("Employer", employerSchema);
module.exports = Employer;
