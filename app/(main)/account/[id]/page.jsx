import { getAccountWithTransactions } from "@/actions/accounts";
// import NotFound from '@/app/not-found';
import { notFound } from "next/navigation";
import React, { Suspense } from "react";
import TransactionTable from "../_components/transaction-table";
import { BarLoader } from "react-spinners";

// 'params' object in our code is used to CAPTURE DYNAMIC ROUTE PARAMETERS
const AccountPage = async ({ params }) => {
  // Ensure params is properly awaited
  const accountId = await Promise.resolve(params.id);
  const accountData = await getAccountWithTransactions(accountId);
  if (!accountData) {
    notFound();
  }

  // Destructure accountData into separate variables
  // - transactions: Contains the array of transaction objects
  // - account: Contains all other account properties (id, name, balance, type, etc.)
  // The rest operator (...) collects all remaining properties not explicitly destructured
  const { transactions, ...account } = accountData;

  return (
    <div className="space-y-8 px-5 ">
      <div className="flex gap-4 items-end justify-between">
        <div>
          <h1 className="text-5xl sm:text-6xl font-bold gradient-title capitalize">
            {account.name}
          </h1>
          <p className="text-muted-foreground">
            {account.type.charAt(0) + account.type.slice(1).toLowerCase()}{" "}
            Account
          </p>
        </div>

        <div className="text-right pb-2">
          <div className="text-xl lg:text-2xl font-bold">
            ${parseFloat(account.balance).toFixed(2)}
          </div>
          <p className="text-sm text-muted-foreground">
            {account._count.transactions} Transactions
          </p>
        </div>
      </div>

      {/* Chart Section */}

      {/* Transaction Table */}
      <Suspense
        fallback={<BarLoader className="mt-4" width={"100%"} color="#9333ea" />}
      >
        <TransactionTable transactions={transactions} />
      </Suspense>
    </div>
  );
};

export default AccountPage;
