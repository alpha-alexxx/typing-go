import React, {
  ChangeEvent,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import axios from "axios";
import Cropper, { ReactCropperElement } from "react-cropper";

import "cropperjs/dist/cropper.css";

import Image, { getImageProps } from "next/image";
import { Button, buttonVariants } from "../ui/button";
import { profiles } from "@prisma/client";
import imageCompression from "browser-image-compression";
import {
  Crop,
  ImageIcon,
  Loader,
  Replace,
  Trash,
  Trash2,
  Upload,
  UploadCloudIcon,
} from "lucide-react";
import queryString from "query-string";
import { UseFormSetValue } from "react-hook-form";
import { toast } from "sonner";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useAlert } from "@/hooks/use-alert-store";
import { dataURItoBlob } from "@/lib/dataURItoBlob";

interface UploadAvatarFieldProps {
  picUrl: string | null;
  user?: profiles;
  setValue: UseFormSetValue<{
    username: string;
    full_name: string;
    avatar_url: string | null;
  }>;
}
interface ApiResponse {
  message: string;
  avatar_url: string;
}
const UploadAvatarField = ({
  picUrl,
  user,
  setValue,
}: UploadAvatarFieldProps) => {
  const { onAlertOpen } = useAlert();
  const [image, setImage] = useState<string | null>(picUrl);

  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const [tempImage, setTempImage] = useState<string>("");

  const [loading, setLoading] = useState(false);

  const [croppedImage, setCroppedImage] = useState<string>();

  const cropperRef = useRef<ReactCropperElement>(null);

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const onImageChange = async (e: any) => {
    e.preventDefault();

    let file;

    if (e.dataTransfer) {
      file = e.dataTransfer.files[0];
    } else if (e.target) {
      file = e.target.files[0];
    }

    // Ensure files[0] is a Blob object
    if (!(file instanceof Blob)) {
      console.error("Selected file is not a Blob.");
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      setTempImage(reader.result as string);
      setIsDialogOpen(true);
    };
    reader.readAsDataURL(file);
  };
  const onCrop = () => {
    const cropper = cropperRef.current?.cropper;
    if (typeof cropper !== "undefined") {
      setCroppedImage(cropper.getCroppedCanvas().toDataURL());
    }
  };

  async function deleteProfilePic() {
    try {
      setLoading(true);
      const userId = user?.id;
      const avatar = user?.avatar_url;
      const url = queryString.stringifyUrl({
        url: "/api/avatars",
        query: { userId, avatar },
      });
      const response = await axios.delete(url);
      setValue("avatar_url", null);
      setImage(null);
      toast.info("Image deleted Successfully");
    } catch (error: any) {
      console.log("[PROFILE_PIC_DELETE_ERROR]", error);
      toast.error("Error!", { description: error?.message });
    } finally {
      setLoading(false);
    }
  }

  const uploadImage = useCallback(
    async (image: string) => {
      const picture = dataURItoBlob(image, image.split(";")[0].split(":")[1]);
      if (!(picture instanceof Blob)) {
        console.error("Selected file is not a Blob.");
        return;
      }
      const compressedFile = await imageCompression(picture as File, {
        maxSizeMB: 1 / 20,
        maxWidthOrHeight: 1920,
        useWebWorker: true,
      });
      try {
        setLoading(true);
        const userId = user?.id;
        const formData = new FormData();
        formData.append(`${userId}`, compressedFile);

        const url = queryString.stringifyUrl({
          url: "/api/avatars",
          query: { userId },
        });
        const response = await axios.put<ApiResponse>(url, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        setValue("avatar_url", response?.data?.avatar_url);
        setImage(response.data?.avatar_url);
        setCroppedImage("");
        setTempImage("");
        setIsDialogOpen(false);
        toast.info("Image uploaded Successfully");
      } catch (error: any) {
        console.log("[PROFILE_PIC_UPLOAD_ERROR]", error);
        toast.error(error.name, {
          description: error?.message,
        });
      } finally {
        setLoading(false);
      }
    },
    [setValue, user],
  );

  const closeDialog = () => {
    setTempImage("");
    setCroppedImage("");
    setIsDialogOpen(false);
  };

  return (
    <>
      <div className="mb-4">
        <h3 className="mb-2 font-semibold">Basic Information</h3>
        <div className="mb-4 flex items-center sm:flex-col md:flex-row">
          <div className="flex-grow">
            <label
              className="mb-1 block text-sm font-medium"
              htmlFor="profile-photo"
            >
              Profile photo
            </label>
            <span className="text-xs text-gray-500">Recommended 200 x 200</span>
          </div>
          <div className="ml-4">
            {image !== null ? (
              <Image
                alt="Profile"
                className="size-40 rounded-full bg-slate-200 dark:bg-slate-600"
                width={200}
                height={200}
                src={`${image}?t=${Date.now()}`}
                style={{
                  aspectRatio: "1/1",
                  objectFit: "cover",
                }}
              />
            ) : (
              <div className="flex w-full items-center justify-center">
                <label
                  htmlFor="dropzone-file"
                  className="dark:hover:bg-bray-800 flex h-40 w-40 cursor-pointer flex-col items-center justify-center rounded-full border-2 border-dashed border-gray-300 bg-gray-50 hover:bg-gray-100 dark:border-gray-600 dark:bg-gray-700 dark:hover:border-gray-500 dark:hover:bg-gray-600"
                >
                  <div className="flex flex-col items-center justify-center pb-6 pt-5">
                    <UploadCloudIcon className="mb-4 h-8 w-8 text-gray-500 dark:text-gray-400" />
                    <p className="mb-2 text-center text-xs text-gray-500 dark:text-gray-400">
                      <span className="font-semibold">
                        Click to upload image
                      </span>
                      <br />
                      or drag and drop
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      JPG, JPEG, PNG
                    </p>
                  </div>
                  <input
                    id="dropzone-file"
                    accept="image/*"
                    type="file"
                    className="hidden"
                    ref={fileInputRef}
                    onChange={onImageChange}
                    multiple={true}
                  />
                </label>
              </div>
            )}
          </div>
        </div>
        <div className="mb-2 flex gap-2">
          {image && (
            <>
              <Button
                type="button"
                className="flex-1 gap-x-2"
                variant="outline"
                onClick={async () => {
                  await setImage(null);
                  fileInputRef.current?.click();
                }}
              >
                <Replace className="size-4" />
                Change
              </Button>
              <Button
                type="button"
                className="flex-1 gap-x-2 border-rose-500 text-rose-500 hover:bg-rose-500/10 hover:text-rose-600"
                variant={"outline"}
                disabled={loading}
                onClick={() => {
                  onAlertOpen(
                    "delete-profile-image",
                    { action: deleteProfilePic },
                    "alert-dialog",
                  );
                }}
              >
                {loading ? (
                  <Loader className="size-4 animate-spin" />
                ) : (
                  <Trash className="size-4" />
                )}
                Remove
              </Button>
            </>
          )}
        </div>
      </div>
      {
        <Dialog open={isDialogOpen} onOpenChange={closeDialog}>
          <DialogContent>
            {!croppedImage && tempImage !== null ? (
              <div>
                <Cropper
                  ref={cropperRef}
                  className="mx-auto h-64 w-64 rounded-2xl bg-blue-400 object-contain"
                  zoomTo={0.5}
                  initialAspectRatio={3 / 4}
                  src={tempImage}
                  viewMode={2}
                  center={true}
                  background={true}
                  responsive={true}
                  autoCropArea={1}
                  zoomable={true}
                  zoomOnTouch={true}
                  zoomOnWheel={true}
                  checkOrientation={false}
                  guides={true}
                />
                <DialogFooter>
                  <div className="ml-auto mt-8">
                    <Button type="button" onClick={onCrop}>
                      Crop image
                    </Button>
                  </div>
                </DialogFooter>
              </div>
            ) : (
              <>
                <div className="mx-auto rounded-xl border-2 border-dashed bg-slate-100">
                  <Image
                    height={200}
                    width={200}
                    src={croppedImage as string}
                    alt="Cropped"
                    className="object-contain"
                  />
                </div>
                <DialogFooter className="mt-4 w-full space-x-2">
                  <Button
                    type="button"
                    className="items-center gap-x-2"
                    disabled={loading}
                    variant={"outline"}
                    onClick={() => setCroppedImage("")}
                  >
                    <Crop className="size-4 " />
                    Crop image
                  </Button>
                  <Button
                    type="button"
                    className="items-center gap-x-2"
                    disabled={loading}
                    variant={"secondary"}
                    onClick={() => {
                      setTempImage("");
                      setCroppedImage("");
                      fileInputRef?.current?.click();
                    }}
                  >
                    <ImageIcon className="size-4 " />
                    Change Image
                  </Button>
                  <Button
                    className="items-center gap-x-2"
                    disabled={loading}
                    onClick={() => uploadImage(croppedImage!)}
                    type="submit"
                  >
                    {loading ? (
                      <Loader className="size-4 animate-spin" />
                    ) : (
                      <Upload className="size-4 " />
                    )}
                    Upload Image
                  </Button>
                </DialogFooter>
              </>
            )}
          </DialogContent>
        </Dialog>
      }
    </>
  );
};

export default UploadAvatarField;
