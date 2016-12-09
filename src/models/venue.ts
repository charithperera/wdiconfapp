// User model based on the structure of wdiconf api at
// https://wdiconfapi.herokuapp.com/api/venues/:id'
export interface Venue {
  id: string;
  name: string;
  address: number;
  image_url: string;
}
