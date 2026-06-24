import { Mail, Phone } from 'lucide-react'

// Swapped fake pages for functional anchor links and routes
const footerLinks = {
  Platform: [
    { label: 'Capabilities', href: '#capabilities' },
    { label: 'Infrastructure', href: '#infrastructure' },
    { label: 'Concurrent Workflows', href: '#workflows' },
    { label: 'Compliance & Security', href: '#compliance' },
  ],
  Company: [
    { label: 'Client Login', href: '/login' },
    { label: 'Request Architecture Quote', href: '#quote' },
    { label: 'Direct Support', href: 'mailto:cloudpxlsupport@gmail.com' },
  ],
}

export default function Footer() {
  return (
    <footer className="bg-[#0A0A0A] px-6 lg:px-10 pt-20 pb-10">
      <div className="max-w-7xl mx-auto">

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 pb-16 border-b border-white/10">
          
          {/* Column 1: Brand & Legacy */}
          <div className="flex flex-col gap-4">
            <span className="text-white font-bold text-2xl tracking-tight">
              Cloud<span className="text-[#3b52f6]">Pxl</span>
            </span>
            <p className="text-white/40 text-sm leading-relaxed max-w-[200px]">
              Enterprise-grade multi-tenant architecture, engineered to scale.
            </p>
            <p className="text-white/30 text-xs font-semibold tracking-wider uppercase mt-2">
              CloudPxl Inc. — Est. 2019
            </p>
          </div>

          {/* Columns 2 & 3: Functional Links */}
          {Object.entries(footerLinks).map(([group, links]) => (
            <div key={group}>
              <h4 className="text-white/30 text-[10px] font-semibold uppercase tracking-widest mb-5">
                {group}
              </h4>
              <ul className="flex flex-col gap-3">
                {links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-white/55 text-sm hover:text-white transition-colors duration-200"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Column 4: Direct Contact Actions */}
          <div className="flex flex-col gap-4">
            <h4 className="text-white/30 text-[10px] font-semibold uppercase tracking-widest mb-1">
              Direct Contact
            </h4>
            
            <a 
              href="mailto:cloudpxlsupport@gmail.com" 
              className="flex items-center gap-3 text-white/80 hover:text-white transition-colors group"
            >
              <div className="w-10 h-10 rounded-full bg-white/5 border border-white/5 flex items-center justify-center group-hover:bg-[#0818A8] group-hover:border-[#0818A8] transition-all duration-300">
                <Mail size={16} />
              </div>
              <span className="text-sm font-medium tracking-wide">cloudpxlsupport@gmail.com</span>
            </a>

            <a 
              href="tel:+40753669108" 
              className="flex items-center gap-3 text-white/80 hover:text-white transition-colors group"
            >
              <div className="w-10 h-10 rounded-full bg-white/5 border border-white/5 flex items-center justify-center group-hover:bg-[#0818A8] group-hover:border-[#0818A8] transition-all duration-300">
                <Phone size={16} />
              </div>
              <span className="text-sm font-medium tracking-wide">+40 753 669 108</span>
            </a>
          </div>

        </div>

        {/* Bottom Bar: Copyright & Legal */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-white/25 text-xs">
            © {new Date().getFullYear()} CloudPxl Inc. All rights reserved.
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