import React from 'react';
import { Link } from 'react-router-dom';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white border-t border-gray-50 pt-20 pb-10 overflow-hidden relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-12 mb-16">
          {/* Find Stores */}
          <div>
            <h4 className="font-black text-stitch-neutral mb-6 text-sm uppercase tracking-widest">Find Stores</h4>
            <ul className="space-y-4">
              {['Bangalore', 'Gurgaon', 'New Delhi', 'Chennai', 'Hyderabad', 'Pune'].map(city => (
                <li key={city}><Link to="#" className="text-gray-500 hover:text-stitch-primary text-sm font-medium transition-colors">{city}</Link></li>
              ))}
            </ul>
          </div>

          {/* Our Company */}
          <div>
            <h4 className="font-black text-stitch-neutral mb-6 text-sm uppercase tracking-widest">Our Company</h4>
            <ul className="space-y-4">
              {['About us', 'Careers', 'Blog'].map(link => (
                <li key={link}><Link to="#" className="text-gray-500 hover:text-stitch-primary text-sm font-medium transition-colors">{link}</Link></li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="font-black text-stitch-neutral mb-6 text-sm uppercase tracking-widest">Support</h4>
            <ul className="space-y-4">
              {['Help', 'Business Solutions', 'Find Stores', 'My Account', 'Track Order'].map(link => (
                <li key={link}><Link to="#" className="text-gray-500 hover:text-stitch-primary text-sm font-medium transition-colors">{link}</Link></li>
              ))}
            </ul>
          </div>

          {/* Important Links */}
          <div>
            <h4 className="font-black text-stitch-neutral mb-6 text-sm uppercase tracking-widest">Important Links</h4>
            <ul className="space-y-4">
              {['Privacy Policy', 'Delivery & Return Policy', 'Terms & conditions'].map(link => (
                <li key={link}><Link to="#" className="text-gray-500 hover:text-stitch-primary text-sm font-medium transition-colors">{link}</Link></li>
              ))}
            </ul>
          </div>

          {/* Contact & Socials */}
          <div className="col-span-2 lg:col-span-1 border-t pt-10 lg:border-t-0 lg:pt-0">
            <div className="space-y-6">
              <div className="flex items-center gap-3">
                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
                <span className="text-stitch-neutral font-black"> Qaisar Moin</span>
              </div>
              <div className="flex items-center gap-3">
                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                <span className="text-stitch-neutral font-black">care@PrintHub.in</span>
              </div>
              
              <div>
                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-4">Follow us</p>
                <div className="flex gap-4">
                  {[
                    { name: 'facebook', path: "M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" },
                    { name: 'instagram', path: "M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16.36a4.198 4.198 0 110-8.396 4.198 4.198 0 010 8.396zm5.338-8.527a1.44 1.44 0 100-2.88 1.44 1.44 0 000 2.88z" },
                    { name: 'twitter', path: "M24 4.557a9.83 9.83 0 01-2.828.775 4.932 4.932 0 002.165-2.724 9.864 9.864 0 01-3.127 1.195 4.916 4.916 0 00-3.594-1.555c-3.179 0-5.515 2.966-4.797 6.045A13.978 13.978 0 011.671 3.149a4.93 4.93 0 001.523 6.574 4.903 4.903 0 01-2.229-.616c-.054 2.281 1.581 4.415 3.949 4.89a4.935 4.935 0 01-2.224.084 4.928 4.928 0 004.6 3.417A9.867 9.867 0 010 19.54a13.94 13.94 0 007.548 2.212c9.142 0 14.307-7.721 13.995-14.646A10.025 10.025 0 0024 4.557z" },
                    { name: 'linkedin', path: "M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" }
                  ].map(social => (
                    <Link key={social.name} to="#" className="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center hover:bg-stitch-primary hover:text-white transition-all transform hover:-translate-y-1 text-gray-400">
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                        <path d={social.path} />
                      </svg>
                    </Link>
                  ))}
                </div>
              </div>

              <div className="flex gap-3 pt-4">
                <img src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg" alt="Play Store" className="h-8" />
                <img src="https://upload.wikimedia.org/wikipedia/commons/3/3c/Download_on_the_App_Store_Badge.svg" alt="App Store" className="h-8" />
              </div>
            </div>
          </div>
        </div>

        {/* Payment Icons & Bottom Bar */}
        <div className="pt-10 border-t border-gray-100 flex flex-col items-center gap-8">
          <div className="flex items-center gap-8 grayscale opacity-50">
            {/* <img src="https://upload.wikimedia.org/wikipedia/commons/5/5e/Visa_Inc._logo.svg" alt="Visa" className="h-4" /> */}
            <img src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg" alt="Mastercard" className="h-6" />
            <img src="https://upload.wikimedia.org/wikipedia/commons/e/e1/UPI-Logo-vector.svg" alt="UPI" className="h-5" />
          </div>
          <p className="text-xs text-gray-400 font-medium tracking-wide">
            © {currentYear} PrintHub Document Services Pvt. Ltd.. All Rights Reserved.
          </p>
        </div>
      </div>

    </footer>
  );
}
