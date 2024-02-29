import { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

import { Button } from '../../components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '../../components/ui/dialog';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../../components/ui/form';
import { Input } from '../../components/ui/input';

import { createCategory } from '@/services/categories-api';
import { toast } from 'sonner';

const formSchema = z.object({
  category: z.string().min(1, 'Enter category name.'),
});

export default function CreateCategory() {
  const [isOpen, setIsOpen] = useState(false);
  const queryClient = useQueryClient();
  const form = useForm<z.infer<typeof formSchema>>({
    defaultValues: {
      category: '',
    },
    resolver: zodResolver(formSchema),
  });

  function handleClose() {
    setIsOpen(false);
  }

  const { isPending: isCreating, mutate: create } = useMutation({
    mutationFn: (categoryName: string) => createCategory(categoryName),
    onError: error => {
      toast.error(`😞 Something went wrong while creating this category.`);
      console.log(error);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['categories'] });
      form.reset();
      handleClose();
    },
  });

  function onSubmit(value: z.infer<typeof formSchema>) {
    create(value.category);
  }

  return (
    <>
      <Button onClick={() => setIsOpen(true)}>Create Category</Button>
      <Dialog open={isOpen} onOpenChange={handleClose}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create Category</DialogTitle>
            <DialogDescription>
              Categories will be tagged to every blog article.
            </DialogDescription>
          </DialogHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="category"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Category Name</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Travel"
                        {...field}
                        disabled={isCreating}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="actions">
                <Button size="sm" disabled={isCreating} type="submit">
                  Save
                </Button>
                <Button
                  type="button"
                  size="sm"
                  variant="outline"
                  onClick={handleClose}
                  disabled={isCreating}
                >
                  Cancel
                </Button>
              </div>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </>
  );
}
