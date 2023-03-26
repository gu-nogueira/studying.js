export default interface ActiveSubscription {
  ref: unknown;
  ts: number;
  data: {
    id: string;
    userId: unknown;
    status: string;
    price_id: string;
  };
}
