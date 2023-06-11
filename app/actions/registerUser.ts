interface RegisterProps {
  name: string;
  email: string;
  password: string;
}

export default async function registerUser({ data }: { data: RegisterProps }) {}
