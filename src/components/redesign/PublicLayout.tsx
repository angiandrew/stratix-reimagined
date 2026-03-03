import { DemoProvider } from "./DemoContext";
import RedesignNavbar from "./Navbar";
import RedesignFooter from "./Footer";

interface PublicLayoutProps {
  children: React.ReactNode;
  transparentNav?: boolean;
}

const PublicLayout = ({ children, transparentNav = false }: PublicLayoutProps) => (
  <DemoProvider>
    <RedesignNavbar transparent={transparentNav} />
    <main>{children}</main>
    <RedesignFooter />
  </DemoProvider>
);

export default PublicLayout;
