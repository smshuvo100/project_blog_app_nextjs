import { clerkClient } from "@clerk/nextjs/server";
import { headers } from "next/headers";
import { Webhook } from "svix";
import { createOrUpdateUser, deleteUser } from "../../../lib/actions/user";

export async function POST(req) {
  const SIGNING_SECRET = process.env.SIGNING_SECRET;

  if (!SIGNING_SECRET) {
    throw new Error("SIGNING_SECRET is missing. Please add it to your environment variables.");
  }

  const headerPayload = headers();
  const svix_id = headerPayload.get("svix-id");
  const svix_timestamp = headerPayload.get("svix-timestamp");
  const svix_signature = headerPayload.get("svix-signature");

  if (!svix_id || !svix_timestamp || !svix_signature) {
    return new Response("Error: Missing Svix headers. Ensure the webhook is configured correctly.", {
      status: 400
    });
  }

  const payload = await req.json();
  const body = JSON.stringify(payload);

  const wh = new Webhook(SIGNING_SECRET);
  let evt;

  try {
    evt = wh.verify(body, {
      "svix-id": svix_id,
      "svix-timestamp": svix_timestamp,
      "svix-signature": svix_signature
    });
  } catch (err) {
    console.error("Error verifying webhook:", err.message, err.stack);
    return new Response("Error: Invalid webhook signature.", {
      status: 400
    });
  }

  if (!evt?.data?.id || !evt?.type) {
    return new Response("Error: Invalid webhook payload.", {
      status: 400
    });
  }

  const { id } = evt.data;
  const eventType = evt.type;
  console.log(`Webhook received: ID=${id}, Type=${eventType}`);
  console.log("Webhook body:", JSON.stringify(payload, null, 2));

  if (eventType === "user.created" || eventType === "user.updated") {
    const { id, first_name, last_name, image_url, email_addresses, username } = evt.data;

    if (!id || !email_addresses?.[0]?.email_address) {
      return new Response("Error: Missing required user data in payload.", {
        status: 400
      });
    }

    try {
      const user = await createOrUpdateUser(id, first_name, last_name, image_url, email_addresses, username);

      if (user && eventType === "user.created") {
        if (!user._id || user.isAdmin === undefined) {
          console.error("Error: Missing required user data for metadata update.");
          return new Response("Error: Missing required user data.", {
            status: 400
          });
        }

        try {
          await clerkClient.users.updateUserMetadata(id, {
            publicMetadata: {
              userMongoId: user._id,
              isAdmin: user.isAdmin
            }
          });
        } catch (error) {
          console.error("Error updating user metadata:", error.message, error.stack);
        }
      }
    } catch (error) {
      console.error("Error creating or updating user:", error.message, error.stack);
      return new Response("Error: Failed to process user data.", {
        status: 400
      });
    }
  }

  if (eventType === "user.deleted") {
    const { id } = evt.data;

    try {
      await deleteUser(id);
    } catch (error) {
      console.error("Error deleting user:", error.message, error.stack);
      return new Response("Error: Failed to delete user.", {
        status: 400
      });
    }
  }

  return new Response("Webhook processed successfully", { status: 200 });
}
