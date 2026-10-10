// SEO Data for dynamic updates
const SEO_DATA = {
    'home': {
        title: 'PixelResize | Free Online Image Resizer & Compressor | 100% Private',
        description: 'Free online image resizer and compressor. Resize, compress, and convert images in your browser with no server upload.',
        h2: 'How to Resize and Compress Images Effortlessly',
        body: `
            <p>PixelResize provides a suite of tools to help you <strong>resize image online free</strong> and <strong>compress image online free</strong> without compromising on detail. Our platform is built for speed and privacy, utilizing advanced browser APIs to ensure your data stays on your device.</p>
            <h3>Core Features of PixelResize</h3>
            <ul>
                <li><strong>Browser-Based Processing:</strong> Powered by JavaScript, ensuring total privacy.</li>
                <li><strong>Smart Compression:</strong> Reduce file size by adjusting encoding quality and, when needed, image dimensions.</li>
                <li><strong>Local Processing:</strong> Process your selected image directly in your browser without uploading it.</li>
                <li><strong>Universal Support:</strong> Handles JPG, PNG, WebP, and even HEIC conversion.</li>
            </ul>
        `,
        faq: [
            { q: 'How to resize an image online?', a: 'Simply drag your image into our upload zone, choose the "Resize" tool, enter your desired width, and click process. Then download your new image!' },
            { q: 'Is PixelResize free?', a: 'Yes, all our tools are 100% free with no hidden subscriptions or limits on file quantity.' },
            { q: 'Are my images safe?', a: 'Absolutely. PixelResize is 100% private. We use client-side technology, meaning your images are never uploaded to any server. Your privacy is guaranteed by design.' }
        ]
    },
    'image-compressor': {
        title: 'Professional Image Compressor Online | Reduce File Size | PixelResize',
        description: 'Reduce image file size online without compromising quality. Advanced compression for JPG, PNG, and WebP. Improve Core Web Vitals and LCP.',
        h2: 'Expert Image Compression for Faster Websites',
        body: `<p>Our <strong>image compressor online</strong> strips unnecessary metadata and optimizes pixel data to reduce weight. This improves your Core Web Vitals and user experience by reducing Largest Contentful Paint (LCP) and Cumulative Layout Shift (CLS) issues caused by heavy assets. You can also use our <a href="/tools/image-resizer" onclick="event.preventDefault(); setTool('image-resizer')">online image resizer</a> to further optimize your images.</p>`,
        faq: [
            { q: 'How much can I reduce file size?', a: 'Results vary by image content, format, dimensions, and quality settings; larger reductions generally require stronger compression or resizing.' },
            { q: 'Can I compress multiple images?', a: 'The current editor processes one selected image at a time. Your image stays in the browser and is not uploaded to a server.' }
        ]
    },
    'image-resizer': {
        title: 'Resize Image Online Free | Professional Image Resizer | PixelResize',
        description: 'Resize images online for free without losing quality. Perfect for social media, websites, and emails. 100% secure client-side resizing.',
        h2: 'How to Resize Images Online Without Losing Clarity',
        body: `<p>Resizing images is crucial for maintaining fast loading speeds. Our professional <strong>image resizer</strong> allows you to change dimensions while maintaining the perfect aspect ratio. Whether you are preparing images for Instagram, LinkedIn, or a professional portfolio, PixelResize handles it locally. Don't forget to <a href="/tools/image-compressor" onclick="event.preventDefault(); setTool('image-compressor')">compress your images</a> after resizing for the best performance.</p>`,
        faq: [
            { q: 'Will I lose quality when resizing?', a: 'Our tool uses sophisticated interpolation algorithms (similar to Photoshop) to ensure your images stay sharp even after resizing.' },
            { q: 'What is the best width for web images?', a: 'For most websites, a width between 1200px and 1920px is ideal for hero sections, while 800px is perfect for blog content.' }
        ]
    },
    'jpg-to-png': {
        title: 'JPG to PNG Converter Online | Maintain Quality | PixelResize',
        description: 'Convert JPG images to PNG format instantly in your browser. Maintain transparency and visual fidelity with zero server uploads.',
        h2: 'Convert JPG to PNG Instantly and Securely',
        body: `<p>Need transparency? Our <strong>JPG to PNG converter</strong> handles the transition perfectly. PNG is a lossless format, making it ideal for logos, icons, and graphics that require sharp edges and transparent backgrounds. If you need the opposite, check our <a href="/tools/png-to-jpg" onclick="event.preventDefault(); setTool('png-to-jpg')">PNG to JPG tool</a>.</p>`,
        faq: [
            { q: 'Is JPG to PNG conversion lossless?', a: 'Yes, converting to PNG is a lossless process, meaning no image data is discarded during the conversion from JPG.' }
        ]
    },
    'png-to-jpg': {
        title: 'PNG to JPG Converter | Fast Online Image Converter | PixelResize',
        description: 'Convert PNG to JPG format instantly. Perfect for reducing file size for web use while maintaining high quality.',
        h2: 'Convert PNG to JPG for Faster Load Times',
        body: `<p>Reduce your PNG file sizes drastically by converting them to JPG. High-quality PNG files can be massive; our tool allows you to convert them to optimized JPGs that load instantly on any mobile device. For transparent backgrounds, remember to use <a href="/tools/jpg-to-png" onclick="event.preventDefault(); setTool('jpg-to-png')">JPG to PNG</a> instead.</p>`,
        faq: [
            { q: 'Why convert PNG to JPG?', a: 'JPG files are significantly smaller than PNGs for photographic content, making them much better for web performance and SEO.' }
        ]
    },
    'jpg-to-webp': {
        title: 'Convert JPG to WebP Online | Optimize for Modern Web | PixelResize',
        description: 'Convert JPG images to WebP format for superior compression and faster page loads. 100% private browser-based conversion.',
        h2: 'Boost Performance with WebP Conversion',
        body: `<p>WebP is the modern performance king for the web. Convert your <strong>JPG to WebP</strong> and save up to 30% more space with better visual quality than traditional JPEG files. For even newer technology, take a look at our <a href="/tools/to-avif" onclick="event.preventDefault(); setTool('to-avif')">convert to AVIF</a> tool.</p>`,
        faq: [
            { q: 'Are WebP images supported by all browsers?', a: 'Yes, as of 2026, all major browsers including Chrome, Safari, Firefox, and Edge fully support WebP images.' }
        ]
    },
    'discord-pfp-resizer': {
        title: 'Discord PFP Resizer | Get Perfect Avatar Size | PixelResize',
        description: 'Perfectly resize your avatar for Discord (128x128). Auto-crop to square and optimize for profile display in seconds.',
        h2: 'How to Resize a Profile Picture for Discord',
        body: `<p>Discord avatars require a specific 128x128 resolution. Our dedicated <strong>Discord PFP resizer</strong> automatically handles the cropping and resizing to ensure your profile looks crisp and professional in every server. We recommend also using <a href="/tools/image-compressor" onclick="event.preventDefault(); setTool('image-compressor')">compression</a> if your avatar is a complex photograph.</p>`,
        faq: [
            { q: 'What is the best size for Discord PFPs?', a: 'While Discord displays at 128x128, uploading an optimized 512x512 or 1024x1024 square image often looks better on high-DPI displays.' }
        ]
    },
    'resize-passport-photo': {
        title: 'Resize Passport Photo Online | 2x2 and 35x45mm Resizer | PixelResize',
        description: 'Resize your photo to official passport requirements. Supports US (2x2in), UK, and EU passport sizes with precise cropping.',
        h2: 'Professional Passport Photo Resizer',
        body: `<p>Resize your selfie to a professional <strong>passport photo</strong> (2x2 inches or 35x45mm) instantly online. Also try our <a href="/crop-image" onclick="event.preventDefault(); setTool('crop-image')">crop tool</a> to center your face perfectly.</p>`,
        faq: [{ q: 'Can I use this for US Visa?', a: 'Yes, we support the 2x2 inch standard for US Visas.' }]
    },
    'compress-image-to-10kb': {
        title: 'Compress Image to 10KB | Resize Image for Legacy Portals | PixelResize',
        description: 'Need an image under 10KB? Our tool attempts to reduce your image to the selected target size with iterative quality control.',
        h2: 'How to Get an Image Under 10KB',
        body: `<p>Some legacy portals require images under 10KB. We use iterative optimization to approach this target while maintaining as much clarity as possible. Also see <a href="/compress-image-to-50kb" onclick="event.preventDefault(); setTool('compress-image-to-50kb')">50KB</a> and <a href="/compress-image-to-100kb" onclick="event.preventDefault(); setTool('compress-image-to-100kb')">100KB</a> options.</p>`,
        faq: [{ q: 'Will it look blurry?', a: 'At 10KB, some artifacts are expected, but we prioritize visibility and meeting the strict file sized limit.' }]
    },
    'compress-image-to-50kb': {
        title: 'Compress Image to 50KB | Target Size Compressor | PixelResize',
        description: 'Need an image under 50KB? Our tool attempts to reduce your image to the selected target size for job portals and applications.',
        h2: 'How to Get an Image Under 50KB for Official Forms',
        body: `<p>Many job portals require 50KB limits. Our tool attempts to stay within that limit using iterative quality adjustments. Try our <a href="/tools/image-resizer" onclick="event.preventDefault(); setTool('image-resizer')">resizer</a> if you need to change dimensions first.</p>`,
        faq: [
            { q: 'What if quality is too low?', a: 'We always try to maintain the highest quality possible within the 50KB limit.' }
        ]
    },
    'compress-image-to-100kb': {
        title: 'Compress Image to 100KB | Resize Image for Web Forms | PixelResize',
        description: 'Automatically resize and compress images to under 100KB. Perfect for online forms and government application websites.',
        h2: 'Target 100KB Compression for Fast Applications',
        body: `<p>Perfect for bank applications or government forms that require a 100KB file maximum. Our app handles the heavy lifting locally. If 100KB is still too big, try our <a href="/compress-image-to-50kb" onclick="event.preventDefault(); setTool('compress-image-to-50kb')">50KB compressor</a>.</p>`,
        faq: [
            { q: 'Does it work for PNG?', a: 'Yes, but for small sizes like 100KB, it usually converts to JPG or WebP for better visual results.' }
        ]
    },
    'compress-image-to-200kb': {
        title: 'Compress Image to 200KB | Target Size Compressor | PixelResize',
        description: 'Need an image under 200KB? Our tool attempts to reduce your image to the selected target size for high-quality web use.',
        h2: 'Target 200KB Image Compression',
        body: `<p>Useful for hero images on blogs and websites. Pair this with our <a href="/crop-image" onclick="event.preventDefault(); setTool('crop-image')">cropping tool</a> for the best layout.</p>`,
        faq: [
            { q: 'Why target 200KB?', a: '200KB strikes the perfect balance between high visual fidelity and fast website load times.' }
        ]
    },
    'to-avif': {
        title: 'Convert to AVIF Online | Next-Gen Image Compression | PixelResize',
        description: 'Convert your images to AVIF for the best possible compression ratios available today. Faster than JPEG and cleaner than WebP.',
        h2: 'Experience the Future with AVIF Conversion',
        body: `<p>AVIF is the cutting edge of image technology. Use our <strong>AVIF converter</strong> to get the smallest possible files with zero visual quality loss. AVIF is even smaller than <a href="/tools/jpg-to-webp" onclick="event.preventDefault(); setTool('jpg-to-webp')">WebP</a>.</p>`,
        faq: [
            { q: 'Is AVIF better than WebP?', a: 'Generally yes, AVIF provides about 20% better compression than WebP at the same visual quality.' }
        ]
    },
    'to-gif': {
        title: 'Convert JPG to GIF Online | Simple GIF Creator | PixelResize',
        description: 'Convert your static JPG images into GIF format instantly in your browser.',
        h2: 'Convert Images to GIF Format',
        body: `<p>Need a GIF? Our converter handles it locally. For better performance on the web, consider <a href="/tools/jpg-to-webp" onclick="event.preventDefault(); setTool('jpg-to-webp')">WebP</a> instead.</p>`,
        faq: [
            { q: 'Can I convert static images to GIF?', a: 'Yes, our tool seamlessly converts static JPEGs and PNGs into GIF format.' }
        ]
    },
    'bmp-to-png': {
        title: 'Convert BMP to PNG Online | Professional Converter | PixelResize',
        description: 'Convert old BMP files into modern, portable PNG images with zero quality loss.',
        h2: 'High-Fidelity BMP Conversion',
        body: `<p>BMP files are uncompressed and huge. Convert them to <a href="/tools/jpg-to-png" onclick="event.preventDefault(); setTool('jpg-to-png')">PNG</a> for a much smaller file size with the same quality.</p>`,
        faq: [
            { q: 'Is BMP to PNG lossless?', a: 'Yes, PNG is a lossless format so no image details are lost.' }
        ]
    },
    'gif-to-jpg': {
        title: 'Convert GIF to JPG Online | Static Image Extractor | PixelResize',
        description: 'Extract the first frame of a GIF and save it as a high-quality JPG image.',
        h2: 'Static Extraction from GIF',
        body: `<p>Turn animations into static photos instantly. You can then <a href="/tools/image-compressor" onclick="event.preventDefault(); setTool('image-compressor')">compress</a> the resulting JPG for web use.</p>`,
        faq: [
            { q: 'Will this convert animated GIFs?', a: 'It extracts the primary keyframe and saves it as a high-quality JPEG.' }
        ]
    },
    'heic-to-jpg': {
        title: 'HEIC to JPG Converter Online | iPhone & Apple Photo Converter',
        description: 'Convert iPhone HEIC photos to JPG instantly in your browser. Fast, free, and completely secure. No files leave your device.',
        h2: 'Make Your iPhone Photos Compatible Everywhere',
        body: `<p>Can\'t open HEIC files? Use our <strong>HEIC to JPG converter</strong> to transform your Apple photos into universally readable JPEG files in seconds. Once converted, you can <a href="/tools/image-resizer" onclick="event.preventDefault(); setTool('image-resizer')">resize</a> or <a href="/tools/image-compressor" onclick="event.preventDefault(); setTool('image-compressor')">compress</a> them easily.</p>`,
        faq: [{ q: 'What is HEIC?', a: 'HEIC is a high-efficiency format used by Apple devices that isn\'t always supported on Windows, Android, or legacy websites.' }]
    },
    'crop-image': {
        title: 'Crop Image Online Free | Image Cropper Tool | PixelResize',
        description: 'Perfectly frame your pictures with our free online image cropper. Standard presets for Instagram, 16:9, and custom ratios.',
        h2: 'Precision Aspect Ratio Cropping Online',
        body: `<p>Focus on what matters in your photos. Our <strong>image cropper</strong> provides precision control with standard aspect ratios like 1:1, 4:5, and 16:9. After cropping, you might want to <a href="/tools/jpg-to-webp" onclick="event.preventDefault(); setTool('jpg-to-webp')">convert to WebP</a> for your website.</p>`,
        faq: [
            { q: 'Can I crop to a specific aspect ratio?', a: 'Yes, we support 1:1, 4:3, 16:9, 9:16 and free-form cropping.' }
        ]
    },
    'instagram-resizer': {
        title: 'Instagram Photo Resizer | 1080x1080 & 1080x1350 | PixelResize',
        description: 'Quickly resize your photos for Instagram posts, stories, and reels. Auto-set perfect aspect ratios for social media.',
        h2: 'Perfect Dimensions for Instagram Posts',
        body: `<p>Don't let Instagram crop your important details. Use our <a href="/tools/image-resizer" onclick="event.preventDefault(); setTool('image-resizer')">resizer</a> or <a href="/crop-image" onclick="event.preventDefault(); setTool('crop-image')">cropper</a> to get exactly 1080x1080 or 1080x1350 pixels.</p>`,
        faq: [
            { q: 'What size is best for Instagram posts?', a: '1080x1080 for square posts, and 1080x1350 for portrait posts.' }
        ]
    },
    'facebook-resizer': {
        title: 'Facebook Image Resizer | Cover & Post Sizes | PixelResize',
        description: 'Optimize your Facebook cover photos and post images for the best engagement. Professional dimensions with zero blur.',
        h2: 'Optimize for Facebook Feed & Covers',
        body: `<p>Facebook compresses images heavily. By using our tool to set the correct 1200x630 dimensions first, you maintain better clarity.</p>`,
        faq: [
            { q: 'What is the standard Facebook link image size?', a: '1200x630 pixels is recommended for shared Facebook links and cover images.' }
        ]
    },
    'transform': {
        title: 'Online Image Transform Tool | Rotate & Flip | PixelResize',
        description: 'Rotate and flip your images online instantly. 100% private and secure browser-based image transformation.',
        h2: 'Instant Image Transformation',
        body: `<p>Quickly adjust the orientation of your photos. Great before <a href="/tools/image-resizer" onclick="event.preventDefault(); setTool('image-resizer')">resizing</a> or <a href="/crop-image" onclick="event.preventDefault(); setTool('crop-image')">cropping</a>.</p>`,
        faq: [
            { q: 'Can I flip images horizontally and vertically?', a: 'Yes, our transform tool supports instant 90-degree rotations and horizontal/vertical flipping.' }
        ]
    }
};

let originalHomeH2 = '';
let originalHomeBody = '';

function getToolUrl(tool) {
    if (!tool || tool === 'home') return '/';
    const dedicatedTools = ['discord-pfp-resizer', 'resize-passport-photo', 'heic-to-jpg', 'crop-image', 'instagram-resizer', 'facebook-resizer'];
    const seoTools = ['image-resizer', 'image-compressor', 'jpg-to-png', 'png-to-jpg', 'jpg-to-webp', 'to-avif', 'to-gif', 'bmp-to-png', 'gif-to-jpg', 'transform'];
    if (dedicatedTools.includes(tool)) return `/${tool}/`;
    if (tool.startsWith('compress-image-to-')) return `/${tool}/`;
    if (seoTools.includes(tool)) return `/tools/${tool}/`;
    return '/';
}

function updateSEO(tool, displayName = 'Editor') {
    const data = SEO_DATA[tool] || SEO_DATA['home'];
    
    // Update Document Title
    document.title = data.title;
    
    // Update Meta Description
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) metaDesc.setAttribute('content', data.description);
    
    // Update H1 (AI search signal)
    const h1 = document.getElementById('main-h1');
    if (h1) {
        if (tool === 'home') {
            h1.innerHTML = 'Free Online <span class="text-gradient">Image Resizer</span> &amp; Compressor';
        } else if (data.h1) {
            h1.textContent = data.h1;
        } else if (data.h2) {
            h1.textContent = data.h2.replace(/<[^>]*>/g, '');
        }
    }

    // Update H2 and Body
    const dynamicH2 = document.getElementById('dynamic-h2');
    if (dynamicH2) {
        if (tool === 'home' && originalHomeH2) {
            dynamicH2.innerHTML = originalHomeH2;
        } else if (data.h2) {
            dynamicH2.innerHTML = data.h2;
        }
    }
    
    const dynamicBody = document.getElementById('dynamic-body');
    if (dynamicBody) {
        if (tool === 'home' && originalHomeBody) {
            dynamicBody.innerHTML = originalHomeBody;
        } else if (data.body) {
            dynamicBody.innerHTML = data.body;
        }
    }

    // Update FAQ + Schema (AI search signal)
    const faqContainer = document.querySelector('.faq-container');
    if (faqContainer && data.faq) {
        faqContainer.innerHTML = data.faq.map(f => `
            <div class="faq-item" itemscope itemtype="https://schema.org/Question">
                <div class="faq-question" itemprop="name">${f.q}</div>
                <div class="faq-answer" itemscope itemprop="acceptedAnswer" itemtype="https://schema.org/Answer">
                    <div itemprop="text">${f.a}</div>
                </div>
            </div>
        `).join('');

        let faqSchema = document.getElementById('schema-faq');
        if (!faqSchema) {
            faqSchema = document.createElement('script');
            faqSchema.type = 'application/ld+json';
            faqSchema.id = 'schema-faq';
            document.head.appendChild(faqSchema);
        }
        const faqJson = {
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": data.faq.map(f => ({
                "@type": "Question",
                "name": f.q,
                "acceptedAnswer": { "@type": "Answer", "text": f.a }
            }))
        };
        faqSchema.textContent = JSON.stringify(faqJson);
    }

    // Update Canonical
    const canonical = document.getElementById('canonical-url');
    if (canonical) {
        const baseUrl = 'https://pixelresize.site';
        const url = `${baseUrl}${getToolUrl(tool)}`;
        canonical.setAttribute('href', url);
    }

    // Update OpenGraph
    const ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) ogTitle.setAttribute('content', data.title);
    const ogDesc = document.querySelector('meta[property="og:description"]');
    if (ogDesc) ogDesc.setAttribute('content', data.description);

    // Update Related Tools
    const relatedList = document.getElementById('related-tools-list');
    if (relatedList) {
        const allTools = Object.keys(SEO_DATA).filter(k => k !== 'home' && k !== tool);
        const startIndex = Math.max(0, allTools.indexOf(tool));
        const orderedTools = [...allTools.slice(startIndex), ...allTools.slice(0, startIndex)].slice(0, 7);
        relatedList.innerHTML = orderedTools.map(t => `
            <a href="${getToolUrl(t)}" class="btn-chip" onclick="event.preventDefault(); setTool('${t}')">
                ${t.replace(/-/g, ' ')}
            </a>
        `).join('');
    }

    // Update Breadcrumb Schema
    const breadcrumbSchema = document.getElementById('schema-breadcrumb');
    if (breadcrumbSchema) {
        const breadcrumb = {
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            "itemListElement": [
                { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://pixelresize.site/" }
            ]
        };
        if (tool !== 'home' && tool !== '') {
            breadcrumb.itemListElement.push({
                "@type": "ListItem",
                "position": 2,
                "name": "Tools",
                "item": "https://pixelresize.site/tools/"
            });
            const toolUrl = tool.includes('compress-image-to-') ? `https://pixelresize.site/${tool}` : `https://pixelresize.site/tools/${tool}`;
            breadcrumb.itemListElement.push({
                "@type": "ListItem",
                "position": 3,
                "name": displayName,
                "item": toolUrl
            });
        }
        breadcrumbSchema.textContent = JSON.stringify(breadcrumb);
    }

    // Generate Dynamic HowTo Schema
    let howToSchema = document.getElementById('schema-howto');
    if (!howToSchema) {
        howToSchema = document.createElement('script');
        howToSchema.type = 'application/ld+json';
        howToSchema.id = 'schema-howto';
        document.head.appendChild(howToSchema);
    }
    
    const howTo = {
        "@context": "https://schema.org",
        "@type": "HowTo",
        "name": `How to ${tool} image online`,
        "description": data.description,
        "step": [
            { "@type": "HowToStep", "text": "Upload your image to PixelResize.", "name": "Upload" },
            { "@type": "HowToStep", "text": `Select the ${tool} option from the tool menu.`, "name": "Select Tool" },
            { "@type": "HowToStep", "text": "Adjust settings and click Apply Changes.", "name": "Process" },
            { "@type": "HowToStep", "text": "Download your optimized image.", "name": "Download" }
        ]
    };
    howToSchema.textContent = JSON.stringify(howTo);
}

// Global State
let originalFile = null;
let currentImage = null; // HTMLImageElement
let processedDataUrl = null;
let processedBlob = null;
let selectedTargetKB = null;
let rotation = 0;
let flipH = 1;
let flipV = 1;
let hasUnsavedWork = false;
let pendingNavigation = null;

// Crop Engine State
const cropState = {
    x: 0, y: 0, width: 0, height: 0,
    aspectRatio: 'free',
    zoom: 1,
    isActive: false
};

// DOM Elements
const uploadZone = document.getElementById('upload-zone');
const fileInput = document.getElementById('file-input');
const processingUI = document.getElementById('processing-ui');
const mainPreview = document.getElementById('main-preview');
const editorCanvas = document.getElementById('editor-canvas');

// Crop Engine State
let isDragging = false;
let currentHandle = null;
let startX, startY;
let currentCrop = { x: 0, y: 0, w: 0, h: 0 };
// Preserve the rendered crop image dimensions while the crop tab is visible.
// The crop preview is hidden when Apply Changes runs, so clientWidth/clientHeight
// become zero and the native image dimensions must not be substituted for them.
let cropDisplayWidth = 0;
let cropDisplayHeight = 0;

// State Initialization based on default HTML state
selectedTargetKB = null; 

// Crop Elements
const cropContainer = document.getElementById('crop-container');
const cropPreviewImg = document.getElementById('crop-preview-img');
const cropBox = document.getElementById('crop-box');
const cropStats = document.getElementById('crop-stats');
const zoomSlider = document.getElementById('zoom-slider');
const zoomVal = document.getElementById('zoom-val');

// Inputs
const resizeW = document.getElementById('resize-w');
const resizeH = document.getElementById('resize-h');
const maintainRatio = document.getElementById('maintain-ratio');
const compressSlider = document.getElementById('compress-slider');
const sliderVal = document.getElementById('slider-val');

// Info Display
const infoOrig = document.getElementById('info-orig');
const infoEst = document.getElementById('info-est');
const infoFmt = document.getElementById('info-fmt');
const infoQlty = document.getElementById('info-qlty');

// Buttons
const applyBtn = document.getElementById('apply-btn');
const downloadBtn = document.getElementById('download-btn');
const removeImgBtn = document.getElementById('remove-img-btn');

// Modal Elements
const unsavedModal = document.getElementById('unsavedModal');
const stayBtn = document.getElementById('stayBtn');
const leaveBtn = document.getElementById('leaveBtn');

function handleInitialRoute() {
    const params = new URLSearchParams(window.location.search);
    const path = window.location.pathname;
    const hash = window.location.hash;
    
    // Check for SPA redirected parameters e.g. ?/tools/image-resizer or ?p=/tools/image-resizer
    const redirectParam = params.get('p') || (window.location.search.startsWith('?/') ? window.location.search.slice(2).split('&')[0] : null);
    
    // 1. Prioritize direct URL parameters if present
    const toolParam = params.get('tool') || redirectParam;
    const formatParam = params.get('format');
    const sizeParam = params.get('size');
    
    if (toolParam) {
        let cleanTool = toolParam;
        if (cleanTool.startsWith('/tools/')) cleanTool = cleanTool.replace('/tools/', '');
        if (cleanTool.startsWith('/')) cleanTool = cleanTool.replace('/', '');
        setTool(cleanTool, params.get('open') === '1');
        
        // Handle format and size overrides from URL
        if (formatParam) {
            const f = formatParam.includes('/') ? formatParam : `image/${formatParam}`;
            setTimeout(() => {
                const btn = document.querySelector(`[data-format="${f}"]`);
                if (btn) btn.click();
            }, 50);
        }
        if (sizeParam) {
           setTimeout(() => {
                const btn = document.querySelector(`[data-target="${sizeParam}"]`);
                if (btn) btn.click();
            }, 50);
        }
        return;
    }

    // 2. Fallback to path-based routing
    if (['/resize-passport-photo', '/discord-pfp-resizer', '/heic-to-jpg', '/crop-image', '/instagram-resizer', '/facebook-resizer'].includes(path)) {
        const tool = path.replace('/', '');
        setTool(tool, params.get('open') === '1');
    } else if (path.includes('/tools/')) {
        const tool = path.split('/tools/')[1];
        setTool(tool, params.get('open') === '1');
    } else if (path.includes('/compress-image-to-')) {
        const tool = path.replace('/', '');
        setTool(tool, params.get('open') === '1');
    } else if (hash) {
        setTool(hash.substring(1), params.get('open') === '1');
    } else {
        updateSEO('home');
        document.body.classList.remove('dedicated-tool-mode');
    }
}

// Handle browser back/forward
window.addEventListener('popstate', handleInitialRoute);

function setCompressionFormat() {
    if (!currentImage || !originalFile) return;

    const type = (originalFile.type || '').toLowerCase();
    let format = 'image/webp';

    if (type === 'image/jpeg' || type === 'image/jpg') {
        format = 'image/jpeg';
    } else if (type === 'image/webp') {
        format = 'image/webp';
    }

    const formatBtn = document.querySelector(`#tab-convert .btn-chip[data-format="${format}"]`);
    if (formatBtn) {
        document.querySelectorAll('#tab-convert .btn-chip').forEach(btn => btn.classList.remove('active'));
        formatBtn.classList.add('active');
    }

    updateInfo();
}

function setupEventListeners() {
    // File Upload
    uploadZone.addEventListener('click', () => fileInput.click());
    fileInput.addEventListener('change', (e) => handleFiles(e.target.files));
    uploadZone.addEventListener('dragover', (e) => { e.preventDefault(); uploadZone.style.borderColor = 'var(--primary)'; });
    uploadZone.addEventListener('dragleave', () => { uploadZone.style.borderColor = 'rgba(100, 127, 188, 0.3)'; });
    uploadZone.addEventListener('drop', (e) => {
        e.preventDefault();
        uploadZone.style.borderColor = 'rgba(100, 127, 188, 0.3)';
        handleFiles(e.dataTransfer.files);
    });

    // Tab Switching
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const tab = btn.dataset.tab;
            document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
            document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
            btn.classList.add('active');
            document.getElementById(`tab-${tab}`).classList.add('active');

            if (tab === 'crop') {
                cropState.isActive = true;
                mainPreview.classList.add('hidden');
                cropContainer.classList.remove('hidden');
                initCrop();
            } else {
                cropState.isActive = false;
                mainPreview.classList.remove('hidden');
                cropContainer.classList.add('hidden');
            }

            // Compression must use a format that supports the quality parameter.
            // PNG ignores the quality argument to canvas.toBlob(), which can make
            // a "compressed" PNG larger than the original file.
            if (tab === 'compress') {
                setCompressionFormat();
            }

            // Tab changes are editor UI state only. Do not rewrite the page's
            // SEO title, canonical, or indexed content when a user switches tools.
            // The active URL/tool page remains the SEO source of truth.
        });
    });

    // Aspect Ratio Selection
    document.querySelectorAll('#aspect-ratio-presets .btn-chip').forEach(btn => {
        btn.addEventListener('click', () => {
            const ratio = btn.dataset.ratio;
            cropState.aspectRatio = ratio === 'free' ? 'free' : parseFloat(ratio);
            initCrop();
        });
    });

    // Zoom Slider
    zoomSlider.addEventListener('input', (e) => {
        const val = parseInt(e.target.value);
        cropState.zoom = val / 100;
        zoomVal.textContent = val + '%';
        updateCropUI();
    });

    // Transform Actions (shared between crop and transform tabs)
    document.getElementById('rotate-left').addEventListener('click', () => rotate(-90));
    document.getElementById('rotate-right').addEventListener('click', () => rotate(90));
    document.getElementById('flip-h').addEventListener('click', () => { flipH *= -1; updateCropUI(); });
    document.getElementById('flip-v').addEventListener('click', () => { flipV *= -1; updateCropUI(); });

    document.querySelectorAll('.h-rotate').forEach(btn => {
        btn.addEventListener('click', () => {
            rotate(parseInt(btn.dataset.angle));
        });
    });

    document.querySelectorAll('.h-flip').forEach(btn => {
        btn.addEventListener('click', () => {
            if (btn.dataset.flip === 'h') flipH *= -1;
            else flipV *= -1;
            updateCropUI();
        });
    });

    // Action Chips
    document.querySelectorAll('.btn-chip').forEach(chip => {
        chip.addEventListener('click', () => {
            const parent = chip.parentElement;
            parent.querySelectorAll('.btn-chip').forEach(c => c.classList.remove('active'));
            chip.classList.add('active');
            
            // Handle target KB presets
            if (chip.dataset.target) {
                selectedTargetKB = parseInt(chip.dataset.target);
            } else if (parent.id !== 'aspect-ratio-presets' && !chip.dataset.format) {
                // If clicking other chips that are not target or format, maybe reset target?
                // Actually, let's only reset if specifically on other tabs that might conflict
            }

            updateInfo();
        });
    });

    // Specific check for targets
    document.querySelectorAll('#tab-target .btn-chip').forEach(btn => {
        btn.addEventListener('click', () => {
            selectedTargetKB = parseInt(btn.dataset.target);
            // Also switch to JPEG to ensure compression works
            const jpegBtn = document.querySelector('#tab-convert .btn-chip[data-format="image/jpeg"]');
            if (jpegBtn) jpegBtn.click();
        });
    });

    // Reset target if explicitly interacting with quality slider
    compressSlider.addEventListener('input', () => {
        selectedTargetKB = null;
        document.querySelectorAll('#tab-target .btn-chip').forEach(c => c.classList.remove('active'));
    });

    // Resize Logic (Aspect Ratio)
    resizeW.addEventListener('input', () => {
        markUnsaved();
        processedBlob = null;
        if (maintainRatio.checked && currentImage) {
            resizeH.value = Math.round((resizeW.value / currentImage.width) * currentImage.height);
        }
        updateInfo();
    });
    resizeH.addEventListener('input', () => {
        markUnsaved();
        processedBlob = null;
        if (maintainRatio.checked && currentImage) {
            resizeW.value = Math.round((resizeH.value / currentImage.height) * currentImage.width);
        }
        updateInfo();
    });

    // Compression Slider
    compressSlider.addEventListener('input', (e) => {
        markUnsaved();
        processedBlob = null;
        sliderVal.textContent = e.target.value + '%';
        infoQlty.textContent = e.target.value + '%';
        updateInfo();
    });

    applyBtn.addEventListener('click', () => applyChanges());
    downloadBtn.addEventListener('click', handleDownload);
    removeImgBtn.addEventListener('click', resetApp);

    // Global Tool Click Delegation (SEO Stability Fix)
    document.addEventListener('click', (e) => {
        const card = e.target.closest('[data-tool]');
        if (card) {
            e.preventDefault();
            setTool(card.dataset.tool, true);
        }
    });

    // Global delegation for internal tool links to prevent full page reloads & 404s
    document.body.addEventListener('click', (e) => {
        const link = e.target.closest('a');
        if (!link) return;
        
        const href = link.getAttribute('href');
        if (!href) return;
        
        // Skip external, mailto, tel, target=_blank, javascript:, or download links
        if (href.startsWith('http://') || href.startsWith('https://') || href.startsWith('//') || href.startsWith('mailto:') || href.startsWith('tel:') || href.startsWith('javascript:') || link.target === '_blank' || link.hasAttribute('download')) {
            return;
        }

        // Determine tool slug
        let toolSlug = null;
        const openParam = href.includes('open=1');

        if (href.startsWith('/tools/')) {
            toolSlug = href.split('/tools/')[1].split('?')[0].split('#')[0];
        } else if (href.includes('compress-image-to-')) {
            toolSlug = href.split('?')[0].split('#')[0].replace('/', '');
        } else if (['/discord-pfp-resizer', '/resize-passport-photo', '/heic-to-jpg', '/crop-image', '/instagram-resizer', '/facebook-resizer', '/transform'].some(p => href.startsWith(p))) {
            toolSlug = href.split('?')[0].split('#')[0].replace('/', '');
        } else if (href.startsWith('/#') || (href.startsWith('#') && href.length > 1)) {
            const hashTarget = href.replace('/#', '').replace('#', '');
            if (['resize', 'compress', 'convert', 'target', 'crop', 'transform'].includes(hashTarget)) {
                toolSlug = hashTarget;
            }
        }

        if (toolSlug) {
            e.preventDefault();
            setTool(toolSlug, openParam);
        }
    });

    setupCropEngine();
}

async function handleFiles(files) {
    if (!files || files.length === 0) return;
    let file = files[0];
    
    // HEIC to JPG conversion if needed
    if (file.name.toLowerCase().endsWith('.heic') || file.type === 'image/heic') {
        try {
            const applyBtn = document.getElementById('apply-btn');
            if (applyBtn) applyBtn.textContent = 'Converting HEIC...';
            
            const blob = await heic2any({
                blob: file,
                toType: 'image/jpeg',
                quality: 0.9
            });
            
            // heic2any can return an array or a single blob
            const resultBlob = Array.isArray(blob) ? blob[0] : blob;
            file = new File([resultBlob], file.name.replace(/\.heic$/i, '.jpg'), { type: 'image/jpeg' });
            
            if (applyBtn) applyBtn.textContent = 'Apply Changes';
        } catch (err) {
            console.error('HEIC conversion failed:', err);
            alert('Failed to convert HEIC image. Please try a different format.');
            return;
        }
    }

    if (!file.type.startsWith('image/')) return;

    markUnsaved();

    if (processedDataUrl && processedDataUrl.startsWith('blob:')) {
        URL.revokeObjectURL(processedDataUrl);
    }
    processedDataUrl = null;
    processedBlob = null;
    originalFile = file;
    const reader = new FileReader();
    reader.onload = (e) => {
        const img = new Image();
        img.onload = () => {
            currentImage = img;
            currentCrop = { x: 0, y: 0, w: 0, h: 0 };
            cropDisplayWidth = 0;
            cropDisplayHeight = 0;
            mainPreview.src = e.target.result;
            cropPreviewImg.src = e.target.result;
            processedDataUrl = e.target.result;
            
            // Set initial inputs
            resizeW.value = img.width;
            resizeH.value = img.height;
            infoOrig.textContent = formatBytes(file.size);
            updateInfo();
            
            uploadZone.classList.add('hidden');
            processingUI.classList.remove('hidden');
            processingUI.scrollIntoView({ behavior: 'smooth' });
        };
        img.src = e.target.result;
    };
    reader.readAsDataURL(file);
}

function rotate(deg) {
    rotation = (rotation + deg) % 360;
    updateCropUI();
}

function updateInfo() {
    const formatChip = document.querySelector('#tab-convert .btn-chip.active');
    const activeFormat = processedBlob?.type || formatChip?.dataset.format || 'image/png';
    const formatNames = {
        'image/jpeg': 'JPG',
        'image/png': 'PNG',
        'image/webp': 'WEBP',
        'image/avif': 'AVIF',
        'image/gif': 'GIF',
        'image/bmp': 'BMP'
    };
    infoFmt.textContent = formatNames[activeFormat] || (formatChip ? formatChip.textContent : 'PNG');

    if (processedBlob) {
        infoEst.textContent = formatBytes(processedBlob.size);
    } else if (selectedTargetKB) {
        // A target is a maximum file-size requirement, not a promise of an
        // exact byte count. The final, measured Blob size is shown after Apply.
        infoEst.textContent = `≤${selectedTargetKB} KB target`;
    } else {
        const q = parseInt(compressSlider.value) / 100;
        const est = originalFile ? originalFile.size * q * 0.7 : 0;
        infoEst.textContent = formatBytes(est);
    }
}

// CROP ENGINE
function setupCropEngine() {
    cropBox.addEventListener('pointerdown', startCropAction);
    window.addEventListener('pointermove', moveCropAction);
    window.addEventListener('pointerup', endCropAction);
}

function initCrop() {
    if (!currentImage) return;
    const rect = cropPreviewImg.getBoundingClientRect();
    const iw = rect.width;
    const ih = rect.height;

    // Capture the actual rendered layout size while the crop tab is visible.
    // This remains valid after the crop preview is hidden during Apply Changes.
    cropDisplayWidth = iw;
    cropDisplayHeight = ih;

    let cw, ch;
    if (cropState.aspectRatio === 'free') {
        cw = iw * 0.8;
        ch = ih * 0.8;
    } else {
        const ar = cropState.aspectRatio;
        if (iw / ih > ar) {
            ch = ih * 0.8;
            cw = ch * ar;
        } else {
            cw = iw * 0.8;
            ch = cw / ar;
        }
    }

    currentCrop = {
        x: (iw - cw) / 2,
        y: (ih - ch) / 2,
        w: cw,
        h: ch
    };
    updateCropUI();
}

function updateCropUI() {
    if (!currentImage) return;
    
    // Apply transform preview to workspace
    cropPreviewImg.style.transform = `rotate(${rotation}deg) scale(${flipH * cropState.zoom}, ${flipV * cropState.zoom})`;
    
    cropBox.style.left = currentCrop.x + 'px';
    cropBox.style.top = currentCrop.y + 'px';
    cropBox.style.width = currentCrop.w + 'px';
    cropBox.style.height = currentCrop.h + 'px';

    // Map to real pixels for the stats
    // BoundingClientRect includes CSS rotation/zoom. Use layout dimensions
    // so crop statistics remain tied to the actual source pixel coordinates.
    const displayWidth = cropDisplayWidth || cropPreviewImg.clientWidth || cropPreviewImg.width;
    const displayHeight = cropDisplayHeight || cropPreviewImg.clientHeight || cropPreviewImg.height;
    const scaleX = currentImage.width / Math.max(displayWidth, 1);
    const scaleY = currentImage.height / Math.max(displayHeight, 1);
    
    const realW = Math.round(currentCrop.w * scaleX);
    const realH = Math.round(currentCrop.h * scaleY);
    
    cropStats.textContent = `${realW} × ${realH}px`;
}

function startCropAction(e) {
    e.preventDefault();
    isDragging = true;
    currentHandle = e.target.dataset.handle || 'move';
    startX = e.clientX;
    startY = e.clientY;
    cropBox.setPointerCapture(e.pointerId);
}

function moveCropAction(e) {
    if (!isDragging) return;

    const dx = e.clientX - startX;
    const dy = e.clientY - startY;
    
    startX = e.clientX;
    startY = e.clientY;

    const maxWidth = cropDisplayWidth || cropPreviewImg.clientWidth || cropPreviewImg.width;
    const maxHeight = cropDisplayHeight || cropPreviewImg.clientHeight || cropPreviewImg.height;

    if (currentHandle === 'move') {
        currentCrop.x = Math.max(0, Math.min(maxWidth - currentCrop.w, currentCrop.x + dx));
        currentCrop.y = Math.max(0, Math.min(maxHeight - currentCrop.h, currentCrop.y + dy));
    } else {
        resizeCrop(currentHandle, dx, dy, maxWidth, maxHeight);
    }

    updateCropUI();
}

function resizeCrop(handle, dx, dy, maxWidth, maxHeight) {
    const minSize = 30;
    const ar = cropState.aspectRatio;

    let newX = currentCrop.x;
    let newY = currentCrop.y;
    let newW = currentCrop.w;
    let newH = currentCrop.h;

    if (handle.includes('e')) newW += dx;
    if (handle.includes('w')) { newW -= dx; newX += dx; }
    if (handle.includes('s')) newH += dy;
    if (handle.includes('n')) { newH -= dy; newY += dy; }

    // Aspect Ratio Locking
    if (ar !== 'free') {
        if (handle === 'e' || handle === 'w') newH = newW / ar;
        else if (handle === 's' || handle === 'n') newW = newH * ar;
        else {
            // Corner handles
            if (Math.abs(dx) > Math.abs(dy)) newH = newW / ar;
            else newW = newH * ar;
        }
    }

    // Constraints
    newW = Math.max(minSize, Math.min(newW, maxWidth - (handle.includes('w') ? 0 : newX)));
    newH = Math.max(minSize, Math.min(newH, maxHeight - (handle.includes('n') ? 0 : newY)));
    
    // Boundary check for movement-based resize
    if (newX < 0) { newX = 0; if (ar !== 'free') newW = currentCrop.w; }
    if (newY < 0) { newY = 0; if (ar !== 'free') newH = currentCrop.h; }

    currentCrop.x = newX;
    currentCrop.y = newY;
    currentCrop.w = newW;
    currentCrop.h = newH;
}

function endCropAction(e) {
    isDragging = false;
    currentHandle = null;
}

async function canvasToBlob(canvas, format, quality) {
    // Canvas APIs do not natively encode GIF in most browsers. Route GIF
    // requests through the locally bundled encoder instead of silently
    // accepting the browser's PNG fallback.
    if (format === 'image/gif') {
        return canvasToGifBlob(canvas);
    }

    return new Promise(resolve => {
        const callback = blob => resolve(blob || null);
        if (typeof quality === 'number' && ['image/jpeg', 'image/webp', 'image/avif'].includes(format)) {
            canvas.toBlob(callback, format, quality);
        } else {
            canvas.toBlob(callback, format);
        }
    });
}

function canvasToGifBlob(canvas) {
    if (typeof GifWriter !== 'function') {
        throw new Error('GIF encoder is unavailable. Refresh the page and try again.');
    }

    const width = canvas.width;
    const height = canvas.height;
    if (!width || !height || width > 65535 || height > 65535) {
        throw new Error('Image dimensions are not supported for GIF conversion.');
    }

    const ctx = canvas.getContext('2d', { willReadFrequently: true });
    if (!ctx) throw new Error('Could not read image pixels for GIF conversion.');

    const imageData = ctx.getImageData(0, 0, width, height).data;
    const pixelCount = width * height;

    // Build a weighted 5-bit-per-channel histogram from the actual image,
    // compositing transparency against white because this is a single-frame GIF.
    const HIST_SIZE = 32 * 32 * 32;
    const counts = new Uint32Array(HIST_SIZE);
    const redSums = new Float64Array(HIST_SIZE);
    const greenSums = new Float64Array(HIST_SIZE);
    const blueSums = new Float64Array(HIST_SIZE);

    for (let source = 0; source < imageData.length; source += 4) {
        const alpha = imageData[source + 3] / 255;
        const red = Math.round(imageData[source] * alpha + 255 * (1 - alpha));
        const green = Math.round(imageData[source + 1] * alpha + 255 * (1 - alpha));
        const blue = Math.round(imageData[source + 2] * alpha + 255 * (1 - alpha));
        const key = ((red >> 3) << 10) | ((green >> 3) << 5) | (blue >> 3);
        counts[key]++;
        redSums[key] += red;
        greenSums[key] += green;
        blueSums[key] += blue;
    }

    const colors = [];
    for (let key = 0; key < HIST_SIZE; key++) {
        if (!counts[key]) continue;
        colors.push({
            key,
            count: counts[key],
            r: redSums[key] / counts[key],
            g: greenSums[key] / counts[key],
            b: blueSums[key] / counts[key]
        });
    }

    // Median-cut quantization creates a palette tailored to this image rather
    // than forcing every image into a fixed 3-3-2 RGB palette.
    let boxes = [colors];
    while (boxes.length < 256) {
        let splitIndex = -1;
        let splitScore = -1;
        let splitChannel = 'r';

        for (let i = 0; i < boxes.length; i++) {
            const box = boxes[i];
            if (box.length < 2) continue;
            let minR = 255, maxR = 0, minG = 255, maxG = 0, minB = 255, maxB = 0;
            let weight = 0;
            for (const color of box) {
                minR = Math.min(minR, color.r); maxR = Math.max(maxR, color.r);
                minG = Math.min(minG, color.g); maxG = Math.max(maxG, color.g);
                minB = Math.min(minB, color.b); maxB = Math.max(maxB, color.b);
                weight += color.count;
            }
            const ranges = [maxR - minR, maxG - minG, maxB - minB];
            const channel = ranges.indexOf(Math.max(...ranges));
            const score = ranges[channel] * Math.log2(weight + 1);
            if (score > splitScore) {
                splitScore = score;
                splitIndex = i;
                splitChannel = ['r', 'g', 'b'][channel];
            }
        }

        if (splitIndex < 0 || splitScore <= 0) break;
        const box = boxes[splitIndex].slice().sort((a, b) => a[splitChannel] - b[splitChannel]);
        const total = box.reduce((sum, color) => sum + color.count, 0);
        let cumulative = 0;
        let cut = 1;
        for (; cut < box.length; cut++) {
            cumulative += box[cut - 1].count;
            if (cumulative >= total / 2) break;
        }
        boxes.splice(splitIndex, 1, box.slice(0, cut), box.slice(cut));
    }

    const palette = [];
    const paletteColors = [];
    for (const box of boxes) {
        let total = 0, r = 0, g = 0, b = 0;
        for (const color of box) {
            total += color.count;
            r += color.r * color.count;
            g += color.g * color.count;
            b += color.b * color.count;
        }
        const color = {
            r: Math.round(r / total),
            g: Math.round(g / total),
            b: Math.round(b / total)
        };
        paletteColors.push(color);
        palette.push((color.r << 16) | (color.g << 8) | color.b);
    }

    // GIF global palettes must contain a power-of-two number of entries.
    while (palette.length < 2) {
        palette.push(palette[0] || 0xffffff);
        paletteColors.push(paletteColors[0] || { r: 255, g: 255, b: 255 });
    }
    let tableSize = 2;
    while (tableSize < palette.length) tableSize <<= 1;
    while (palette.length < tableSize) {
        palette.push(palette[palette.length - 1]);
        paletteColors.push(paletteColors[paletteColors.length - 1]);
    }

    // Cache nearest palette colors for every 5-bit RGB cell. Every cell must
    // be mapped because dithering can move a pixel into a cell absent in the
    // original image histogram.
    const colorLookup = new Uint8Array(HIST_SIZE);
    for (let key = 0; key < HIST_SIZE; key++) {
        const r = counts[key] ? redSums[key] / counts[key] : (((key >> 10) & 31) * 8 + 4);
        const g = counts[key] ? greenSums[key] / counts[key] : (((key >> 5) & 31) * 8 + 4);
        const b = counts[key] ? blueSums[key] / counts[key] : ((key & 31) * 8 + 4);
        let nearest = 0;
        let bestDistance = Infinity;
        for (let i = 0; i < paletteColors.length; i++) {
            const dr = r - paletteColors[i].r;
            const dg = g - paletteColors[i].g;
            const db = b - paletteColors[i].b;
            const distance = dr * dr + dg * dg + db * db;
            if (distance < bestDistance) {
                bestDistance = distance;
                nearest = i;
            }
        }
        colorLookup[key] = nearest;
    }

    // Floyd-Steinberg dithering reduces visible color banding in photographs.
    // Keep only two rows of error values so large images do not need a second
    // full-resolution RGB buffer.
    const indexedPixels = new Uint8Array(pixelCount);
    let currentR = new Float32Array(width + 2);
    let currentG = new Float32Array(width + 2);
    let currentB = new Float32Array(width + 2);
    let nextR = new Float32Array(width + 2);
    let nextG = new Float32Array(width + 2);
    let nextB = new Float32Array(width + 2);

    for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
            const source = (y * width + x) * 4;
            const target = y * width + x;
            const alpha = imageData[source + 3] / 255;
            const red = Math.max(0, Math.min(255, imageData[source] * alpha + 255 * (1 - alpha) + currentR[x + 1]));
            const green = Math.max(0, Math.min(255, imageData[source + 1] * alpha + 255 * (1 - alpha) + currentG[x + 1]));
            const blue = Math.max(0, Math.min(255, imageData[source + 2] * alpha + 255 * (1 - alpha) + currentB[x + 1]));
            const key = ((Math.round(red) >> 3) << 10) | ((Math.round(green) >> 3) << 5) | (Math.round(blue) >> 3);
            const paletteIndex = colorLookup[key];
            indexedPixels[target] = paletteIndex;

            const chosen = paletteColors[paletteIndex];
            const errorR = red - chosen.r;
            const errorG = green - chosen.g;
            const errorB = blue - chosen.b;

            currentR[x + 2] += errorR * 7 / 16;
            currentG[x + 2] += errorG * 7 / 16;
            currentB[x + 2] += errorB * 7 / 16;
            nextR[x] += errorR * 3 / 16;
            nextG[x] += errorG * 3 / 16;
            nextB[x] += errorB * 3 / 16;
            nextR[x + 1] += errorR * 5 / 16;
            nextG[x + 1] += errorG * 5 / 16;
            nextB[x + 1] += errorB * 5 / 16;
            nextR[x + 2] += errorR / 16;
            nextG[x + 2] += errorG / 16;
            nextB[x + 2] += errorB / 16;
        }

        currentR = nextR; currentG = nextG; currentB = nextB;
        nextR = new Float32Array(width + 2);
        nextG = new Float32Array(width + 2);
        nextB = new Float32Array(width + 2);
    }

    const output = new Uint8Array(width * height * 2 + 4096);
    const writer = new GifWriter(output, width, height, { palette });
    writer.addFrame(0, 0, width, height, indexedPixels);
    const length = writer.end();
    return new Blob([output.subarray(0, length)], { type: 'image/gif' });
}

async function encodeTargetSize(canvas, format, targetBytes, startQuality = 0.95) {
    if (!targetBytes || targetBytes <= 0) {
        return canvasToBlob(canvas, format, startQuality);
    }

    const supportsQuality = ['image/jpeg', 'image/webp', 'image/avif'].includes(format);
    if (!supportsQuality) {
        const fallback = await canvasToBlob(canvas, format);
        return {
            blob: fallback,
            fitsTarget: !!fallback && fallback.size <= targetBytes,
            width: canvas.width,
            height: canvas.height
        };
    }

    let workingCanvas = canvas;
    let best = null;
    let width = canvas.width;
    let height = canvas.height;

    // First try the current dimensions. Binary-search the highest quality
    // that stays at or below the requested byte ceiling. Target-size mode
    // should prioritize visual quality, so the user's compression-slider
    // quality is a starting point, not a hard upper limit.
    for (let dimensionPass = 0; dimensionPass < 10; dimensionPass++) {
        let low = 0.01;
        let high = 1;
        let highBlob = await canvasToBlob(workingCanvas, format, high);
        if (!highBlob) throw new Error('Image compression failed.');

        if (highBlob.size <= targetBytes) {
            best = highBlob;
            for (let i = 0; i < 10; i++) {
                const mid = (low + high) / 2;
                const candidate = await canvasToBlob(workingCanvas, format, mid);
                if (!candidate) break;
                if (candidate.size <= targetBytes) {
                    best = candidate;
                    low = mid;
                } else {
                    high = mid;
                }
            }
            return {
                blob: best,
                fitsTarget: best.size <= targetBytes,
                width,
                height
            };
        }

        const minimumQualityBlob = await canvasToBlob(workingCanvas, format, 0.01);
        if (!minimumQualityBlob) throw new Error('Image compression failed.');

        if (minimumQualityBlob.size <= targetBytes) {
            best = minimumQualityBlob;
            let low = 0.01;
            let high = 1;
            for (let i = 0; i < 10; i++) {
                const mid = (low + high) / 2;
                const candidate = await canvasToBlob(workingCanvas, format, mid);
                if (!candidate) break;
                if (candidate.size <= targetBytes) {
                    best = candidate;
                    low = mid;
                } else {
                    high = mid;
                }
            }
            return {
                blob: best,
                fitsTarget: best.size <= targetBytes,
                width,
                height
            };
        }

        // Quality alone cannot reach the target. Reduce pixel dimensions and
        // try again. This is the missing step that caused large files to be
        // saved even when the UI showed a target KB value.
        const ratio = Math.sqrt(targetBytes / Math.max(minimumQualityBlob.size, 1));
        const scale = Math.max(0.45, Math.min(0.88, ratio * 0.92));
        const nextWidth = Math.max(64, Math.floor(width * scale));
        const nextHeight = Math.max(64, Math.floor(height * scale));

        if (nextWidth >= width && nextHeight >= height) break;

        const nextCanvas = document.createElement('canvas');
        nextCanvas.width = nextWidth;
        nextCanvas.height = nextHeight;
        const nextCtx = nextCanvas.getContext('2d');
        if (!nextCtx) throw new Error('Image processing failed.');
        nextCtx.imageSmoothingEnabled = true;
        try { nextCtx.imageSmoothingQuality = 'high'; } catch (_) {}
        nextCtx.drawImage(workingCanvas, 0, 0, nextWidth, nextHeight);

        workingCanvas = nextCanvas;
        width = nextWidth;
        height = nextHeight;
    }

    // If the target is exceptionally small, return the smallest candidate we
    // could produce rather than silently returning the original image.
    const finalBlob = best || await canvasToBlob(workingCanvas, format, 0.01);
    return {
        blob: finalBlob,
        fitsTarget: !!finalBlob && finalBlob.size <= targetBytes,
        width,
        height
    };
}

async function applyChanges() {
    if (!currentImage) return;

    applyBtn.textContent = 'Processing...';

    const canvas = editorCanvas;
    const ctx = canvas.getContext('2d');

    // Use the image's layout dimensions, not getBoundingClientRect().
    // CSS zoom/rotation changes the visual bounding box but must not change
    // the mapping from the crop rectangle to source pixels.
    const displayWidth = cropDisplayWidth || cropPreviewImg.clientWidth || cropPreviewImg.width;
    const displayHeight = cropDisplayHeight || cropPreviewImg.clientHeight || cropPreviewImg.height;

    let sx, sy, sw, sh;

    if (!displayWidth || !displayHeight || currentCrop.w === 0) {
        sx = 0;
        sy = 0;
        sw = currentImage.width;
        sh = currentImage.height;
    } else {
        const scaleX = currentImage.width / displayWidth;
        const scaleY = currentImage.height / displayHeight;

        sx = Math.max(0, Math.min(currentImage.width, currentCrop.x * scaleX));
        sy = Math.max(0, Math.min(currentImage.height, currentCrop.y * scaleY));
        sw = Math.max(1, Math.min(currentImage.width - sx, currentCrop.w * scaleX));
        sh = Math.max(1, Math.min(currentImage.height - sy, currentCrop.h * scaleY));
    }

    // When a crop has been selected, preserve the crop's native pixel
    // dimensions unless the user explicitly changed the resize dimensions.
    // Previously the original resize fields (for example 2880x1650) were
    // reused after a 1:1 crop, stretching the cropped square back to 16:9.
    const inputW = parseInt(resizeW.value) || 0;
    const inputH = parseInt(resizeH.value) || 0;
    const cropWasSelected = currentCrop.w > 0 && currentCrop.h > 0;
    const resizeStillMatchesOriginal = inputW === currentImage.width && inputH === currentImage.height;
    const finalW = cropWasSelected && resizeStillMatchesOriginal ? Math.max(1, Math.round(sw)) : (inputW || Math.max(1, Math.round(sw)));
    const finalH = cropWasSelected && resizeStillMatchesOriginal ? Math.max(1, Math.round(sh)) : (inputH || Math.max(1, Math.round(sh)));

    const isHorizontal = rotation % 180 === 0;
    canvas.width = isHorizontal ? finalW : finalH;
    canvas.height = isHorizontal ? finalH : finalW;

    ctx.save();
    ctx.translate(canvas.width / 2, canvas.height / 2);
    ctx.rotate((rotation * Math.PI) / 180);
    ctx.scale(flipH, flipV);
    ctx.drawImage(currentImage, sx, sy, sw, sh, -finalW / 2, -finalH / 2, finalW, finalH);
    ctx.restore();

    let format = document.querySelector('#tab-convert .btn-chip.active')?.dataset.format || 'image/png';
    const activeTab = document.querySelector('.tab-btn.active')?.dataset.tab;
    const originalSize = originalFile?.size || 0;

    if (activeTab === 'compress' && format === 'image/png') {
        format = 'image/webp';
        const webpBtn = document.querySelector('#tab-convert .btn-chip[data-format="image/webp"]');
        if (webpBtn) {
            document.querySelectorAll('#tab-convert .btn-chip').forEach(btn => btn.classList.remove('active'));
            webpBtn.classList.add('active');
        }
    }

    const supportsQuality = ['image/jpeg', 'image/webp', 'image/avif'].includes(format);
    const quality = Math.max(0.01, Math.min(1, parseInt(compressSlider.value) / 100 || 0.85));

    if (selectedTargetKB) {
        const targetBytes = selectedTargetKB * 1024;
        const targetResult = await encodeTargetSize(canvas, format, targetBytes, quality);

        if (!targetResult.blob) {
            throw new Error('Image compression failed.');
        }

        processedBlob = targetResult.blob;

        if (!targetResult.fitsTarget) {
            console.warn('PixelResize could not reach the requested target size.', {
                targetBytes,
                actualBytes: processedBlob.size,
                width: targetResult.width,
                height: targetResult.height
            });
        }
    } else if (activeTab === 'compress' && supportsQuality) {
        let currentQuality = Math.min(0.95, quality);
        let blob = await canvasToBlob(canvas, format, currentQuality);

        if (!blob) throw new Error('Image compression failed.');

        while (originalSize > 0 && blob.size >= originalSize && currentQuality > 0.05) {
            currentQuality = Math.max(0.05, currentQuality - 0.05);
            const nextBlob = await canvasToBlob(canvas, format, currentQuality);
            if (!nextBlob) break;
            blob = nextBlob;
        }

        processedBlob = (originalSize > 0 && blob.size >= originalSize)
            ? originalFile
            : blob;
    } else {
        processedBlob = await canvasToBlob(canvas, format, quality);
        if (!processedBlob) throw new Error('Image processing failed.');
    }

    // Never silently accept the browser's PNG fallback for an AVIF request.
    // The actual Blob MIME type is the source of truth for the exported format.
    if (format === 'image/avif' && processedBlob?.type !== 'image/avif') {
        processedBlob = null;
        applyBtn.textContent = 'Apply Changes';
        alert('AVIF export is not supported by this browser. Please try a browser with AVIF canvas export support. No PNG file was substituted.');
        return;
    }

    if (processedDataUrl && processedDataUrl.startsWith('blob:')) {
        URL.revokeObjectURL(processedDataUrl);
    }

    processedDataUrl = URL.createObjectURL(processedBlob);
    mainPreview.src = processedDataUrl;

    updateInfo();

    markUnsaved();

    document.querySelector('.tab-btn[data-tab="resize"]').click();

    applyBtn.textContent = 'Applied!';
    setTimeout(() => applyBtn.textContent = 'Apply Changes', 1500);
}

function handleDownload() {
    if (!processedBlob) return;
    
    const link = document.createElement('a');
    const mime = processedBlob.type || 'image/png';
    const ext = ({ 'image/jpeg': 'jpg', 'image/png': 'png', 'image/webp': 'webp', 'image/avif': 'avif', 'image/gif': 'gif' })[mime] || 'png';
    link.download = `pixelresize-${Date.now()}.${ext}`;
    
    // Use the already generated blob URL
    link.href = processedDataUrl;
    
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    markSaved();
}

function markUnsaved() {
    hasUnsavedWork = true;
}

function markSaved() {
    hasUnsavedWork = false;
}

function setupNavigationProtection() {
    // Intercept all links
    document.querySelectorAll("a").forEach(link => {
        link.addEventListener("click", function(e) {
            const href = this.getAttribute("href");

            // Ignore empty anchors
            if (!href || href.startsWith("#")) return;

            // Ignore if no unsaved work
            if (!hasUnsavedWork) return;

            e.preventDefault();
            pendingNavigation = href;
            unsavedModal.classList.add("active");
        });
    });

    // Stay button
    stayBtn.addEventListener("click", () => {
        unsavedModal.classList.remove("active");
        pendingNavigation = null;
    });

    // Leave button
    leaveBtn.addEventListener("click", () => {
        hasUnsavedWork = false;
        if (pendingNavigation) {
            window.location.href = pendingNavigation;
        }
    });

    // Tab close warning
    window.addEventListener("beforeunload", function(e) {
        if (!hasUnsavedWork) return;
        e.preventDefault();
        e.returnValue = "";
    });

    // ESC key close
    document.addEventListener("keydown", (e) => {
        if (e.key === "Escape") {
            unsavedModal.classList.remove("active");
        }
    });
}

function resetApp() {
    markSaved();
    if (processedDataUrl && processedDataUrl.startsWith('blob:')) {
        URL.revokeObjectURL(processedDataUrl);
    }
    processedDataUrl = null;
    originalFile = null;
    currentImage = null;
    processedBlob = null;
    selectedTargetKB = null;
    rotation = 0;
    flipH = 1;
    flipV = 1;
    uploadZone.classList.remove('hidden');
    processingUI.classList.add('hidden');
    fileInput.value = '';
    mainPreview.classList.remove('hidden');
    cropContainer.classList.add('hidden');
}

function formatBytes(bytes, decimals = 2) {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
}

function setTool(tool, forceOpen = false) {
    let targetTab = tool;
    let format = null;
    let targetSize = null;
    
    // Prevent double triggering auto-open
    if (forceOpen && window._uploadTriggeredByClick) {
        forceOpen = false;
    }

    const isDedicated = ['discord-pfp-resizer', 'resize-passport-photo', 'heic-to-jpg'].includes(tool);
    const specialContainer = document.getElementById('special-tool-controls');
    const heroSection = document.getElementById('home');
    const faqSection = document.getElementById('faq');
    const securitySection = document.getElementById('security');
    const featuresSection = document.getElementById('features');
    const toolsSection = document.getElementById('tools');
    
    // Reset special modes
    document.body.classList.remove('mode-discord-pfp-resizer', 'mode-resize-passport-photo', 'mode-heic-to-jpg');
    
    // Auto-open image upload dialog if requested
    if (forceOpen && !currentImage) {
        requestAnimationFrame(() => {
            if (fileInput) fileInput.click();
        });
    }

    // Reset special controls
    if (specialContainer) {
        specialContainer.classList.add('hidden');
        specialContainer.querySelectorAll(':scope > div').forEach(d => d.classList.add('hidden'));
    }

    if (isDedicated) {
        document.body.classList.add('dedicated-tool-mode', `mode-${tool}`);
        if (specialContainer) {
            specialContainer.classList.remove('hidden');
            specialContainer.classList.add('active');
            if (tool === 'discord-pfp-resizer') document.getElementById('discord-controls')?.classList.remove('hidden');
            if (tool === 'resize-passport-photo') document.getElementById('passport-controls')?.classList.remove('hidden');
            if (tool === 'heic-to-jpg') document.getElementById('heic-controls')?.classList.remove('hidden');
        }
        heroSection?.classList.remove('hidden');
    } else {
        document.body.classList.remove('dedicated-tool-mode');
        heroSection?.classList.remove('hidden');
        faqSection?.classList.remove('hidden');
        securitySection?.classList.remove('hidden');
        featuresSection?.classList.remove('hidden');
        toolsSection?.classList.remove('hidden');
    }

    // Map tool names to tabs and specific settings
    if (tool === 'discord-pfp-resizer' || tool === 'discord') {
        targetTab = 'resize';
        resizeW.value = 128;
        resizeH.value = 128;
        maintainRatio.checked = true;
        cropState.aspectRatio = 1;
        document.querySelectorAll('#aspect-ratio-presets .btn-chip').forEach(btn => {
            btn.classList.toggle('active', btn.dataset.ratio === '1');
        });
    } else if (tool === 'resize-passport-photo' || tool === 'passport') {
        targetTab = 'resize';
        resizeW.value = 600;
        resizeH.value = 600;
        maintainRatio.checked = true;
        cropState.aspectRatio = 1;
        document.querySelectorAll('#aspect-ratio-presets .btn-chip').forEach(btn => {
            btn.classList.toggle('active', btn.dataset.ratio === '1');
        });
    } else if (tool === 'heic-to-jpg' || tool === 'heic') {
        targetTab = 'convert';
        format = 'image/jpeg';
    } else if (tool === 'instagram-resizer' || tool === 'instagram') {
        targetTab = 'resize';
        resizeW.value = 1080;
        resizeH.value = 1080;
        maintainRatio.checked = true;
        cropState.aspectRatio = 1;
        document.querySelectorAll('#aspect-ratio-presets .btn-chip').forEach(btn => {
            btn.classList.toggle('active', btn.dataset.ratio === '1');
        });
    } else if (tool === 'facebook-resizer' || tool === 'facebook') {
        targetTab = 'resize';
        resizeW.value = 1200;
        resizeH.value = 630;
        maintainRatio.checked = true;
        cropState.aspectRatio = 1.91;
    } else if (tool.startsWith('resize_') || tool.startsWith('compress-image-to-') || tool === 'target') {
        targetTab = 'target';
        const parts = tool.split('-');
        const lastPart = parts[parts.length - 1];
        targetSize = lastPart.replace('kb', '');
        if (tool.includes('_')) {
             targetSize = tool.split('_')[1].replace('kb', '');
        }
        if (isNaN(parseInt(targetSize))) targetSize = null;
        format = 'image/jpeg'; // Force JPEG for target size tools to enable compression
    } else if (tool === 'to_png' || tool === 'jpg-to-png' || tool === 'png') {
        targetTab = 'convert';
        format = 'image/png';
    } else if (tool === 'to_jpg' || tool === 'gif_to_jpg' || tool === 'png_to_jpg' || tool === 'jpg' || tool === 'jpeg') {
        targetTab = 'convert';
        format = 'image/jpeg';
    } else if (tool === 'to_webp' || tool === 'jpg_to_webp' || tool === 'jpg-to-webp' || tool === 'webp') {
        targetTab = 'convert';
        format = 'image/webp';
    } else if (tool === 'to_avif' || tool === 'to-avif' || tool === 'avif') {
        targetTab = 'convert';
        format = 'image/avif';
    } else if (tool === 'to_gif' || tool === 'jpg_to_gif' || tool === 'to-gif' || tool === 'gif') {
        targetTab = 'convert';
        format = 'image/gif';
    } else if (tool === 'bmp_to_png' || tool === 'bmp-to-png' || tool === 'bmp') {
        targetTab = 'convert';
        format = 'image/png';
    } else if (tool === 'compress' || tool === 'image-compressor') {
        targetTab = 'compress';
    } else if (tool === 'resize' || tool === 'image-resizer') {
        targetTab = 'resize';
    } else if (tool === 'transform') {
        targetTab = 'transform';
    } else if (tool === 'crop' || tool === 'crop-image') {
        targetTab = 'crop';
    }

    // Update Breadcrumb Navigation UI
    const breadcrumbCurrentNav = document.getElementById('breadcrumb-current-nav');
    const breadcrumbParentNav = document.getElementById('breadcrumb-parent-nav');
    const breadcrumbNav = document.querySelector('.breadcrumb-nav');
    const breadcrumbHomeLink = document.getElementById('breadcrumb-home-link');
    
    let displayName = (tool === 'home' || tool === '') ? 'Home' : tool.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
    
    // Custom mappings for cleaner breadcrumbs
    if (tool === 'image-resizer') displayName = 'Resize Image';
    if (tool === 'image-compressor') displayName = 'Compress Image';
    if (tool === 'crop-image') displayName = 'Crop Image';
    if (tool === 'discord-pfp-resizer') displayName = 'Discord PFP';
    if (tool === 'resize-passport-photo') displayName = 'Passport Photo';
    if (tool === 'heic-to-jpg') displayName = 'HEIC to JPG';
    if (typeof tool === 'string' && tool.startsWith('compress-image-to-')) {
        displayName = `Compress to ${tool.split('-').pop().toUpperCase()}`;
    }

    if (breadcrumbCurrentNav) breadcrumbCurrentNav.textContent = displayName;

    if (tool === 'home' || tool === '') {
        breadcrumbParentNav?.classList.add('hidden');
        breadcrumbHomeLink?.classList.add('font-bold', 'text-primary');
        breadcrumbHomeLink?.querySelector('a')?.classList.add('pointer-events-none');
        breadcrumbCurrentNav?.parentElement?.classList.add('hidden');
    } else {
        breadcrumbParentNav?.classList.remove('hidden');
        breadcrumbParentNav?.classList.add('flex');
        breadcrumbHomeLink?.classList.remove('font-bold', 'text-primary');
        breadcrumbHomeLink?.querySelector('a')?.classList.remove('pointer-events-none');
        breadcrumbCurrentNav?.parentElement?.classList.remove('hidden');
        breadcrumbCurrentNav?.parentElement?.classList.add('flex');
    }
    breadcrumbNav?.classList.remove('sr-only');

    const tabBtn = document.querySelector(`.tab-btn[data-tab="${targetTab}"]`);
    if (tabBtn) {
        tabBtn.click();
        
        // Handle sub-settings if applicable
        if (format) {
            const formatBtn = document.querySelector(`#tab-convert .btn-chip[data-format="${format}"]`);
            if (formatBtn) formatBtn.click();
        }
        
        if (targetSize) {
            const sizeBtn = document.querySelector(`#tab-target .btn-chip[data-target="${targetSize}"]`);
            if (sizeBtn) sizeBtn.click();
        }
    }
    
    // Update SEO
    updateSEO(tool, displayName); 

    // Update URL without reload
    const urlSlug = ['home'].includes(targetTab) ? 'home' : tool;
    const cleanUrl = getToolUrl(urlSlug);
    
    if (window.location.pathname + window.location.hash !== cleanUrl) {
        history.pushState({ tool: urlSlug }, '', cleanUrl);
    }

    window.scrollTo({ top: 0, behavior: 'smooth' });
}
window.setTool = setTool;

// Initial Page Load Fix
window.addEventListener('load', () => {
    // Cache original home SEO elements
    const dynamicH2 = document.getElementById('dynamic-h2');
    const dynamicBody = document.getElementById('dynamic-body');
    if (dynamicH2) originalHomeH2 = dynamicH2.innerHTML;
    if (dynamicBody) originalHomeBody = dynamicBody.innerHTML;

    // Initialize app components
    setupEventListeners();
    setupNavigationProtection();
    
    // Handle initial tool state from URL
    handleInitialRoute();

    window.scrollTo(0, 0);
    if (!currentImage) {
        processingUI.classList.add('hidden');
    }
});