# MicroGym Living - AI-Powered Niche Content Site

An automated content generation system for apartment-friendly fitness content with affiliate monetization.

## 🚀 Features

- **AI Article Generation**: Automatically creates 1200-1600 word articles using OpenAI
- **Affiliate Integration**: Seamlessly injects Amazon affiliate links into content
- **SEO Optimized**: Built-in sitemap.xml and RSS feed generation
- **Related Posts**: Intelligent internal linking system
- **File-based CMS**: Simple markdown storage with frontmatter
- **Responsive Design**: Clean, mobile-friendly interface

## 🛠️ Tech Stack

- **Framework**: Next.js 15 with TypeScript
- **Styling**: Tailwind CSS
- **AI**: OpenAI GPT-4o-mini
- **Content**: Markdown with gray-matter
- **Deployment**: Vercel-ready

## 📁 Project Structure

```
ai-niche-site/
├── content/
│   └── keywords.json          # Article topics
├── src/
│   ├── app/
│   │   ├── api/generate/      # Article generation endpoint
│   │   ├── [slug]/            # Dynamic post pages
│   │   ├── sitemap.xml/       # SEO sitemap
│   │   ├── rss.xml/           # RSS feed
│   │   └── page.tsx           # Homepage
│   └── lib/
│       ├── ai.ts              # OpenAI integration
│       ├── affiliates.ts      # Affiliate link injection
│       └── fs-posts.ts        # File system utilities
└── .env.local                 # Environment variables
```

## 🚀 Quick Start

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Set up environment variables**:
   Create `.env.local` with:
   ```
   OPENAI_API_KEY=your_openai_key
   SITE_NAME=MicroGym Living
   SITE_URL=https://your-vercel-url.vercel.app
   AFFILIATE_TAG=youramazontag-20
   ```

3. **Start development server**:
   ```bash
   npm run dev
   ```

4. **Generate your first article**:
   Visit `http://localhost:3000/api/generate` or click the "Generate Article" button on the homepage.

## 📝 Content Generation

### Manual Generation
- Visit `/api/generate` to create a new article
- Articles are automatically saved to `/content/` as markdown files

### Automated Generation
Set up a cron job in Vercel:
1. Go to Vercel Dashboard → Project Settings → Cron Jobs
2. Add: `POST /api/generate` daily at 09:00

### Customizing Content
- Edit `content/keywords.json` to change article topics
- Modify `src/lib/ai.ts` to adjust AI prompts
- Update `src/lib/affiliates.ts` for different affiliate networks

## 💰 Monetization

### Amazon Associates
1. Apply for Amazon Associates program
2. Get your affiliate tag
3. Add it to `.env.local` as `AFFILIATE_TAG`
4. Articles automatically include affiliate links

### Content Structure
Each article includes:
- Product recommendations with affiliate links
- Quick workout routines
- Storage tips for small spaces
- FAQ section
- Related posts suggestions

## 🚀 Deployment

### Vercel (Recommended)
1. Push to GitHub
2. Import to Vercel
3. Add environment variables
4. Deploy

### Environment Variables for Production
```
OPENAI_API_KEY=your_production_key
SITE_NAME=Your Site Name
SITE_URL=https://your-domain.com
AFFILIATE_TAG=your_amazon_tag
```

## 📊 SEO Features

- **Sitemap**: `/sitemap.xml` - Auto-generated from posts
- **RSS Feed**: `/rss.xml` - For content syndication
- **Meta Tags**: OpenGraph and Twitter cards
- **Internal Linking**: Related posts system
- **Clean URLs**: SEO-friendly slugs

## 🔧 Customization

### Changing the Niche
1. Update `content/keywords.json` with new topics
2. Modify the AI prompt in `src/lib/ai.ts`
3. Update site metadata in `src/app/layout.tsx`

### Styling
- Edit `src/app/globals.css` for custom styles
- Modify Tailwind classes in components
- Add custom components as needed

## 📈 Analytics & Monitoring

### Recommended Tools
- **Google Analytics 4**: Add tracking code to layout
- **Google Search Console**: Submit sitemap for indexing
- **Vercel Analytics**: Built-in performance monitoring

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

MIT License - feel free to use this for your own projects!

## 🆘 Support

For issues or questions:
1. Check the documentation
2. Review the code structure
3. Test with a fresh installation
4. Open an issue on GitHub

---

**Built with ❤️ for content creators who want to automate their niche sites!**
