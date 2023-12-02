import { ChatInputDataType, chatInputSchema } from "@/lib/validators";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";

type ChatInputProps = {
  apiUrl: string;
  query: Record<string, any>;
  name: string;
  type: "conversation" | "channel";
};

const ChatInput = ({ apiUrl, query, name, type }: ChatInputProps) => {
  const form = useForm<ChatInputDataType>({
    resolver: zodResolver(chatInputSchema),
    defaultValues: {
      content: "",
    },
  });

  const isLoading = form.formState.isSubmitting;

  const onSubmit = async (data: ChatInputDataType) => {
    console.log(data);
  };
  return <div>ChatInput</div>;
};

export default ChatInput;
