"use client";
import { Input } from "@/components";
import Button from "@/components/utility/button";
import PayWithPaystack from "@/hooks/paystackHook";
import { useState } from "react";

type DonateFormState = {
  firstName: string;
  lastName: string;
  amountDonated: string;
  phoneNumber: string;
  emailAddress: string;
};

export default function CheckOut() {
  const [formData, setFormData] = useState<DonateFormState>({
    firstName: "",
    lastName: "",
    amountDonated: "",
    phoneNumber: "",
    emailAddress: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  return (
    <main className="pt-[20px]">
      <section className="flex flex-col gap-[30px] flex-1 max-w-[500px] mx-auto">
        <p className="text-2xl font-semibold font-poppins text-center mb-[10px] text-black dark:text-white">
          Personal Details
        </p>
        <aside className="flex items-center gap-[20px]">
          <Input
            label="First Name"
            placeholder="Enter your first Name"
            value={formData.firstName}
            onChange={handleChange}
            name="firstName"
            required
          />
          <Input
            label="Last Name"
            placeholder="Enter your Last Name"
            value={formData.lastName}
            onChange={handleChange}
            name="lastName"
            required
          />
        </aside>
        <Input
          label="Amount"
          placeholder="Amount suitable for donation"
          type="number"
          value={formData.amountDonated}
          onChange={handleChange}
          name="amountDonated"
          required
        />
        <Input
          label="Phone Number"
          placeholder="Enter your Phone Number"
          type="number"
          value={formData.phoneNumber}
          onChange={handleChange}
          name="phoneNumber"
          required
        />
        <Input
          label="Email Address"
          placeholder="Enter your Email Address"
          value={formData.emailAddress}
          onChange={handleChange}
          name="emailAddress"
          required
        />

        <aside className="flex gap-[20px]">
          <Button
            type="fill"
            bgColor="#737373"
            bgHover="#8c8c8c"
            className="flex-2"
            scaleOnHover={false}
            onClick={() => {
              setFormData((Prev) => ({
                ...Prev,
                firstName: "John",
                lastName: "Doe",
                emailAddress: "johndoe2004@gmail.com",
                phoneNumber: "08025907227",
              }));
            }}
          >
            Stay Anonymous
          </Button>

          <PayWithPaystack
            email={formData.emailAddress}
            amount={Number(formData.amountDonated)}
            disabled={
              formData.firstName.length > 2 &&
              formData.lastName.length > 2 &&
              formData.phoneNumber.length > 2 &&
              formData.emailAddress.length > 2 &&
              emailRegex.test(formData.emailAddress) &&
              formData.amountDonated.length > 1
            }
            className="flex-3"
          />
        </aside>
      </section>
    </main>
  );
}
