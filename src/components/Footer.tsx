const Footer = () => {
  return (
    <footer className="border-t border-border bg-card/50 py-12">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div>
            <div className="text-2xl font-bold text-primary mb-4">LetsMetrix</div>
            <p className="text-sm text-muted-foreground">
              Discover the best Shopify apps and powerful conversion tools.
            </p>
          </div>

          {/* Tools */}
          <div>
            <h3 className="font-semibold mb-4">Tools</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <a href="#" className="hover:text-primary transition-colors">
                  Excel to PDF Converter
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-primary transition-colors">
                  PDF to Excel Converter
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-primary transition-colors">
                  Image Converter
                </a>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="font-semibold mb-4">Resources</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <a href="#" className="hover:text-primary transition-colors">
                  For Merchants
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-primary transition-colors">
                  For Developers
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-primary transition-colors">
                  App Insights
                </a>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="font-semibold mb-4">Company</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <a href="#" className="hover:text-primary transition-colors">
                  About Us
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-primary transition-colors">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-primary transition-colors">
                  Terms of Service
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="pt-8 border-t border-border text-center text-sm text-muted-foreground">
          <p>© 2024 LetsMetrix. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
