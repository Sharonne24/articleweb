import { Link } from 'react-router-dom';

export default function Logo() {
  return (
    <Link to="/">
      <img src="/logo/logoipsum.svg" alt="Logo" className="h-6 w-auto" />
    </Link>
  );
}
