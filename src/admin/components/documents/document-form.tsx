import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Input as MedusaInput } from "@medusajs/ui";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../common/form";
import { Input } from "../common/input";

interface DocumentFormProps {
  onSubmit: (data: DocumentFormData) => Promise<void>;
  loading: boolean;
  error: Error | null;
}

export const documentFormSchema = z.object({
  file: z.instanceof(FileList).optional()
});

export type DocumentFormData = z.infer<typeof documentFormSchema>;

export default function DocumentForm({
  onSubmit,
  loading,
  error
}: DocumentFormProps) {
  const form = useForm<DocumentFormData>({
    resolver: zodResolver(documentFormSchema),
  });

  const fileRef = form.register("file");

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full p-10 flex flex-col space-y-4">
        <FormField
          control={form.control}
          name="file"
          render={({ field }) => {
            return (
              <FormItem>
                <FormLabel>File</FormLabel>
                <FormControl>
                  <Input type="file" accept={"application/pdf"} {...fileRef} />
                </FormControl>
                <FormMessage />
              </FormItem>
            );
          }}
        />
        <Button disabled={loading} type="submit">Submit</Button>
      </form>
    </Form>
  );
}