import actualBudget from '@actual-app/api';
import fs from 'fs/promises'
const localCacheDir = '/tmp/actual-budget'
const serverURL = process.env.AB_SERVER_URL
const password = process.env.AB_PASSWORD
const syncID = process.env.AB_SYNC_ID
const accountId = process.env.AB_ACCOUNT_ID

async function sync() {
  // Ensure dir exists
  await fs.access(localCacheDir, fs.constants.F_OK)
    .catch(() => fs.mkdir(localCacheDir))

  await actualBudget.init({
    dataDir: localCacheDir,
    serverURL,
    password,
  });

  console.log("Downloading ActualBudget cache locally")
  await actualBudget.downloadBudget(syncID);

  await actualBudget.importTransactions(accountId, transactions)

  await actualBudget.shutdown()
}

sync()

const transactions = [
  {
    account: accountId,
    date: '2023-03-26',
    payee: 'VISA PURCHASE MARLEYSPOON.COM.AU',
    imported_payee: 'VISA PURCHASE MARLEYSPOON.COM.AU',
    transfer_id: 'ztC8ZxeH4tkqob5q84MaWTWkJ1nGlmTH0zsxNzUraiE='
  },
  {
    account: accountId,
    date: '2023-03-26',
    payee: 'VISA PURCHASE Live Payments',
    imported_payee: 'VISA PURCHASE Live Payments',
    transfer_id: 'd0xHQsat8HT5vzd5SbZIt4gCJVGwG0Mfevza+1da8aM='
  },
  {
    account: accountId,
    date: '2023-03-26',
    payee: 'VISA PURCHASE BRUNSWICK SUPA IGA',
    imported_payee: 'VISA PURCHASE BRUNSWICK SUPA IGA',
    transfer_id: 'FvSCGi9CZY7JviDXVquLzm4eJCd8Jc6DC/v5m7XXuXU='
  }
]