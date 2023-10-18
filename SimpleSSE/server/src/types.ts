export interface SubscriptionBody {
  id: string
}

export interface ExternalEvent extends SubscriptionBody {
  msg: string
}