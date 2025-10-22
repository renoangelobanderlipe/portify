import { SignupForm } from "@/app/(auth)/signup/components/signup-form";

export default function Page() {
  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full md:max-w-lg">
        <SignupForm />
      </div>
    </div>
  );
}
