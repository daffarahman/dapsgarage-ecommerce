import React from 'react';

const PageWrapper = ({ title, children }) => (
    <div className="max-w-4xl mx-auto py-20 px-6">
        <h1 className="text-4xl font-black text-slate-900 uppercase tracking-tighter mb-8 italic">
            {title}
        </h1>
        <div className="prose prose-slate max-w-none text-slate-600 leading-relaxed space-y-4">
            {children}
        </div>
    </div>
);

export const About = () => (
    <PageWrapper title="About Garage Sales">
        <p>Welcome to Dap's Garage Sales! We are a family-run business dedicated to providing the best vintage and retro gaming gear.</p>
        <p>Our mission is to preserve gaming history and help collectors find the authentic hardware and software they love.</p>
    </PageWrapper>
);

export const Contact = () => (
    <PageWrapper title="Contact Us">
        <p>Have questions? We're here to help!</p>
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm mt-6">
            <h3 className="font-bold text-slate-900 mb-2">Email</h3>
            <p>support@dapsgarage.com</p>
            <h3 className="font-bold text-slate-900 mt-4 mb-2">Phone</h3>
            <p>+1 (555) 012-3456</p>
        </div>
    </PageWrapper>
);

export const Location = () => (
    <PageWrapper title="Our Location">
        <p>Visit our main store in Morgantown, PA.</p>
        <div className="bg-slate-100 p-8 rounded-2xl border-2 border-dashed border-slate-300 flex items-center justify-center text-slate-400 mt-6 min-h-[300px]">
            [Map Placeholder: 2846 Main St #5A, Morgantown, PA 19543]
        </div>
    </PageWrapper>
);

export const FAQs = () => (
    <PageWrapper title="Frequently Asked Questions">
        <div className="space-y-6">
            <div>
                <h3 className="font-bold text-slate-900">Do you offer a warranty?</h3>
                <p>Yes! All our consoles come with a 1-year warranty.</p>
            </div>
            <div>
                <h3 className="font-bold text-slate-900">Are games authentic?</h3>
                <p>Absolutely. We inspect and test every single item before listing it.</p>
            </div>
        </div>
    </PageWrapper>
);

export const Terms = () => (
    <PageWrapper title="Terms and Conditions">
        <p>By using our website, you agree to follow our standard terms of service...</p>
        <p>All sales of refurbished items are final unless they fall under our warranty policy.</p>
    </PageWrapper>
);

export const Shipping = () => (
    <PageWrapper title="Shipping and Returns">
        <p>We offer free shipping on orders over Rp100.000 (Surakarta Kota area) and standard shipping elsewhere.</p>
        <p>Return policy: Items can be returned within 30 days if they are in the same condition as received.</p>
    </PageWrapper>
);

export const Reviews = () => (
    <PageWrapper title="Customer Reviews">
        <p>See what our customers are saying!</p>
        <div className="grid gap-4 mt-6">
            <div className="bg-white p-4 rounded-lg border border-slate-200">
                <p className="italic">"Best place to find original cartridges!"</p>
                <p className="text-right text-xs font-bold mt-2">- Alex G.</p>
            </div>
        </div>
    </PageWrapper>
);
