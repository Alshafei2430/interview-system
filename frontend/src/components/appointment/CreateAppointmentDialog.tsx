import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useDialog } from "@/hooks/useDialog";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import useCreateAppointment from "@/hooks/useCreateAppointment";

const formSchema = z.object({
  guestName: z.string().min(2, {
    message: "قم بإدخال كلمة اسم الضيف",
  }),
});

export function CreateAppointmentDialog() {
  const { mutate } = useCreateAppointment();
  const { isOpen, onClose } = useDialog();

  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      guestName: "",
    },
  });
  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      mutate(values, {
        onSuccess: () => {
          onClose();
        },
      });
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <Dialog onOpenChange={onClose} open={isOpen}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>اضافة مقابلة</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name="guestName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>اسم الضيف</FormLabel>
                  <FormControl>
                    <Input placeholder="اسم الضيف" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Separator className="mt-8 mb-2" />
            <Button type="submit" className="w-full hover:bg-sky-600 ">
              اضافة
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
