import { useMutation } from '@tanstack/react-query';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '../ui/form';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { supabase } from '@/lib/supabase';
import { toast } from 'sonner';

const formSchema = z.object({
  email: z
    .string()
    .email('Provide a valid email.')
    .min(1, 'Provide an email address.'),
});

type FormType = z.infer<typeof formSchema>;

export default function Newsletter() {
  const form = useForm<FormType>({
    defaultValues: {
      email: '',
    },
    resolver: zodResolver(formSchema),
  });

  const { isPending, mutate: subscribe } = useMutation({
    mutationFn: async (email: string) => {
      const { error } = await supabase
        .from('newsletter_emails')
        .insert([{ email }]);

      if (error) {
        if (error.code === '23505') {
          throw new Error('This email is already in our emailing list.👍');
        } else {
          throw new Error(error.message);
        }
      }
    },
    onError: error => {
      toast.error(`😞 ${error.message}`);
    },
    onSuccess: () => {
      toast.success(`🙂 Successfully subscribed to our email newsletter.`);
      form.reset();
    },
  });

  function onSubmit(values: FormType) {
    subscribe(values.email);
  }

  return (
    <div className="mt-4 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
      <div className="space-y-1">
        <p className="text-sm font-semibold">Join our newsletter</p>
        <p className="text-xs text-muted-foreground">
          We&apos;ll send you a nice letter once a week.😅
        </p>
      </div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-full md:1/2 lg:w-1/4 grid grid-cols-1 md:grid-cols-12 gap-2"
        >
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem className="col-span-12 md:col-span-9">
                <FormControl>
                  <Input
                    {...field}
                    type="email"
                    placeholder="jsmith@example.com"
                    className="flex-1"
                    disabled={isPending}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            className="col-span-12 md:col-span-3"
            disabled={isPending || !form.formState.isValid}
          >
            Subscribe
          </Button>
        </form>
      </Form>
    </div>
  );
}
