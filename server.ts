import express from 'express';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3000;

// SEO Data Mapping for SSI (Server Side Injection)
interface SeoData {
    title: string;
    description: string;
    h1?: string;
    h2?: string;
    body?: string;
    faqs?: { q: string; a: string }[];
}

const SEO_MAP: Record<string, SeoData> = {
    'home': {
        title: 'PixelResize | Free Online Image Resizer & Compressor | 100% Private',
        description: 'Free online image resizer and compressor. Resize image online free without quality loss. 100% private browser-based tool with no uploads.',
        h1: 'The Most Secure Way to Edit Images',
        h2: 'Ultimate Guide: How to Resize and Compress Images Effortlessly',
        body: 'PixelResize provides a suite of tools to help you <strong>resize image online free</strong> and <strong>compress image online free</strong> without compromising on detail. Our platform is built for speed and privacy, utilizing advanced browser APIs like HTML5 Canvas and Blob to ensure your data stays strictly on your device.',
        faqs: [
            { q: 'How to resize an image online?', a: 'Simply drag your image into our upload zone, choose the "Resize" tool, enter your desired width, and click process. Then download your new image!' },
            { q: 'Is PixelResize free?', a: 'Yes, all our tools are 100% free with no hidden subscriptions, limits on file quantity, or annoying watermarks.' },
            { q: 'Does PixelResize upload images to a server?', a: 'No. Unlike other sites, we process everything on your local computer. Your privacy is our priority, and no data ever leaves your browser.' }
        ]
    },
    'image-compressor': {
        title: 'Professional Image Compressor Online | Reduce File Size | PixelResize',
        description: 'Reduce image file size online without compromising quality. Advanced compression for JPG, PNG, and WebP. Improve Core Web Vitals and LCP.',
        h1: 'Professional Image Compressor Online',
        h2: 'Expert Image Compression for Faster Websites and Core Web Vitals',
        body: `
            <p>Our <strong>image compressor online</strong> strips unnecessary metadata and optimizes pixel data to reduce weight. This improves your Core Web Vitals and user experience by reducing Largest Contentful Paint (LCP) and Cumulative Layout Shift (CLS) issues caused by heavy assets.</p>
            <h3>Why Image Compression Matters for SEO</h3>
            <p>Google has made page speed a ranking factor. Large, unoptimized images are the single biggest cause of slow websites. By using our <strong>online image compressor</strong>, you can reduce file sizes by up to 90%, leading to faster crawl times and better indexing.</p>
            <h3>Lossless vs. Lossy Compression</h3>
            <p>We provide both types of optimization. Lossless compression keeps every pixel intact (ideal for PNGs), while lossy compression (for JPG/WebP) find the perfect balance between visual fidelity and file weight.</p>
            <h3>How to Compress Without Quality Loss</h3>
            <p>Our engine uses the same algorithms used by professional photography sites to ensure that even at 80% compression, the human eye cannot detect any difference. This ensures your professional portfolio or ecommerce store looks sharp while loading at lightning speed.</p>
        `,
        faqs: [
            { q: 'How much can I reduce file size?', a: 'Typically, users see a file size reduction of 60-90% for JPG and WebP images without noticing any visual changes in quality.' },
            { q: 'Can I compress multiple images?', a: 'Yes, our bulk compression engine supports processing dozens of images at once directly in your browser tab.' }
        ]
    },
    'image-resizer': {
        title: 'Resize Image Online Free | Professional Image Resizer | PixelResize',
        description: 'Resize images online for free without losing quality. Perfect for social media, websites, and emails. 100% secure client-side resizing.',
        h1: 'Professional Online Image Resizer',
        h2: 'How to Resize Images Online Without Losing Clarity or Detail',
        body: `
            <p>Resizing images is crucial for maintaining fast loading speeds. Our professional <strong>image resizer</strong> allows you to change dimensions while maintaining the perfect aspect ratio. Whether you are preparing images for Instagram, LinkedIn, or a professional portfolio, PixelResize handles it locally.</p>
            <h3>Standard Web Image Sizes</h3>
            <p>Using the correct dimensions is key to a polished look. For social media, 1080x1080 is standard for Instagram, while 1200x628 is ideal for Facebook links. Our <strong>online photo resizer</strong> lets you input these exact pixels for a perfect fit.</p>
            <h3>Interpolation: The Quality Difference</h3>
            <p>Unlike simple browser scaling, our tool uses bicubic interpolation to recalculate pixels. This prevents the "pixelated" or "blurry" look often associated with free image resizers.</p>
            <h3>Bulk Resizing for Efficiency</h3>
            <p>Processing images one by one is a thing of the past. Drop a folder of images into PixelResize and apply your dimensions across the entire set instantly. No uploads mean the process is limited only by your computer\'s speed.</p>
        `,
        faqs: [
            { q: 'Will I lose quality when resizing?', a: 'Our tool uses sophisticated interpolation algorithms (similar to Photoshop) to ensure your images stay sharp even after resizing.' },
            { q: 'What is the best width for web images?', a: 'For most websites, a width between 1200px and 1920px is ideal for hero sections, while 800px is perfect for blog content.' }
        ]
    },
    'jpg-to-png': {
        title: 'JPG to PNG Converter Online | Maintain Quality | PixelResize',
        description: 'Convert JPG images to PNG format instantly in your browser. Maintain transparency and visual fidelity with zero server uploads.',
        h1: 'High Fidelity JPG to PNG Converter',
        h2: 'Convert JPG to PNG Instantly and Securely for Web Graphics',
        body: `
            <p>Need transparency? Our <strong>JPG to PNG converter</strong> handles the transition perfectly. PNG is a lossless format, making it ideal for logos, icons, and graphics that require sharp edges and transparent backgrounds.</p>
            <h3>When to Use PNG over JPG</h3>
            <p>While JPG is great for photos, PNG is the superior choice for graphics with text or solid colors. Converting <strong>JPG to PNG</strong> ensures that your graphics maintain their crispness without the artifacts often seen in compressed JPEGs.</p>
            <h3>100% Secure Conversion</h3>
            <p>Most converters upload your family photos or business graphics to their servers. We don't. Your files stay encrypted by your own browser throughout the entire process.</p>
        `,
        faqs: [
            { q: 'Is JPG to PNG conversion lossless?', a: 'Yes, converting to PNG is a lossless process, meaning no image data is discarded during the conversion from JPG.' }
        ]
    },
    'png-to-jpg': {
        title: 'PNG to JPG Converter | Fast Online Image Converter | PixelResize',
        description: 'Convert PNG to JPG format instantly. Perfect for reducing file size for web use while maintaining high quality.',
        h1: 'Easy PNG to JPG Conversion',
        h2: 'Convert PNG to JPG for Faster Load Times',
        body: 'Reduce your PNG file sizes drastically by converting them to JPG. High-quality PNG files can be massive; our tool allows you to convert them to optimized JPGs that load instantly on any mobile device.',
        faqs: [
            { q: 'Why convert PNG to JPG?', a: 'JPG files are significantly smaller than PNGs for photographic content, making them much better for web performance and SEO.' }
        ]
    },
    'jpg-to-webp': {
        title: 'Convert JPG to WebP Online | Optimize for Modern Web | PixelResize',
        description: 'Convert JPG images to WebP format for superior compression and faster page loads. 100% private browser-based conversion.',
        h1: 'JPG to WebP Converter for Modern SEO',
        h2: 'Boost Performance with WebP Conversion',
        body: `
            <p>WebP is the modern performance king for the web. Convert your <strong>JPG to WebP</strong> and save up to 30% more space with better visual quality than traditional JPEG files.</p>
            <h3>Page Speed and WebP</h3>
            <p>Google explicitly recommends the use of next-generation formats like WebP to pass the <strong>Core Web Vitals</strong> assessment. Our tool makes this advanced optimization accessible to everyone with a single click.</p>
            <h3>Transparency and Animation</h3>
            <p>Unlike JPG, WebP supports both transparency and animation, making it a versatile replacement for both JPEG and PNG in modern web development.</p>
        `,
        faqs: [
            { q: 'Are WebP images supported by all browsers?', a: 'Yes, as of 2026, all major browsers including Chrome, Safari, Firefox, and Edge fully support WebP images.' }
        ]
    },
    'compress-image-to-50kb': {
        title: 'Compress Image to 50KB | Target Size Compressor | PixelResize',
        description: 'Need an image under 50KB? Our tool automatically compresses your image to exactly 50KB for job portals and applications.',
        h1: 'Compress Image to 50KB',
        h2: 'How to Get an Image Under 50KB for Official Forms',
        body: 'Many government portals, job application systems, and university admissions have strict limits of 50KB. Our <strong>target size compressor</strong> uses an iterative engine to find the highest possible quality that stays under your required limit.',
        faqs: [
            { q: 'How do I use the 50KB compressor?', a: 'Upload your image, select the 50KB preset, and click Apply. Our engine handles the math to get you as close to 50KB as possible without going over.' }
        ]
    },
    'compress-image-to-100kb': {
        title: 'Compress Image to 100KB | Resize Image for Web Forms | PixelResize',
        description: 'Automatically resize and compress images to under 100KB. Perfect for online forms and government application websites.',
        h1: 'Compress Image to 100KB',
        h2: 'Target 100KB Compression for Fast Applications',
        body: 'When 50KB is too small, 100KB is often the standard limit for secondary documents. Use our automated tool to compress your large photos to exactly 100KB for seamless uploading to any portal.',
        faqs: [
            { q: 'Does it work for PNG photos?', a: 'Yes, though for targets like 100KB, converting the output to JPG or WebP usually yields much better visual results.' }
        ]
    },
    'discord-pfp-resizer': {
        title: 'Discord PFP Resizer | Get Perfect Avatar Size | PixelResize',
        description: 'Perfectly resize your avatar for Discord (128x128). Auto-crop to square and optimize for profile display in seconds.',
        h1: 'Discord Profile Picture Resizer',
        h2: 'How to Resize a Profile Picture for Discord Exactly',
        body: `
            <p>Discord avatars require a specific 128x128 resolution. Our dedicated <strong>Discord PFP resizer</strong> automatically handles the cropping and resizing to ensure your profile looks crisp and professional in every server.</p>
            <h3>Why Discord PFPs Look Blurry</h3>
            <p>If you upload a massive photo, Discord's own compression might blur it. By resizing to 128x128 (or an optimized 512x512) beforehand, you control the final quality.</p>
            <h3>Auto-Square Cropping</h3>
            <p>Stop worrying about your head being cut off. Use our interactive cropper to perfectly center your subject before the resize is applied.</p>
        `,
        faqs: [
            { q: 'What is the best size for Discord PFPs?', a: 'While Discord displays at 128x128, uploading an optimized 512x512 or 1024x1024 square image often looks better on high-DPI displays.' }
        ]
    },
    'resize-passport-photo': {
        title: 'Resize Passport Photo Online | 2x2 and 35x45mm Resizer | PixelResize',
        description: 'Resize your photo to official passport requirements. Supports US (2x2in), UK, and EU passport sizes with precise cropping.',
        h1: 'Professional Passport Photo Resizer',
        h2: 'How to Resize Passport Photos for Official Applications',
        body: `
            <p>Resize your selfie to a professional <strong>passport photo</strong> (2x2 inches or 35x45mm) instantly online. Our tool ensures your image meets the strict biometric requirements of government portals.</p>
            <h3>US Passport Photo Specs (2x2 Inches)</h3>
            <p>The US Department of State requires a 2x2 inch square photo. Our <strong>passport photo resizer</strong> automatically sets this dimension and helps you crop to the official 1:1 aspect ratio.</p>
            <h3>UK and EU Passport Requirements (35x45mm)</h3>
            <p>European standards require a 35mm width and 45mm height. Use our presets to instantly match these technical specs for your visa or passport renewal.</p>
        `,
        faqs: [{ q: 'Can I use this for US Visa?', a: 'Yes, we support the 2x2 inch standard for US Visas and Green Card lotteries.' }]
    },
    'compress-image-to-10kb': {
        title: 'Compress Image to 10KB | Resize Image for Legacy Portals | PixelResize',
        description: 'Need an image under 10KB? Our tool automatically compresses your image to under 10KB with iterative quality control.',
        h1: 'Compress Image to 10KB Online',
        h2: 'How to Get an Image Under 10KB without Losing Clarity',
        body: `
            <p>Some legacy government portals and educational websites require images under a strict 10KB limit. This is a difficult target to hit manually. Our <strong>10KB image compressor</strong> uses aggressive optimization to reach this target while maintaining visibility.</p>
            <h3>Iterative Compression Technology</h3>
            <p>We test multiple quality steps automatically to find the exact point where your image is 9.9KB, ensuring you get the maximum possible detail for such a tiny file size.</p>
        `,
        faqs: [{ q: 'Will it look blurry?', a: 'At 10KB, some artifacts are expected, but we prioritize visibility and meeting the strict file size limit above all else.' }]
    },
    'heic-to-jpg': {
        title: 'HEIC to JPG Converter Online | iPhone & Apple Photo Converter',
        description: 'Convert iPhone HEIC photos to JPG instantly in your browser. Fast, free, and completely secure. No files leave your device.',
        h1: 'HEIC to JPG Converter',
        h2: 'Make Your iPhone Photos Compatible Everywhere',
        body: `
            <p>HEIC is great for saving space on your iPhone, but it's a nightmare for compatibility. Use our <strong>HEIC to JPG converter</strong> to transform your Apple photos into universally readable JPEG files in seconds.</p>
            <h3>Why convert HEIC to JPG?</h3>
            <p>While HEIC offers better compression, many websites, Windows apps, and Android devices still can't open it. By converting to JPEG, you ensure your photos can be viewed and printed anywhere.</p>
        `,
        faqs: [
            { q: 'Is my privacy protected during HEIC conversion?', a: 'Yes. Unlike other HEIC converters, the processing happens in your browser RAM using local JavaScript. No one else ever sees your photos.' }
        ]
    },
    'to-avif': {
        title: 'Convert to AVIF Online | Next-Gen Image Compression | PixelResize',
        description: 'Convert your images to AVIF for the best possible compression ratios available today. Faster than JPEG and cleaner than WebP.',
        h1: 'JPG to AVIF Converter',
        h2: 'Experience the Future of the Web with AVIF Conversion',
        body: `
            <p>AVIF is the cutting edge of image technology, offering even better compression than WebP. Use our <strong>AVIF converter</strong> to get the smallest possible files without losing any detail.</p>
            <h3>AVIF vs WebP vs JPEG</h3>
            <p>AVIF can be up to 50% smaller than JPEG and 20% smaller than WebP for the same perceived quality. This leads to massive savings in data and lightning-fast page loads.</p>
        `,
        faqs: [
            { q: 'Is AVIF better than WebP?', a: 'Generally yes, AVIF provides about 20% better compression than WebP at the same visual quality.' }
        ]
    },
    'compress-image-to-200kb': {
        title: 'Compress Image to 200KB | Quality Web Compression | PixelResize',
        description: 'Need an image under 200KB? Our tool automatically compresses your image to exactly 200KB for high-quality web use.',
        h1: 'Compress Image to 200KB Online',
        h2: 'How to Get an Image Under 200KB for Professional Use',
        body: `
            <p>A 200KB limit is common for hero images and professional portfolios. It balances high resolution with fast loading. Our <strong>200KB image resizer</strong> ensures your photos look stunning while meeting the limit.</p>
        `,
        faqs: [{ q: 'Does it work for large DSLR photos?', a: 'Yes, it can scale down high-resolution DSLR photos to fit web-ready limits in seconds.' }]
    },
    'crop-image': {
        title: 'Crop Image Online Free | Image Cropper Tool | PixelResize',
        description: 'Perfectly frame your pictures with our free online image cropper. Standard presets for Instagram, 16:9, and custom ratios.',
        h1: 'Professional Image Cropper',
        h2: 'Precision Aspect Ratio Cropping Online',
        body: `
            <p>Focus on what matters in your photos. Our <strong>image cropper</strong> provides precision control with standard aspect ratios like 1:1, 4:5, and 16:9, making it perfect for social media content creation.</p>
            <h3>How to Crop Images Online?</h3>
            <p>Upload your photo, select the "Crop" tool, drag the selection box to highlight your subject, and click Apply. Our tool preserves the resolution of the cropped area for maximum clarity.</p>
        `,
        faqs: [
            { q: 'Can I crop to a circle?', a: 'Most platforms handle circular masks automatically, but cropping to a 1:1 square is the best starting point for circular avatars.' }
        ]
    }
};

// 1. Force HTTPS and non-WWW (Canonical Redirects)
app.use((req, res, next) => {
    // Skip for static assets
    if (path.extname(req.path) && !req.path.endsWith('.html')) return next();

    const host = req.get('host');
    const protocol = req.get('x-forwarded-proto') || req.protocol;

    if (!host) return next();

    let redirect = false;
    let newHost = host;

    // Force non-WWW
    if (host.startsWith('www.')) {
        newHost = host.slice(4);
        redirect = true;
    }

    // Force HTTPS (only if protocol is http and not on localhost)
    if (protocol === 'http' && !host.includes('localhost') && !host.includes('127.0.0.1')) {
        redirect = true;
    }

    if (redirect) {
        return res.redirect(301, `https://${newHost}${req.originalUrl}`);
    }
    next();
});

// Cache control for static assets
const cacheOptions = {
    maxAge: '1y',
    immutable: true
};

// Serve static files
app.use(express.static(path.join(__dirname, 'dist'), cacheOptions));
app.use(express.static(__dirname, {
    maxAge: '1d',
    setHeaders: (res, filePath) => {
        if (filePath.endsWith('.html')) {
            res.setHeader('Cache-Control', 'no-cache');
        }
    }
}));

// Function to serve index.html with injected SEO tags
const serveIndex = (req: express.Request, res: express.Response) => {
    const indexPath = path.join(__dirname, 'index.html');
    fs.readFile(indexPath, 'utf8', (err, html) => {
        if (err) return res.status(500).send('Error loading app');

        // Extract slug from URL
        let slug = 'home';
        if (req.path.startsWith('/tools/')) {
            slug = req.path.replace('/tools/', '');
        } else if (req.path.startsWith('/compress-image-to-')) {
            slug = req.path.replace('/', '');
        } else if (req.path === '/resize-passport-photo' || req.path === '/discord-pfp-resizer' || req.path === '/heic-to-jpg' || req.path === '/crop-image') {
            slug = req.path.replace('/', '');
        }

        const seo = SEO_MAP[slug] || SEO_MAP['home'];

        let processedHtml = html;
        const fullUrl = `https://pixelresize.site${req.path}`;
        
        // 1. Primary Metadata
        processedHtml = processedHtml.replace(/<title>.*?<\/title>/, `<title>${seo.title}</title>`);
        processedHtml = processedHtml.replace(/<meta name="description" content=".*?">/, `<meta name="description" content="${seo.description}">`);
        processedHtml = processedHtml.replace(/id="canonical-url" href=".*?"/, `id="canonical-url" href="${fullUrl}"`);
        processedHtml = processedHtml.replace(/property="og:title" content=".*?"/, `property="og:title" content="${seo.title}"`);
        processedHtml = processedHtml.replace(/property="og:description" content=".*?"/, `property="og:description" content="${seo.description}"`);
        processedHtml = processedHtml.replace(/property="og:url" content=".*?"/, `property="og:url" content="${fullUrl}"`);

        // 2. Visible H1
        if (seo.h1) {
            processedHtml = processedHtml.replace(/id="main-h1">.*?<\/h1>/, `id="main-h1">${seo.h1}</h1>`);
        }

        // 3. Dynamic Section Content (H2 and Body)
        if (seo.h2) {
            processedHtml = processedHtml.replace(/id="dynamic-h2">.*?<\/h2>/, `id="dynamic-h2">${seo.h2}</h2>`);
        }
        if (seo.body) {
            processedHtml = processedHtml.replace(/<div id="dynamic-body">[\s\S]*?<\/div>/, `<div id="dynamic-body">${seo.body}</div>`);
        }

        // 4. Dynamic FAQ Section
        if (seo.faqs) {
            const faqHtml = seo.faqs.map(f => `
                <div class="faq-item" itemscope itemtype="https://schema.org/Question">
                    <div class="faq-question" itemprop="name">${f.q}</div>
                    <div class="faq-answer" itemscope itemprop="acceptedAnswer" itemtype="https://schema.org/Answer">
                        <div itemprop="text">${f.a}</div>
                    </div>
                </div>
            `).join('');
            processedHtml = processedHtml.replace(/<div class="faq-container">[\s\S]*?<\/div>/, `<div class="faq-container">${faqHtml}</div>`);
            
            // Update FAQ Schema
            const faqJson = {
                "@context": "https://schema.org",
                "@type": "FAQPage",
                "mainEntity": seo.faqs.map(f => ({
                    "@type": "Question",
                    "name": f.q,
                    "acceptedAnswer": { "@type": "Answer", "text": f.a }
                }))
            };
            processedHtml = processedHtml.replace(/id="schema-faq-static">[\s\S]*?<\/script>/, `id="schema-faq-static">${JSON.stringify(faqJson, null, 2)}</script>`);
        }

        // 5. Breadcrumb UI and Schema
        const displayName = slug === 'home' ? 'Editor' : slug.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
        processedHtml = processedHtml.replace(/id="breadcrumb-current-nav" aria-current="page">.*?<\/li>/, `id="breadcrumb-current-nav" aria-current="page">${displayName}</li>`);
        
        if (slug !== 'home') {
            processedHtml = processedHtml.replace(/id="breadcrumb-parent-nav" class="hidden"/, `id="breadcrumb-parent-nav" class=""`);
            processedHtml = processedHtml.replace(/id="breadcrumb-sep-nav" class="mx-2 hidden"/, `id="breadcrumb-sep-nav" class="mx-2"`);
            
            const breadcrumbJson = {
                "@context": "https://schema.org",
                "@type": "BreadcrumbList",
                "itemListElement": [
                    { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://pixelresize.site" },
                    { "@type": "ListItem", "position": 2, "name": displayName, "item": fullUrl }
                ]
            };
            processedHtml = processedHtml.replace(/id="schema-breadcrumb">[\s\S]*?<\/script>/, `id="schema-breadcrumb">${JSON.stringify(breadcrumbJson, null, 2)}</script>`);
        }

        // 6. HowTo Schema Injection
        const howToName = slug === 'home' ? 'How to Resize and Compress Images' : `How to use ${displayName}`;
        const howToSteps = [
            { "@type": "HowToStep", "name": "Select Images", "text": "Upload your photos to our secure local processing zone.", "url": fullUrl },
            { "@type": "HowToStep", "name": "Choose Tool", "text": `Select the ${displayName} tool from the settings panel.`, "url": fullUrl },
            { "@type": "HowToStep", "name": "Apply & Download", "text": "Set your parameters, click apply, and save your optimized image instantly.", "url": fullUrl }
        ];
        const howToJson = {
            "@context": "https://schema.org",
            "@type": "HowTo",
            "name": howToName,
            "description": seo.description,
            "step": howToSteps
        };
        processedHtml = processedHtml.replace(/id="schema-howto">[\s\S]*?<\/script>/, `id="schema-howto">${JSON.stringify(howToJson, null, 2)}</script>`);
        
        res.send(processedHtml);
    });
};

// Define explicit routes for SEO
app.get('/tools/:tool', serveIndex);
app.get('/compress-image-to-:kb', serveIndex);
app.get('/resize-passport-photo', serveIndex);
app.get('/discord-pfp-resizer', serveIndex);
app.get('/heic-to-jpg', serveIndex);
app.get('/crop-image', serveIndex);

// Informational Static Pages (Separate from SPA)
app.get('/about', (req, res) => res.sendFile(path.join(__dirname, 'about.html')));
app.get('/privacy', (req, res) => res.sendFile(path.join(__dirname, 'privacy.html')));
app.get('/terms', (req, res) => res.sendFile(path.join(__dirname, 'terms.html')));
app.get('/contact', (req, res) => res.sendFile(path.join(__dirname, 'contact.html')));

app.get('/tools/image-resizer', serveIndex);
app.get('/tools/image-compressor', serveIndex);
app.get('/tools/jpg-to-png', serveIndex);
app.get('/tools/png-to-jpg', serveIndex);
app.get('/tools/jpg-to-webp', serveIndex);
app.get('/tools/gif-to-webp', serveIndex);
app.get('/tools/heic-to-jpg', serveIndex);

// Catch-all for SPA
app.get('*', serveIndex);

app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on port ${PORT}`);
});
