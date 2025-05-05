// This is a server-side action file that handles account-related operations
"use server";
import { db } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";

// Helper function to serialize transaction data, particularly handling BigNumber types
// This is necessary because Prisma returns BigNumber for decimal fields which can't be directly serialized
const serializeTransaction = (obj) => {
  const serialized = { ...obj };
  // This is needed because BigNumber objects can't be directly converted to JSON: -
  // BigNumber is a special data type used to handle very large numbers and precise decimal calculations
  // For balance
  if (obj.balance) {
    serialized.balance = obj.balance.toNumber(); // Convert BigNumber to regular number
  }

  // For amount
  if (obj.amount) {
    serialized.amount = obj.amount.toNumber(); // Convert BigNumber to regular number
  }

  return serialized;
};

// Function to create a new account for the authenticated user
export async function createAccount(data) {
  try {
    // Get the current authenticated user's ID from Clerk
    const { userId } = await auth();
    if (!userId) throw new Error("Unauthorized");

    // Find the user in our database using their Clerk user ID
    const user = await db.user.findUnique({
      where: { clerkUserId: userId },
    });

    if (!user) {
      throw new Error("User not found");
    }

    // Convert the balance string to a float for database storage
    const balanceFloat = parseFloat(data.balance);
    if (isNaN(balanceFloat)) {
      throw new Error("Invalid balance amount");
    }

    // Check if the user already has any accounts
    const existingAccounts = await db.account.findMany({
      where: { userId: user.id },
    });

    // Determine if this new account should be the default account:
    // - If it's the user's first account, it will be default
    // - If user already has accounts, use the isDefault flag from the input data
    const shouldBeDefault =
      existingAccounts.length === 0 ? true : data.isDefault;

    // If this account is marked as default, we need to unset the default flag
    // from all other accounts of this user
    if (shouldBeDefault) {
      await db.account.updateMany({
        where: { userId: user.id, isDefault: true },
        data: { isDefault: false },
      });
    }

    // Create the new account with the provided data
    const account = await db.account.create({
      data: {
        ...data,
        balance: balanceFloat,
        userId: user.id,
        isDefault: shouldBeDefault,
      },
    });

    // Serialize the account data before returning to ensure proper JSON formatting
    const serializedAccount = serializeTransaction(account);

    // Revalidate the dashboard page to show the new account
    revalidatePath("/dashboard");
    return { success: true, data: serializedAccount };
  } catch (error) {
    throw new Error(error.message);
  }
}

// Function to fetch all accounts for the currently authenticated user
export async function getUserAccounts() {
  // Get the current authenticated user's ID from Clerk
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");

  // Find the user in our database using their Clerk user ID
  const user = await db.user.findUnique({
    where: { clerkUserId: userId },
  });

  if (!user) {
    throw new Error("User not found");
  }

  // Finding the accounts w.r.t. user
  const accounts = await db.account.findMany({
    where: { userId: user.id },
    orderBy: { createdAt: "desc" },
    include: {
      _count: {
        select: {
          transactions: true,
        },
      },
    },
  });

  // Serialize the account data before returning to ensure proper JSON formatting
  const serializedAccount = accounts.map(serializeTransaction);

  return serializedAccount;
}
