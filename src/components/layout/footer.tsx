// import { Link } from 'react-router-dom';

import Container from './container';
import Newsletter from './newsletter';
// import { Icons } from '../ui/icons';

export default function Footer() {
  return (
    <footer>
      <div className="py-4 bg-secondary">
        <Container>
          {/* <Logo /> */}
          <Newsletter />
        </Container>
      </div>
      <div>
        <Container>
          <div className="py-4 flex flex-col-reverse gap-2 md:flex-row items-center md:justify-between">
            <p className="text-xs text-muted-foreground">
              &copy; {new Date().getFullYear()} All rights reserved
            </p>
            {/* <ul className="flex items-center gap-4">
              <li>
                <Link to="https:twitter.com" target="_blank">
                  <Icons.Twitter className="size-6" />
                </Link>
              </li>
              <li>
                <Link to="https://www.linkedin.com/" target="_blank">
                  <Icons.LinkedIn className="size-6" />
                </Link>
              </li>
              <li>
                <Link to="https://www.facebook.com/" target="_blank">
                  <Icons.Facebook className="size-6" />
                </Link>
              </li>
              <li>
                <Link to="https://www.instagram.com/" target="_blank">
                  <Icons.Instagram className="size-6" />
                </Link>
              </li>
            </ul> */}
          </div>
        </Container>
      </div>
    </footer>
  );
}
