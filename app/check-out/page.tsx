"use client";
import { Input } from "@/components";
import PayWithPaystack from "@/hooks/paystackHook";
import { useSearchParams } from "next/navigation";
import { useState } from "react";

type FormState = {
  firstName: string;
  lastName: string;
  phoneNumber: string;
  emailAddress: string;
  deliveryAddress: string;
};

export default function CheckOut() {
  const searchParams = useSearchParams();
  const totalAmount = searchParams.get("totalAmount") || 0;
  const shippingFee =
    searchParams.get("shippingFee") || Math.trunc(Number(totalAmount) / 65);

  const grandTotal = Number(totalAmount) + Number(shippingFee);

  const [formData, setFormData] = useState<FormState>({
    firstName: "",
    lastName: "",
    phoneNumber: "",
    emailAddress: "",
    deliveryAddress: "",
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
    <main className="pt-[40px] flex max-md:flex-col-reverse justify-between gap-[50px] items-start">
      <section className="flex flex-col gap-[30px] flex-1 max-w-[500px] max-md:mx-auto">
        <p className="text-2xl font-semibold font-poppins text-start mb-[10px]">
          Delivery Details
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
        <Input
          label="Delivery Address"
          placeholder="Enter location for delivery"
          value={formData.deliveryAddress}
          onChange={handleChange}
          name="deliveryAddress"
          required
        />

        <PayWithPaystack
          email={formData.emailAddress}
          amount={Number(grandTotal)}
          disabled={
            formData.firstName.length > 2 &&
            formData.lastName.length > 2 &&
            formData.phoneNumber.length > 2 &&
            formData.emailAddress.length > 2 &&
            emailRegex.test(formData.emailAddress) &&
            formData.deliveryAddress.length > 2
          }
        />
      </section>

      <section className="w-[30%] max-lg:w-[35%] max-w-[400px] max-md:w-[90%] max-md:mx-auto h-fit">
        <div className="px-[24px] py-[48px] w-full flex flex-col gap-[16px] bg-white dark:bg-[#0F1125] rounded-lg border border-[#E5E5E5] dark:border-[#181C3A]">
          <p className="text-2xl font-semibold font-poppins text-center mb-[20px]">
            Order Summary
          </p>
          <span className="flex justify-between">
            <p>Subtotal</p>
            <p className="font-poppins">
              <span className="mr-[3px]">₦</span>
              {Number(totalAmount).toLocaleString()}
            </p>
          </span>
          <hr className="w-full border border-[#E5E5E5] dark:border-[#181C3A]" />

          <span className="flex justify-between">
            <p>Shipping Fee</p>
            <p className="font-poppins">
              <span className="mr-[3px]">₦</span>
              {Number(shippingFee).toLocaleString()}
            </p>
          </span>
          <hr className="w-full border border-[#E5E5E5] dark:border-[#181C3A]" />

          <span className="flex justify-between">
            <p>Discount</p>
            <p>N/A</p>
          </span>
          <hr className="w-full border border-[#E5E5E5] dark:border-[#181C3A]" />

          <span className="flex justify-between">
            <p>Grand Total</p>
            <p className="font-poppins">
              <span className="mr-[3px]">₦</span>
              {Number(grandTotal).toLocaleString()}
            </p>
          </span>
        </div>
      </section>
    </main>
  );
}
