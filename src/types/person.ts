export default interface IPerson {
  id: string;
  name: string;
  email: string;
  status: boolean;
  privacy: boolean;
  cpf?: string;
  avatar?: string;
  avatar_url?: string;
  address_id_main?: string;
  phone_id_man?: string;
}
