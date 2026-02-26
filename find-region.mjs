import { execSync } from "child_process";
import { readFileSync, writeFileSync } from "fs";

const regions = [
  "eu-west-1", "eu-west-2", "eu-west-3",
  "eu-central-1", "eu-central-2", "eu-north-1",
  "us-east-1", "us-east-2", "us-west-1", "us-west-2",
  "ap-southeast-1", "ap-southeast-2", "ap-northeast-1"
];

const user = "postgres.xbbqlksggerpqbyeslof";
const pass = "%40ThisTimeIsWorking%231";

for (const region of regions) {
  const url = `postgresql://${user}:${pass}@aws-0-${region}.pooler.supabase.com:6543/postgres`;
  process.stdout.write(`Testing ${region}... `);
  try {
    execSync(`npx prisma db push --url="${url}"`, {
      encoding: "utf8",
      stdio: "pipe",
      timeout: 30000,
    });
    console.log("✅ SUCCESS!");
    // Update .env with working URL
    let env = readFileSync(".env", "utf8");
    env = env.replace(/DATABASE_URL=.*/, `DATABASE_URL="${url}"`);
    writeFileSync(".env", env);
    console.log(`Region found: ${region}`);
    console.log(`DATABASE_URL updated in .env`);
    process.exit(0);
  } catch (e) {
    const out = ((e.stderr || "") + (e.stdout || "")).toString();
    const errLine = out.split("\n").find(l => l.includes("Error") || l.includes("FATAL") || l.includes("error")) || "unknown error";
    console.log(`❌ ${errLine.trim().slice(0, 80)}`);
  }
}

console.log("\nAll regions failed. Please check credentials or project ref.");
