"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { toast } from "@/components/ui/use-toast";
import { useAuth } from "@/hooks/useAuth";
import { useLocation, useNavigate } from "react-router-dom";

const formSchema = z.object({
  username: z.string().min(2, {
    message: "قم بإدخال كلمة اسم المستخدم",
  }),
  password: z.string().min(2, {
    message: "قم بإدخال كلمة المرور",
  }),
});

export const LoginPage = () => {
  const auth = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    const from = location.state?.from?.pathname || "/";
    console.log({ from });

    auth.signIn(values, () => {
      navigate(from, { replace: true });
    });
  }
  return (
    <div className="absolute inset-0 bg-sky-600 text-white">
      <div className="h-full flex flex-col items-center justify-center ">
        <div className="bg-neutral-50 text-right text-neutral-700 shadow-sky-400 shadow-lg max-w-[500px] lg:w-1/2 border-blue-200 border-4 rounded-2xl p-6">
          <h1 className="text-center text-2xl font-extrabold">تسجيل دخول</h1>
          <Separator className="my-4" />
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>اسم المستخدم</FormLabel>
                    <FormControl>
                      <Input placeholder="اسم المستخدم" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>كلمة المرور</FormLabel>
                    <FormControl>
                      <Input
                        className=""
                        placeholder="كلمة المرور"
                        {...field}
                        type="password"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Separator className="my-4" />
              <Button type="submit" className="w-full hover:bg-sky-600">
                دخول
              </Button>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
};
