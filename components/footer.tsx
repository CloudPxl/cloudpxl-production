const footerLinks = {
  Company: ['About', 'Careers', 'Blog', 'Press'],
  Services: ['Multi-Tenant Portals', 'Concurrent Workflows', 'AI Automation', 'DevOps'],
  Legal: ['Terms & Conditions', 'Privacy Policy', 'GDPR Compliance', 'Cookie Policy'],
}

export default function Footer() {
  return (
    <footer className="bg-[#0A0A0A] px-6 lg:px-10 pt-20 pb-10">
      <div className="max-w-7xl mx-auto">

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 pb-16 border-b border-white/8">
          {/* Brand */}
          <div>
            <p className="text-white/40 text-sm leading-relaxed max-w-[200px]">
              Enterprise-grade multi-tenant architecture, engineered to scale.
            </p>
            <p className="mt-6 text-white/25 text-xs">
              © 2026 CloudPxl. All rights reserved.
            </p>
          </div>

          {/* Link columns */}
          {Object.entries(footerLinks).map(([group, links]) => (
            <div key={group}>
              <h4 className="text-white/30 text-[10px] font-semibold uppercase tracking-widest mb-5">
                {group}
              </h4>
              <ul className="flex flex-col gap-3">
                {links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="text-white/55 text-sm hover:text-white transition-colors duration-200"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-white/25 text-xs">
            CloudPxl Ltd. · Registered in England & Wales
          </p>
          <div className="flex items-center gap-6">
            <a href="#" className="text-white/25 text-xs hover:text-white/60 transition-colors">
              Terms & Conditions
            </a>
            <a href="#" className="text-white/25 text-xs hover:text-white/60 transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="text-white/25 text-xs hover:text-white/60 transition-colors">
              GDPR Statement
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
