"use client";

import { updateDefaultAccount } from "@/actions/accounts";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import useFetch from "@/hooks/use-fetch";
import { ArrowDownRight, ArrowUpRight } from "lucide-react";
import Link from "next/link";
import React, { useEffect } from "react";
import { toast } from "sonner";

const AccountCard = ({ account }) => {
  // 'account' is already destructured from props
  // You can directly access: the attributes of the account
  const { name, type, balance, id, isDefault } = account;

  // Initialize useFetch hook to handle the default account update operation
  // This hook manages loading state, error handling, and the update function
  const {
    loading: updateDefaultLoading, // Loading state during update
    func: updateDefaultFunc, // Function to call for updating default status
    data: updateAccount, // Response data after successful update
    error, // Any error that occurs during update
  } = useFetch(updateDefaultAccount);

  // Handler function for default account toggle
  // Prevents removing the last default account and updates the default status
  const handleDefaultChange = async (event) => {
    event.preventDefault(); // Prevent default form submission behavior

    // Check if trying to unset the current default account
    if (isDefault) {
      toast.warning("You need at least 1 default account");
      return; // Prevent removing the last default account
    }

    // Call the update function with the account ID
    await updateDefaultFunc(id);
  };

  useEffect(() => {
    // In updateAccount?.success -> '?.' is an optional chaining operator that Returns undefined if updateAccount is null/undefined 
    // without optional chaining, it would throw an error
    if(updateAccount?.success) {
        toast.success("Default Account updated successfully");
    }
  }, [updateAccount, updateDefaultLoading])

  useEffect(() => {
    
    if(error) {
        toast.error(error.message || "Failed to update Default Account");
    }
  }, [error])

  return (
    <Card className="hover:shadow-md transition-shadow group relative">
      <Link href={`/account/${id}`}>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium capitalize">
            {name}
          </CardTitle>
          <Switch
            checked={isDefault}
            onClick={handleDefaultChange}
            disabled={updateDefaultLoading}
          />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            ${parseFloat(balance).toFixed(2)}
          </div>
          <div className="text-sm text-muted-background">
            {type.charAt(0) + type.slice(1).toLowerCase()} Account
          </div>
        </CardContent>
        <CardFooter className="flex justify-between text-sm text-muted-foreground">
          <div className="flex items-center">
            <ArrowUpRight className="mr-1 h-4 w-4 text-green-500" />
            Income
          </div>
          <div className="flex items-center">
            <ArrowDownRight className="mr-1 h-4 w-4 text-red-500" />
            Expense
          </div>
        </CardFooter>
      </Link>
    </Card>
  );
};

export default AccountCard;
