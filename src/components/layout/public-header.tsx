import { Link } from 'react-router-dom';

import Container from './container';

export default function PublicHeader() {
  return (
    <header className="bg-secondary py-4 md:py-6">
      <Container>
        <Link to="/">
          <img src="/logo/logoipsum.svg" alt="Logo" className="h-6 w-auto" />
        </Link>
      </Container>
    </header>
  );
}
