import { Link } from 'react-router-dom';

import Container from './container';

export default function PublicHeader() {
  return (
    <header className="bg-secondary ">
      <Container>
        <div className="flex items-center justify-between">
          <Link to="/">
            <img
              src="/logo/kcj-horizontal.png"
              alt="Logo"
              className="h-24 w-auto"
            />
          </Link>
          <Link to="/login" className="text-primary font-medium">
            Login
          </Link>
        </div>
      </Container>
    </header>
  );
}
