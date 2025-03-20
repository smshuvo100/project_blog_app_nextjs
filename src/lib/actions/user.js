import User from "../models/user.model";
import { connect } from "../mongodb/mongoose";

export const createOrUpdateUser = async (id, first_name, last_name, image_url, email_addresses, username) => {
  try {
    await connect();

    // Validate email_addresses
    if (!email_addresses || email_addresses.length === 0) {
      throw new Error("No email address provided");
    }

    const user = await User.findOneAndUpdate(
      { clerkId: id },
      {
        $set: {
          firstName: first_name,
          lastName: last_name,
          profilePicture: image_url,
          email: email_addresses[0].email_address,
          username
        }
      },
      { new: true, upsert: true, lean: true } // Use `lean: true` to return a plain object
    );

    if (!user) {
      throw new Error("User not found or could not be created");
    }

    return user;
  } catch (error) {
    console.error("Error creating or updating user:", error);
    throw error; // Re-throw the error to propagate it
  }
};

export const deleteUser = async (id) => {
  try {
    await connect();
    const result = await User.findOneAndDelete({ clerkId: id });

    if (!result) {
      throw new Error("User not found or could not be deleted");
    }

    return result; // Return the deleted user (plain object)
  } catch (error) {
    console.error("Error deleting user:", error);
    throw error; // Re-throw the error to propagate it
  }
};
