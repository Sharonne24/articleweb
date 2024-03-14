import { Link } from 'react-router-dom';

import Container from './container';

export default function PublicHeader() {
  return (
    <header className="bg-secondary ">
      <Container>
        <Link to="/">
          <img
            src="/logo/kcj-horizontal.png"
            alt="Logo"
            className="h-24 w-auto"
          />
        </Link>
      </Container>
    </header>
  );
}
