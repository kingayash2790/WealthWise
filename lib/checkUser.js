// Import required dependencies
import { currentUser } from "@clerk/nextjs/server";
import { db } from "./prisma";

// Function to check and manage user authentication state
export const checkUser = async () => {
    // Get the current authenticated user from Clerk
    const user = await currentUser();

    // Return null if no user is authenticated
    if(!user) {
        return null;
    }

    try {
        // Check if user already exists in our database
        const loggedInUser = await db.user.findUnique({
            where: {
                clerkUserId: user.id,
            },
        });

        // Return existing user if found
        if(loggedInUser) {
            return loggedInUser;    
        }

        // Create full name from first and last name
        const name = `${user.firstName} ${user.lastName}`;

        // Create new user in database if not found
        const newUser = await db.user.create({
            data: {
                clerkUserId: user.id,
                name,
                imageUrl: user.imageUrl,
                email: user.emailAddresses[0].emailAddress,
            },
        });

        return newUser;
    }
    catch(error) {
        // Log any errors that occur during database operations
        console.log(error.message); 
    }
};
