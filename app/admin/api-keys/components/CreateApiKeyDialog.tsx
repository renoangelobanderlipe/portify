import { zodResolver } from "@hookform/resolvers/zod";
import { Copy } from "lucide-react";
import { useState } from "react";
import { Controller, type SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";
import { CommonDialog } from "@/components/shared/common-dialog";
import { Button } from "@/components/ui/button";
import { DialogFooter } from "@/components/ui/dialog";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  type CreateApiKeyDTO,
  CreateApiKeySchema,
} from "@/features/apiKey/dtos/createApiKeyDTO";
import { useCreateApiKey } from "@/features/apiKey/hooks/useCreateApiKey";

type CreateApiKeyDialogProps = {
  open: boolean;
  close: () => void;
};

export const CreateApiKeyDialog = ({
  open,
  close,
}: CreateApiKeyDialogProps) => {
  const [apiKey, setApiKey] = useState<string>("");

  const { control, handleSubmit } = useForm<CreateApiKeyDTO>({
    resolver: zodResolver(CreateApiKeySchema),
  });

  const { mutate } = useCreateApiKey();

  const handleCopy = async () => {
    if (apiKey) {
      await navigator.clipboard.writeText(apiKey);
      toast.success("API Key copied to clipboard!");
    }
  };

  const onSubmit: SubmitHandler<CreateApiKeyDTO> = (data) => {
    setApiKey("sk_test_51N7KXYZEXAMPLEAPIKEY1234567890");
    mutate(data, {
      onSuccess: (data) => {
        setApiKey(data.key);
      },
    });
  };

  return (
    <CommonDialog
      open={open}
      title="Create API Key"
      description="Generate a new API key for your account."
      onClose={close}
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <Controller
          name="name"
          control={control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor={field.name}>API Key Name</FieldLabel>
              <Input
                {...field}
                id={field.name}
                aria-invalid={fieldState.invalid}
                autoComplete="on"
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
        {apiKey && (
          <div className="flex flex-col gap-2 w-full mt-6">
            <div className="flex gap-4">
              <Input value={apiKey ?? ""} type="text" disabled />
              <Button type="button" variant="outline" onClick={handleCopy}>
                <Copy />
              </Button>
            </div>
            <FieldError
              errors={[
                {
                  message:
                    "This API key is shown only once. Make sure to copy it now — you won’t be able to view it again.",
                },
              ]}
            />
          </div>
        )}
        <DialogFooter className="sm:justify-end mt-4">
          <Button type="submit">Create</Button>
        </DialogFooter>
      </form>
    </CommonDialog>
  );
};
