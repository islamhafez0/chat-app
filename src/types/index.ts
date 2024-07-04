export type Message = {
  id: string;
  createdAt: {
    seconds: number;
    nanoseconds: number;
  };
  text: string;
  uid: string;
  photoURL: string;
};