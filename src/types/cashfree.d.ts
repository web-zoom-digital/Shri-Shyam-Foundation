declare module "@cashfreepayments/cashfree-js" {
  export interface CashfreeCheckoutOptions {
    paymentSessionId: string
    returnUrl?: string
    redirectTarget?: "_self" | "_blank" | "_top" | "_modal" | string
  }

  export interface CashfreeCheckoutResult {
    error?: {
      message?: string
      code?: string
      type?: string
    }
    redirect?: boolean
    paymentDetails?: {
      paymentMessage?: string
    }
  }

  export interface CashfreeSDK {
    checkout(options: CashfreeCheckoutOptions): Promise<CashfreeCheckoutResult | void>
  }

  export function load(options?: { mode?: "production" | "sandbox" }): Promise<CashfreeSDK>
}
