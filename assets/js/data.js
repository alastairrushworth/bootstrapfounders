/* =========================================================================
   bootstrapfounders — content database
   Everything the site renders lives here. Add a resource = add an object.
   Each resource: { name, url, by, desc, tags:[] }
   ========================================================================= */

window.DB = {

  /* ---- Top-level categories (order = nav order) ------------------------ */
  categories: [
    { id: "podcasts",    label: "Podcasts", blurb: "Listen on the commute. Founders, operators and investors, unscripted." },
    { id: "youtube",     label: "YouTube", blurb: "Watch teardowns, build-alongs and interviews." },
    { id: "books",       label: "Books", blurb: "The canon. Read these before you write a line of code." },
    { id: "reading",     label: "Newsletters & Blogs", blurb: "Subscribe once, learn forever. The essays and lists worth your inbox." },
    { id: "communities", label: "Communities", blurb: "Where bootstrappers hang out, ship in public and swap notes." },
    { id: "launch",      label: "Launch Platforms", blurb: "Where to put your thing in front of people on day one." },
  ],

  /* ---- PODCASTS -------------------------------------------------------- */
  podcasts: [
    { name: "Indie Hackers Podcast", url: "https://www.indiehackers.com/podcast", by: "Courtland Allen & Channing Allen", desc: "Long, honest interviews with bootstrapped founders about exactly how they got their first customers and to profitability.", tags: ["bootstrapping", "interviews", "must-listen"] },
    { name: "My First Million", url: "https://www.mfmpod.com/", by: "Sam Parr & Shaan Puri", desc: "Rapid-fire business ideas, trends and 'I'd build this' brainstorms. Great for idea generation and spotting opportunities.", tags: ["ideas", "trends", "entertaining"] },
    { name: "Startups For the Rest of Us", url: "https://www.startupsfortherestofus.com/", by: "Rob Walling", desc: "The original bootstrapped-SaaS podcast. Tactical, no-hype advice on building a software business without VC.", tags: ["saas", "bootstrapping", "must-listen"] },
    { name: "The SaaS Podcast", url: "https://saasclub.io/podcast/", by: "Omer Khan", desc: "Deep-dive interviews with SaaS founders on how they found product–market fit, priced and scaled.", tags: ["saas", "interviews"] },
    { name: "The Bootstrapped Founder", url: "https://thebootstrappedfounder.com/", by: "Arvid Kahl", desc: "Audience-building, productized businesses and the indie path to a sustainable company. Calm, thoughtful.", tags: ["bootstrapping", "audience"] },
    { name: "Lenny's Podcast", url: "https://www.lennyspodcast.com/", by: "Lenny Rachitsky", desc: "Product, growth and career deep-dives with top operators. Skews bigger-company but the growth tactics transfer.", tags: ["product", "growth"] },
    { name: "Acquired", url: "https://www.acquired.fm/", by: "Ben Gilbert & David Rosenthal", desc: "Epic, well-researched stories of how the great companies were built. Strategy education disguised as entertainment.", tags: ["strategy", "stories"] },
    { name: "Build Your SaaS", url: "https://saas.transistor.fm/", by: "Justin Jackson & Jon Buda", desc: "Two founders building Transistor in public — real numbers, real decisions, episode by episode.", tags: ["saas", "build-in-public"] },
    { name: "Software Social", url: "https://softwaresocial.dev/", by: "Michele Hansen & Colleen Schnettler", desc: "Two bootstrappers talk weekly about the actual day-to-day of running tiny software businesses.", tags: ["bootstrapping", "build-in-public"] },
    { name: "How I Built This", url: "https://www.npr.org/podcasts/510313/how-i-built-this", by: "Guy Raz (NPR)", desc: "Origin stories of well-known companies and the messy early days behind them. Inspirational fuel.", tags: ["stories", "inspiration"] },
    { name: "Tropical MBA", url: "https://www.tropicalmba.com/", by: "Dan Andrews & Ian Schoen", desc: "Location-independent entrepreneurship and small, profitable businesses — building a life and a company on your own terms.", tags: ["lifestyle", "bootstrapping"] },
    { name: "Bootstrapped Web", url: "https://bootstrappedweb.com/", by: "Brian Casel & Jordan Gal", desc: "Two SaaS founders talk through the real, in-progress decisions of running and growing bootstrapped products.", tags: ["saas", "build-in-public"] },
    { name: "ZenFounder", url: "https://zenfounder.com/", by: "Dr. Sherry Walling", desc: "The one about the founder, not the funnel — mental health, burnout and staying sane while you build.", tags: ["wellbeing", "founder"] },
  ],

  /* ---- YOUTUBE --------------------------------------------------------- */
  youtube: [
    { name: "Y Combinator", url: "https://www.youtube.com/@ycombinator", by: "Y Combinator", desc: "Startup School lectures, office hours and how-to-start-a-startup essentials. Free MBA energy.", tags: ["education", "must-watch"] },
    { name: "Starter Story", url: "https://www.youtube.com/@StarterStory", by: "Pat Walls", desc: "Case studies and interviews dissecting how real founders went from $0 to revenue.", tags: ["case-studies", "interviews"] },
    { name: "Greg Isenberg", url: "https://www.youtube.com/@GregIsenberg", by: "Greg Isenberg", desc: "Community-led growth, internet business ideas and 'here's a startup you could build' breakdowns.", tags: ["ideas", "community"] },
    { name: "Marc Lou", url: "https://www.youtube.com/@marclou", by: "Marc Lou", desc: "Solo-founder shipping fast: building profitable micro-SaaS, indie marketing and ship-it culture.", tags: ["indie", "build-in-public"] },
    { name: "Simon Høiberg", url: "https://www.youtube.com/@SimonHoiberg", by: "Simon Høiberg", desc: "Building a SaaS as a solo dev, in public — code, marketing and the founder mindset.", tags: ["saas", "indie"] },
    { name: "Noah Kagan", url: "https://www.youtube.com/@noahkagan", by: "Noah Kagan (AppSumo)", desc: "Scrappy marketing experiments, validating ideas in a weekend and getting first sales fast.", tags: ["marketing", "validation"] },
    { name: "Ali Abdaal", url: "https://www.youtube.com/@aliabdaal", by: "Ali Abdaal", desc: "Productivity, the creator economy and building an audience-driven business. Great for solopreneurs.", tags: ["productivity", "audience"] },
    { name: "The Futur", url: "https://www.youtube.com/@thefutur", by: "Chris Do", desc: "Positioning, pricing and selling for creative founders. Worth it for the sales psychology alone.", tags: ["sales", "positioning"] },
    { name: "Fireship", url: "https://www.youtube.com/@Fireship", by: "Jeff Delaney", desc: "100-second tech explainers and ship-it tutorials. Keep your technical stack-radar current.", tags: ["dev", "tech"] },
    { name: "Alex Hormozi", url: "https://www.youtube.com/@AlexHormozi", by: "Alex Hormozi", desc: "Blunt, high-density advice on crafting offers, sales and getting customers, from someone who's scaled several companies.", tags: ["sales", "offers"] },
    { name: "Dan Martell", url: "https://www.youtube.com/@DanMartell", by: "Dan Martell", desc: "SaaS growth and founder productivity — systems, hiring and buying back your time as you scale past yourself.", tags: ["saas", "productivity"] },
    { name: "Theo – t3.gg", url: "https://www.youtube.com/@t3dotgg", by: "Theo Browne", desc: "Opinionated, current takes on the modern web stack for technical founders who want to ship SaaS fast.", tags: ["dev", "saas"] },
    { name: "Smart Passive Income", url: "https://www.youtube.com/@smartpassiveincome", by: "Pat Flynn", desc: "Audience-building, email and online-business tactics from one of the most transparent creators around.", tags: ["audience", "marketing"] },
  ],

  /* ---- BOOKS ----------------------------------------------------------- */
  books: [
    { name: "The Mom Test", url: "https://www.momtestbook.com/", by: "Rob Fitzpatrick", desc: "How to talk to customers so they tell you the truth instead of polite lies. The single most useful book on validation.", tags: ["validation", "customers", "must-read"] },
    { name: "The Lean Startup", url: "https://theleanstartup.com/", by: "Eric Ries", desc: "Build-measure-learn, MVPs and validated learning. The vocabulary the whole startup world now speaks.", tags: ["validation", "process", "must-read"] },
    { name: "Traction", url: "https://www.amazon.com/dp/1591848369", by: "Gabriel Weinberg & Justin Mares", desc: "The 19 channels you can use to get customers, and the 'Bullseye' framework to find the one that works for you.", tags: ["growth", "marketing", "must-read"] },
    { name: "Zero to Sold", url: "https://zerotosold.com/", by: "Arvid Kahl", desc: "A complete, practical playbook for building a bootstrapped business from idea through to a profitable exit.", tags: ["bootstrapping", "saas"] },
    { name: "The Embedded Entrepreneur", url: "https://embeddedentrepreneur.com/", by: "Arvid Kahl", desc: "Find an audience first, then build what they need. The 'audience-driven' inversion of the usual order.", tags: ["audience", "validation"] },
    { name: "MAKE", url: "https://readmake.com/", by: "Pieter Levels", desc: "The bootstrapper's handbook from the maker of Nomad List & RemoteOK. Build, launch, grow, automate — solo.", tags: ["indie", "solo", "build-in-public"] },
    { name: "Start Small, Stay Small", url: "https://stairwaytosaas.com/", by: "Rob Walling", desc: "The foundational guide to launching a self-funded software product as a developer. A bit dated, still gold.", tags: ["saas", "bootstrapping"] },
    { name: "Zero to One", url: "https://zerotoonebook.com/", by: "Peter Thiel & Blake Masters", desc: "Contrarian thinking on building something genuinely new, monopolies and what makes a defensible business.", tags: ["strategy", "thinking"] },
    { name: "Obviously Awesome", url: "https://www.aprildunford.com/obviously-awesome", by: "April Dunford", desc: "Positioning, demystified. How to make customers instantly 'get' what your product is and why it matters.", tags: ["positioning", "marketing"] },
    { name: "Hooked", url: "https://www.nirandfar.com/hooked/", by: "Nir Eyal", desc: "The trigger–action–reward–investment loop behind habit-forming products. Use it ethically.", tags: ["product", "retention"] },
    { name: "The Minimalist Entrepreneur", url: "https://www.minimalistentrepreneur.com/", by: "Sahil Lavingia", desc: "From the Gumroad founder: build a profitable company small, community-first and on your own terms.", tags: ["bootstrapping", "indie"] },
    { name: "Company of One", url: "https://ofone.co/", by: "Paul Jarvis", desc: "A case for staying small on purpose — questioning growth as the default goal of business.", tags: ["solo", "philosophy"] },
    { name: "The $100 Startup", url: "https://100startup.com/", by: "Chris Guillebeau", desc: "Dozens of micro-business case studies proving you can start with almost nothing and a useful skill.", tags: ["inspiration", "case-studies"] },
    { name: "The Personal MBA", url: "https://personalmba.com/", by: "Josh Kaufman", desc: "A crash course in the core mental models of business — value creation, marketing, sales, finance, systems.", tags: ["fundamentals", "thinking"] },
    { name: "This Is Marketing", url: "https://seths.blog/tim/", by: "Seth Godin", desc: "Marketing as service: find your smallest viable audience and earn permission rather than interrupt.", tags: ["marketing", "philosophy"] },
    { name: "Founders at Work", url: "https://www.amazon.com/dp/1430210788", by: "Jessica Livingston", desc: "Interviews with founders about the chaotic, uncertain early days. Reassuring proof everyone wings it.", tags: ["stories", "inspiration"] },
    { name: "Rework", url: "https://basecamp.com/books/rework", by: "Jason Fried & David Heinemeier Hansson", desc: "The bootstrapper's manifesto from 37signals: stay small, skip the funding, ignore the 'real world' and just ship.", tags: ["bootstrapping", "philosophy", "must-read"] },
    { name: "The SaaS Playbook", url: "https://saasplaybook.com/", by: "Rob Walling", desc: "A modern, no-fluff operating manual for building a bootstrapped SaaS — the distilled lessons of MicroConf and TinySeed.", tags: ["saas", "bootstrapping"] },
    { name: "Deploy Empathy", url: "https://deployempathy.com/", by: "Michele Hansen", desc: "A practical guide to customer interviews: how to ask, listen and uncover what people really need. Pairs with The Mom Test.", tags: ["validation", "customers"] },
    { name: "$100M Offers", url: "https://www.acquisition.com/books", by: "Alex Hormozi", desc: "How to make an offer so good people feel stupid saying no. The most actionable book on pricing and packaging in years.", tags: ["offers", "pricing", "sales"] },
    { name: "Anything You Want", url: "https://sive.rs/book/AnythingYouWant", by: "Derek Sivers", desc: "Forty short lessons from building and selling CD Baby. A two-hour read packed with contrarian, bootstrapper-friendly wisdom.", tags: ["philosophy", "bootstrapping"] },
    { name: "Million Dollar Weekend", url: "https://milliondollarweekend.com/", by: "Noah Kagan", desc: "A bias-to-action playbook: overcome the fear of asking, validate fast and get to your first dollar this weekend.", tags: ["validation", "action"] },
    { name: "Influence", url: "https://www.influenceatwork.com/", by: "Robert Cialdini", desc: "The six principles of persuasion every marketer eventually rediscovers. Read the source instead of the blog posts.", tags: ["marketing", "psychology"] },
    { name: "Don't Make Me Think", url: "https://sensible.com/dont-make-me-think/", by: "Steve Krug", desc: "The classic on web usability. Short, funny, and the fastest way to stop your signup flow from leaking users.", tags: ["product", "ux"] },
  ],

  /* ---- NEWSLETTERS & BLOGS -------------------------------------------- */
  reading: [
    { name: "Paul Graham's Essays", url: "http://www.paulgraham.com/articles.html", by: "Paul Graham", desc: "The foundational essays on startups, ideas and doing things that don't scale. Read 'How to Get Startup Ideas' first.", tags: ["essays", "must-read", "free"] },
    { name: "Lenny's Newsletter", url: "https://www.lennysnewsletter.com/", by: "Lenny Rachitsky", desc: "The most-read product & growth newsletter. Deeply practical playbooks, many free.", tags: ["product", "growth"] },
    { name: "The Bootstrapped Founder", url: "https://thebootstrappedfounder.com/newsletter/", by: "Arvid Kahl", desc: "Weekly essays on audience-building, indie business and the founder's mindset.", tags: ["bootstrapping", "audience"] },
    { name: "Trends.vc", url: "https://trends.vc/", by: "Dru Riley", desc: "Concise, structured reports on emerging business opportunities and how to act on them.", tags: ["ideas", "trends", "research"] },
    { name: "Marketing Examples", url: "https://marketingexamples.com/", by: "Harry Dry", desc: "Short, screenshot-driven case studies of marketing and copywriting done right. Bookmark-worthy.", tags: ["marketing", "copywriting", "free"] },
    { name: "Demand Curve", url: "https://www.demandcurve.com/", by: "Demand Curve", desc: "Growth playbooks and the Growth Guide — a free, no-fluff manual for acquiring customers.", tags: ["growth", "marketing", "free"] },
    { name: "Stratechery", url: "https://stratechery.com/", by: "Ben Thompson", desc: "The sharpest analysis of tech strategy and business models on the internet. Free Mondays, paid daily.", tags: ["strategy", "analysis"] },
    { name: "SaaStr", url: "https://www.saastr.com/blog/", by: "Jason Lemkin", desc: "A vast archive on building and scaling SaaS — metrics, hiring, sales, pricing. Skews later-stage.", tags: ["saas", "scaling"] },
    { name: "Kalzumeus / Patrick McKenzie", url: "https://www.kalzumeus.com/archive/", by: "Patrick McKenzie (patio11)", desc: "Legendary essays on charging more, SEO, A/B testing and the business of software for engineers.", tags: ["saas", "pricing", "free"] },
    { name: "Julian Shapiro's Handbooks", url: "https://www.julian.com/", by: "Julian Shapiro", desc: "Free, beautifully written guides to growth marketing, writing and startups. Start with the Growth guide.", tags: ["growth", "writing", "free"] },
    { name: "First Round Review", url: "https://review.firstround.com/", by: "First Round Capital", desc: "In-depth, tactical articles from operators on company-building. High signal, no ads.", tags: ["operations", "tactics", "free"] },
    { name: "Indie Hackers", url: "https://www.indiehackers.com/", by: "Courtland Allen", desc: "Part forum, part directory of revenue numbers and interviews from real bootstrapped products.", tags: ["bootstrapping", "community", "free"] },
    { name: "The Saturday Solopreneur", url: "https://www.justinwelsh.me/", by: "Justin Welsh", desc: "Tactical, one-idea emails on building a one-person business and an audience. He's built two $1M+ solo brands in public.", tags: ["solo", "audience", "free"] },
    { name: "Growth.Design", url: "https://growth.design/", by: "Growth.Design", desc: "Product and UX case studies told as illustrated comics — the psychology behind why great products convert and retain.", tags: ["product", "ux", "free"] },
    { name: "Andrew Chen", url: "https://andrewchen.com/", by: "Andrew Chen", desc: "A deep, free archive on growth, network effects and the 'cold start problem' of getting a product off the ground.", tags: ["growth", "free"] },
    { name: "The Hustle", url: "https://thehustle.co/", by: "The Hustle", desc: "A snappy daily email on business and tech news — a low-effort way to keep your finger on the market's pulse.", tags: ["news", "trends", "free"] },
  ],

  /* ---- COMMUNITIES ----------------------------------------------------- */
  communities: [
    { name: "Indie Hackers", url: "https://www.indiehackers.com/", by: "Stripe", desc: "The home base for bootstrappers. Milestones, revenue-transparency, groups and a friendly forum.", tags: ["forum", "bootstrapping", "free"] },
    { name: "Hacker News", url: "https://news.ycombinator.com/", by: "Y Combinator", desc: "The tech front page. 'Show HN' is one of the best free launch channels for a technical product.", tags: ["forum", "launch", "free"] },
    { name: "r/SaaS", url: "https://www.reddit.com/r/SaaS/", by: "Reddit", desc: "Active subreddit for SaaS founders sharing wins, asking for feedback and dissecting growth tactics.", tags: ["reddit", "saas", "free"] },
    { name: "r/Entrepreneur", url: "https://www.reddit.com/r/Entrepreneur/", by: "Reddit", desc: "Broad, busy community for any kind of founder. Noisy but a good pulse-check and feedback source.", tags: ["reddit", "free"] },
    { name: "WIP", url: "https://wip.co/", by: "Marc Köhlbrugge", desc: "A maker community built around shipping: post todos, complete them, keep your streak, get accountability.", tags: ["accountability", "build-in-public"] },
    { name: "MegaMaker", url: "https://megamaker.co/", by: "Justin Jackson", desc: "A paid, low-noise community of serious bootstrappers building real products.", tags: ["bootstrapping", "paid"] },
    { name: "MicroConf Connect", url: "https://microconfconnect.com/", by: "Rob Walling / MicroConf", desc: "Slack community for bootstrapped & self-funded SaaS founders, organised by stage and topic.", tags: ["saas", "slack", "bootstrapping"] },
    { name: "Startup School", url: "https://www.startupschool.org/", by: "Y Combinator", desc: "Free online program with curriculum, a founder community and co-founder matching.", tags: ["education", "community", "free"] },
    { name: "Dynamite Circle", url: "https://www.dynamitecircle.com/", by: "Tropical MBA", desc: "Established paid community for location-independent founders running profitable businesses.", tags: ["paid", "lifestyle"] },
    { name: "r/startups", url: "https://www.reddit.com/r/startups/", by: "Reddit", desc: "One of the largest startup communities — feedback threads, 'share your startup' posts and a lot of hard-won advice.", tags: ["reddit", "free"] },
    { name: "r/SideProject", url: "https://www.reddit.com/r/SideProject/", by: "Reddit", desc: "Where makers post what they're building for feedback and early users. Friendly, low-ego, great for a soft launch.", tags: ["reddit", "build-in-public", "free"] },
    { name: "Hampton", url: "https://www.joinhampton.com/", by: "Sam Parr", desc: "A vetted, paid community for founders of more established companies. Private peer groups and candid back-room talk.", tags: ["paid", "founder"] },
  ],

  /* ---- LAUNCH PLATFORMS ----------------------------------------------- */
  launch: [
    { name: "Product Hunt", url: "https://www.producthunt.com/", by: "Product Hunt", desc: "The classic launch day stage. A strong launch drives a spike of early adopters, feedback and backlinks.", tags: ["launch", "must-do"] },
    { name: "Hacker News (Show HN)", url: "https://news.ycombinator.com/showhn.html", by: "Y Combinator", desc: "Post your project for a brutally honest, highly technical audience. Free, high-intent traffic if it resonates.", tags: ["launch", "technical", "free"] },
    { name: "Indie Hackers", url: "https://www.indiehackers.com/", by: "Stripe", desc: "Share your launch and milestones with a supportive community of fellow makers.", tags: ["launch", "community", "free"] },
    { name: "BetaList", url: "https://betalist.com/", by: "Marc Köhlbrugge", desc: "Showcases early-stage startups to a base of early adopters before/around launch.", tags: ["launch", "early-adopters"] },
    { name: "Reddit", url: "https://www.reddit.com/", by: "Reddit", desc: "Find the niche subreddit where your customers already gather. Contribute first, then share. Free and potent.", tags: ["launch", "community", "free"] },
    { name: "Peerlist", url: "https://peerlist.io/", by: "Peerlist", desc: "A professional network for makers with a growing 'Project Spotlight' launch surface.", tags: ["launch", "community"] },
    { name: "Microlaunch", url: "https://microlaunch.net/", by: "Microlaunch", desc: "A calmer, indie alternative launch platform for makers who want a less cut-throat day.", tags: ["launch", "indie"] },
    { name: "AppSumo", url: "https://appsumo.com/", by: "AppSumo", desc: "Lifetime-deal marketplace. Can drive a big slug of cash and users — at a steep discount. Read the fine print.", tags: ["launch", "deals", "revenue"] },
    { name: "X / Twitter", url: "https://x.com/", by: "X", desc: "Build-in-public on X to warm up an audience before launch, then post your launch thread to them.", tags: ["launch", "audience", "free"] },
    { name: "LinkedIn", url: "https://www.linkedin.com/", by: "LinkedIn", desc: "Underrated for B2B: build in public to a professional audience, then launch to the buyers and operators who'll actually pay.", tags: ["launch", "b2b", "audience"] },
    { name: "Uneed", url: "https://www.uneed.best/", by: "Uneed", desc: "A popular Product Hunt alternative with daily and weekly leaderboards and a friendlier, less cut-throat vibe.", tags: ["launch", "indie"] },
    { name: "Dev Hunt", url: "https://devhunt.org/", by: "DevHunt", desc: "A launch board specifically for developer tools — the right room if you're shipping something technical.", tags: ["launch", "technical", "free"] },
    { name: "Fazier", url: "https://fazier.com/", by: "Fazier", desc: "A newer launch platform for makers, with badges and an embeddable widget to collect upvotes from your own site.", tags: ["launch", "indie"] },
  ],

  /* ---- GUIDES (the wiki bit) ------------------------------------------ */
  /* body is HTML. Keep it skimmable: headings, short paras, lists.        */
  guides: [
    {
      slug: "validate-idea",
      title: "Validate before you build",

      summary: "How to find out if anyone wants this before you spend three months building it.",
      tags: ["validation", "customers"],
      body: `
        <p>The most expensive mistake in bootstrapping is building something nobody wants. Validation is the cheap way to find out before you spend three months coding. You don't need a product to validate. You need conversations and a signal that someone will actually pay.</p>

        <h3>1. Talk to people the right way</h3>
        <p>Read <a href="https://www.momtestbook.com/" target="_blank" rel="noopener">The Mom Test</a> by Rob Fitzpatrick. The core idea: ask about their <em>past behaviour and real problems</em>, never about your idea. People lie to be nice when you pitch them. They tell the truth when you ask about their life.</p>
        <ul>
          <li><strong>Good:</strong> "Walk me through the last time you dealt with this."</li>
          <li><strong>Good:</strong> "What have you already tried, and what did it cost you?"</li>
          <li><strong>Weak:</strong> "Would you use a tool that does this?" Everyone says yes, so the answer tells you nothing.</li>
        </ul>

        <h3>2. Look for signals of real pain</h3>
        <p>You are hunting for problems people already spend time or money trying to solve. Hacky spreadsheets, manual workarounds, an existing tool they openly hate. Those are the gold. "That would be nice" is not.</p>

        <h3>3. Get a commitment, not a compliment</h3>
        <p>Compliments are noise. Fitzpatrick's test for real interest is whether someone gives up something scarce: money (a pre-order or a deposit), reputation (an intro to their boss), or time (a recurring call on the calendar). A landing page with a real "buy" or "join the waitlist" button measures intent far better than any survey.</p>

        <h3>4. Build the smallest possible test</h3>
        <p>A one-page <a href="https://carrd.co/" target="_blank" rel="noopener">Carrd</a> site, a Stripe payment link, or a concierge service you run by hand behind the scenes. Charge real money as early as you can, because paid pilots teach you more than free trials ever will. Pieter Levels ran <a href="https://levels.io/nomad-list-founder/" target="_blank" rel="noopener">Nomad List</a> as a public, crowdsourced Google spreadsheet before it was ever software, and let demand decide whether the real thing was worth building.</p>

        <blockquote>Rule of thumb: if you can't get five people to say "tell me the moment it's ready" and mean it, you don't have validation yet. You have an idea you happen to like.</blockquote>
      `,
    },
    {
      slug: "first-customers",
      title: "Getting your first 10 customers",

      summary: "The unscalable, manual hustle that gets you from zero to your first paying users.",
      tags: ["customers", "traction"],
      body: `
        <p>Your first customers won't come from ads or SEO. They come from you, doing things that don't scale. The goal isn't growth yet. It's proof, plus the lessons you only get from real users paying you. This is the whole point of Paul Graham's essay <a href="https://paulgraham.com/ds.html" target="_blank" rel="noopener">Do Things that Don't Scale</a>, and it is the phase most technical founders try to skip.</p>

        <h3>Go to where they already are</h3>
        <p>Don't build an audience from scratch on day one. Find the watering holes where your future customers already gather and complain about the problem: subreddits, Slack and Discord groups, forums, niche communities. Be genuinely helpful there for weeks before you mention your product. The early Airbnb team went door to door in New York to sign up hosts and improve their listings by hand. That is the energy you want.</p>

        <h3>Do things that don't scale</h3>
        <ul>
          <li><strong>Hand-recruit users one at a time.</strong> DMs, emails, in person. Ten great conversations beat ten thousand impressions.</li>
          <li><strong>Onboard each customer personally.</strong> Get on a call and set it up for them. When someone agreed to try Stripe, the Collison brothers would ask for their laptop and install it on the spot. Watch where people get stuck.</li>
          <li><strong>Over-deliver for a tiny number of people.</strong> Word of mouth starts with a handful of users who can't believe how good the experience was.</li>
        </ul>

        <h3>Mine your network honestly</h3>
        <p>Skip "buy my thing." Try "I'm building something for people who struggle with X. Do you know anyone like that I could talk to?" A referral to the right person is worth more than a sale to the wrong one.</p>

        <h3>Charge from customer #1</h3>
        <p>Free users give polite, useless feedback. Paying users tell you what is actually broken and what they would pay more for. Even a small price filters for people who genuinely feel the problem. When 37signals built Basecamp they charged from launch and <a href="https://medium.com/@jasonfried/basecamp-the-origin-story-f509fdd725f8" target="_blank" rel="noopener">covered their first-year revenue target within about six weeks</a>.</p>

        <p>See also <a href="/guide/traction-channels/">the Bullseye traction framework</a> for what to do once these manual tactics start working.</p>
      `,
    },
    {
      slug: "traction-channels",
      title: "The Bullseye traction framework",

      summary: "There are ~19 ways to get customers. Most founders only seriously try one. Here's how to find yours.",
      tags: ["traction", "growth", "marketing"],
      body: `
        <p>From the book <a href="https://www.amazon.com/dp/1591848369" target="_blank" rel="noopener">Traction</a> by Gabriel Weinberg (founder of DuckDuckGo) and Justin Mares. The premise: there are nineteen distinct channels you can use to acquire customers, and the one that works for you is rarely the one you would guess. Most startups fail not because the product is bad, but because they never found a channel that reliably brings customers.</p>

        <h3>The 19 channels</h3>
        <p>Viral marketing · PR · Unconventional PR (stunts) · Search engine marketing (ads) · Social and display ads · Offline ads · SEO · Content marketing · Email marketing · Engineering as marketing (free tools) · Targeting blogs · Business development · Sales · Affiliate programs · Existing platforms (app stores, marketplaces) · Trade shows · Offline events · Speaking engagements · Community building.</p>

        <h3>The Bullseye method</h3>
        <p>Picture three concentric rings and work your way inward.</p>
        <ol>
          <li><strong>Brainstorm.</strong> For every one of the 19 channels, write down one plausible way you could use it. No dismissing anything yet.</li>
          <li><strong>Rank</strong> into three rings: <em>promising</em> (worth a cheap test now), <em>possible</em> (maybe later), and <em>long-shot</em> (probably not).</li>
          <li><strong>Test.</strong> Run cheap, fast experiments on your two or three promising channels at once. Each test answers two questions: roughly what does a customer cost here, and how many customers can this channel reach?</li>
          <li><strong>Focus.</strong> Once one channel is clearly working, pour your effort into it and ignore the rest until it stops scaling.</li>
        </ol>

        <h3>Why this matters for bootstrappers</h3>
        <p>You have limited time and money, so spreading thin across ten channels guarantees mediocre results on all of them. The discipline is to test broadly but cheaply, then commit narrowly. At any given stage, one channel tends to dominate your growth. Find it, then work it until the returns flatten.</p>

        <blockquote>Weinberg's <a href="https://www.founderstribune.org/p/the-50-percent-rule-by-gabriel-weinberg" target="_blank" rel="noopener">50 Percent Rule</a>: spend half your time on product and half on traction, from the very beginning. Building something is not the same as getting people to use it.</blockquote>
      `,
    },
    {
      slug: "pricing",
      title: "Pricing without flinching",

      summary: "You're almost certainly charging too little. How to price for a sustainable bootstrapped business.",
      tags: ["pricing", "saas", "revenue"],
      body: `
        <p>Pricing is the single highest-leverage number in your business, and the one founders agonise over most and optimise least. A reliable default: pick a price that scares you slightly, then nudge it higher.</p>

        <h3>Charge more than feels comfortable</h3>
        <p>Patrick McKenzie's <a href="https://www.kalzumeus.com/2006/08/14/you-can-probably-stand-to-charge-more/" target="_blank" rel="noopener">You Can Probably Stand To Charge More</a> is the essay every bootstrapper should read first. Low prices attract the neediest, most price-sensitive, highest-support customers. Higher prices attract serious users and fund the business that lets you support them properly. Just don't treat "charge more" as a law of physics. As Justin Jackson <a href="https://justinjackson.ca/charge-more" target="_blank" rel="noopener">argues</a>, the right number depends on your market, your stage and who you are selling to.</p>

        <h3>Price on value, not effort</h3>
        <p>Don't price from "it only took me a weekend to build." For software the cost of one more sale rounds to zero, so cost-plus pricing just leaves money on the table. Price from what the problem costs the customer instead. If you save a business five hours a month, that is worth hundreds, not the $5 you nervously want to charge.</p>

        <h3>Practical moves</h3>
        <ul>
          <li><strong>Three tiers.</strong> A cheap anchor, a "most popular" middle where you actually want people, and a premium tier that makes the middle look reasonable.</li>
          <li><strong>Annual plans.</strong> Offering roughly two months free for paying yearly is the common convention. It improves cash flow and retention.</li>
          <li><strong>Talk to customers about price.</strong> Ask churned users whether price was really the reason (it usually isn't). Ask happy ones what they expected to pay.</li>
          <li><strong>Raise prices over time.</strong> Grandfather existing customers and charge new ones more. Nobody ever regretted a product becoming more profitable.</li>
        </ul>

        <h3>B2B usually beats B2C</h3>
        <p>Selling to businesses generally lets you charge far more for the same effort, because the buyer has a budget and an ROI calculation rather than a personal wallet. If you can honestly frame your product as making or saving a company money, prefer it as a bootstrapper.</p>
      `,
    },
    {
      slug: "build-in-public",
      title: "Building in public",

      summary: "Turn your build journey into your first marketing channel and audience.",
      tags: ["audience", "marketing", "build-in-public"],
      body: `
        <p>Building in public means sharing the journey as you go: progress, revenue, decisions and failures, usually on X, LinkedIn or a newsletter. Done well, it builds an audience that becomes your launch list, your feedback loop and your support network long before you have a product to sell.</p>

        <h3>Why it works for bootstrappers</h3>
        <ul>
          <li><strong>Distribution before launch.</strong> By the time you ship, you already have people who care.</li>
          <li><strong>Accountability.</strong> Public goals keep you moving on the weeks you would rather not.</li>
          <li><strong>Feedback and ideas.</strong> Your audience tells you what to build and finds your bugs for free.</li>
          <li><strong>Trust.</strong> Transparency, especially about revenue, earns attention and goodwill. Pieter Levels publishes <a href="https://levels.io/projects" target="_blank" rel="noopener">live revenue for every project he runs</a>, and that openness is a big part of why people pay attention.</li>
        </ul>

        <h3>What to actually post</h3>
        <p>Specifics beat platitudes. "Just hit $1,200 MRR, here is the exact email that converted 40 trials" outperforms "grateful for the journey" every time.</p>
        <ul>
          <li>Real numbers and milestones (MRR, users, churn).</li>
          <li>Decisions and the reasoning behind them.</li>
          <li>Things that went wrong and what you learned.</li>
          <li>Useful, standalone tips your audience can apply without buying anything.</li>
        </ul>

        <h3>Sustainable cadence</h3>
        <p>Consistency beats intensity. A few thoughtful posts a week for a year beats a daily burst that burns you out in a month. Arvid Kahl, who <a href="https://thebootstrappedfounder.com/" target="_blank" rel="noopener">built and sold a business largely in public</a>, makes the case for the calm version of this over the hustle version. Pick one platform, get good at it, then expand. Communities like <a href="https://wip.co/" target="_blank" rel="noopener">WIP</a> and <a href="https://www.indiehackers.com/" target="_blank" rel="noopener">Indie Hackers</a> are built for exactly this.</p>
      `,
    },
    {
      slug: "product-hunt-launch",
      title: "Launching on Product Hunt",

      summary: "A practical checklist for getting the most out of launch day.",
      tags: ["launch", "marketing"],
      body: `
        <p>A <a href="https://www.producthunt.com/" target="_blank" rel="noopener">Product Hunt</a> launch won't make your business, but a good one delivers a concentrated burst of early adopters, feedback, backlinks and credibility. Treat it as one well-prepared event, not a magic button. Product Hunt's own <a href="https://www.producthunt.com/launch" target="_blank" rel="noopener">launch guide</a> is the source of truth and worth reading before you pick a date.</p>

        <h3>Before launch day</h3>
        <ul>
          <li><strong>Build relationships early.</strong> Join and be active for weeks beforehand: visit, comment, support other makers. PH suggests joining at least three months ahead. Cold launches fall flat.</li>
          <li><strong>You don't need a hunter.</strong> Self-launching is the norm now. By PH's own numbers, 79% of featured posts and 60% of "#1 Product of the Day" winners were self-hunted. Paying a hunter breaks their guidelines, so skip it.</li>
          <li><strong>Prepare your assets.</strong> A tagline under 60 characters, a clear gallery or GIF showing the product in action, and a first comment from you explaining why you built it. PH reports that 70% of Product of the Day, Week and Month winners included a maker's first comment.</li>
          <li><strong>Line up your supporters.</strong> Tell your email list, communities and network the date, then ask them to visit and comment rather than simply upvote.</li>
        </ul>

        <h3>On the day</h3>
        <ul>
          <li>Launch at <strong>12:01am Pacific</strong> to get a full day on the leaderboard.</li>
          <li>Reply to <em>every</em> comment, quickly. Conversations convert, and engagement keeps you visible.</li>
          <li>Share across your channels, but never explicitly ask people to upvote. PH's one firm rule is that you ask them to visit and comment instead.</li>
          <li>Offer something for visitors: an extended trial or a launch discount.</li>
        </ul>

        <h3>After</h3>
        <p>Add a "#1 Product of the Day" badge to your site if you earn it, follow up with everyone who signed up, and write a transparent recap (good <a href="/guide/build-in-public/">build-in-public</a> material). The traffic spike fades within days. The relationships, backlinks and feedback last much longer.</p>
      `,
    },
    {
      slug: "seo-for-founders",
      title: "SEO that compounds",

      summary: "Why search is the bootstrapper's favourite channel, and how to start.",
      tags: ["seo", "marketing", "content"],
      body: `
        <p>SEO is slow to start but it compounds: each good page keeps bringing free, high-intent traffic for years. For bootstrappers with more time than money, it is often the best long-term channel, because it rewards patience and consistency rather than budget.</p>

        <h3>Start with intent, not volume</h3>
        <p>Target keywords where the searcher is trying to solve the exact problem you fix, even when the volume looks small. As Ahrefs puts it, a keyword that doesn't match something your site can <a href="https://ahrefs.com/blog/keyword-intent/" target="_blank" rel="noopener">realistically serve and convert</a> doesn't belong in your plan, however attractive the traffic number. "Best X for Y" and "how to do Z" pages convert far better than vague head terms you will never outrank anyway.</p>

        <h3>Three kinds of pages that work</h3>
        <ul>
          <li><strong>Problem and solution content:</strong> genuinely useful how-to articles for the jobs your customers are trying to get done.</li>
          <li><strong>Comparison and alternative pages:</strong> "[Competitor] alternatives" and "X vs Y". These searchers are already in motion and ready to switch.</li>
          <li><strong>Free tools (engineering as marketing):</strong> a small free calculator or generator that ranks on its own and funnels users to your paid product. One of the most underrated tactics for technical founders, since you can build what others can only write about.</li>
        </ul>

        <h3>The fundamentals that still matter</h3>
        <ul>
          <li>One clear topic per page, with the keyword in the title and the URL.</li>
          <li>Content that is genuinely better than what currently ranks: more depth, clarity and real examples.</li>
          <li>Fast, mobile-friendly pages, plus the technical basics of a sitemap, clean URLs and sensible internal links.</li>
          <li>A few quality backlinks beat a hundred spammy ones. Earn them by being worth linking to.</li>
        </ul>

        <p>Use <a href="https://ahrefs.com/" target="_blank" rel="noopener">Ahrefs</a> and its free tools to find keywords and see what competitors rank for. Then publish consistently. Ahrefs' own data puts <a href="https://ahrefs.com/blog/how-long-does-seo-take/" target="_blank" rel="noopener">first results at roughly three to six months</a>, with the real compounding gains arriving over the following year. This is a channel you start long before you need it.</p>
      `,
    },
    {
      slug: "cold-outreach",
      title: "Cold outreach that isn't spam",

      summary: "How to email strangers and actually get replies, for B2B and partnerships.",
      tags: ["sales", "customers", "b2b"],
      body: `
        <p>Cold outreach has a bad reputation because most of it is lazy and self-serving. Done with research and genuine relevance, a short cold email is still one of the most direct ways to land your first B2B customers and partners.</p>

        <h3>The anatomy of a reply-worthy cold email</h3>
        <ul>
          <li><strong>Relevant trigger:</strong> open with something specific to <em>them</em> that proves you didn't blast 500 people. ("Saw you just launched X.")</li>
          <li><strong>One clear problem:</strong> name a pain they plausibly have, briefly.</li>
          <li><strong>Soft, tiny ask:</strong> not "buy my product" but "worth a ten-minute call?" or "mind if I send a 90-second video?"</li>
          <li><strong>Short.</strong> Three to five sentences. If it needs scrolling, it is too long.</li>
        </ul>

        <h3>Principles</h3>
        <ul>
          <li><strong>Give before you ask.</strong> Lead with a useful insight, a quick audit, or an introduction. Value first.</li>
          <li><strong>Personalise the first line, templatise the rest.</strong> That scales without reading like spam.</li>
          <li><strong>Follow up two or three times.</strong> A single follow-up can lift total replies by around 66%, and roughly 42% of replies come from follow-up steps rather than the first email, per <a href="https://woodpecker.co/blog/cold-email-statistics/" target="_blank" rel="noopener">Woodpecker's analysis of millions of cold emails</a>. Be polite, add something each time, then stop.</li>
          <li><strong>Stay legal and respectful.</strong> Honour every opt-out, never buy sketchy lists, and know the rules where your recipients live.</li>
        </ul>

        <h3>Know the rules before you hit send</h3>
        <p>In the US, the <a href="https://www.ftc.gov/business-guidance/resources/can-spam-act-compliance-guide-business" target="_blank" rel="noopener">CAN-SPAM Act</a> makes no exception for B2B email: no misleading headers or subject lines, a valid physical postal address, and a working opt-out that you honour promptly. In the EU and UK, lawful cold email usually relies on the <a href="https://gdpr-info.eu/art-6-gdpr/" target="_blank" rel="noopener">legitimate interest basis under GDPR</a>, and local ePrivacy rules vary by country, so "compliant" is not one single global standard.</p>

        <blockquote>The mindset shift: you are not interrupting someone to take something. You are offering a specific person a specific solution to a specific problem. If that is not true, don't send the email.</blockquote>
      `,
    },
    {
      slug: "find-an-idea",
      title: "Finding an idea worth building",

      summary: "Where good startup ideas actually come from, and how to tell a real one from a shiny one.",
      tags: ["ideas", "validation"],
      body: `
        <p>Most founders start from the wrong end. They fall in love with a solution and then hunt for a problem to attach it to. Better ideas come from the opposite direction: notice a problem worth solving first, then build the smallest thing that solves it. As Paul Graham writes in <a href="https://paulgraham.com/startupideas.html" target="_blank" rel="noopener">How to Get Startup Ideas</a>, the trick is not to think up startup ideas but to look for problems, ideally ones you have yourself.</p>

        <h3>Notice, don't brainstorm</h3>
        <p>The best ideas rarely arrive in a brainstorm. They show up as friction in your own life and work: the thing you built a spreadsheet to cope with, the task you dread, the tool you keep wishing existed. Graham's warning is to avoid made-up, "sitcom" startup ideas and to trust the organic ones instead. Keep a running note of your real annoyances for a month and the patterns start to show.</p>

        <h3>Scratch your own itch</h3>
        <p>Building for yourself is an unfair advantage. You <em>are</em> the customer, so you already understand the problem, the jargon and where the existing tools fall short. 37signals built <a href="https://medium.com/@jasonfried/basecamp-the-origin-story-f509fdd725f8" target="_blank" rel="noopener">Basecamp</a> to manage their own client projects, and Pieter Levels' Nomad List grew out of a spreadsheet he kept for his own travels. Neither began as a grand plan.</p>

        <h3>Sell pickaxes</h3>
        <p>Look for places where money already moves. People and businesses happily pay to make money, save money, save time or reduce risk. The cliché has real roots: in the California gold rush, <a href="https://en.wikipedia.org/wiki/Samuel_Brannan" target="_blank" rel="noopener">Samuel Brannan</a> got rich selling shovels and pans to prospectors rather than digging himself. An idea that sits next to an existing budget is far easier to monetise than one that asks people to form a brand-new habit.</p>

        <h3>Filters for a real idea</h3>
        <ul>
          <li><strong>Is the pain frequent and urgent?</strong> Vitamins are nice. Painkillers get bought.</li>
          <li><strong>Can you reach the buyers?</strong> A great idea for an audience you can't access is somebody else's idea.</li>
          <li><strong>Will they pay?</strong> "That's cool" is not a business. Someone reaching for their card is.</li>
          <li><strong>Can a tiny team ship a v1?</strong> If it needs ten engineers and a year, it is not a bootstrap.</li>
        </ul>

        <blockquote>You don't need a brilliant, original idea. You need a real problem, a reachable audience and a willingness to start small. Originality is overrated. Traction is not.</blockquote>

        <p>Got a candidate? Don't build it yet. <a href="/guide/validate-idea/">Validate it first</a>. For a steady stream of structured opportunities, <a href="https://trends.vc/" target="_blank" rel="noopener">Trends.vc</a> is a good prompt.</p>
      `,
    },
    {
      slug: "metrics-that-matter",
      title: "The numbers that actually matter",

      summary: "MRR, churn, LTV, CAC and runway: the small set of metrics a bootstrapper should watch, in plain English.",
      tags: ["metrics", "saas", "revenue"],
      body: `
        <p>Bootstrappers don't have a finance team, so you have to be your own. The good news is that a handful of numbers tell you almost everything about the health of a small software business. Ignore the vanity metrics and watch these.</p>

        <h3>MRR: monthly recurring revenue</h3>
        <p>The heartbeat of a subscription business. Track it monthly and split it into new, expansion (upgrades), contraction (downgrades) and churned revenue, so you can see <em>where</em> growth comes from rather than just that it happened. ChartMogul has a clear breakdown of <a href="https://chartmogul.com/blog/understanding-mrr-movements/" target="_blank" rel="noopener">these MRR movements</a> if you want the precise definitions.</p>

        <h3>Churn: the silent killer</h3>
        <p>The percentage of customers, or revenue, you lose each month. The maths is unforgiving: 5% monthly churn means you lose roughly 46% of your base over a year, so you are running hard just to stand still. Small differences compound, which is why lowering churn is often higher-leverage than chasing new sign-ups. See <a href="/guide/retention/">retention beats acquisition</a>.</p>

        <h3>LTV and CAC</h3>
        <ul>
          <li><strong>CAC</strong> (customer acquisition cost): everything you spent to win a customer, divided by customers won.</li>
          <li><strong>LTV</strong> (lifetime value): the total profit you expect from a customer before they churn.</li>
          <li><strong>The ratio.</strong> The familiar rule of thumb is LTV of at least three times CAC. Treat it as a guide, not a law. The people who popularised it now caution that it <a href="https://www.forentrepreneurs.com/ltv-cac/" target="_blank" rel="noopener">only means much once you have a repeatable way to grow</a>. The bigger point still holds: if a customer costs more to win than they are worth, growth makes you poorer.</li>
        </ul>

        <h3>Runway and "default alive"</h3>
        <p>Runway is how many months you can keep going at your current burn. Paul Graham's question is the one that matters: are you <a href="https://paulgraham.com/aord.html" target="_blank" rel="noopener">default alive</a>, on track to reach profitability before the money runs out, or default dead? A bootstrapper's job is to get to default alive as fast as possible.</p>

        <blockquote>Pick three numbers, for most SaaS that is MRR, churn and runway, and put them somewhere you see them weekly. What you measure, you manage.</blockquote>

        <p>Healthy metrics usually start with <a href="/guide/pricing/">pricing well</a> and keeping the customers you already have.</p>
      `,
    },
    {
      slug: "positioning",
      title: "Positioning: make them get it in 5 seconds",

      summary: "If people can't tell what you do and who it's for, nothing else in your funnel works.",
      tags: ["positioning", "marketing"],
      body: `
        <p>Positioning answers the question every visitor asks in the first five seconds: what is this, who is it for, and why should I care? Get it wrong and the best product in the world leaks visitors. Get it right and your ads, SEO and sales all start working better at once.</p>

        <h3>Positioning is context, not features</h3>
        <p>The same product can read as boring or magic depending on the frame. April Dunford's core idea in <a href="https://www.aprildunford.com/books" target="_blank" rel="noopener">Obviously Awesome</a> is to position against the right <em>competitive alternative</em>, the thing a customer would use if you didn't exist, so your best features become obviously valuable instead of a guessing game. Her <a href="https://www.aprildunford.com/post/a-quickstart-guide-to-positioning" target="_blank" rel="noopener">quickstart guide</a> is the fastest way in.</p>

        <h3>Niche down until it's uncomfortable</h3>
        <p>"Project management for everyone" competes with giants and resonates with no one. "Project management for video agencies" can win a market you can actually reach. As a bootstrapper, a sharp niche is your single biggest unfair advantage, because it makes your marketing write itself.</p>

        <h3>Say it like a human</h3>
        <ul>
          <li>Lead with the outcome, not the mechanism. ("Get paid on time," not "automated invoicing workflows.")</li>
          <li>Use the words your customers use. Lift them straight from interviews and reviews.</li>
          <li>Make the headline pass the "so what?" test. If a competitor could claim the same line, it is too generic.</li>
        </ul>

        <blockquote>Test it cheaply: show your homepage to someone in your target market for five seconds, hide it, then ask what you do and who it is for. If they can't tell you, the problem is your positioning, not your product.</blockquote>

        <p>Clear positioning makes <a href="/guide/cold-outreach/">cold outreach</a> and <a href="/guide/seo-for-founders/">SEO</a> far easier, because you finally know exactly who you are talking to.</p>
      `,
    },
    {
      slug: "retention",
      title: "Retention beats acquisition",

      summary: "A leaky bucket can't be filled. Why keeping customers is the cheapest growth you'll ever get.",
      tags: ["retention", "saas", "growth"],
      body: `
        <p>Acquisition gets all the attention, but retention is where bootstrapped businesses are won or lost. A product people keep using compounds; a leaky bucket means you run faster every month just to stay in the same place.</p>

        <h3>Why it is the cheapest growth</h3>
        <p>Keeping a customer costs a fraction of winning a new one. <a href="https://hbr.org/2014/10/the-value-of-keeping-the-right-customers" target="_blank" rel="noopener">Harvard Business Review</a> puts acquisition at five to 25 times more expensive than retention, and cites Bain research that lifting retention by 5% can raise profits by anywhere from 25% to 95%. Retained customers are also the ones who upgrade, refer friends and forgive your rough edges. Better retention lifts LTV, which raises what you can afford to spend on the next customer, so it quietly improves every other number. See <a href="/guide/metrics-that-matter/">the numbers that matter</a>.</p>

        <h3>Get them to value, fast</h3>
        <p>Most churn happens early, before the customer ever felt the product work. Define your "aha" moment, the first time someone gets real value, and ruthlessly shorten the path to it. Facebook's famous version was getting a new user to seven friends in their first ten days, though as Mixpanel cautions, such <a href="https://mixpanel.com/blog/magic-numbers-are-an-illusion/" target="_blank" rel="noopener">magic numbers are a rough marker rather than a literal threshold</a>. Onboarding is not a tour of your features. It is getting one job done.</p>

        <h3>Find the leaks</h3>
        <ul>
          <li><strong>Talk to churned users.</strong> A short "what made you cancel?" email is the cheapest research you will ever do.</li>
          <li><strong>Watch where people stall.</strong> Session replay and simple funnels show where the value is not landing.</li>
          <li><strong>Reduce reasons to leave.</strong> Habit-forming products tie into a regular trigger. See Nir Eyal's <a href="https://www.nirandfar.com/hooked/" target="_blank" rel="noopener">Hooked</a> for the trigger, action, reward and investment loop.</li>
        </ul>

        <blockquote>Before you pour money into the top of the funnel, plug the holes in the bottom. Fixing churn is usually the highest-ROI work a founder can do, and almost nobody wants to do it.</blockquote>
      `,
    },
    {
      slug: "owned-audience",
      title: "Build an audience you own",

      summary: "Algorithms giveth and taketh away. An email list is the one channel nobody can switch off.",
      tags: ["audience", "email", "marketing"],
      body: `
        <p>Social platforms lend you an audience. They can change the rules or switch off the tap whenever they like. An email list is the one audience you actually own, a direct line to people who asked to hear from you with no algorithm sitting in between.</p>

        <h3>Why email still wins</h3>
        <ul>
          <li><strong>It is owned.</strong> Export the list and it comes with you anywhere.</li>
          <li><strong>It converts.</strong> Inbox attention beats feed attention by a wide margin.</li>
          <li><strong>It is your launch list.</strong> The single best predictor of a good launch day is having people to tell.</li>
        </ul>

        <h3>You need fewer people than you think</h3>
        <p>Kevin Kelly's <a href="https://kk.org/thetechnium/1000-true-fans/" target="_blank" rel="noopener">1,000 True Fans</a> makes the point well: a true fan is someone who will buy whatever you make, and roughly a thousand of them at around $100 a year is a real living. The figure is illustrative rather than a promise, but the shape of it is right. You do not need a million followers. You need a few hundred people who genuinely care.</p>

        <h3>Start collecting before you have anything to sell</h3>
        <p>Put a simple "get notified" form on your landing page from day one, paired with a reason to subscribe: a useful guide, a free tool, a behind-the-scenes build log. Every visitor who leaves without joining is someone you will have to pay to reach again later. Nathan Barry, who founded the email company now called Kit, argues bluntly in <a href="https://nathanbarry.com/authority/" target="_blank" rel="noopener">Authority</a> that you cannot sell much without an audience to sell to.</p>

        <h3>Give people a reason to stay</h3>
        <p>An audience is earned with consistent usefulness, not extracted with constant pitching. Share what you are learning, the specifics behind your wins and losses, things readers can apply even if they never buy. It pairs naturally with <a href="/guide/build-in-public/">building in public</a>: the build log feeds the list, and the list becomes your first customers.</p>

        <blockquote>The best time to start your email list was the day you had the idea. The second best time is today. Even ten subscribers is ten people who know you exist, which puts them ahead of everyone else.</blockquote>
      `,
    },
    {
      slug: "making-the-leap",
      title: "Quitting your job: making the leap",

      summary: "When to go full-time on your bootstrapped business, and how to do it without betting the house.",
      tags: ["mindset", "money"],
      body: `
        <p>The romantic story is quitting your job in a blaze of conviction. The bootstrapper's version is less dramatic and far smarter: de-risk the leap so thoroughly that going full-time becomes the obvious, almost boring next step.</p>

        <h3>Build on the side first</h3>
        <p>Your job is the best startup grant you will ever get. It funds your life with no equity, no interest and no investor calls. Use that safety to validate, launch and find your first paying customers in evenings and weekends, while the downside is still capped. Rob Walling's <a href="https://robwalling.com/essays/2015/03/26/the-stair-step-method-of-bootstrapping" target="_blank" rel="noopener">stair-step method</a> formalises this: start with a small one-off product on a single marketing channel, use it to buy back your time, and only then climb to recurring revenue.</p>

        <h3>Know your number</h3>
        <p>Work out your ramen number: the monthly profit that covers your essential personal costs. Paul Graham popularised <a href="https://paulgraham.com/ramenprofitable.html" target="_blank" rel="noopener">ramen profitability</a> as the point where a business earns just enough to pay the founders' living expenses. It is not full business profitability, but it is the line that buys you time and removes your dependence on anyone else. Track it against your <a href="/guide/metrics-that-matter/">runway and MRR</a>.</p>

        <h3>Pick a trigger, not a feeling</h3>
        <ul>
          <li><strong>Revenue trigger:</strong> for example, MRR covers your ramen number for three consecutive months.</li>
          <li><strong>Savings trigger:</strong> six to twelve months of runway in the bank, so a slow month does not become a panic.</li>
          <li><strong>Time trigger:</strong> the side project is clearly capped by the hours you cannot give it.</li>
        </ul>

        <blockquote>Don't leap on a good week of feelings. Leap on a number you set in advance, when you were thinking clearly. The goal is not to be brave. It is to make the brave thing safe.</blockquote>
      `,
    },
    {
      slug: "ai-leverage",
      title: "Ship faster with AI",

      summary: "How a solo founder can use AI as leverage across building, marketing and support, without shipping slop.",
      tags: ["ai", "productivity", "build-in-public"],
      body: `
        <p>For a solo or tiny team, AI is the closest thing to hiring a junior teammate for every role at once: engineer, marketer, support rep, researcher. Used well, it widens what one person can ship. Used lazily, it floods the internet with forgettable slop. The difference is judgement.</p>

        <h3>Where it actually helps</h3>
        <ul>
          <li><strong>Building:</strong> scaffolding, boilerplate, tests, debugging, and learning an unfamiliar API far faster.</li>
          <li><strong>Marketing:</strong> first drafts, turning one post into ten, keyword and competitor research, ad variations to test.</li>
          <li><strong>Support and ops:</strong> drafting replies, summarising feedback, triaging the inbox, turning docs into an FAQ.</li>
          <li><strong>Thinking:</strong> a tireless sparring partner for pressure-testing positioning, pricing and plans.</li>
        </ul>

        <h3>Keep a human in the loop</h3>
        <p>AI is a force multiplier, not an autopilot. It is confidently wrong often enough that you have to stay the editor. As Simon Willison points out, code hallucinations are the <a href="https://simonwillison.net/2025/Mar/2/hallucinations-in-code/" target="_blank" rel="noopener">least dangerous kind of mistake</a>, because they fail loudly, while the subtle logic errors slip through unless you actually exercise and test the work. Ship nothing you have not checked, and don't let AI talk to customers unsupervised in the early days.</p>

        <h3>Don't ship slop</h3>
        <p>Willison defines <a href="https://simonwillison.net/2024/May/8/slop/" target="_blank" rel="noopener">slop</a> as AI content mindlessly generated and pushed on people who didn't ask for it. The antidote is ownership: put your name on what you publish and stake your credibility on it. AI that helps you think is leverage. AI output you forward unread is the failure mode.</p>

        <h3>Don't automate the unscalable too early</h3>
        <p>The manual, unscalable work that wins your <a href="/guide/first-customers/">first customers</a>, the personal onboarding calls and the hand-written emails, is exactly where you learn what to build. Automate it once you understand it, not before.</p>

        <blockquote>Use AI to clear the grunt work so you can spend more time on the two things it cannot do for you: talking to customers and deciding what to build. Leverage is the goal. Slop is the failure mode.</blockquote>
      `,
    },
  ],
};
