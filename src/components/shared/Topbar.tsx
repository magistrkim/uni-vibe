import { Link } from 'react-router-dom';
import { Button } from '../ui/button';

const Topbar = () => {
  return (
    <section className="topbar">
      <div className="flex-between py-4 px-5">
        <Link to="/" className="flex gap-3 items-center">
          <div className="flex flex-row gap-4">
            <img
              src="/assets/images/logo-form.png"
              alt="logo"
              width={48}
              height={48}
            />
            <p className="h1-medium font-fingerPaint">UniVibe</p>
          </div>
        </Link>
        <div className="flex gap-4">
          <Button
            variant="ghost"
            className="shad-button_ghost"
            // onClick={signOut}
          >
            <img src="/assets/icons/logout.svg" alt="logout" />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Topbar;
