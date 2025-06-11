
export interface ToastOptions {
  title: string;
  description: string;
  variant?: "default" | "destructive";
}

export type ToastFunction = (options: ToastOptions) => void;
