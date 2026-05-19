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
        h2: 'Expert Image Compression for Faster Websites',
        body: 'Our <strong>image compressor online</strong> strips unnecessary metadata and optimizes pixel data to reduce weight. This improves your Core Web Vitals and user experience by reducing Largest Contentful Paint (LCP) and Cumulative Layout Shift (CLS) issues caused by heavy assets.',
        faqs: [
            { q: 'How much can I reduce file size?', a: 'Typically, users see a file size reduction of 60-90% for JPG and WebP images without noticing any visual changes in quality.' },
            { q: 'Can I compress multiple images?', a: 'Yes, our bulk compression engine supports processing dozens of images at once directly in your browser tab.' }
        ]
    },
    'image-resizer': {
        title: 'Resize Image Online Free | Professional Image Resizer | PixelResize',
        description: 'Resize images online for free without losing quality. Perfect for social media, websites, and emails. 100% secure client-side resizing.',
        h1: 'Professional Online Image Resizer',
        h2: 'How to Resize Images Online Without Losing Clarity',
        body: 'Resizing images is crucial for maintaining fast loading speeds. Our professional <strong>image resizer</strong> allows you to change dimensions while maintaining the perfect aspect ratio. Whether you are preparing images for Instagram, LinkedIn, or a professional portfolio, PixelResize handles it locally.',
        faqs: [
            { q: 'Will I lose quality when resizing?', a: 'Our tool uses sophisticated interpolation algorithms (similar to Photoshop) to ensure your images stay sharp even after resizing.' },
            { q: 'What is the best width for web images?', a: 'For most websites, a width between 1200px and 1920px is ideal for hero sections, while 800px is perfect for blog content.' }
        ]
    },
    'jpg-to-png': {
        title: 'JPG to PNG Converter Online | Maintain Quality | PixelResize',
        description: 'Convert JPG images to PNG format instantly in your browser. Maintain transparency and visual fidelity with zero server uploads.',
        h1: 'High Fidelity JPG to PNG Converter',
        h2: 'Convert JPG to PNG Instantly and Securely',
        body: 'Need transparency? Our <strong>JPG to PNG converter</strong> handles the transition perfectly. PNG is a lossless format, making it ideal for logos, icons, and graphics that require sharp edges and transparent backgrounds.',
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
        h1: 'JPG to WebP Converter',
        h2: 'Boost Performance with WebP Conversion',
        body: 'WebP is the modern performance king for the web. Convert your <strong>JPG to WebP</strong> and save up to 30% more space with better visual quality than traditional JPEG files.',
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
        h1: 'Discord PFP Resizer',
        h2: 'How to Resize a Profile Picture for Discord',
        body: 'Discord avatars require a specific 128x128 resolution. Our dedicated <strong>Discord PFP resizer</strong> automatically handles the cropping and resizing to ensure your profile looks crisp and professional in every server.',
        faqs: [
            { q: 'What is the best size for Discord PFPs?', a: 'While Discord displays at 128x128, uploading an optimized 512x512 or 1024x1024 square image often looks better on high-DPI displays.' }
        ]
    },
    'heic-to-jpg': {
        title: 'HEIC to JPG Converter Online | iPhone & Apple Photo Converter',
        description: 'Convert iPhone HEIC photos to JPG instantly in your browser. Fast, free, and completely secure. No files leave your device.',
        h1: 'HEIC to JPG Converter',
        h2: 'Make Your iPhone Photos Compatible Everywhere',
        body: 'HEIC is great for saving space on your iPhone, but it\'s a nightmare for compatibility. Use our <strong>HEIC to JPG converter</strong> to transform your Apple photos into universally readable JPEG files in seconds.',
        faqs: [
            { q: 'Is my privacy protected during HEIC conversion?', a: 'Yes. Unlike other HEIC converters, the processing happens in your browser RAM using local JavaScript. No one else ever sees your photos.' }
        ]
    },
    'crop-image': {
        title: 'Crop Image Online Free | Image Cropper Tool | PixelResize',
        description: 'Perfectly frame your pictures with our free online image cropper. Standard presets for Instagram, 16:9, and custom ratios.',
        h1: 'Professional Image Cropper',
        h2: 'Precision Aspect Ratio Cropping Online',
        body: 'Focus on what matters in your photos. Our <strong>image cropper</strong> provides precision control with standard aspect ratios like 1:1, 4:5, and 16:9, making it perfect for social media content creation.',
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
