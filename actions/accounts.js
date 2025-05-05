"use server";

import { db } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";

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

// Function to update the default account for the current user
// Takes an accountId parameter and returns a success/error response
export async function updateDefaultAccount(accountId) {
  try {
    // Step 1: Authentication Check
    // Get the current authenticated user's ID from Clerk
    const { userId } = await auth();
    if (!userId) throw new Error("Unauthorized");

    // Step 2: User Verification
    // Find the user in our database using their Clerk user ID
    const user = await db.user.findUnique({
      where: { clerkUserId: userId },
    });

    if (!user) {
      throw new Error("User not found");
    }

    // Step 3: Reset Current Default
    // Update all accounts of the user that are currently marked as default
    // This ensures only one account can be default at a time
    await db.account.updateMany({
      where: {
        userId: user.id,
        isDefault: true,
      },
      data: {
        isDefault: false,
      },
    });

    // Step 4: Set New Default
    // Update the specified account to be the new default
    // Only update if the account belongs to the current user
    const account = await db.account.update({
      where: {
        id: accountId,
        userId: user.id,
      },
      data: {
        isDefault: true,
      },
    });

    // Step 5: Cache Revalidation
    // Revalidate the dashboard page to reflect the changes
    revalidatePath("/dashboard");

    // Step 6: Return Success Response
    // Serialize the account data to handle BigNumber values
    return {
      success: true,
      data: serializeTransaction(account),
    };
  } catch (error) {
    // Step 7: Error Handling
    // Return error response if any step fails
    return {
      success: false,
      error: error.message,
    };
  }
}

export async function getAccountWithTransactions(accountId) {
  // Step 1: Authentication Check
  // Get the current authenticated user's ID from Clerk
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");

  // Step 2: User Verification
  // Find the user in our database using their Clerk user ID
  const user = await db.user.findUnique({
    where: { clerkUserId: userId },
  });

  if (!user) {
    throw new Error("User not found");
  }

  const account = await db.account.findUnique({
    where: { id: accountId, userId: user.id },
    include: {
      transactions: {
        orderBy: { date: "desc" },
      },
      _count: {
        select: {
          transactions: true,
        },
      },
    },
  });

  if (!account) {
    return null;
  }

  return {
    ...serializeTransaction(account),
    transactions: account.transactions.map(serializeTransaction),
  };
}
