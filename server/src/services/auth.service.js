import User from "../models/user.model.js";
import ApiError from "../utils/ApiError.js";
import generateToken from "../utils/generateToken.js";

export const registerService = async ({ name, email, password }) => {

    if (!name || !email || !password) {
        throw new ApiError(400, "All fields are required");
    }

    const existingUser = await User.findOne({ email });

    if (existingUser) {
        throw new ApiError(409, "User already exists");
    }

    const user = await User.create({
        name,
        email,
        password,
    });

    return {
        id: user._id,
        name: user.name,
        email: user.email,
    };
};

export const loginService = async ({ email, password }) => {
    if (!email || !password) {
        throw new ApiError(400, "Email and password are required");
    }

    const user = await User.findOne({ email });

    if (!user) {
        throw new ApiError(401, "Invalid email or password");
    }

    const isPasswordCorrect = await user.comparePassword(password);

    if (!isPasswordCorrect) {
        throw new ApiError(401, "Invalid email or password");
    }

    const token = generateToken(user._id);

    return {
        token,
        user: {
            id: user._id,
            name: user.name,
            email: user.email,
        },
    };
};

export const logoutService = async () => {
    return true;
};

export const forgotPasswordService = async (email) => {

    if (!email) {
        throw new ApiError(400, "Email is required");
    }

    const user = await User.findOne({ email });

    if (!user) {
        throw new ApiError(404, "User not found");
    }

    // Generate reset token
    const resetToken = crypto.randomBytes(32).toString("hex");

    user.passwordResetToken = crypto
        .createHash("sha256")
        .update(resetToken)
        .digest("hex");

    user.passwordResetExpires = Date.now() + 15 * 60 * 1000;

    await user.save();

    // Next step: send email with reset link

    return resetToken;
};

export const getMeService = async (userId) => {
    const user = await User.findById(userId).select("-password");

    if (!user) {
        throw new ApiError(404, "User not found");
    }

    return user;
};