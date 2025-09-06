/* eslint-disable react/prop-types */
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import useFetch from "@/hooks/use-fetch";
import { addNewCompany } from "@/api/apiCompanies";
import { BarLoader } from "react-spinners";
import { useEffect } from "react";

const schema = z.object({
  name: z.string().min(1, { message: "Company name is required" }),
  logo: z
    .any()
    .refine(
      (file) =>
        file &&
        file.length > 0 &&
        (file[0].type === "image/png" || file[0].type === "image/jpeg"),
      {
        message: "Only PNG or JPEG images are allowed",
      }
    ),
});

const AddCompanyDrawer = ({ fetchCompanies }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  });

  const {
    loading: loadingAddCompany,
    error: errorAddCompany,
    data: dataAddCompany,
    fn: fnAddCompany,
  } = useFetch(addNewCompany);

  const onSubmit = async (data) => {
    fnAddCompany({
      ...data,
      logo: data.logo[0],
    });
  };

  useEffect(() => {
    if (dataAddCompany) {
      // Refresh company list after adding
      fetchCompanies?.();
      reset();
    }
  }, [dataAddCompany, reset, fetchCompanies]);

  return (
    <Drawer>
      {/* ✅ FIX: use asChild to prevent nested <button> */}
      <DrawerTrigger asChild>
        <Button type="button" size="sm" variant="secondary">
          Add Company
        </Button>
      </DrawerTrigger>

      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Add a New Company</DrawerTitle>
        </DrawerHeader>

        <form
          className="flex flex-col gap-4 p-4 pb-0"
          onSubmit={handleSubmit(onSubmit)}
        >
          {/* Company Name */}
          <Input placeholder="Company name" {...register("name")} />

          {/* Company Logo */}
          <Input
            type="file"
            accept="image/*"
            className="file:text-gray-500"
            {...register("logo")}
          />

          {/* Add Button */}
          <Button
            type="submit"
            variant="destructive"
            className="w-full md:w-40"
            disabled={loadingAddCompany}
          >
            Add
          </Button>
        </form>

        <DrawerFooter>
          {/* Validation Errors */}
          {errors.name && (
            <p className="text-red-500">{errors.name.message}</p>
          )}
          {errors.logo && (
            <p className="text-red-500">{errors.logo.message}</p>
          )}

          {/* API Error */}
          {errorAddCompany?.message && (
            <p className="text-red-500">{errorAddCompany?.message}</p>
          )}

          {/* Loader */}
          {loadingAddCompany && <BarLoader width={"100%"} color="#36d7b7" />}

          {/* Cancel Button */}
          <DrawerClose asChild>
            <Button type="button" variant="secondary">
              Cancel
            </Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

export default AddCompanyDrawer;
