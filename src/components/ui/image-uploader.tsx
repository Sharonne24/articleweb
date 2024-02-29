import { useState, ChangeEvent } from 'react';
import { createId } from '@paralleldrive/cuid2';
import { X } from 'lucide-react';

import { toast } from 'sonner';

import { supabase, supabaseUrl } from '@/lib/supabase';
import clsx from 'clsx';

interface ImageUploaderProps {
  onImageChange: (url: string) => void;
  disabled?: boolean;
}

export default function ImageUploader({
  onImageChange,
  disabled,
}: ImageUploaderProps) {
  const [imageDetails, setImageDetails] = useState<{
    uploaded: boolean;
    imageUrl: null | string;
  }>({
    uploaded: false,
    imageUrl: null,
  });

  function handleImageUpload(e: ChangeEvent<HTMLInputElement>) {
    if (!e.target.files?.length) return null;

    const imageName = `${createId()}-${e.target.files[0].name}`.replaceAll(
      '/',
      ''
    );
    const imagePath = `${supabaseUrl}/storage/v1/object/public/blog-images/${imageName}`;
    supabase.storage
      .from('blog-images')
      .upload(imageName, e.target.files[0])
      .then(response => {
        const { error } = response;
        if (error) {
          console.log(error);
          toast.error(
            `😞 Unable to upload selected image. Ensure image doesn't exceed 4MB`,
            {
              duration: 5000,
            }
          );
        } else {
          setImageDetails({ imageUrl: imagePath, uploaded: true });
          onImageChange(imagePath);
        }
      })
      .catch(err => {
        console.log(err);
        toast.error(`😞 Unable to upload selected image.`, { duration: 5000 });
      });
  }

  function handleImageRemove() {
    setImageDetails({ imageUrl: null, uploaded: false });
    onImageChange('');
  }

  if (imageDetails.imageUrl) {
    return (
      <div className="relative w-fit h-fit">
        <img
          src={imageDetails.imageUrl}
          alt="blog image"
          className="rounded-md object-cover max-h-48 w-auto"
        />
        <button
          onClick={handleImageRemove}
          disabled={disabled}
          className="border-none outline-none absolute -right-2 -top-2 flex items-center justify-center z-10 size-4 rounded-full bg-destructive"
        >
          <X className="size-3 text-destructive-foreground" />
        </button>
      </div>
    );
  }

  return (
    <div className="flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
      <div className="text-center">
        <svg
          className="mx-auto h-12 w-12 text-gray-300"
          viewBox="0 0 24 24"
          fill="currentColor"
          aria-hidden="true"
        >
          <path
            fillRule="evenodd"
            d="M1.5 6a2.25 2.25 0 012.25-2.25h16.5A2.25 2.25 0 0122.5 6v12a2.25 2.25 0 01-2.25 2.25H3.75A2.25 2.25 0 011.5 18V6zM3 16.06V18c0 .414.336.75.75.75h16.5A.75.75 0 0021 18v-1.94l-2.69-2.689a1.5 1.5 0 00-2.12 0l-.88.879.97.97a.75.75 0 11-1.06 1.06l-5.16-5.159a1.5 1.5 0 00-2.12 0L3 16.061zm10.125-7.81a1.125 1.125 0 112.25 0 1.125 1.125 0 01-2.25 0z"
            clipRule="evenodd"
          />
        </svg>
        <div className="mt-4 flex text-sm leading-6 text-gray-600">
          <label
            htmlFor="file-upload"
            className={clsx(
              'relative cursor-pointer rounded-md bg-white font-semibold text-sky-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-sky-600 focus-within:ring-offset-2 hover:text-indigo-500',
              { 'pointer-events-none': disabled }
            )}
          >
            <span>Upload a file</span>
            <input
              id="file-upload"
              name="file-upload"
              type="file"
              className="sr-only"
              onChange={handleImageUpload}
            />
          </label>
          {/* <p className="pl-1">or drag and drop</p> */}
        </div>
        <p className="text-xs leading-5 text-gray-600">
          PNG, JPG, GIF up to 10MB
        </p>
      </div>
    </div>
  );
}
