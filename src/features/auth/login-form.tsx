import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import TogglePassword from '@/components/ui/toggle-password';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const formSchema = z.object({
  email: z.string().email().min(1, 'Email is required.'),
  password: z.string().min(6, 'Passwords needs to be over six characters'),
});

export default function LoginForm() {
  const [showPassword, setShowPassord] = useState(false);

  function handleTogglePassword() {
    setShowPassord(prev => !prev);
  }

  const form = useForm<z.infer<typeof formSchema>>({
    defaultValues: {
      email: '',
      password: '',
    },
    resolver: zodResolver(formSchema),
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
  }

  return (
    <main className="flex items-center justify-center h-dvh px-4 sm:px-0">
      <Card className="max-w-lg w-full">
        <CardHeader>
          <CardTitle>Login</CardTitle>
          <CardDescription>
            Provide your login credentials to proceed.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        placeholder="jsmith@example.com"
                        {...field}
                      />
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
                    <div className="flex items-center justify-between">
                      <FormLabel>Password</FormLabel>
                      <TogglePassword
                        showPassword={showPassword}
                        onTogglePassword={handleTogglePassword}
                      />
                    </div>
                    <FormControl>
                      <Input
                        type={showPassword ? 'text' : 'password'}
                        placeholder="******"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button className="w-full md:w-fit">Login</Button>
            </form>
          </Form>
          <Link
            to="/forgot-password"
            className="text-sm font-medium block text-right mt-4 text-sky-500 transition-all hover:underline hover:text-sky-600"
          >
            Forgot password?
          </Link>
        </CardContent>
      </Card>
    </main>
  );
}
