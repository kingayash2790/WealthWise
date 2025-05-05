"use client";

import React, { useEffect, useState } from "react";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "./ui/drawer";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { accountSchema } from "@/app/lib/schema";
import { Input } from "./ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Switch } from "./ui/switch";
import { Button } from "./ui/button";
import useFetch from "@/hooks/use-fetch";
import { createAccount } from "@/actions/dashboard";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";

// Main component for creating new accounts through a drawer interface
const CreateAccountDrawer = ({ children }) => {
  // State to control drawer open/close
  const [open, setOpen] = useState(false);

  // Form configuration with react-hook-form and zod validation
  const {
    register, // Register form fields with validation rules
    handleSubmit, // Handle form submission with validation
    formState: { errors }, // Access form validation errors
    setValue, // Programmatically set form values
    watch, // Watch and react to form value changes
    reset, // Reset form fields to their initial values
  } = useForm({
    resolver: zodResolver(accountSchema), // Connect zod schema for validation
    defaultValues: {
      name: "", // Account name field
      type: "CURRENT", // Default account type
      balance: "", // Initial balance
      isDefault: false, // Default account flag
    },
  });

  const {
    data: newAccount,
    error,
    func: createAccountFunc,
    loading: createAccountLoading,
  } = useFetch(createAccount);

  // Whenever the account is created, we want to show a toast that "Account created successfully"
  // This useEffect will only be invoked if the "createAccountLoading" changes or the "newAccount" has some data inside it 
  useEffect(() => {
    if(newAccount && !createAccountLoading) {
      toast.success("Account Created Successfully");
      reset();  // reseting the form
      setOpen(false); // drawer closes
    }

  }, [createAccountLoading, newAccount]);

  // if there is any error
  useEffect(() => {
    if(error) {
      toast.error(error.message || "Failed to create account"); 
    }
  }, [error]);

  // Form submission handler - processes validated form data
  const onSubmit = async (data) => {
    await createAccountFunc(data);
  };

  return (
    // Drawer component for account creation interface
    <Drawer open={open} onOpenChange={setOpen}>
      {/* Trigger element to open the drawer */}
      <DrawerTrigger asChild>{children}</DrawerTrigger>

      {/* Drawer content container */}
      <DrawerContent>
        {/* Drawer header with title */}
        <DrawerHeader>
          <DrawerTitle className="text-center">Create New Account</DrawerTitle>
        </DrawerHeader>

        {/* Main form container */}
        <div className="px-4 pb-4">
          {/* Form with validation and submission handling */}
          <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
            {/* Account Name Input Section */}
            <div className="space-y-2">
              <label htmlFor="name" className="text-sm font-medium">
                Account Name
              </label>
              <Input
                id="name"
                placeholder="e.g. Main Checking"
                {...register("name")}
              />
              {/* Display validation errors */}
              {errors.name && (
                <p className="text-sm text-red-500">{errors.name.message}</p>
              )}
            </div>

            {/* Account Type Selection Section */}
            <div className="space-y-2">
              <label htmlFor="name" className="text-sm font-medium">
                Account Type
              </label>
              <Select
                onValueChange={(value) => setValue("type", value)}
                defaultValue={watch("type")}
              >
                <SelectTrigger id="type">
                  <SelectValue placeholder="Select Account Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="CURRENT">Current</SelectItem>
                  <SelectItem value="SAVINGS">Savings</SelectItem>
                </SelectContent>
              </Select>
              {/* Display validation errors */}
              {errors.type && (
                <p className="text-sm text-red-500">{errors.type.message}</p>
              )}
            </div>

            {/* Initial Balance Input Section */}
            <div className="space-y-2">
              <label htmlFor="balance" className="text-sm font-medium">
                Initial Balance
              </label>
              <Input
                id="balance"
                type="number"
                step="0.01"
                placeholder="0.00"
                {...register("balance")}
              />
              {/* Display validation errors */}
              {errors.balance && (
                <p className="text-sm text-red-500">{errors.balance.message}</p>
              )}
            </div>

            {/* Default Account Toggle Section */}
            <div className="flex items-center justify-between rounded-lg border p-3">
              <div>
                <label htmlFor="isDefault" className="text-sm font-medium">
                  Set as Default
                </label>
                <p className="text-sm text-muted-foreground">
                  This account will be selected as default for transactions.
                </p>
              </div>
              <Switch
                id="isDefault"
                onCheckedChange={(checked) => setValue("isDefault", checked)}
                checked={watch("isDefault")}
              />
            </div>

            {/* Form action buttons - Submit creates account, Cancel closes drawer */}
            <div className="w-1/3 mx-auto pt-4">
              <div className="flex gap-8 items-center justify-center">
                {/* Submit button for form submission */}
                <Button
                  type="submit"
                  className="flex-1"
                  disabled={createAccountLoading}
                >
                  {/* if the createAccountLoading is true, then show the loader, otherwise show "Create Account" */}
                  {createAccountLoading ? (
                    <>
                      Creating...
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    </>
                  ) : (
                    "Create Account"
                  )}
                </Button>
                {/* Cancel button that closes the drawer */}
                <DrawerClose asChild>
                  <Button
                    type="button"
                    variant="destructive"
                    className="flex-1"
                  >
                    Cancel
                  </Button>
                </DrawerClose>
              </div>
            </div>
          </form>
        </div>
      </DrawerContent>
    </Drawer>
  );
};

export default CreateAccountDrawer;
