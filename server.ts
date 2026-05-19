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
            <p>Our <strong>image compressor online</strong> strips unnecessary metadata and optimizes pixel data to reduce weight. This improves your Core Web Vitals and user experience by reducing Largest Contentful Paint (LCP) and Cumulative Layout Shift (CLS) issues caused by heavy assets. You can also use our <a href="/tools/image-resizer">online image resizer</a> to further optimize your images.</p>
            <h3>Why Image Compression Matters for SEO</h3>
            <p>Google has made page speed a ranking factor. Large, unoptimized images are the single biggest cause of slow websites. By using our <strong>online image compressor</strong>, you can reduce file sizes by up to 90%, leading to faster crawl times and better indexing.</p>
            <h3>How to Compress Without Quality Loss</h3>
            <p>Our engine uses the same algorithms used by professional photography sites to ensure that even at 80% compression, the human eye cannot detect any difference. If you need a specific size, try our <a href="/compress-image-to-100kb">compress to 100KB</a> tool.</p>
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
            <p>Resizing images is crucial for maintaining fast loading speeds. Our professional <strong>image resizer</strong> allows you to change dimensions while maintaining the perfect aspect ratio. Whether you are preparing images for Instagram, LinkedIn, or a professional portfolio, PixelResize handles it locally. Don't forget to <a href="/tools/image-compressor">compress your images</a> after resizing for the best performance.</p>
            <h3>Standard Web Image Sizes</h3>
            <p>Using the correct dimensions is key to a polished look. For social media, 1080x1080 is standard for Instagram. Our <strong>online photo resizer</strong> lets you input these exact pixels for a perfect fit. If you're using an iPhone, our <a href="/heic-to-jpg">HEIC to JPG converter</a> might be useful too.</p>
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
            <p>Need transparency? Our <strong>JPG to PNG converter</strong> handles the transition perfectly. PNG is a lossless format, making it ideal for logos, icons, and graphics that require sharp edges and transparent backgrounds. If you need the opposite, check our <a href="/tools/png-to-jpg">PNG to JPG tool</a>.</p>
            <h3>When to Use PNG over JPG</h3>
            <p>While JPG is great for photos, PNG is the superior choice for graphics with text or solid colors. Converting <strong>JPG to PNG</strong> ensures that your graphics maintain their crispness without the artifacts often seen in compressed JPEGs.</p>
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
        body: 'Reduce your PNG file sizes drastically by converting them to JPG. High-quality PNG files can be massive; our tool allows you to convert them to optimized JPGs that load instantly on any mobile device. For transparent backgrounds, remember to use <a href="/tools/jpg-to-png">JPG to PNG</a> instead.',
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
            <p>WebP is the modern performance king for the web. Convert your <strong>JPG to WebP</strong> and save up to 30% more space with better visual quality than traditional JPEG files. For even newer technology, take a look at our <a href="/tools/to-avif">convert to AVIF</a> tool.</p>
            <h3>Page Speed and WebP</h3>
            <p>Google explicitly recommends the use of next-generation formats like WebP to pass the <strong>Core Web Vitals</strong> assessment.</p>
        `,
        faqs: [
            { q: 'Are WebP images supported by all browsers?', a: 'Yes, as of 2026, all major browsers including Chrome, Safari, Firefox, and Edge fully support WebP images.' }
        ]
    },
    'compress-image-to-10kb': { title: 'Compress Image to 10KB Online', description: 'Need an image under 10KB? Our tool automatically compresses your image to under 10KB with iterative quality control.', h1: 'Compress Image to 10KB', h2: 'Target 10KB Image Compression', body: 'Reach tiny file sizes like 10KB for specific document uploads. Also see <a href="/compress-image-to-50kb">50KB</a> and <a href="/compress-image-to-100kb">100KB</a> options.' },
    'compress-image-to-50kb': { title: 'Compress Image to 50KB Online', description: 'Need an image under 50KB? Our tool automatically compresses your image to exactly 50KB for job portals and applications.', h1: 'Compress Image to 50KB', h2: 'Target 50KB Image Compression', body: 'Most government portals require a 50KB limit. Try our <a href="/tools/image-resizer">resizer</a> if you need to change dimensions first.' },
    'compress-image-to-100kb': { title: 'Compress Image to 100KB Online', description: 'Automatically resize and compress images to under 100KB. Perfect for online forms and government application websites.', h1: 'Compress Image to 100KB', h2: 'Target 100KB Image Compression', body: 'The standard limit for many online applications. If 100KB is still too big, try our <a href="/compress-image-to-50kb">50KB compressor</a>.' },
    'compress-image-to-200kb': { title: 'Compress Image to 200KB Online', description: 'Need an image under 200KB? Our tool automatically compresses your image to exactly 200KB for high-quality web use.', h1: 'Compress Image to 200KB', h2: 'Target 200KB Image Compression', body: 'Perfect for hero images on blogs. Pair this with our <a href="/crop-image">cropping tool</a> for the best layout.' },
    'discord-pfp-resizer': { title: 'Discord PFP Resizer | Get Perfect Avatar Size', description: 'Perfectly resize your avatar for Discord (128x128). Auto-crop to square and optimize for profile display.', h1: 'Discord Profile Picture Resizer', h2: 'Discord Avatar Optimization', body: 'Get the perfect 128x128 square for your Discord profile. We recommend also using <a href="/tools/image-compressor">compression</a> if your avatar is a complex photograph.' },
    'resize-passport-photo': { title: 'Resize Passport Photo Online | 2x2 and 35x45mm', description: 'Resize your photo to official passport requirements. Supports US (2x2in), UK, and EU passport sizes.', h1: 'Passport Photo Resizer', h2: 'Official Passport Sizes Online', body: 'Meet strict government specs for passport photos. Also try our <a href="/crop-image">crop tool</a> to center your face perfectly.' },
    'heic-to-jpg': { title: 'HEIC to JPG Converter Online | iPhone Photo Converter', description: 'Convert iPhone HEIC photos to JPG instantly in your browser. Fast, free, and completely secure.', h1: 'HEIC to JPG Converter', h2: 'iPhone Image Compatibility', body: 'Unlock your iPhone photos for use anywhere. Once converted, you can <a href="/tools/image-resizer">resize</a> or <a href="/tools/image-compressor">compress</a> them easily.' },
    'crop-image': { title: 'Crop Image Online Free | Image Cropper Tool', description: 'Perfectly frame your pictures with our free online image cropper. Standard presets for Instagram and 16:9.', h1: 'Image Cropper Tool', h2: 'Precision Cropping for Social Media', body: 'Focus on what matters. After cropping, you might want to <a href="/tools/jpg-to-webp">convert to WebP</a> for your website.' },
    'to-avif': { title: 'Convert JPG to AVIF Online | Next-Gen Compression', description: 'Convert your images to AVIF for the best possible compression ratios available today.', h1: 'Convert to AVIF', h2: 'Next-Generation AVIF Conversion', body: 'The future of image compression is here. AVIF is even smaller than <a href="/tools/jpg-to-webp">WebP</a>.' },
    'transform': { title: 'Online Image Transform Tool | Rotate & Flip', description: 'Rotate and flip your images online instantly. 100% private and secure browser-based image transformation.', h1: 'Rotate and Flip Images Online', h2: 'Instant Image Transformation', body: 'Quickly adjust the orientation of your photos. Great before <a href="/tools/image-resizer">resizing</a> or <a href="/crop-image">cropping</a>.' },
    'to-gif': { title: 'Convert JPG to GIF Online | Simple GIF Creator', description: 'Convert your static JPG images into GIF format instantly in your browser.', h1: 'JPG to GIF Converter', h2: 'Convert Images to GIF Format', body: 'Need a GIF? Our converter handles it locally. For better performance on the web, consider <a href="/tools/jpg-to-webp">WebP</a> instead.' },
    'bmp-to-png': { title: 'Convert BMP to PNG Online | Professional Converter', description: 'Convert old BMP files into modern, portable PNG images with zero quality loss.', h1: 'BMP to PNG Converter', h2: 'High-Fidelity BMP Conversion', body: 'BMP files are uncompressed and huge. Convert them to <a href="/tools/jpg-to-png">PNG</a> for a much smaller file size with the same quality.' },
    'gif-to-jpg': { title: 'Convert GIF to JPG Online | Static Image Extractor', description: 'Extract the first frame of a GIF and save it as a high-quality JPG image.', h1: 'GIF to JPG Converter', h2: 'Static Extraction from GIF', body: 'Turn animations into static photos instantly. You can then <a href="/tools/image-compressor">compress</a> the resulting JPG for web use.' }
};

function generateRelatedToolsHTML(currentSlug: string) {
    const allTools = Object.keys(SEO_MAP).filter(k => k !== 'home' && k !== currentSlug);
    const randomTools = allTools.sort(() => 0.5 - Math.random()).slice(0, 8);
    return randomTools.map(t => {
        const url = t.includes('compress-image-to-') ? `/${t}` : `/tools/${t}`;
        return `<a href="${url}" class="btn-chip" onclick="event.preventDefault(); setTool('${t}', true)">${t.replace(/-/g, ' ')}</a>`;
    }).join('');
}

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

        // 4b. Related Tools Injection
        const relatedToolsHtml = generateRelatedToolsHTML(slug);
        processedHtml = processedHtml.replace(/id="related-tools-list" class="flex flex-wrap gap-2">.*?<\/div>/, `id="related-tools-list" class="flex flex-wrap gap-2">${relatedToolsHtml}</div>`);
        if (slug !== 'home') {
            processedHtml = processedHtml.replace(/id="related-tools-container" class="mt-8 card hidden md:block"/, `id="related-tools-container" class="mt-8 card"`);
        }

        // 5. Breadcrumb UI and Schema
        const displayName = slug === 'home' ? 'Editor' : slug.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
        processedHtml = processedHtml.replace(/id="breadcrumb-current-nav" aria-current="page">.*?<\/span>/, `id="breadcrumb-current-nav" aria-current="page">${displayName}</span>`);
        
        if (slug !== 'home') {
            processedHtml = processedHtml.replace(/id="breadcrumb-parent-nav" class="hidden items-center"/, `id="breadcrumb-parent-nav" class="flex items-center"`);
            // Hide home link if we are on a tool page to keep it clean, or keep it. Let's keep it.
        }

        // Inject Breadcrumb Schema
        const breadcrumbSchema = {
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            "itemListElement": [
                { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://pixelresize.site/" }
            ]
        };
        if (slug !== 'home') {
            breadcrumbSchema.itemListElement.push({
                "@type": "ListItem",
                "position": 2,
                "name": "Tools",
                "item": "https://pixelresize.site/tools/"
            });
            breadcrumbSchema.itemListElement.push({
                "@type": "ListItem",
                "position": 3,
                "name": displayName,
                "item": fullUrl
            });
        }
        processedHtml = processedHtml.replace(/id="schema-breadcrumb">[\s\S]*?<\/script>/, `id="schema-breadcrumb">${JSON.stringify(breadcrumbSchema, null, 2)}</script>`);

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
